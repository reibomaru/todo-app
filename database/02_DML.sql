-- Companyの挿入
INSERT INTO companies (id, name, created_at, updated_at) VALUES 
(uuid_generate_v4(), 'Example Company', CURRENT_DATE, CURRENT_DATE);

-- Usersの挿入 (password: Password-123)
INSERT INTO users (id, name, email, password, role, company_id, created_at, updated_at) VALUES 
(uuid_generate_v4(), 'Alice', 'sample1@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'editor', (SELECT id FROM companies LIMIT 1), CURRENT_DATE, CURRENT_DATE),
(uuid_generate_v4(), 'Bob', 'sample2@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'viewer', (SELECT id FROM companies LIMIT 1), CURRENT_DATE, CURRENT_DATE),
(uuid_generate_v4(), 'Charlie', 'sample3@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'editor', (SELECT id FROM companies LIMIT 1), CURRENT_DATE, CURRENT_DATE),
(uuid_generate_v4(), 'David', 'sample4@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'viewer', (SELECT id FROM companies LIMIT 1), CURRENT_DATE, CURRENT_DATE);

-- Task Statusの挿入
INSERT INTO task_status (id, name, created_at, updated_at) VALUES 
(uuid_generate_v4(), 'Open', CURRENT_DATE, CURRENT_DATE),
(uuid_generate_v4(), 'In Progress', CURRENT_DATE, CURRENT_DATE),
(uuid_generate_v4(), 'Completed', CURRENT_DATE, CURRENT_DATE);

-- Tasksの挿入
INSERT INTO tasks (id, due, title, description, company_id, author_id, status_id, publication_range, created_at, updated_at) VALUES 
(uuid_generate_v4(), CURRENT_DATE, '洗濯物の取り込み', '洗濯物を干しているので取り込んでください', (SELECT id FROM companies LIMIT 1), (SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM task_status WHERE name = 'Open'), 'only_author', CURRENT_DATE, CURRENT_DATE),
(uuid_generate_v4(), CURRENT_DATE + 1, 'レポートの提出', '月次レポートを提出する', (SELECT id FROM companies LIMIT 1), (SELECT id FROM users WHERE name = 'Alice'), (SELECT id FROM task_status WHERE name = 'Open'), 'only_author', CURRENT_DATE, CURRENT_DATE);

-- Task Assignmentsの挿入
INSERT INTO task_assignments (id, assignee_id, task_id, created_at, updated_at) VALUES 
(uuid_generate_v4(), (SELECT id FROM users WHERE name = 'Bob'), (SELECT id FROM tasks WHERE title = '洗濯物の取り込み'), CURRENT_DATE, CURRENT_DATE),
(uuid_generate_v4(), (SELECT id FROM users WHERE name = 'Charlie'), (SELECT id FROM tasks WHERE title = 'レポートの提出'), CURRENT_DATE, CURRENT_DATE);
