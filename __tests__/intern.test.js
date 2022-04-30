const intern = require('../lib/intern.js');

describe ('intern', () => {
    it("should return the correct name when running class.getName()", () => {
        expect(new intern("test_name", "test_ID", "test_email", "test_school").getName()).toBe('test_name');
    });
    it("should return the correct ID when running class.getName()", () => {
        expect(new intern("test_name", "test_ID", "test_email", "test_school").getId()).toBe('test_ID');
    });
    it("should return the correct email when running class.getName()", () => {
        expect(new intern("test_name", "test_ID", "test_email", "test_school").getEmail()).toBe('test_email');
    });
    it("should return the correct GitHub name when running class.getGitHub()", () => {
        expect(new intern("test_name", "test_ID", "test_email", "test_school").getSchool()).toBe('test_school');
    });
    it("should return the role 'Employee' when running class.getRole()", () => {
        expect(new intern("test_name", "test_ID", "test_email", "test_school").getRole()).toBe('Intern');
    });
});



