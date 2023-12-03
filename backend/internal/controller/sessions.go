package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// (POST /api/signin)
func (h Handler) SignIn(c *gin.Context) {
	signInReqBody := &SignInRequestBody{}
	if err := c.BindJSON(signInReqBody); err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid payload for signing in",
		})
		return
	}
	user, err := h.services.FindUserWithEmailAndPassword(string(signInReqBody.Email), signInReqBody.Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid email or password",
		})
		return
	}
	session := sessions.Default(c)
	session.Set("companyId", user.CompanyID.String())
	session.Set("userID", user.ID.String())
	session.Options(sessions.Options{
		MaxAge:   3600 * 3, // Cookieを用いているので短めに設定
		Secure:   true,
		HttpOnly: true,
	})
	if err := session.Save(); err != nil {
		fmt.Println(err.Error())
		c.JSON(http.StatusInternalServerError, ServerMessage{
			Message: "sorry... failed attatching auth info",
		})
		return
	}
	c.JSON(http.StatusOK, ServerMessage{
		Message: "ok",
	})
}

// (POST /api/signout)
func (h Handler) SignOut(c *gin.Context) {
	session := sessions.Default(c)
	session.Clear()
	session.Save()
	c.JSON(http.StatusOK, ServerMessage{
		Message: "ok",
	})
}
