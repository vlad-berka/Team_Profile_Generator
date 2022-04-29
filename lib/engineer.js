//Import the parent class
const employee = require('./employee');

class engineer extends employee {
    constructor (name, id, email, GitHub_name) {
        super (name, id, email);
        this.GitHub_name = GitHub_name;
    }

    getRole() {
        console.log(`Role of this employee is "Engineer"`);
    }

    getGitHub() {
        console.log(`GitHub name of this employee is ${this.GitHub_name}`);
    }
}

module.exports = engineer;