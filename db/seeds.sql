-- filling out information within the tables 

INSERT INTO department (name)
VALUES
  ('Legal'),
  ('Art'),
  ('Media'),
  ('Fun');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Lead', 50, 4),
  ('Artist', 60, 2),
  ('Human', 70, 1),
  ('Partier', 80, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Bob', 'Saint', 2, 1),
  ('Krista', 'Cannady', 3, null),
  ('Christa', 'Cole', 2, 1),
  ('Will', 'Jarvis', 2, 1),
  ('Josh', 'Kennedy', 1, 1),
  ('Sam', 'Smith', 2, 1),
  ('Annie', 'Pate', 3, 1),
  ('Morgan', 'Terifay', 4, 1),
  ('Andrew', 'Bernard', 1, 1),
  ('Chris', 'Phelon', 1, 1);
