package service

import (
	"github.com/google/uuid"
	"github.com/reibomaru/todo-app/backend/internal/model"
	"gorm.io/gorm"
)

type Services struct {
	DB    *gorm.DB
	model *model.Model
}

func NewServices(model *model.Model, db *gorm.DB) *Services {
	return &Services{model: model, DB: db}
}

func (s Services) SearchTasksByQuery(companyID uuid.UUID, assignee *string, status *string, sort *string, page int) (*model.SearchResult, error) {
	return s.model.FindTasksByQuery(s.DB, companyID, assignee, status, sort, page)
}

func (s Services) FindTaskStatusByCompanyID(companyID uuid.UUID) ([]*model.TaskStatus, error) {
	return s.model.FindTaskStatusByCompanyID(s.DB, companyID)
}

func (s Services) FindTaskByID(companyID uuid.UUID, taskID uuid.UUID) (*model.Task, error) {
	return s.model.FindTaskByID(s.DB, companyID, taskID)
}

func (s Services) FindMembersByCompanyID(companyID uuid.UUID) ([]*model.User, error) {
	return s.model.FindUsersByCompanyID(s.DB, companyID)
}

func (s Services) CreateTask(newTask *model.CreateTaskPayload) error {
	return s.model.CreateTask(s.DB, newTask)
}

func (s Services) UpdateTask(taskID uuid.UUID, payload *model.UpdateTaskPayload) error {
	return s.model.UpdateTask(s.DB, taskID, payload)
}

func (s Services) DeleteTask(taskID uuid.UUID) error {
	return s.model.DeleteTask(s.DB, taskID)
}

func (s Services) FindUserWithEmailAndPassword(email string, password string) (*model.User, error) {
	return s.model.FindUserByEmailAndPassword(s.DB, email, password)
}

func (s Services) FindUserByID(userID uuid.UUID) (*model.User, error) {
	return s.model.FindUserByID(s.DB, userID)
}
