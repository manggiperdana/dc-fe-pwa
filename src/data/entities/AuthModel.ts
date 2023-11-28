import { User } from "./UserModel"

export interface AuthResponse {
    status: string,
    code: number,
    user: User,
    token: string,
    type: string,
    response: any,
    message: any,
}

export interface AuthLogin {
    email: string,
    password: string
}

export interface AuthRegister {
    name: string,
    email: string,
    password: string
}