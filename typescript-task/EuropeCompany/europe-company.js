var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = /** @class */ (function () {
    function Employee(name, project) {
        this.name = name;
        this.project = project;
    }
    Employee.prototype.getName = function () {
        return this.name;
    };
    Employee.prototype.getCurrentProject = function () {
        return this.project;
    };
    return Employee;
}());
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
var Frontend = /** @class */ (function (_super) {
    __extends(Frontend, _super);
    function Frontend(name, project) {
        return _super.call(this, name, project) || this;
    }
    return Frontend;
}(Employee));
var Backend = /** @class */ (function (_super) {
    __extends(Backend, _super);
    function Backend(name, project) {
        return _super.call(this, name, project) || this;
    }
    return Backend;
}(Employee));
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
