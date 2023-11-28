import { AuthRepository } from "../repositories/AuthRepository";
import { AuthLogin, AuthRegister, AuthResponse } from "../entities/AuthModel";
import { User } from "../entities/UserModel";
import axios from "../../utils/axios";

export default class AuthUsecase implements AuthRepository {
  async login(request: AuthLogin): Promise<AuthResponse> {
    try {
      const { email, password } = request;
      const { data } = await axios.post<AuthResponse>(`login`, {
        email,
        password,
      });
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async register(request: AuthRegister): Promise<any> {
    try {
      const { name, email, password } = request;
      const { data } = await axios.post<User>(`register`, {
        name,
        email,
        password,
      });
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async logout(): Promise<string> {
    try {
      const { data } = await axios.post<string>(`logout`);
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}
