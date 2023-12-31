package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserRole string

// Defines values for UserRole.
const (
	Editor UserRole = "editor"
	Viewer UserRole = "viewer"
)

type User struct {
	ModelBase
	ID        uuid.UUID `gorm:"primary_key"`
	Name      string
	Email     string
	CompanyID uuid.UUID
	Company   Company
	Role      UserRole
}

func (m Model) FindUsersByCompanyID(conn *gorm.DB, companyID uuid.UUID) ([]*User, error) {
	var users []*User
	err := conn.Joins("Company").Where("company_id = ?", companyID).Find(&users).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (m Model) FindUserByID(conn *gorm.DB, userID uuid.UUID) (*User, error) {
	user := &User{
		ID: userID,
	}
	err := conn.Joins("Company").First(user).Error
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (m Model) FindUserByEmailAndPassword(conn *gorm.DB, email string, password string) (*User, error) {
	user := &User{}
	if err := conn.Where("email = ? AND password = ?", email, password).First(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
