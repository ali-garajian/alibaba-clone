// Base Models
export enum EUserRoles {
  Standard = 'standard',
  Admin = 'admin',
}

// POST /login
export interface ILoginRequest {
  email: string;
  password: string;
}
