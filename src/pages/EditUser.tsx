import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import UserInputForm from "../components/UserInputForm";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { User } from "../data/entities/UserModel";
import UserUseCase from "../data/usecases/UserUseCase";
function EditUser() {
  const params = useParams();
  const [user, setUser] = useState<User>({name:'', email: '', password: ''})
  const [cookie] = useCookies(["token"])
  const UserCase = new UserUseCase()
  useEffect(() => {
    
    const fetchData = async () => {
      const res = await UserCase.getUser(params.userId, cookie)
      setUser(res.data)
    }
    fetchData()
  }, [cookie]);
  return (
    <Layout>
      <UserInputForm user={user} type="edit" submitLabel="Update user"/>
    </Layout>
  );
}

export default EditUser;
