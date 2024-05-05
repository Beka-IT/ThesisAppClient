export enum Roles {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}

export type RolesType = Roles.ADMIN | Roles.STUDENT | Roles.SUPER_ADMIN | Roles.TEACHER | undefined