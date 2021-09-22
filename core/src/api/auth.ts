import { ApiService, ApiResponse } from './_base'
import { ILoginRequest, EUserRoles } from 'types'

export default class AuthApi extends ApiService {
    static async login(req: ILoginRequest): ApiResponse<Record<string, never>> {
        return await this.axios.post('/auth/login', {
            ...req,
            role: EUserRoles.Admin,
        })
    }

    static async logout(): ApiResponse<Record<string, never>> {
        return await this.axios.get('/auth/logout')
    }
}
