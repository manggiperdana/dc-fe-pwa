import { AuthLogin, AuthRegister, AuthResponse } from "../entities/AuthModel"
import { User } from "../entities/UserModel"

export interface AuthRepository {
    login(request: AuthLogin): Promise<AuthResponse>
    register(request: AuthRegister): Promise<User>
    logout(): Promise<string>
}