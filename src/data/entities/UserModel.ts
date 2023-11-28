export interface User {
    id?: number,
    name: string,
    email: string,
    password: string,
}
export interface UsersResponse {
    status: string,
    code: number,
    data: User[]
}

export interface UserResponse {
    status: string,
    code: number,
    message: any,
    data: User
}

export interface UserUpdate {
    name: string,
    email: string
}