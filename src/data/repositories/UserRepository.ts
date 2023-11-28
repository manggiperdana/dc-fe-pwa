import {UserUpdate, UsersResponse, UserResponse} from "../entities/UserModel";

export interface UserRepository {
    getUsers(cookie: any): Promise<UsersResponse>
    getUser(userId: string, cookie:any): Promise<UserResponse>
    updateUser(userId: number, request: UserUpdate, cookie: any): Promise<UserResponse>
    deleteUser(userId: number, cookie: any): Promise<UserResponse>
}