FROM golang:1.19.5

WORKDIR /backend

ARG GOPATH=/go

# goimportsを実行できるようにする
RUN go install golang.org/x/tools/cmd/goimports@latest

# binary will be $(go env GOPATH)/bin/golangci-lint
RUN curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.50.1
RUN golangci-lint --version

# install oapi-codegen
RUN go install github.com/deepmap/oapi-codegen/cmd/oapi-codegen@latest

RUN mkdir /scripts \
    && wget 'https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh' -P /scripts  \
    && chmod 755 /scripts/wait-for-it.sh

COPY go.mod go.sum /backend/
RUN go mod download
