const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// var connection = require("./connection")
 var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employee_trackerDB", 
});

// connection.connect(function (err) {
//   if (err) throw err;
//   runApp();
// });
connection.connect(function (err){
  if (err) throw err;
  runApp()
  console.log("connected as id" + connection.threadId);
});

const  roleArr = [];
const  managersArr = [];
const  employeeArr = [];
const  departmentArr = [];
const runApp = () => {
  // fetchEmployees();
  // fetchRoles();
  // fetchManagers();
  // fetchDepts();
  //inquirer prompts
  inquirer
    .prompt([{
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "Add a department",
        "View all employees",
        "Add an employee",
        "Add a role",
        "View a role",
        "Employee Options",
        "End",
      ],
  
    },
   
    

    ]).then(function (answers){ 
      if(answers.action=="View all employees"){
        viewEmployees()
      }
      console.log(answers)
      if(answers.action=="Add an employee"){
        addEmployee()
      }
      if(answers.action=="View all departments"){
        // connection.query("SELECT * FROM department;", (err, res) => {
        //   if (err) throw err;
        //   console.table(res);
        //   runApp();
        // });
        viewDepartments()
      }
      if(answers.action== "View a role"){
        // connection.query("select * from role;",(err,res)=> {
        //      if (err) throw err;
        //      console.table(res);
        //      runApp();
        // })
        viewRole()
      }
      if(answers.action=="Add a role"){
        addRole()
      }
    })
  }



// // ** Department functions **
// const getDepts = () => {
//   connection.query(
//     "SELECT * FROM department",
//     (err, res) => {
//       if (err) throw err;
//       res.forEach((department) => {
//         departmentArr.push({
//           name: `${department.name}`,
//           value: department.id,
//         });
//       });
//     }
//   );
// };

const viewDepartments = () => {
  connection.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.log(`\nDepartments:\n`);
    console.table(res);
    runApp();
  });
};
const viewRole = () => {
  connection.query("select * from role;",(err,res)=> {
    if (err) throw err;
    console.table(res);
    runApp();
});
};
const addRole = ()=> {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary?",
      },
      {
        name: "department_id",
        type: "list",
        message: "What is the role's department?",
        choices: [1,2,3,4],
      },
    ])
    .then((data) => {
  connection.query("insert into role (title,salary,department_id) values (?,?,?)",[data.title,data.salary,data.department_id],(err,res)=> {
    if (err) throw err;
    console.table(res);
    runApp();
});
})
};

// const addDepartment = () => {
//   // prompt user to enter new department info
//   inquirer
//     .prompt([
//       {
//         name: "name",
//         type: "input",
//         message: "What is the department's name?",
//       },
//     ])
//     .then((res) => {
//       connection.query(
//         "INSERT INTO department SET ? ",
//         {
//           name: res.name,
//         },
//         (err) => {
//           if (err) throw err;
//           console.log(`\nNew Department added! Values are:\n`);
//           console.table(res);
//           runApp();
//         }
//       );
//     });
// };



// function departmentBudget() {
//   inquirer
//     .prompt([
//       {
//         name: "name",
//         type: "input",
//         message: "What is the department's name?",
//         choices: departmentNames(),
//       },
//     ]).then((res) => {
//       connection.query(
//         "SELECT"
//       )
//     })
// }

// ** Role functions **
// view roles in a table

// push roles into the roleArr
// const getRoles = () => {
//   connection.query("SELECT * FROM role;", (err, res) => {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       roleArr.push(res[i].title);
//     }
//   });
// };

const addRoles = () => {
  // prompt user to enter new role
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role's title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary?",
      },
      {
        name: "department_id",
        type: "list",
        message: "What is the role's department?",
        choices: departmentArr,
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO role SET ? ",
        {
          title: res.title,
          salary: res.salary,
          department_id: res.department_id,
        },
        (err) => {
          if (err) throw err;
          console.log(`\nNew Role added! Values are:\n`);
          console.table(res);
          runApp();
        }
      );
    });
};

// Employee functions 
const viewEmployees = () => {
  connection.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.log(`\nEmployees:\n`);
    console.table(res);
    runApp();
  });
};

const addEmployee = () => {
  // prompt user to enter new employee info
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employees's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employees's job title?",
        choices:[1,2,3]
      },
      {
        name: "managerChoice",
        type: "list",
        message:
          "Which manager does the employee report to?",
        choices: [1,2,3]
      },
    ])
    .then((res) => {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        // for roles and managers, we get the index value of their appropriate arr and add 1 to get the actual id number
        [
          res.firstName,
          res.lastName,
          res.role,
          (res.managerChoice)
        ],
        (err, res) => {
          if (err) throw err;
          console.log(`\nEmployee added!\n`);
          runApp();
        }
      );
    });
};

// const viewEmployees =  {(inquirer
//   .prompt([
//     {
//       name: "managerChoice",
//       type: "list",
//       message: "Which manager?",
//       choices: ["Mike","John","Bill"]
//     },
//   ])
// )s
  
// )}
  
      
//         .then((val) => {
//           connection.query(
//             // we need to join the string of val.role_id to the titles in the role db, getting the role unique id,
//             // and then returning that id to the employee db to update the employee's role
//             //
//             // We should be able to do this by matching the string to the role title, grabbing the unique id,
//             // then pushing that to the employee db as the role value
//             `UPDATE employee 
//             SET role_id = (SELECT id FROM role WHERE title=? )
//             WHERE last_name=?`,
//             [val.role_id, val.employee_choice],
//             (err, res) => {
//               if (err) throw err;
//               console.log(`\nEmployee updated!\n`);
//               runApp();
//             }
//           );
//         });
//     }
//   );
// };
