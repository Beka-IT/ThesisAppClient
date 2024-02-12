declare type HeadCell<E> = {
    label: string;
    sort?: string;
    display?: boolean;
    render?: (entity: E) => ReactNode;
    afterRender?: Boolean;
};


declare type User = {
    fullname: TitleType;
    age: number;
    faculty: TitleType;
    departament: TitleType;
    email: string;
    phoneNumber: string;
    patronomyc: string;
}
declare type UserResponse = {
    id?: number;
    fullname?: TitleType;
    age?: number;
    facultyId?: number;
    departamentId?: number;
    email?: string;
    phoneNumber?: string;
    patronomyc?: TitleType;
}
declare type UserForm = {
    fullnameKg?: string;
    fullnameTr?: string;
    age?: number;
    facultyId?: number;
    departamentId?: number;
    email?: string;
    phoneNumber?: string;
    patronomycKg?: string;
    patronomycTr?: string;
}
declare type TitleType = {
    titleKg: string;
    titleTr: string
}