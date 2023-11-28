import { useReducer } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Lock, Email } from "../icons";
import { AuthLayout, InputText, ButtonFull } from "../components";
import AuthUsecase from "../data/usecases/AuthUsecase";
import { useCookies } from "react-cookie";

function Login() {
  const Auth = new AuthUsecase();
  const [error, setError] = useReducer(
    (prevState: any, payload: any) => ({ ...prevState, ...payload }),
    { auth: "", email: "", password: "" }
  );
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError({ auth: "", email: "", password: "" });
    const { email, password } = e.target;
    const post = { email: email.value, password: password.value };
    const res = await Auth.login(post);

    if (res.status === "error") {
      if (res.code === 403 && res.message.hasOwnProperty("password"))
        setError({ password: res.message.password[0] });
      if (res.code === 403 && res.message.hasOwnProperty("email"))
        setError({ email: res.message.email[0] });
      if (res.code === 401) setError({ auth: res.message });
    } else {
      setCookie("token", res.token, { path: "/" });
      navigate("/");
    }
  };
  
  return (
    <AuthLayout>
      <form className="bg-white w-3/4" onSubmit={handleSubmit}>
        <h1 className="text-gray-800 font-bold text-2xl mb-1">Login</h1>
        <p>Default user </p>
        <p className="mb-4">email:admin@admin.com, pass:123456</p>
        {error.auth !== "" ? (
          <p className="text-sm text-red-500">{error.auth}</p>
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
        <ButtonFull title="Login" type="submit" />
        <NavLink to="/register">
          <ButtonFull title="Register" type="button" />
        </NavLink>
      </form>
    </AuthLayout>
  );
}

export default Login;
