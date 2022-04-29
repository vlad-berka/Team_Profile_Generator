//Import the parent class
const employee = require('./employee');

class intern extends employee {
    constructor (name, id, email, school_name) {
        super (name, id, email);
        this.school_name = school_name;
    }

    getRole() {
        console.log(`Role of this employee is "Intern"`);
    }

    getSchool() {
        console.log(`This employee currently attends "${this.school_name}"`);
    }
}

module.exports = intern;