import { ReactNode } from 'react';
import {
  DeadlinePage,
  SignIn,
  SignUp,
  StudentsPage,
  TeachersPage,
  ThesisPage,
  ProfilePage,
  RequestThesisPage,
  ThesisDetail,
  CreateThesis,
  EditThesis,
  RequestDetail,
  CreateRequest,
  EditRequest
} from './pages';
import { RolesEnum } from './types';
export interface RouteData {
  path: string;
  page: ReactNode;
  roles: Roles[]
}

export const routes: RouteData[] = [
  {
    path: '/thesis',
    page: <ThesisPage />,
    roles: [
      RolesEnum.DEPARTMENT_ADMIN,
      RolesEnum.TEACHER,
      RolesEnum.STUDENT,],
  },
  {
    path: '/thesis/:id',
    page: <ThesisDetail />,
    roles: [
      RolesEnum.DEPARTMENT_ADMIN,
      RolesEnum.TEACHER,
      RolesEnum.STUDENT],
  },
  {
    path: '/thesis/create',
    page: <CreateThesis />,
    roles: [RolesEnum.TEACHER],
  },
  {
    path: '/thesis/:id/edit',
    page: <EditThesis />,
    roles: [RolesEnum.TEACHER],
  },
  {
    path: '/teachers',
    page: <TeachersPage />,
    roles: [
      RolesEnum.ADMIN,
      RolesEnum.DEPARTMENT_ADMIN,
      RolesEnum.STUDENT],
  },
  {
    path: '/students',
    page: <StudentsPage />,
    roles: [
      RolesEnum.ADMIN,
      RolesEnum.DEPARTMENT_ADMIN,
      RolesEnum.TEACHER
    ],
  },
  {
    path: '/deadline',
    page: <DeadlinePage />,
    roles: [RolesEnum.DEPARTMENT_ADMIN],
  },
  {
    path: '/request-thesis',
    page: <RequestThesisPage />,
    roles: [
      RolesEnum.TEACHER,
      RolesEnum.STUDENT
    ],
  },
  {
    path: '/request-thesis/:id',
    page: <RequestDetail />,
    roles: [
      RolesEnum.TEACHER,
      RolesEnum.STUDENT
    ],
  },
  {
    path: '/request-thesis/create',
    page: <CreateRequest />,
    roles: [RolesEnum.STUDENT],
  },
  {
    path: '/request-thesis/:id/edit',
    page: <EditRequest />,
    roles: [RolesEnum.STUDENT],
  },
  {
    path: '/',
    page: <SignIn />,
    roles: [RolesEnum.ADMIN,
    RolesEnum.DEPARTMENT_ADMIN,
    RolesEnum.STUDENT,
    RolesEnum.TEACHER,
      undefined],
  },
  {
    path: '/sign-up',
    page: <SignUp />,
    roles: [
      RolesEnum.ADMIN,
      RolesEnum.DEPARTMENT_ADMIN,
      RolesEnum.STUDENT,
      RolesEnum.TEACHER,
      undefined],
  },
  {
    path: '/profile',
    page: <ProfilePage />,
    roles: [
      RolesEnum.ADMIN,
      RolesEnum.DEPARTMENT_ADMIN,
      RolesEnum.STUDENT,
      RolesEnum.TEACHER,],
  },
];
