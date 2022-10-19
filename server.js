const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');


// Start server after DB connection
const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'franklin1234',
  database: 'employees'
});

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewAllDepartments = () => {
  const sql =`SELECT * FROM department`
  db.query(sql, (err, res) =>{
    if (err) throw err;
    console.table(res);
    runApp();
  })
};

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
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

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
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

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
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

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
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

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
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

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
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


// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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
// GIVEN a command-line application that accepts user input




