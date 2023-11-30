package controller

import "github.com/gin-gonic/gin"

// (GET /api/companies/{company_id}/search)
func (h Handler) SearchTask(c *gin.Context, companyId string, params SearchTaskParams) {

}

// (GET /api/companies/{company_id}/task-status)
func (h Handler) GetTaskStatus(c *gin.Context, companyId string) {

}

// (POST /api/companies/{company_id}/tasks)
func (h Handler) CreateTask(c *gin.Context, companyId string) {

}

// (DELETE /api/companies/{company_id}/tasks/{task_id})
func (h Handler) DeleteTask(c *gin.Context, companyId string, taskId string) {

}

// (GET /api/companies/{company_id}/tasks/{task_id})
func (h Handler) GetTask(c *gin.Context, companyId string, taskId string) {

}

// (PATCH /api/companies/{company_id}/tasks/{task_id})
func (h Handler) UpdateTask(c *gin.Context, companyId string, taskId string) {

}
