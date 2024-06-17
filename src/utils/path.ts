export const createApi = (url: string) => `${url}`;

export class Path {
  static User = class {
    static signIn = createApi('users/login');
    static signUp = createApi('users/signup');
    static resetPassword = createApi('users/resetPassword');
    static confirmation = createApi('users/confirmation');
    static delete = (id: number | string) => createApi(`users/delete?id=${id}`);
  };
  static Faculties = class {
    static getFaculties = createApi("faculties/getFaculties")
    static getDepartaments = (id: number | string) => createApi(`faculties/getDepartments?facultyId=${id}`)
  }
  static Teachers = class { 
    static getMyTeachers = createApi("users/getMyTeachers")
    static getDepartmentsTeachers = (id: number | string) => createApi(`users/getDepartmentTeachers?departmentId=${id}`)
    static chooseTeacher = (id: number | string) => createApi(`users/chooseTeacher?teacherId=${id}`)
    static setDepartmentAdminRole = (id: number | string) => createApi(`users/setDepartmentAdminRole?teacherId=${id}`)
  }
  static Students = class {
    static getMyStudents = createApi("users/getMyStudents")
    static getAllStudets = createApi("users/getAllStudents")
  }
  static Thesis = class {
    static getAll = createApi("Thesis/GetAll")
    static create = createApi("thesis/create")
    static update = createApi("thesis/update")
    static getReport = createApi("thesis/GetReport/")
    static get = (id: number | string) => createApi(`thesis/get?id=${id}`)
    static choose = (id: number | string) => createApi(`thesis/choose?id=${id}`)
    static toggleIsChosenStatus = (id: number | string) => createApi(`thesis/toggleIsChosenStatus?id=${id}`)
    static delete = (id: number | string) => createApi(`thesis/delete?id=${id}`)
  }

  static Requests = class {
    static getAll = createApi("requests/getAll")
    static create = createApi("requests/create")
    static update = createApi("requests/update")
    static get = (id: number | string) => createApi(`requests/get?id=${id}`)
    static apply = (id: number | string) => createApi(`requests/apply?id=${id}`)
    static decline = (id: number | string) => createApi(`requests/decline?id=${id}`)
    static delete = (id: number | string) => createApi(`requests/delete?id=${id}`)
  }
  static Notifications = class {
    static getAll = createApi("notifications/getAll")
    static get = (id: number | string) => createApi(`notifications/get?id=${id}`)
  }
  static Deadlines = class {
    static get = createApi("deadlines/get")
    static create = createApi("deadlines/create")
  }
}
