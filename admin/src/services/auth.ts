import { ApiService, ApiResponse } from './_base';
import { ILoginRequest, EUserRoles } from 'types/models/Auth';

export default class AuthApi extends ApiService {
  static async login(req: ILoginRequest): ApiResponse<{}> {
    return await this.axios.post('/auth/login', {
      ...req,
      role: EUserRoles.Admin,
    });
  }

  static async logout(): ApiResponse<{}> {
    return await this.axios.get('/auth/logout');
  }
}
