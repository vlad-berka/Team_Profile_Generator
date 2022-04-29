//Import the parent class
const employee = require('./employee');

class manager extends employee {
    constructor (name, id, email, office_Num) {
        super (name, id, email);
        this.office_Num = office_Num;
    }

    getRole() {
        console.log(`Role of this employee is "Manager"`);
    }

    getOfficeNum() {
        console.log(`The office number of this manager is "${this.office_Num}"`);
    }
}

module.exports = manager;