const employee = require('../lib/employee.js');

describe ('employee', () => {
    it("should return the correct name when running class.getName()", () => {
        expect(new employee("test_name", "test_ID", "test_email").getName()).toBe('test_name');
    });
    it("should return the correct ID when running class.getName()", () => {
        expect(new employee("test_name", "test_ID", "test_email").getId()).toBe('test_ID');
    });
    it("should return the correct email when running class.getName()", () => {
        expect(new employee("test_name", "test_ID", "test_email").getEmail()).toBe('test_email');
    });
    it("should return the role 'Employee' when running class.getRole()", () => {
        expect(new employee("test_name", "test_ID", "test_email").getRole()).toBe('Employee');
    });
});



