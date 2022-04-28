var inquirer = require('inquirer');

var diff_Question_Array = ["Office Number", "GitHub Username", "School"];
var diff_Answer_Array = ["1337", `john_doughey`, "University of Washington"];

var case_Num = 0;
var employeeCount = 1;
var team_Leader;

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
            default: `John Doe ${employeeCount}`
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
            default: `00${employeeCount}`
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
        employeeCount++;
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
    console.log(`\nThere are a total of ${employeeCount-2} employees working under ${team_Leader}'s team`);
    console.log("See the HTML for finalized team profiles")
}

init();