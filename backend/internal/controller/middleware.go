package controller

import (
	"net/http"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func CompanyAuthorization() gin.HandlerFunc {
	return func(c *gin.Context) {
		path := c.Request.URL.Path
		if !strings.HasPrefix(path, "/api/companies/") {
			c.Next()
			return
		}
		companyID := c.Param("company_id")
		session := sessions.Default(c)
		if val, ok := session.Get("companyID").(string); ok {
			if val == companyID {
				c.Next()
				return
			}
		}
		c.AbortWithStatusJSON(http.StatusBadRequest, ServerMessage{
			Message: "invalid request",
		})
	}
}
