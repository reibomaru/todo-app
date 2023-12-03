package service

import (
	"errors"

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

func (s Services) SearchTasksByQuery(companyID uuid.UUID, userID uuid.UUID, assignee *string, status *string, sort *string, page int) (*model.SearchResult, error) {
	return s.model.FindTasksByQuery(s.DB, companyID, userID, assignee, status, sort, page)
}

func (s Services) FindTaskStatusByCompanyID(companyID uuid.UUID) ([]*model.TaskStatus, error) {
	return s.model.FindTaskStatusByCompanyID(s.DB, companyID)
}

func (s Services) FindTaskByID(userID uuid.UUID, taskID uuid.UUID) (*model.Task, error) {
	return s.model.FindTaskByID(s.DB, userID, taskID)
}

func (s Services) FindMembersByCompanyID(companyID uuid.UUID) ([]*model.User, error) {
	return s.model.FindUsersByCompanyID(s.DB, companyID)
}

func (s Services) CreateTask(userID uuid.UUID, newTask *model.CreateTaskPayload) error {
	user, err := s.model.FindUserByID(s.DB, userID)
	if err != nil {
		return err
	}
	if user.Role == model.Viewer {
		return errors.New("operation forbidden")
	}
	return s.model.CreateTask(s.DB, newTask)
}

func (s Services) UpdateTask(userID uuid.UUID, taskID uuid.UUID, payload *model.UpdateTaskPayload) error {
	user, err := s.model.FindUserByID(s.DB, userID)
	if err != nil {
		return err
	}
	if user.Role == model.Viewer {
		return errors.New("operation forbidden")
	}
	task, err := s.model.FindTaskByID(s.DB, userID, taskID)
	if err != nil {
		return err
	}
	if payload.PublicationRange != nil && task.AuthorID != userID {
		return errors.New("operation forbidden")
	}
	return s.model.UpdateTask(s.DB, taskID, payload)
}

func (s Services) DeleteTask(userID uuid.UUID, taskID uuid.UUID) error {
	user, err := s.model.FindUserByID(s.DB, userID)
	if err != nil {
		return err
	}
	if user.Role == model.Viewer {
		return errors.New("operation forbidden")
	}
	return s.model.DeleteTask(s.DB, taskID)
}

func (s Services) FindUserWithEmailAndPassword(email string, password string) (*model.User, error) {
	return s.model.FindUserByEmailAndPassword(s.DB, email, password)
}

func (s Services) FindUserByID(userID uuid.UUID) (*model.User, error) {
	return s.model.FindUserByID(s.DB, userID)
}
