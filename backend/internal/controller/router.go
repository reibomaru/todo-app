package controller

import "github.com/reibomaru/todo-app/backend/internal/service"

type Handler struct {
	services *service.Services
}

func NewHandlers(services *service.Services) *Handler {
	return &Handler{services: services}
}
