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
  ThesisRequestDetail,
  TableReport,
  CreateRequest,
  EditRequest
} from './pages';
export interface RouteData {
  path: string;
  page: ReactNode;
}

export const routes: RouteData[] = [
  {
    path: '/',
    page: <SignIn />,
  },
  {
    path: '/sign-up',
    page: <SignUp />,
  },
  {
    path: '/profile',
    page: <ProfilePage />,
  },
  {
    path: '/thesis',
    page: <ThesisPage />,
  },
  {
    path: '/thesis/:id',
    page: <ThesisDetail />,
  },
  {
    path: '/report',
    page: <TableReport />,
  },
  {
    path: '/thesis/create',
    page: <CreateThesis />,
  },
  {
    path: '/thesis/:id/edit',
    page: <EditThesis />,
  },
  {
    path: '/teachers',
    page: <TeachersPage />,
  },
  {
    path: '/students',
    page: <StudentsPage />,
  },
  {
    path: '/deadline',
    page: <DeadlinePage />,
  },
  {
    path: '/request-thesis',
    page: <RequestThesisPage />,
  },
  {
    path: '/request-thesis/:id',
    page: <ThesisRequestDetail />,
  },
  {
    path: '/request-thesis/:id',
    page: <ThesisRequestDetail />,
  },
  {
    path: '/request-thesis/create',
    page: <CreateRequest />,
  },
  {
    path: '/request-thesis/:id/edit',
    page: <EditRequest />,
  },
  {
    path: '/',
    page: <SignIn />,
  },
  {
    path: '/sign-up',
    page: <SignUp />,
  },
  {
    path: '/profile',
    page: <ProfilePage />,
  },
];
