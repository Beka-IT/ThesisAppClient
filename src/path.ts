export const baseApi = (url: string) => `api/v1/${url}`;

export class Path {
  static Auth = class {
    static signIn = baseApi('auth/login');
    static signOut = baseApi('auth/logout');
    static refreshToken = baseApi('auth/refresh/token');
  };
}
