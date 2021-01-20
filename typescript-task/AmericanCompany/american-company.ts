interface IEmployee {
    name: string;
    project: string;

    getName(): string;

    getCurrentProject(): string;
}

class Company {
    employees: IEmployee[];

    constructor() {
        this.employees = [];
    }

    public add(employee: IEmployee): void {
        this.employees.push(employee);
    }

    public getProjectList(): string[] {
        return this.employees.map(e => e.getCurrentProject());
    }

    public getNameList(): string[] {
        return this.employees.map(e => e.getName());
    }
}

class Frontend implements IEmployee {
    name: string;
    project: string;

    constructor(name: string, project: string) {
        this.name = name;
        this.project = project;
    }

    getName(): string {
        return this.name;
    }

    getCurrentProject(): string {
        return this.project;
    }
}

class Backend implements IEmployee {
    name: string;
    project: string;

    constructor(name: string, project: string) {
        this.name = name;
        this.project = project;
    }

    getName(): string {
        return this.name;
    }

    getCurrentProject(): string {
        return this.project;
    }
}

const company: Company = new Company();

const employee1: IEmployee = new Frontend('Luka', 'Project 1');
const employee2: IEmployee = new Frontend('Jhon', 'Project 2');
const employee3: IEmployee = new Backend('Daniel', 'Project 3');
const employee4: IEmployee = new Backend('James', 'Project 4');

company.add(employee1);
company.add(employee2);
company.add(employee3);
company.add(employee4);

const employeeNames: string[] = company.getNameList();
employeeNames.forEach(n => console.log(n));

const companyProjects: string[] = company.getProjectList();
companyProjects.forEach(p => console.log(p));