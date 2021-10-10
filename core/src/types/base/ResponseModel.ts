export interface IResponseModel<T = any> {
    msg?: string
    data?: T
}

export type EmptyResponse = Record<string, never>
