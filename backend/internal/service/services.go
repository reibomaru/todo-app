package service

import "github.com/reibomaru/todo-app/backend/internal/model"

type Services struct {
	models *model.Models
}

func NewServices(models *model.Models) *Services {
	return &Services{models: models}
}
