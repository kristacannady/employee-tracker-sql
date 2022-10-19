// installed all the appropriate applications 
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// Start server
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'franklin1234',
    database: 'employees'
  });


// View all departments 
  const viewAllDepartments = () => {
    const sql =`SELECT * FROM department`
    db.query(sql, (err, res) =>{
      if (err) throw err;
      console.table(res);
      runApp();
    })
  };
  
// View all roles 
  const viewAllRoles = () => {
    const sql =`SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
            FROM employee
            LEFT JOIN role ON (role.id = employee.role_id)
            LEFT JOIN department ON (department.id = role.department_id)
            ORDER BY role.title;`
    db.query(sql, (err, res) =>{
      if (err) throw err;
      console.table(res);
      runApp();
    })
  };
  
// View all employees 
  const viewAllEmployees = () => {
    const sql =`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee
                LEFT JOIN employee manager on manager.id = employee.manager_id
                INNER JOIN role ON (role.id = employee.role_id)
                INNER JOIN department ON (department.id = role.department_id)
                ORDER BY employee.id;`
    db.query(sql, (err, res) =>{
      if (err) throw err;
      console.table(res);
      runApp();
    })
  };
  
// Add a department 
  const addADepartment = async () => {
    const department = await inquirer.prompt([
      {
        type: 'input', 
        name: 'department', 
        message: 'What is the name of your department? ',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('Please input answer.');
            return false;
          }
        }
      }
    ])
    const sql =`INSERT INTO department (name)
                VALUES
                  ('${department.department}');`
    db.query(sql, async (err, res) =>{
      if (err) throw err;
      console.table(res);
      runApp();
    })
  };
  
// Add a role 
  const addARole = async () => {
    const prompt = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is this role\'s name?',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('You must input a name.');
            return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'salary', 
        message: 'What is the salary? ',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('Please input answer.');
            return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'department', 
        message: 'What department id? ',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('Please input answer.');
            return false;
          }
        }
      }
    ])
    const sql =`INSERT INTO role (title, salary, department_id)
                VALUES
                  ('${prompt.name}', ${prompt.salary}, ${prompt.department});`
  
    db.query(sql, async (err, res) =>{
      if (err) throw err;
      console.table(res);
      runApp();
    })
  };
  
// Add an employee
  const addAnEmployee = async () => {
    const prompt = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is this employees\'s first name?',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('You must input a name.');
            return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'last_name', 
        message: 'What is this employees\'s last name? ',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('Please input answer.');
            return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'role', 
        message: 'What role id? ',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('Please input answer.');
            return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'manager', 
        message: 'What is the id of this employee\'s manager ',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('Please input answer.');
            return false;
          }
        }
      },
    ])
    const sql =`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES
                  ('${prompt.first_name}', '${prompt.last_name}', ${prompt.role}, ${prompt.manager});`
    db.query(sql, async (err, res) =>{
      if (err) throw err;
      console.table(res);
      runApp();
    })
  };
  
// Update employee 
  const updateAnEmployee = async () => {
    const prompt = await inquirer.prompt([
      {
        type: 'input',
        name: 'employee',
        message: 'What is this employees\'s id?',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('You must input a name.');
            return false;
          }
        }
      },
      {
        type: 'input', 
        name: 'role', 
        message: 'What is this emloyee\'s new role id? ',
        validate: Input => {
          if (Input) {
            return true;
          } else {
            console.log('Please input answer.');
            return false;
          }
        }
      },
    ])
  
    const sql =`UPDATE employee
                SET role_id = ${prompt.role}
                WHERE employee.id = ${prompt.employee};`
    db.query(sql, async (err, res) =>{
      if (err) throw err;
      console.table(res);
      runApp();
    })
  };
  
  
// runapp get options 
  const runApp = () => {
    
    return inquirer 
      .prompt([
        {
          type: 'list',
          name: 'menu',
          message: 'Choose one:',
          choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
        }
      ])
      .then(data => {
        switch (data.menu) {
          case 'View All Departments':
            viewAllDepartments();
            break;
          case 'View All Roles':
            viewAllRoles();
            break;  
          case 'View All Employees':
            viewAllEmployees();
            break; 
          case 'Add A Department':
            addADepartment();
            break; 
          case 'Add A Role':
            addARole();
            break; 
          case 'Add An Employee':
            addAnEmployee();
            break; 
          case 'Update An Employee Role':
            updateAnEmployee();
            break;
          case 'Quit':
            db.end();
            break;
        }
      });
  };
  
  db.connect(err =>{
    if (err) throw err;
    runApp()
  })
  
  
  
  
  
