package model

import (
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ModelBase
	ID        uuid.UUID `gorm:"primary_key"`
	Name      string
	Email     string
	CompanyID uuid.UUID
	Company   Company
	Tasks     []Task `gorm:"many2many:task_assignments;joinReferences:AssigneeId"`
}

func (m Model) FindUsersByCompanyID(conn *gorm.DB, companyID uuid.UUID) ([]*User, error) {
	var users []*User
	err := conn.Joins("Company").Where("company_id = ?", companyID).Find(&users).Error
	if err != nil {
		return nil, err
	}
	fmt.Println(users)
	return users, nil
}

func (m Model) FindUserByID(conn *gorm.DB, userID uuid.UUID) (*User, error) {
	var user *User
	err := conn.Joins("Company").First(&user).Error
	if err != nil {
		return nil, err
	}
	fmt.Println(user)
	return user, nil
}
