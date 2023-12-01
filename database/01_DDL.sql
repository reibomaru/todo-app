-- Drop existing tables and types if they exist
DROP TABLE IF EXISTS task_assignments CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS task_status CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

DROP TYPE IF EXISTS publication_range;
DROP TYPE IF EXISTS role;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enumerations
CREATE TYPE role AS ENUM ('viewer', 'editor');
CREATE TYPE publication_range AS ENUM ('only_author', 'only_company');

-- Companies Table
CREATE TABLE companies (
    id UUID PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE
);

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    role role NOT NULL,
    company_id UUID NOT NULL REFERENCES companies(id),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE
);

-- Task Status Table
CREATE TABLE task_status (
    id UUID PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE
);

-- Tasks Table
CREATE TABLE tasks (
    id UUID PRIMARY KEY,
    due DATE NOT NULL,
    title VARCHAR(50),
    description text NOT NULL,
    company_id UUID NOT NULL REFERENCES companies(id),
    author_id UUID NOT NULL REFERENCES users(id),
    status_id UUID NOT NULL REFERENCES task_status(id),
    publication_range publication_range NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE
);

-- Task Assignments Table
CREATE TABLE task_assignments (
    id UUID PRIMARY KEY,
    assignee_id UUID NOT NULL REFERENCES users(id),
    task_id UUID NOT NULL REFERENCES tasks(id),
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    deleted_at DATE
);