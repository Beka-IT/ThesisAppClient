declare type AuthRequest = {
    email: string;
    password: string;
}

declare type AuthResponse = {
    name: string;
    token: string;

}

declare type Profile = {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    patronomyc: string;
    facultyId: number;
    departmentId: number;
    isVerified: boolean;
    phoneNumber; string;
    role: number;
    token: string;
    deadline: Date | string;
    chosenThesisId: null;
    unreadNotificationsCount: number;
}


declare type Menu = {
    title: string;
    icon: any;
    path: string
}

declare type RegistrationType = {
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    patronomyc: string,
    facultyId: number | null,
    departmentId: number | null,
    phoneNumber: string,
}


declare type ResetPasswordRequest = {
    oldPassword: string;
    newPassword: string;
    repeatPassword: string;
}

declare type ConfirmationRequest = {
    email?: string | null;
    code: string
}