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
  ThesisRequestDetail
} from './pages';
import { Roles, type RolesType } from './types/model/roles';
export interface RouteData {
  path: string;
  page: ReactNode;
  roles: RolesType[]
}

export const routes: RouteData[] = [

  {
    path: '/',
    page: <SignIn />,
    roles: [undefined],
  },
  {
    path: '/sign-up',
    page: <SignUp />,
    roles: [undefined],
  },
  {
    path: '/profile',
    page: <ProfilePage />,
    roles: [undefined],
  },
  {
    path: '/thesis',
    page: <ThesisPage />,
    roles: [undefined],
  },
  {
    path: '/thesis/:id',
    page: <ThesisDetail />,
    roles: [undefined],
  },
  {
    path: '/thesis/create',
    page: <CreateThesis />,
    roles: [undefined],
  },
  {
    path: '/thesis/:id/edit',
    page: <EditThesis />,
    roles: [undefined],
  },
  {
    path: '/teachers',
    page: <TeachersPage />,
    roles: [undefined],
  },
  {
    path: '/students',
    page: <StudentsPage />,
    roles: [undefined],
  },
  {
    path: '/deadline',
    page: <DeadlinePage />,
    roles: [undefined],
  },
  {
    path: '/request-thesis',
    page: <RequestThesisPage />,
    roles: [undefined],
  },
  {
    path: '/request-thesis/:id',
    page: <ThesisRequestDetail />,
    roles: [undefined],
  }
];
