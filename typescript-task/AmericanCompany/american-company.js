var Company = /** @class */ (function () {
    function Company() {
        this.employees = [];
    }
    Company.prototype.add = function (employee) {
        this.employees.push(employee);
    };
    Company.prototype.getProjectList = function () {
        return this.employees.map(function (e) { return e.getCurrentProject(); });
    };
    Company.prototype.getNameList = function () {
        return this.employees.map(function (e) { return e.getName(); });
    };
    return Company;
}());
var Frontend = /** @class */ (function () {
    function Frontend(name, project) {
        this.name = name;
        this.project = project;
    }
    Frontend.prototype.getName = function () {
        return this.name;
    };
    Frontend.prototype.getCurrentProject = function () {
        return this.project;
    };
    return Frontend;
}());
var Backend = /** @class */ (function () {
    function Backend(name, project) {
        this.name = name;
        this.project = project;
    }
    Backend.prototype.getName = function () {
        return this.name;
    };
    Backend.prototype.getCurrentProject = function () {
        return this.project;
    };
    return Backend;
}());
var company = new Company();
var employee1 = new Frontend('Luka', 'Project 1');
var employee2 = new Frontend('Jhon', 'Project 2');
var employee3 = new Backend('Daniel', 'Project 3');
var employee4 = new Backend('James', 'Project 4');
company.add(employee1);
company.add(employee2);
company.add(employee3);
company.add(employee4);
var employeeNames = company.getNameList();
employeeNames.forEach(function (n) { return console.log(n); });
var companyProjects = company.getProjectList();
companyProjects.forEach(function (p) { return console.log(p); });
