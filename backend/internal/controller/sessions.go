package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// (POST /api/signin)
func (h Handler) SignIn(c *gin.Context) {
	c.JSON(http.StatusOK, ServerMessage{
		Message: "ok",
	})
}

// (POST /api/signout)
func (h Handler) SignOut(c *gin.Context) {

}
