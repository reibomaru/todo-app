package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
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

	// TODO: keyを予測しづらい文字列にする
	store := cookie.NewStore([]byte("secret"))
	r.Use(sessions.Sessions("auth", store))

	r.Use(controller.CompanyAuthorization())

	model := model.NewModel(db)
	services := service.NewServices(model, db)
	handlers := controller.NewHandlers(services)
	controller.RegisterHandlers(r, handlers)

	_ = r.Run(":8080")
}
