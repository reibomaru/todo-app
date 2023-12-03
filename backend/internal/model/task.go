package model

import (
	"fmt"
	"math"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TaskPublicationRange string

// Defines values for TaskPublicationRange.
const (
	TaskPublicationRangeOnlyAuthor  TaskPublicationRange = "only_author"
	TaskPublicationRangeOnlyCompany TaskPublicationRange = "only_company"
)

type TaskStatus struct {
	ModelBase
	ID        uuid.UUID
	Name      string
	CompanyID uuid.UUID
}

func (TaskStatus) TableName() string {
	return "task_status"
}

type CreateTaskPayload struct {
	CompanyID        uuid.UUID
	AssigeeID        uuid.UUID
	AuthorID         uuid.UUID
	Due              time.Time
	Title            string
	Description      string
	PublicationRange TaskPublicationRange
	StatusID         uuid.UUID
}

type UpdateTaskPayload struct {
	AssigneeID       *uuid.UUID
	Due              *time.Time
	Title            *string
	Description      *string
	PublicationRange *TaskPublicationRange
	StatusID         *uuid.UUID
	UpdatedAt        time.Time
}

type Task struct {
	ModelBase
	ID               uuid.UUID `gorm:"primary_key;<-:false;default:gen_random_uuid()"`
	Due              time.Time
	Title            string
	Description      string
	PublicationRange TaskPublicationRange
	CompanyID        uuid.UUID
	Company          Company
	StatusID         uuid.UUID
	Status           TaskStatus `gorm:"foreignKey:StatusID"`
	AssigneeID       uuid.UUID
	Assignee         User
	AuthorID         uuid.UUID
	Author           User
}

const PAGE_SIZE = 10

func (m Model) FindTaskByID(conn *gorm.DB, companyID uuid.UUID, userID uuid.UUID, taskID uuid.UUID) (*Task, error) {
	task := &Task{ID: taskID}
	err := conn.
		Joins("Status").
		Joins("Company").
		Joins("Author").
		Joins("Author.Company").
		Joins("Assignee").
		Joins("Assignee.Company").
		Where("author_id = ? OR publication_range = ?", userID, TaskPublicationRangeOnlyCompany).
		First(task).Error
	if err != nil {
		return nil, err
	}

	return task, nil
}

func (m Model) FindTaskStatusByCompanyID(conn *gorm.DB, companyID uuid.UUID) ([]*TaskStatus, error) {
	var taskStatusList []*TaskStatus
	err := conn.Where("company_id = ?", companyID).Find(&taskStatusList).Error
	if err != nil {
		return nil, err
	}
	return taskStatusList, nil
}

type SearchResult struct {
	Tasks     []*Task
	PageCount int32
}

func (m Model) FindTasksByQuery(conn *gorm.DB, companyID uuid.UUID, userID uuid.UUID, assigneeName *string, statusName *string, sort *string, page int) (*SearchResult, error) {
	var tasks []*Task
	var count int64
	whereConditions := make(map[string]string)
	if assigneeName != nil && *assigneeName != "" {
		whereConditions["Assignee.name"] = *assigneeName
	}
	if statusName != nil && *statusName != "" {
		whereConditions["Status.name"] = *statusName
	}
	whereConditions["Company.id"] = companyID.String()
	sortKey := "created_at desc"
	if sort != nil && *sort == "due" {
		sortKey = *sort
	}

	offset := (page - 1) * PAGE_SIZE
	err := conn.
		Joins("Status").
		Joins("Company").
		Joins("Author").
		Joins("Author.Company").
		Joins("Assignee").
		Joins("Assignee.Company").
		Where(whereConditions).
		Where("author_id = ? OR publication_range = ?", userID, TaskPublicationRangeOnlyCompany).
		Order(sortKey).
		Offset(offset).
		Limit(PAGE_SIZE).
		Find(&tasks).Error
	if err != nil {
		return nil, err
	}
	err = conn.
		Model(&Task{}).
		Joins("Status").
		Joins("Company").
		Joins("Assignee").
		Where(whereConditions).
		Where("author_id = ? OR publication_range = ?", userID, TaskPublicationRangeOnlyCompany).
		Count(&count).Error
	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}
	pageCount := int32(math.Ceil(float64(count) / float64(PAGE_SIZE)))
	fmt.Println(pageCount)
	return &SearchResult{
		Tasks:     tasks,
		PageCount: pageCount,
	}, nil
}

func (m Model) CreateTask(conn *gorm.DB, payload *CreateTaskPayload) error {
	task := &Task{
		CompanyID:        payload.CompanyID,
		AssigneeID:       payload.AssigeeID,
		AuthorID:         payload.AuthorID,
		Due:              payload.Due,
		Title:            payload.Title,
		Description:      payload.Description,
		PublicationRange: payload.PublicationRange,
		StatusID:         payload.StatusID,
	}
	if err := conn.Create(task).Error; err != nil {
		return err
	}
	return nil
}

func (m Model) UpdateTask(conn *gorm.DB, taskID uuid.UUID, payload *UpdateTaskPayload) error {
	task := &Task{
		ID: taskID,
	}
	if err := conn.Model(task).Updates(payload).Error; err != nil {
		fmt.Println(err.Error())
		return err
	}
	return nil
}

func (m Model) DeleteTask(conn *gorm.DB, taskID uuid.UUID) error {
	task := &Task{
		ID: taskID,
	}
	if err := conn.Delete(task).Error; err != nil {
		fmt.Println(err.Error())
		return err
	}
	return nil
}
