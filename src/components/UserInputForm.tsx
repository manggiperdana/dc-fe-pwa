import { useReducer, useState } from "react";
import { Lock, Email, User } from "../icons";
import { InputText, ButtonFull } from "../components";
import UserUseCase from "../data/usecases/UserUseCase";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { User as UserModel } from "../data/entities/UserModel";

function UserInputForm({ user, type, submitLabel }: { user: UserModel, type: string, submitLabel: string }) {
  const UserCase = new UserUseCase();
  const [error, setError] = useReducer(
    (prevState: any, payload: any) => ({ ...prevState, ...payload }),
    { name: "", email: "", password: "" }
  );
  const [success, setSuccess] = useState(false);
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError({ name: "", email: "", password: "" });
    const { name, email, password } = e.target;
    const post = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    const res = type === "create" ? await UserCase.createUser(post, cookie): await UserCase.updateUser(user.id, post, cookie);

    if (res.status === "error") {
      if (res.code === 403 && res.message.hasOwnProperty("name"))
        setError({ name: res.message.name[0] });
      if (res.code === 403 && res.message.hasOwnProperty("password"))
        setError({ password: res.message.password[0] });
      if (res.code === 403 && res.message.hasOwnProperty("email"))
        setError({ email: res.message.email[0] });
    }
    if (res.status === "success"){
      setSuccess(true)
      navigate("/")
    } 
      
  };
  return (
    <div className="lg:w-1/2">
      <form className="bg-white" onSubmit={handleSubmit}>
        {success ? (
          <p className="text-green-500">
            User registered back to login to access it
          </p>
        ) : null}
        <InputText name="name" placeholder="Name" type="text" icon={<User />} value={user.name} />
        {error.name !== "" ? (
          <p className="text-sm text-red-500">{error.name}</p>
        ) : null}
        <InputText
          name="email"
          placeholder="Email"
          type="text"
          icon={<Email />}
          value={user.email}
        />
        {error.email !== "" ? (
          <p className="text-sm text-red-500">{error.email}</p>
        ) : null}
        <InputText
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          value={user.password}
        />
        {error.password !== "" ? (
          <p className="text-sm text-red-500">{error.password}</p>
        ) : null}
        <ButtonFull title={submitLabel} type="submit" />
        <NavLink to="/">
          <ButtonFull title="Back" type="button" />
        </NavLink>
      </form>
    </div>
  );
}

export default UserInputForm;
