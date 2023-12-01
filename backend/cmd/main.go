package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"

	"github.com/gin-gonic/gin"
	"github.com/reibomaru/todo-app/backend/internal/controller"
	"github.com/reibomaru/todo-app/backend/internal/model"
	"github.com/reibomaru/todo-app/backend/internal/service"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	r := gin.Default()

	err := godotenv.Load(".env")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading .env file")
		os.Exit(1)
	}

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

	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"http://localhost:8081"},
	// 	AllowMethods:     []string{"POST", "PUT", "PATCH"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: false,
	// 	MaxAge: 12 * time.Hour,
	// }))

	// swagger, err := controller.GetSwagger()
	// if err != nil {
	// 	fmt.Fprintf(os.Stderr, "Error loading swagger spec\n: %s", err)
	// 	os.Exit(1)
	// }
	// r.Use(middleware.OapiRequestValidator(swagger))

	models := model.NewModels(db)
	services := service.NewServices(models)
	handlers := controller.NewHandlers(services)
	controller.RegisterHandlers(r, handlers)

	_ = r.Run(":8080")
}
