class Employee {
    private name: string;
    private project: string;

    constructor(name: string, project: string) {
        this.name = name;
        this.project = project;
    }

    public getName(): string {
        return this.name;
    }

    public getCurrentProject(): string {
        return this.project;
    }
}

class Company {
    private employees: Employee[];

    constructor() {
        this.employees = [];
    }

    public add(employee: Employee): void {
        this.employees.push(employee);
    }

    public getProjectList(): string[] {
        return this.employees.map(e => e.getCurrentProject());
    }

    public getNameList(): string[] {
        return this.employees.map(e => e.getName());
    }
}

class Frontend extends Employee {
    constructor(name: string, project: string) {
        super(name, project);
    }
}

class Backend extends Employee {
    constructor(name: string, project: string) {
        super(name, project);
    }
}

const company: Company = new Company();

const employee1: Employee = new Frontend('Luka', 'Project 1');
const employee2: Employee = new Frontend('Jhon', 'Project 2');
const employee3: Employee = new Backend('Daniel', 'Project 3');
const employee4: Employee = new Backend('James', 'Project 4');

company.add(employee1);
company.add(employee2);
company.add(employee3);
company.add(employee4);

const employeeNames: string[] = company.getNameList();
employeeNames.forEach(n => console.log(n));

const companyProjects: string[] = company.getProjectList();
companyProjects.forEach(p => console.log(p));
