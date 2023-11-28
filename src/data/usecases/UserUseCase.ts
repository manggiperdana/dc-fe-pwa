import { UserRepository } from "../repositories/UserRepository";
import { UserUpdate, UserResponse, UsersResponse } from "../entities/UserModel";
import axios from "../../utils/axios";

export default class UserUseCase implements UserRepository {
  async createUser(request: any, cookie: any): Promise<UserResponse> {
    try {
      const { name, email, password } = request;
      const { data } = await axios.post<UserResponse>(
        `user`,
        { name, email, password },
        {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        }
      );
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async getUsers(cookie: any): Promise<UsersResponse> {
    try {
      const { data } = await axios.get<UsersResponse>(`user`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      });
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async getUser(userId: string | undefined, cookie: any): Promise<UserResponse> {
    try {
      const { data } = await axios.get<UserResponse>(`user/${userId}`,{
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      });
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async updateUser(userId: number | undefined, request: UserUpdate, cookie: any): Promise<UserResponse> {
    try {
      const {name, email} = request
      const { data } = await axios.put<UserResponse>(`user/${userId}`,{ name, email },{
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      });
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
  async deleteUser(userId: number | undefined, cookie: any): Promise<UserResponse> {
    try {
      const { data } = await axios.delete<UserResponse>(`user/${userId}`,{
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      });
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
}
