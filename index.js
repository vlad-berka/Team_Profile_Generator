var inquirer = require('inquirer');
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');
const manager = require('./lib/manager');

var diff_Question_Array = ["Office Number", "GitHub Username", "School"];
var diff_Answer_Array = ["1337", `john_doughey`, "University of Washington"];

var case_Num = 0;
var team_Leader;

var employee_List = [];
var employeeType_List = [];

function init() {
    console.log("\nLaunching the team building generator...");
    prompt_Name("Team Manager");
}

function prompt_Name(member_type) {
    inquirer
    .prompt([
        {
            type: 'input',
            message: `\nWhat is the ${member_type}'s name?\n`,
            name: "employeeName",
            default: `John Doe ${employee_List.length+1}`
        }
        ]).then((input_data) => {
            if (!team_Leader) {
                team_Leader = input_data.employeeName;
            }
            prompt_EmployeeInfo(input_data.employeeName, member_type);
        })
}

function prompt_EmployeeInfo(employee_Name, member_type) {
    if(member_type=="Engineer"){
        case_Num=1;
    } else if (member_type=="Intern" ) {
        case_Num=2;
    } else {
        case_Num = 0;
    }

    inquirer
    .prompt([
        {
            type: 'input',
            message: `\nWhat is ${employee_Name}'s (${member_type}) ID number?\n`,
            name: "employeeID",
            default: `N.00${employee_List.length+1}`
        },
        {
            type: 'input',
            message: `\nWhat is ${employee_Name}'s (${member_type}) email ?\n`,
            name: "employeeEmail",
            default: `${employee_Name.replace(/ /gi, "_")}@UW_Bootcamp.org`
        },
        {
            type: 'input',
            message: `\nWhat is the ${employee_Name}'s (${member_type}) ${diff_Question_Array[case_Num]} ?\n`,
            name: "diff_Question",
            default: `${diff_Answer_Array[case_Num]}`
        },
    ]).then((input_data) => {
        employeeType_List.push(member_type);
        employee_List.push(add_Employee(employee_Name, input_data, member_type));
        ask_Next();
    })
}

function ask_Next() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: `\nWhich of the following employee types do you wish to add to ${team_Leader}'s team?\n`,
                name: 'employeeTypes',
                choices: ["Engineer", "Intern", "Finish Building Team"],
                default: "Finish Building Team"
            }
        ]).then((input_data) => {
            (input_data.employeeTypes=="Finish Building Team")?print_HTML():prompt_Name(input_data.employeeTypes);
        })
}

function print_HTML() {
    console.log(`\nThere are a total of ${employee_List.length-1} employees working under ${team_Leader}'s team`);
    console.log("See the HTML for finalized team profiles... Quick summary of employees below...");

    employee_List.forEach( (employee,i) => {
        console.log(`\n-----------------------Employee #${i+1}-----------------------\n`);
        employee.getName();
        employee.getRole();
        employee.getId();
        employee.getEmail();

        switch(employeeType_List[i]) {
            case "Team Manager":
                employee.getOfficeNum();
                break;
            case "Intern":
                employee.getSchool();
                break;
            case "Engineer":
                employee.getGitHub();
                break;
        }
    });
}

function add_Employee(employee_Name, input_data, member_type) {
    switch (member_type) {
        case "Engineer":
            console.log("\nCreating Engineer Class-Object with the data above...\n");
            return new engineer(employee_Name, input_data.employeeID, input_data.employeeEmail, input_data.diff_Question);
        case "Intern":
            console.log("\nCreating Intern Class-Object with the data above...\n");
            return new intern(employee_Name, input_data.employeeID, input_data.employeeEmail, input_data.diff_Question);
        case "Team Manager":
            console.log("\nCreating Manager Class-Object with the data above...\n");
            return new manager(employee_Name, input_data.employeeID, input_data.employeeEmail, input_data.diff_Question);
    }
}

init();