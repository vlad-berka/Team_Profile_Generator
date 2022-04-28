var inquirer = require('inquirer');

var team_Leader = "";
var console_Out_Message = "Starting with team leader: initializing..."
var type_Array = [];
var message_Array = [];
var name_Array = [];
var default_Array = [];
var run_ID = ["Team_Manager", "Engineer", "Intern"];

var task_list = [];

function init() {
    console.log("Starting with team leader: initializing... \n");
    inquirer
        .prompt([
            {
                type: 'input',
                message: "\nWhat is the team manager's name?\n",
                name: 'employeeName',
            },
            {
                type: 'input',
                message: "\nWhat is the team manager's employee ID?\n",
                name: 'employeeID',
            },
            {
                type: 'input',
                message: "\nWhat is the team manager's employee email address?\n",
                name: 'employeeEmail',
            },
            {
                type: 'input',
                message: "\nWhat is the team manager's office number?\n",
                name: 'employeeEmail',
            }
        ]).then((input_data) => {
            team_Leader = input_data.employeeName;
            ask_Next();
        }).then((input_data) => {
            next_Member();
        })
}

function ask_Next() {
    console.log("\nBuilding team... \n");
    inquirer
        .prompt([
            {
                type: 'list',
                message: `\nWhich of the following employee types do you wish to add to${team_Leader}'s team?\n`,
                name: 'employeeTypes',
                choices: ["Engineer", "Intern", "Finish_Building_Team"],
                default: "Finish_Building_Team"
            }
        ]).then((input_data) => {
            (input_data.employeeTypes!=="Finish_Building_Team")?print_HTML():next_Member();
        })
}

function next_Member() {
    console.log(out_message + '\n');
    inquirer
        .prompt([
            {
                type: 'list',
                message: '\n ?\n',
                name: 'licenses',
                choices: ["MIT", "Unlicense"],
                default: "MIT"
            }
        ]).then((input_data) => {

        })
}

function print_HTML() {

}