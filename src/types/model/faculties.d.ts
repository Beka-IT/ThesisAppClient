declare type Faculties = {
    id: number,
    title: string;
    departments: null,
    students: null
}


declare type Departments = {
    id: number,
    title: string,
    facultyId: number,
    faculty: null,
    students: null
}