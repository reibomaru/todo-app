package model

import "gorm.io/gorm"

type Models struct {
	db *gorm.DB
}

func NewModels(db *gorm.DB) *Models {
	return &Models{db: db}
}
