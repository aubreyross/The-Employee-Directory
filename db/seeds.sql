INSERT INTO departments (name)
VALUES  ('Sales'),
        ('Senior Leadership'),
        ('IT'),
        ('Marketing'),
        ('Finance');


INSERT INTO roles (title, salary, departments_id)
VALUES  ('Sales Executive', 90000, 1),
        ('Chief Executive Officer', 300000, 2),
        ('Senior Software Engineer', 100000, 3),
        ('Marketing Intern', 30000, 4),
        ('Lead Analyst', 80000, 5);


INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES  ('Leslie', 'Knope', 2, null),
        ('Ron', 'Swanson', 3, 3),
        ('Tom', 'Haverford', 1, 5),
        ('Andy', 'Dwyer', 5, 6),
        ('April', 'Ludgate', 4, 8);