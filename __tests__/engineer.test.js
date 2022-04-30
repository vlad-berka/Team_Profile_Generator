const engineer = require('../lib/engineer.js');

describe ('engineer', () => {
    it("should return the correct name when running class.getName()", () => {
        expect(new engineer("test_name", "test_ID", "test_email", "test_git_name").getName()).toBe('test_name');
    });
    it("should return the correct ID when running class.getName()", () => {
        expect(new engineer("test_name", "test_ID", "test_email", "test_git_name").getId()).toBe('test_ID');
    });
    it("should return the correct email when running class.getName()", () => {
        expect(new engineer("test_name", "test_ID", "test_email", "test_git_name").getEmail()).toBe('test_email');
    });
    it("should return the correct GitHub name when running class.getGitHub()", () => {
        expect(new engineer("test_name", "test_ID", "test_email", "test_git_name").getGitHub()).toBe('test_git_name');
    });
    it("should return the role 'Employee' when running class.getRole()", () => {
        expect(new engineer("test_name", "test_ID", "test_email", "test_git_name").getRole()).toBe('Engineer');
    });
});



