SET SESSION timezone TO 'Asia/Tokyo';
-- Companyの挿入
INSERT INTO companies (id, name, created_at, updated_at) VALUES 
('874814f9-0564-44bc-94bc-3e8ec0204a2c', 'Example Company', CURRENT_DATE, CURRENT_DATE);

-- Usersの挿入 (password: Password-123)
INSERT INTO users (id, name, email, password, role, company_id, created_at, updated_at) VALUES 
('72284d80-fc37-4fce-9990-d06816f154e3', 'Alice', 'sample1@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'editor', '874814f9-0564-44bc-94bc-3e8ec0204a2c', CURRENT_DATE, CURRENT_DATE),
('589bd1a9-7989-4f48-9238-657d6c8d8b7c', 'Bob', 'sample2@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'viewer', '874814f9-0564-44bc-94bc-3e8ec0204a2c', CURRENT_DATE, CURRENT_DATE),
('f071b4ff-5cdd-49fe-864f-c0af2a031589', 'Charlie', 'sample3@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'editor', '874814f9-0564-44bc-94bc-3e8ec0204a2c', CURRENT_DATE, CURRENT_DATE),
('aa5f1d1e-de7e-4262-88b3-3dc0b57b860a', 'David', 'sample4@mail.com', 'b071b17d7b18159dc8410f7a3baaaae2b000ba6d5fc20bc8fc04b0745b0e6493', 'viewer', '874814f9-0564-44bc-94bc-3e8ec0204a2c', CURRENT_DATE, CURRENT_DATE);

-- Task Statusの挿入
INSERT INTO task_status (id, name, company_id, created_at, updated_at) VALUES 
('f722f8ec-b202-4c36-b0cf-2344ed961965', 'Open', '874814f9-0564-44bc-94bc-3e8ec0204a2c', CURRENT_DATE, CURRENT_DATE),
('12f10640-59e7-4270-a2d5-4c633028aa1e', 'In Progress', '874814f9-0564-44bc-94bc-3e8ec0204a2c', CURRENT_DATE, CURRENT_DATE),
('2acc342b-e88c-4ec1-8088-b01c922cbca4', 'Completed', '874814f9-0564-44bc-94bc-3e8ec0204a2c', CURRENT_DATE, CURRENT_DATE);

-- Tasksの挿入
INSERT INTO tasks (id, due, title, description, company_id, author_id, assignee_id, status_id, publication_range, created_at, updated_at) VALUES 
('9f6d589b-67a3-4ad5-a85e-4f43d3222eec', CURRENT_DATE, '洗濯物の取り込み', '洗濯物を干しているので取り込んでください', '874814f9-0564-44bc-94bc-3e8ec0204a2c', '72284d80-fc37-4fce-9990-d06816f154e3', '589bd1a9-7989-4f48-9238-657d6c8d8b7c', 'f722f8ec-b202-4c36-b0cf-2344ed961965', 'only_author', CURRENT_DATE, CURRENT_DATE),
('c2185f9a-63e2-4742-8e8c-f492f76c6020', CURRENT_DATE + 1, 'レポートの提出', '月次レポートを提出する', '874814f9-0564-44bc-94bc-3e8ec0204a2c', '72284d80-fc37-4fce-9990-d06816f154e3', 'f071b4ff-5cdd-49fe-864f-c0af2a031589', '12f10640-59e7-4270-a2d5-4c633028aa1e', 'only_author', CURRENT_DATE, CURRENT_DATE);
