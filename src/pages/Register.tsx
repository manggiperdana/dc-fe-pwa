import { useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { Lock, Email, User } from "../icons";
import { AuthLayout, InputText, ButtonFull } from "../components";
import AuthUsecase from "../data/usecases/AuthUsecase";

function Register() {
  const Auth = new AuthUsecase();
  const [error, setError] = useReducer(
    (prevState: any, payload: any) => ({ ...prevState, ...payload }),
    { name: "", email: "", password: "" }
  );
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError({ name: "", email: "", password: "" });
    const { name, email, password } = e.target;
    const post = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    const res = await Auth.register(post);

    if (res.status === "error") {
      if (res.code === 403 && res.message.hasOwnProperty("name"))
        setError({ name: res.message.name[0] });
      if (res.code === 403 && res.message.hasOwnProperty("password"))
        setError({ password: res.message.password[0] });
      if (res.code === 403 && res.message.hasOwnProperty("email"))
        setError({ email: res.message.email[0] });
    }
    if(res.status === "success")
      setSuccess(true)
  };
  return (
    <AuthLayout>
      <form className="bg-white w-3/4" onSubmit={handleSubmit}>
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Register</h1>
        {success ? <p className="text-green-500">User registered back to login to access it</p>: null}
        <InputText name="name" placeholder="Name" type="text" icon={<User />} value=""/>
        {error.name !== "" ? (
          <p className="text-sm text-red-500">{error.name}</p>
        ) : null}
        <InputText
          name="email"
          placeholder="Email"
          type="text"
          icon={<Email />}
          value=""
        />
        {error.email !== "" ? (
          <p className="text-sm text-red-500">{error.email}</p>
        ) : null}
        <InputText
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          value=""
        />
        {error.password !== "" ? (
          <p className="text-sm text-red-500">{error.password}</p>
        ) : null}
        <ButtonFull title="Register" type="submit" />
        <NavLink to="/login">
          <ButtonFull title="Login" type="button" />
        </NavLink>
      </form>
    </AuthLayout>
  );
}

export default Register;
