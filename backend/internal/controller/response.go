package controller

import (
	"github.com/oapi-codegen/runtime/types"
	"github.com/reibomaru/todo-app/backend/internal/model"
)

func NewCompany(c model.Company) Company {
	return Company{Id: c.ID, Name: c.Name}
}

func NewUser(u model.User) User {
	return User{Id: u.ID, Name: u.Name, Company: NewCompany(u.Company), Email: types.Email(u.Email)}
}

func NewTaskStatus(ts model.TaskStatus) TaskStatus {
	return TaskStatus{Id: ts.ID, Name: ts.Name, UpdatedAt: ts.UpdatedAt.String(), CreatedAt: ts.CreatedAt.String()}
}

func NewTask(t model.Task) Task {
	return Task{
		Assignee:         NewUser(t.Assignee),
		Author:           NewUser(t.Author),
		Company:          NewCompany(t.Company),
		CreatedAt:        t.CreatedAt.String(),
		Description:      t.Description,
		Due:              types.Date{Time: t.Due},
		Id:               t.ID,
		PublicationRange: TaskPublicationRange(t.PublicationRange),
		Status:           NewTaskStatus(t.Status),
		Title:            t.Title,
		UpdatedAt:        t.UpdatedAt.String(),
	}
}
