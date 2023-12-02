package model

import (
	"time"

	"gorm.io/gorm"
)

type Model struct {
}

func NewModel(db *gorm.DB) *Model {
	return &Model{}
}

type ModelBase struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
