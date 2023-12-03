package controller

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/reibomaru/todo-app/backend/internal/model"
)

// (GET /api/companies/{company_id}/search)
func (h Handler) SearchTask(c *gin.Context, companyId string, params SearchTaskParams) {
	session := sessions.Default(c)
	userID, ok := session.Get("userID").(string)
	if !ok {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	companyUUID, err := uuid.Parse(companyId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	page := 1
	if params.Page != nil {
		page = int(*params.Page)
	}

	searchResult, err := h.services.SearchTasksByQuery(companyUUID, userUUID, params.Assignee, params.Status, params.Sort, int(page))
	if err != nil {
		c.JSON(http.StatusNotFound, ServerMessage{
			Message: "not found tasks",
		})
		return
	}
	taskRes := make([]Task, 0)
	for _, task := range searchResult.Tasks {
		taskRes = append(taskRes, NewTask(*task))
	}
	c.JSON(http.StatusOK, SearchResult{
		Result:         taskRes,
		TotalPageCount: int32(searchResult.PageCount),
		PageSize:       model.PAGE_SIZE,
	})
}

// (GET /api/companies/{company_id}/task-status)
func (h Handler) GetTaskStatus(c *gin.Context, companyId string) {
	companyUUID, err := uuid.Parse(companyId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	taskStatusList, err := h.services.FindTaskStatusByCompanyID(companyUUID)
	if err != nil {
		c.JSON(http.StatusNotFound, ServerMessage{
			Message: "not found task status",
		})
		return
	}
	var resBody []TaskStatus
	for _, taskStatus := range taskStatusList {
		resBody = append(resBody, NewTaskStatus(*taskStatus))
	}
	c.JSON(http.StatusOK, resBody)
}

// (POST /api/companies/{company_id}/tasks)
func (h Handler) CreateTask(c *gin.Context, companyId string) {
	_, err := uuid.Parse(companyId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	taskReqBody := &TaskRequestBody{}
	if err = c.BindJSON(taskReqBody); err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid body",
		})
		return
	}
	var due time.Time
	if taskReqBody.Due != nil {
		due = taskReqBody.Due.Time
	}
	authorID, _ := uuid.Parse("72284d80-fc37-4fce-9990-d06816f154e3")
	if err = h.services.CreateTask(&model.CreateTaskPayload{
		CompanyID:        *taskReqBody.CompanyId,
		AssigeeID:        *taskReqBody.AssigneeId,
		AuthorID:         authorID,
		Due:              due,
		Title:            *taskReqBody.Title,
		Description:      *taskReqBody.Description,
		PublicationRange: model.TaskPublicationRange(*taskReqBody.PublicationRange),
		StatusID:         *taskReqBody.StatusId,
	}); err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid body",
		})
		return
	}
	c.JSON(http.StatusOK, ServerMessage{
		Message: "ok",
	})
}

// (DELETE /api/companies/{company_id}/tasks/{task_id})
func (h Handler) DeleteTask(c *gin.Context, companyId string, taskId string) {
	taskUUID, err := uuid.Parse(taskId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	if err = h.services.DeleteTask(taskUUID); err != nil {
		c.JSON(http.StatusInternalServerError, ServerMessage{
			Message: "failed deleting task...",
		})
		return
	}
	c.JSON(http.StatusOK, ServerMessage{
		Message: "ok",
	})
}

// (GET /api/companies/{company_id}/tasks/{task_id})
func (h Handler) GetTask(c *gin.Context, companyId string, taskId string) {
	session := sessions.Default(c)
	userID, ok := session.Get("userID").(string)
	if !ok {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	userUUID, err := uuid.Parse(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	companyUUID, err := uuid.Parse(companyId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	taskUUID, err := uuid.Parse(taskId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	task, err := h.services.FindTaskByID(companyUUID, userUUID, taskUUID)
	if err != nil {
		c.JSON(http.StatusNotFound, ServerMessage{
			Message: fmt.Sprintf("not found task id: %v", taskUUID),
		})
		return
	}
	c.JSON(http.StatusOK, NewTask(*task))
}

// (PATCH /api/companies/{company_id}/tasks/{task_id})
func (h Handler) UpdateTask(c *gin.Context, companyId string, taskId string) {
	taskUUID, err := uuid.Parse(taskId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	taskReqBody := &TaskRequestBody{}
	if err := c.BindJSON(taskReqBody); err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid body",
		})
		return
	}
	var due *time.Time
	if taskReqBody.Due != nil {
		due = &taskReqBody.Due.Time
	}
	if err = h.services.UpdateTask(taskUUID, &model.UpdateTaskPayload{
		AssigneeID:       taskReqBody.AssigneeId,
		Due:              due,
		Title:            taskReqBody.Title,
		Description:      taskReqBody.Description,
		PublicationRange: (*model.TaskPublicationRange)(taskReqBody.PublicationRange),
		StatusID:         taskReqBody.StatusId,
	}); err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, ServerMessage{
			Message: "invalid body",
		})
		return
	}
	c.JSON(http.StatusOK, ServerMessage{
		Message: "ok",
	})
}
