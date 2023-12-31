SCHEMA_YAML = design_files/openapi.yaml
OAPI_CONFIG_YAML = openapi/gen.yaml

BACKEND_GEN_FILE = backend/internal/controller/openapi.gen.go
FRONTEND_GEN_DIR = frontend/web/src/apis/backend/gen
FRONTEND_GEN_FILE = $(FRONTEND_GEN_DIR)/api.ts

.PHONY: app frontend-with-mock openapi-gen swagger-ui mock

app: openapi-gen
	docker compose --profile app up --build

frontend-with-mock:
	docker compose --profile frontend-mock up --build

### openapi-generator ###
openapi-gen: $(FRONTEND_GEN_FILE) $(BACKEND_GEN_FILE)

$(FRONTEND_GEN_FILE): $(SCHEMA_YAML)
	docker compose run openapi-generator generate -g typescript-axios -i /$(SCHEMA_YAML) -o /$(FRONTEND_GEN_DIR)

$(BACKEND_GEN_FILE): $(SCHEMA_YAML) $(OAPI_CONFIG_YAML)
	docker compose run --build backend oapi-codegen -o /$(BACKEND_GEN_FILE) --config /$(OAPI_CONFIG_YAML) /$(SCHEMA_YAML)
	docker compose run backend goimports -w ./

### openapi ###
swagger-ui:
	docker compose up swagger-ui

mock:
	docker compose up prism

### clean ###
clean:
	docker compose down