import { NavLink, useLocation } from "react-router-dom";
import { Layout, Button, UserTable } from "../components";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import UserUseCase from "../data/usecases/UserUseCase";
import { User } from "../data/entities/UserModel";

function Dashboard() {
  const [users, setUsers] = useState<User[]>()
  const [cookie] = useCookies(["token"])
  const location = useLocation()
  
  useEffect(() => {
    const UserCase = new UserUseCase()
    const fetchData = async () => {
      
      const res = await UserCase.getUsers(cookie)
      setUsers(res.data)
    }
    fetchData()
  }, [location.key, cookie]);

  return (
    <Layout>
      <NavLink to="/user/create">
        <Button title="Create User" />
      </NavLink>
      <UserTable users={users}/>
    </Layout>
  );
}

export default Dashboard;
