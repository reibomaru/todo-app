package apiserver

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	middleware "github.com/oapi-codegen/gin-middleware"
	"github.com/reibomaru/todo-app/backend/internal/controller"
	"github.com/reibomaru/todo-app/backend/internal/model"
	"github.com/reibomaru/todo-app/backend/internal/service"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	r := gin.Default()
	swagger, err := controller.GetSwagger()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading swagger spec\n: %s", err)
		os.Exit(1)
	}
	r.Use(middleware.OapiRequestValidator(swagger))

	// Connect to DB
	DataSourceName := os.Getenv("DATA_SOURCE_NAME")
	db, err := gorm.Open(postgres.Open(DataSourceName))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to connect with DB: %v", err)
		os.Exit(1)
	}
	defer func() {
		sqlDB, _ := db.DB()
		_ = sqlDB.Close()
	}()

	models := model.NewModels(db)
	services := service.NewServices(models)
	handlers := controller.NewHandlers(services)
	controller.RegisterHandlers(r, handlers)
}
