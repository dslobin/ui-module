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
var CompanyLocationArray = /** @class */ (function () {
    function CompanyLocationArray() {
        this.employees = [];
    }
    CompanyLocationArray.prototype.addPerson = function (employee) {
        this.employees.push(employee);
    };
    CompanyLocationArray.prototype.getCount = function () {
        return this.employees.length;
    };
    CompanyLocationArray.prototype.getPerson = function (index) {
        return this.employees[index];
    };
    CompanyLocationArray.prototype.getPersons = function () {
        return this.employees;
    };
    return CompanyLocationArray;
}());
var CompanyLocationLocalStorage = /** @class */ (function () {
    function CompanyLocationLocalStorage() {
    }
    CompanyLocationLocalStorage.prototype.addPerson = function (employee) {
        localStorage.setItem('employees', JSON.stringify(employee));
    };
    CompanyLocationLocalStorage.prototype.getCount = function () {
        var employees = this.getPersons();
        return employees.length;
    };
    CompanyLocationLocalStorage.prototype.getPerson = function (index) {
        var employees = this.getPersons();
        return employees[index];
    };
    CompanyLocationLocalStorage.prototype.getPersons = function () {
        var employeesJson = localStorage.getItem('employees');
        return JSON.parse(employeesJson);
    };
    return CompanyLocationLocalStorage;
}());
var Company = /** @class */ (function () {
    function Company(location) {
        this.location = location;
    }
    Company.prototype.addEmployee = function (employee) {
        this.location.addPerson(employee);
    };
    Company.prototype.getProjectList = function () {
        return this.location.getPersons().map(function (e) { return e.getCurrentProject(); });
    };
    Company.prototype.getNameList = function () {
        return this.location.getPersons().map(function (e) { return e.getName(); });
    };
    return Company;
}());
console.log('Information of the first company:');
var locationArray = new CompanyLocationArray();
var company1 = new Company(locationArray);
var employee1 = new Employee('Ann', 'Project 1');
var employee2 = new Employee('Emma', 'Project 2');
var employee3 = new Employee('Daniel', 'Project 3');
var employee4 = new Employee('Tim', 'Project 4');
company1.addEmployee(employee1);
company1.addEmployee(employee2);
company1.addEmployee(employee3);
company1.addEmployee(employee4);
var employeeNames1 = company1.getNameList();
employeeNames1.forEach(function (n) { return console.log(n); });
var companyProjects1 = company1.getProjectList();
companyProjects1.forEach(function (p) { return console.log(p); });
console.log('Information of the second company:');
var locationLocalStorage = new CompanyLocationArray();
var company2 = new Company(locationLocalStorage);
var employee5 = new Employee('Dasha', 'Project 5');
var employee6 = new Employee('Tanya', 'Project 6');
var employee7 = new Employee('Denis', 'Project 7');
var employee8 = new Employee('Egor', 'Project 8');
company2.addEmployee(employee5);
company2.addEmployee(employee6);
company2.addEmployee(employee7);
company2.addEmployee(employee8);
var employeeNames2 = company2.getNameList();
employeeNames2.forEach(function (n) { return console.log(n); });
var companyProjects2 = company2.getProjectList();
companyProjects2.forEach(function (p) { return console.log(p); });
