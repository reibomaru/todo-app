// Package controller provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen version v1.16.2 DO NOT EDIT.
package controller

import (
	"bytes"
	"compress/gzip"
	"encoding/base64"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/gin-gonic/gin"
	"github.com/oapi-codegen/runtime"
	openapi_types "github.com/oapi-codegen/runtime/types"
)

// Defines values for TaskPublicationRange.
const (
	TaskPublicationRangeOnlyAuthor  TaskPublicationRange = "only_author"
	TaskPublicationRangeOnlyCompany TaskPublicationRange = "only_company"
)

// Defines values for TaskRequestBodyPublicationRange.
const (
	TaskRequestBodyPublicationRangeOnlyAuthor  TaskRequestBodyPublicationRange = "only_author"
	TaskRequestBodyPublicationRangeOnlyCompany TaskRequestBodyPublicationRange = "only_company"
)

// Company defines model for Company.
type Company struct {
	Id   openapi_types.UUID `json:"id"`
	Name string             `json:"name"`
}

// SearchResult defines model for SearchResult.
type SearchResult struct {
	PageSize int32  `json:"page_size"`
	Result   []Task `json:"result"`

	// TotalPageCount ページの総数
	TotalPageCount int32 `json:"total_page_count"`
}

// ServerMessage defines model for ServerMessage.
type ServerMessage struct {
	Message string `json:"message"`
}

// SignInRequestBody defines model for SignInRequestBody.
type SignInRequestBody struct {
	Email    openapi_types.Email `json:"email"`
	Password string              `json:"password"`
}

// Task defines model for Task.
type Task struct {
	Assignee         User                 `json:"assignee"`
	Author           User                 `json:"author"`
	Company          Company              `json:"company"`
	CreatedAt        string               `json:"created_at"`
	Description      string               `json:"description"`
	Due              openapi_types.Date   `json:"due"`
	Id               openapi_types.UUID   `json:"id"`
	PublicationRange TaskPublicationRange `json:"publication_range"`
	Status           TaskStatus           `json:"status"`
	Title            string               `json:"title"`
	UpdatedAt        string               `json:"updated_at"`
}

// TaskPublicationRange defines model for Task.PublicationRange.
type TaskPublicationRange string

// TaskRequestBody defines model for TaskRequestBody.
type TaskRequestBody struct {
	AssigneeId       *openapi_types.UUID              `json:"assigneeId,omitempty"`
	CompanyId        *openapi_types.UUID              `json:"companyId,omitempty"`
	Description      *string                          `json:"description,omitempty"`
	Due              *openapi_types.Date              `json:"due,omitempty"`
	PublicationRange *TaskRequestBodyPublicationRange `json:"publication_range,omitempty"`
	StatusId         *openapi_types.UUID              `json:"statusId,omitempty"`
	Title            *string                          `json:"title,omitempty"`
}

// TaskRequestBodyPublicationRange defines model for TaskRequestBody.PublicationRange.
type TaskRequestBodyPublicationRange string

// TaskStatus defines model for TaskStatus.
type TaskStatus struct {
	CreatedAt string             `json:"created_at"`
	Id        openapi_types.UUID `json:"id"`
	Name      string             `json:"name"`
	UpdatedAt string             `json:"updated_at"`
}

// User defines model for User.
type User struct {
	Company Company             `json:"company"`
	Email   openapi_types.Email `json:"email"`
	Id      openapi_types.UUID  `json:"id"`
	Name    string              `json:"name"`
}

// SearchTaskParams defines parameters for SearchTask.
type SearchTaskParams struct {
	Assignee *string `form:"assignee,omitempty" json:"assignee,omitempty"`
	Status   *string `form:"status,omitempty" json:"status,omitempty"`
	Sort     *string `form:"sort,omitempty" json:"sort,omitempty"`
	Page     *int32  `form:"page,omitempty" json:"page,omitempty"`
}

// CreateTaskJSONRequestBody defines body for CreateTask for application/json ContentType.
type CreateTaskJSONRequestBody = TaskRequestBody

// UpdateTaskJSONRequestBody defines body for UpdateTask for application/json ContentType.
type UpdateTaskJSONRequestBody = TaskRequestBody

// SignInJSONRequestBody defines body for SignIn for application/json ContentType.
type SignInJSONRequestBody = SignInRequestBody

// ServerInterface represents all server handlers.
type ServerInterface interface {

	// (GET /api/companies/{company_id}/members)
	GetMembers(c *gin.Context, companyId string)

	// (GET /api/companies/{company_id}/search)
	SearchTask(c *gin.Context, companyId string, params SearchTaskParams)

	// (GET /api/companies/{company_id}/task-status)
	GetTaskStatus(c *gin.Context, companyId string)

	// (POST /api/companies/{company_id}/tasks)
	CreateTask(c *gin.Context, companyId string)

	// (DELETE /api/companies/{company_id}/tasks/{task_id})
	DeleteTask(c *gin.Context, companyId string, taskId string)

	// (GET /api/companies/{company_id}/tasks/{task_id})
	GetTask(c *gin.Context, companyId string, taskId string)

	// (PATCH /api/companies/{company_id}/tasks/{task_id})
	UpdateTask(c *gin.Context, companyId string, taskId string)

	// (POST /api/signin)
	SignIn(c *gin.Context)

	// (POST /api/signout)
	SignOut(c *gin.Context)

	// (GET /api/users/me)
	GetMyAccount(c *gin.Context)
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler            ServerInterface
	HandlerMiddlewares []MiddlewareFunc
	ErrorHandler       func(*gin.Context, error, int)
}

type MiddlewareFunc func(c *gin.Context)

// GetMembers operation middleware
func (siw *ServerInterfaceWrapper) GetMembers(c *gin.Context) {

	var err error

	// ------------- Path parameter "company_id" -------------
	var companyId string

	err = runtime.BindStyledParameter("simple", false, "company_id", c.Param("company_id"), &companyId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter company_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetMembers(c, companyId)
}

// SearchTask operation middleware
func (siw *ServerInterfaceWrapper) SearchTask(c *gin.Context) {

	var err error

	// ------------- Path parameter "company_id" -------------
	var companyId string

	err = runtime.BindStyledParameter("simple", false, "company_id", c.Param("company_id"), &companyId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter company_id: %w", err), http.StatusBadRequest)
		return
	}

	// Parameter object where we will unmarshal all parameters from the context
	var params SearchTaskParams

	// ------------- Optional query parameter "assignee" -------------

	err = runtime.BindQueryParameter("form", true, false, "assignee", c.Request.URL.Query(), &params.Assignee)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter assignee: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Optional query parameter "status" -------------

	err = runtime.BindQueryParameter("form", true, false, "status", c.Request.URL.Query(), &params.Status)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter status: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Optional query parameter "sort" -------------

	err = runtime.BindQueryParameter("form", true, false, "sort", c.Request.URL.Query(), &params.Sort)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter sort: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Optional query parameter "page" -------------

	err = runtime.BindQueryParameter("form", true, false, "page", c.Request.URL.Query(), &params.Page)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter page: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.SearchTask(c, companyId, params)
}

// GetTaskStatus operation middleware
func (siw *ServerInterfaceWrapper) GetTaskStatus(c *gin.Context) {

	var err error

	// ------------- Path parameter "company_id" -------------
	var companyId string

	err = runtime.BindStyledParameter("simple", false, "company_id", c.Param("company_id"), &companyId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter company_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetTaskStatus(c, companyId)
}

// CreateTask operation middleware
func (siw *ServerInterfaceWrapper) CreateTask(c *gin.Context) {

	var err error

	// ------------- Path parameter "company_id" -------------
	var companyId string

	err = runtime.BindStyledParameter("simple", false, "company_id", c.Param("company_id"), &companyId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter company_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.CreateTask(c, companyId)
}

// DeleteTask operation middleware
func (siw *ServerInterfaceWrapper) DeleteTask(c *gin.Context) {

	var err error

	// ------------- Path parameter "company_id" -------------
	var companyId string

	err = runtime.BindStyledParameter("simple", false, "company_id", c.Param("company_id"), &companyId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter company_id: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "task_id" -------------
	var taskId string

	err = runtime.BindStyledParameter("simple", false, "task_id", c.Param("task_id"), &taskId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter task_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.DeleteTask(c, companyId, taskId)
}

// GetTask operation middleware
func (siw *ServerInterfaceWrapper) GetTask(c *gin.Context) {

	var err error

	// ------------- Path parameter "company_id" -------------
	var companyId string

	err = runtime.BindStyledParameter("simple", false, "company_id", c.Param("company_id"), &companyId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter company_id: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "task_id" -------------
	var taskId string

	err = runtime.BindStyledParameter("simple", false, "task_id", c.Param("task_id"), &taskId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter task_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetTask(c, companyId, taskId)
}

// UpdateTask operation middleware
func (siw *ServerInterfaceWrapper) UpdateTask(c *gin.Context) {

	var err error

	// ------------- Path parameter "company_id" -------------
	var companyId string

	err = runtime.BindStyledParameter("simple", false, "company_id", c.Param("company_id"), &companyId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter company_id: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "task_id" -------------
	var taskId string

	err = runtime.BindStyledParameter("simple", false, "task_id", c.Param("task_id"), &taskId)
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter task_id: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.UpdateTask(c, companyId, taskId)
}

// SignIn operation middleware
func (siw *ServerInterfaceWrapper) SignIn(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.SignIn(c)
}

// SignOut operation middleware
func (siw *ServerInterfaceWrapper) SignOut(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.SignOut(c)
}

// GetMyAccount operation middleware
func (siw *ServerInterfaceWrapper) GetMyAccount(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetMyAccount(c)
}

// GinServerOptions provides options for the Gin server.
type GinServerOptions struct {
	BaseURL      string
	Middlewares  []MiddlewareFunc
	ErrorHandler func(*gin.Context, error, int)
}

// RegisterHandlers creates http.Handler with routing matching OpenAPI spec.
func RegisterHandlers(router gin.IRouter, si ServerInterface) {
	RegisterHandlersWithOptions(router, si, GinServerOptions{})
}

// RegisterHandlersWithOptions creates http.Handler with additional options
func RegisterHandlersWithOptions(router gin.IRouter, si ServerInterface, options GinServerOptions) {
	errorHandler := options.ErrorHandler
	if errorHandler == nil {
		errorHandler = func(c *gin.Context, err error, statusCode int) {
			c.JSON(statusCode, gin.H{"msg": err.Error()})
		}
	}

	wrapper := ServerInterfaceWrapper{
		Handler:            si,
		HandlerMiddlewares: options.Middlewares,
		ErrorHandler:       errorHandler,
	}

	router.GET(options.BaseURL+"/api/companies/:company_id/members", wrapper.GetMembers)
	router.GET(options.BaseURL+"/api/companies/:company_id/search", wrapper.SearchTask)
	router.GET(options.BaseURL+"/api/companies/:company_id/task-status", wrapper.GetTaskStatus)
	router.POST(options.BaseURL+"/api/companies/:company_id/tasks", wrapper.CreateTask)
	router.DELETE(options.BaseURL+"/api/companies/:company_id/tasks/:task_id", wrapper.DeleteTask)
	router.GET(options.BaseURL+"/api/companies/:company_id/tasks/:task_id", wrapper.GetTask)
	router.PATCH(options.BaseURL+"/api/companies/:company_id/tasks/:task_id", wrapper.UpdateTask)
	router.POST(options.BaseURL+"/api/signin", wrapper.SignIn)
	router.POST(options.BaseURL+"/api/signout", wrapper.SignOut)
	router.GET(options.BaseURL+"/api/users/me", wrapper.GetMyAccount)
}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"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",
	"AAA=",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
