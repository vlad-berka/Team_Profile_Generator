class employee {
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email
    }

    getName() {
        // console.log(`Name of this employee is ${this.name}`);
        return this.name;
    }

    getId() {
        // console.log(`ID of this employee is ${this.id}`);
        return this.id;
    }

    getEmail() {
        // console.log(`Email of this employee is ${this.email}`);
        return this.email;
    }

    getRole() {
        // console.log(`Role of this employee is "Employee"`);
        return "Employee";
    }
}

module.exports = employee;