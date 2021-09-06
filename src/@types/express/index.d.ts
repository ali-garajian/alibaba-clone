import { Request } from 'express';
import { EUserRoles, IUser } from '@entities/User';
import { IClientData } from '@shared/JwtService';

export type AdminRequest<
  Params = any,
  ResBody = any,
  ReqBody extends Record<string, unknown> = Record<string, never>,
  Queries = any
> = Request<
  Params,
  ResBody,
  ReqBody & {
    user: IUser;
    email: string;
    password: string;
    role: EUserRoles;
  },
  Queries
>;

// declare module 'express' {
//   export interface Request {
//     body: {
//       user: IUser;
//       email: string;
//       password: string;
//       role: EUserRoles;
//     };
//   }
// }

declare global {
  namespace Express {
    export interface Response {
      sessionUser: IClientData;
    }
  }
}
