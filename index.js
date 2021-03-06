// Importing inquirer in-line console manager
var inquirer = require('inquirer');
// Importing file system for write-file functionality 
const fs = require('fs');

// Importing the engineer, intern, and manager classes
const engineer = require('./lib/engineer');
const intern = require('./lib/intern');
const manager = require('./lib/manager');

// Initializing arrays to iterate over inquirer
var diff_Question_Array = ["Office Number", "GitHub Username", "School"];
var diff_Answer_Array = ["1337", `john_doughey`, "University of Washington"];

// Initializing global variables as trackers
var case_Num = 0;
var team_Leader;

// Initializing variable to store the employee objects in an array
var employee_List = [];

// First function 
function init() {
    console.log("\nLaunching the team building generator...");
    prompt_Name("Team Manager");
}

// Function that asks the name of the employee in question - used for future personalized console prompt lines
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
            // Asks for the remainder of the employee information after the name is recieved
            // name is used for personalized inline console prompt lines
            prompt_EmployeeInfo(input_data.employeeName, member_type);
        })
}

// Function that asks for the remainder of the employee info
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
        // Adds the employee to the employee array 
        employee_List.push(add_Employee(employee_Name, input_data, member_type));
        ask_Next();
    })
}

// RECURSIVE function that asks for the next employees
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
            // Recursive if statement, re-calls prompt_Name() that that then calls prompt_EmployeeInfo() that then calls ask_Next() and is back to here
            // print_HTML is the final method to create an index.html file
            (input_data.employeeTypes=="Finish Building Team")?print_HTML():prompt_Name(input_data.employeeTypes);
        })
}

// Function to create and return an employee object based on console data from inquirer
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

// Function that creates the index.html file from the employee array of objects
function print_HTML() {
    // optional function to print the employee information so it's visible in the console
    print_To_Console();
   
    var HTML_String = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" 
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
        crossorigin="anonymous">
    <title>Team Roster</title>
</head>
<body>
    <header class="jumbotron custom_Jumbo bg-danger text-white" style="box-shadow: 10px 10px 5px darkgray">
        <h1 class="display-3 text-center" style="font-weight: bold; text-shadow: 5px 5px 2px darkgrey">Team Roster</h1>
    </header>
    <div class="d-grid container-fluid row justify-content-center card-container">
    `;

    HTML_String += HTML_Card_Writer();

    HTML_String += `
    </div>

    <!-- Link to the JQuery script file -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Link to the personal javascript file -->
    <script src="./index.js"></script>
</body>
</html>`;

    // Writing out the HTML string out to the index.html file
    fs.writeFileSync('./dist/index.html', HTML_String);
}

// Function to print the employee array of objects out to the console
function print_To_Console() {
    console.log(`\nThere are a total of ${employee_List.length-1} employees working under ${team_Leader}'s team`);
    console.log("See the HTML for finalized team profiles... Quick summary of employees below...");

    employee_List.forEach((employee,i) => {
        console.log(`\n-----------------------Employee #${i+1}-----------------------\n`);
        console.log(`Nane of this employee is: ${employee.getName()}`);
        console.log(`Role of this employee is: ${employee.getRole()}`);
        console.log(`ID of this employee is: ${employee.getId()}`);
        console.log(`Email of this employee is: ${employee.getEmail()}`);

        switch(employee.getRole()) {
            case "Manager":
                console.log(`Office number of this team is: ${employee.getOfficeNum()}`);
                break;
            case "Intern":
                console.log(`This employee currently attends ${employee.getSchool()}`);
                break;
            case "Engineer":
                console.log(`GitHub of this employee is: ${employee.getGitHub()}`);
                break;
        }
    });
}

// Function that writes out employee information as a string literal in the HTML language
function HTML_Card_Writer() {
    var card_String = ``;

    employee_List.forEach((employee) => {
        switch(employee.getRole()) {
            case "Manager":
                card_String += `        <!-- Manager ${employee.getName()} -->        
        <div class="card border-primary text-white" style="width: 15rem; margin: 25px; box-shadow: 10px 10px 5px darkgray">
        <div class="card-header bg-primary text-center" style="font-size: 20px; ; text-shadow: 2px 2px 2px black; font-weight: bold">${employee.getName()}</div>
        <div class="card-header bg-primary text-center" style="font-size: 15px; text-shadow: 2px 2px 2px black">${employee.getRole()}</div>
        <div class="card-body bg-alert" data-id="1">
            <h5 class="text-center" style="font-size: 50px">&#127867;</h5>
            <p class="card-text bg-light border text-dark" style="padding: 5px">ID: ${employee.getId()}</p>
            <p class="card-text bg-light border text-dark" style="padding: 5px">Email: <a href="mailto:${employee.getEmail()}" target="_blank">${employee.getEmail()}</a></p>
            <p class="card-text bg-light border text-dark" style="padding: 5px">Office Number: ${employee.getOfficeNum()}</p>
        </div>
        </div>
        `;
            break;
            case "Intern":
                card_String += `        <!-- Intern ${employee.getName()} -->        
        <div class="card border-primary text-white" style="width: 15rem; margin: 25px; box-shadow: 10px 10px 5px darkgray">
        <div class="card-header bg-primary text-center" style="font-size: 20px; ; text-shadow: 2px 2px 2px black; font-weight: bold">${employee.getName()}</div>
        <div class="card-header bg-primary text-center" style="font-size: 15px; text-shadow: 2px 2px 2px black">${employee.getRole()}</div>
        <div class="card-body bg-alert" data-id="1">
            <h5 class="text-center" style="font-size: 50px">&#127891;</h5>
            <p class="card-text bg-light border text-dark" style="padding: 5px">ID: ${employee.getId()}</p>
            <p class="card-text bg-light border text-dark" style="padding: 5px">Email: <a href="mailto:${employee.getEmail()}" target="_blank">${employee.getEmail()}</a></p>
            <p class="card-text bg-light border text-dark" style="padding: 5px">School: ${employee.getSchool()}</p>
        </div>
        </div>
        `;
            break;
            case "Engineer":
                card_String += `        <!-- Engineer ${employee.getName()} -->        
        <div class="card border-primary text-white" style="width: 15rem; margin: 25px; box-shadow: 10px 10px 5px darkgray">
        <div class="card-header bg-primary text-center" style="font-size: 20px; ; text-shadow: 2px 2px 2px black; font-weight: bold">${employee.getName()}</div>
        <div class="card-header bg-primary text-center" style="font-size: 15px; text-shadow: 2px 2px 2px black">${employee.getRole()}</div>
        <div class="card-body bg-alert" data-id="1">
            <h5 class="text-center" style="font-size: 50px">&#128083;</h5>
            <p class="card-text bg-light border text-dark" style="padding: 5px">ID: ${employee.getId()}</p>
            <p class="card-text bg-light border text-dark" style="padding: 5px">Email: <a href="mailto:${employee.getEmail()}" target="_blank">${employee.getEmail()}</a></p>
            <p class="card-text bg-light border text-dark" style="padding: 5px">GitHub: <a href="https://github.com/${employee.getGitHub()}" target="_blank">${employee.getGitHub()}</a></p>
        </div>
        </div>
        `;
            break;
        }
    });

    return card_String;
}

// Calling and Initializing the javascript script here
init();