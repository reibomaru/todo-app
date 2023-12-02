package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// (GET /api/companies/{company_id}/members)
func (h Handler) GetMembers(c *gin.Context, companyId string) {
	companyUUID, err := uuid.Parse(companyId)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid id",
		})
		return
	}
	users, err := h.services.FindMembersByCompanyID(companyUUID)
	if err != nil {
		c.JSON(http.StatusNotFound, ServerMessage{
			Message: "memebers not found",
		})
	}
	var resBody []User
	for _, user := range users {
		resBody = append(resBody, NewUser(*user))
	}
	c.JSON(http.StatusOK, resBody)
}

// (GET /api/users/me)
func (h Handler) GetMyAccount(c *gin.Context) {
	c.JSON(http.StatusOK, User{
		Company: Company{
			Name: "example",
			Id:   uuid.New(),
		},
		Email: "sample@mail.com",
		Id:    uuid.New(),
		Name:  "fuga",
	})
}
