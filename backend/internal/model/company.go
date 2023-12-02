package model

import (
	"github.com/google/uuid"
)

type Company struct {
	ModelBase
	ID   uuid.UUID `gorm:"primary_key"`
	Name string
}
