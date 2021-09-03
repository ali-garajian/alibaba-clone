// Base Models
export enum EUserRoles {
  Standard,
  Admin,
}

// POST /login
export interface ILoginRequest {
  email: string;
  password: string;
}
