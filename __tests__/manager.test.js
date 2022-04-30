const manager = require('../lib/manager.js');

describe ('manager', () => {
    it("should return the correct name when running class.getName()", () => {
        expect(new manager("test_name", "test_ID", "test_email", "test_office_Num").getName()).toBe('test_name');
    });
    it("should return the correct ID when running class.getName()", () => {
        expect(new manager("test_name", "test_ID", "test_email", "test_office_Num").getId()).toBe('test_ID');
    });
    it("should return the correct email when running class.getName()", () => {
        expect(new manager("test_name", "test_ID", "test_email", "test_office_Num").getEmail()).toBe('test_email');
    });
    it("should return the correct GitHub name when running class.getOfficeNum()", () => {
        expect(new manager("test_name", "test_ID", "test_email", "test_office_Num").getOfficeNum()).toBe('test_office_Num');
    });
    it("should return the role 'Employee' when running class.getRole()", () => {
        expect(new manager("test_name", "test_ID", "test_email", "test_office_Num").getRole()).toBe('Manager');
    });
});



