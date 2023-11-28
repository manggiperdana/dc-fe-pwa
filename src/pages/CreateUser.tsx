import Layout from "../components/Layout";
import UserInputForm from "../components/UserInputForm";
import { User } from "../data/entities/UserModel";
import { useState } from "react";
function CreateUser() {
  const [user] = useState<User>({name:'', email: '', password: ''})
  return (
    <Layout>
      <UserInputForm user={user} type="create" submitLabel="Create user"/>
    </Layout>
  );
}

export default CreateUser;
