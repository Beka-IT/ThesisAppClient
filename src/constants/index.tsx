import { IconFolderQuestion, IconHourglassHigh, IconNotes, IconUserPentagon, IconUsers, IconWallpaper } from "@tabler/icons-react"
import { RolesEnum } from "src/types"

type getMenuType = (t: (s: string) => string) => Menu[]

export const getMenu: getMenuType = (t) => {
    return [
        {
            icon: <IconNotes />,
            path: "/thesis",
            title: t("thesis"),
            roles: [
                RolesEnum.DEPARTMENT_ADMIN,
                RolesEnum.TEACHER,
                RolesEnum.STUDENT
            ]
        },
        {
            icon: <IconUserPentagon />,
            path: "/teachers",
            title: t("teachers"),
            roles: [
                RolesEnum.ADMIN,
                RolesEnum.DEPARTMENT_ADMIN,
                RolesEnum.STUDENT
            ]
        },
        {
            icon: <IconUsers />,
            path: "/students",
            title: t("students"),
            roles: [
                RolesEnum.ADMIN,
                RolesEnum.DEPARTMENT_ADMIN,
                RolesEnum.TEACHER
            ]
        },
        {
            icon: <IconHourglassHigh />,
            path: "/deadline",
            title: t("deadline"),
            roles: [RolesEnum.DEPARTMENT_ADMIN]
        },
        {
            icon: <IconFolderQuestion />,
            path: "/request-thesis",
            title: t("request-thesis"),
            roles: [
                RolesEnum.TEACHER,
                RolesEnum.STUDENT
            ]
        },
        {
            icon: <IconWallpaper />,
            path: "/report",
            title: t("report"),
            roles: [
                RolesEnum.TEACHER,
                RolesEnum.STUDENT,
                RolesEnum.DEPARTMENT_ADMIN,
                RolesEnum.ADMIN
            ]
        },
    ]
}