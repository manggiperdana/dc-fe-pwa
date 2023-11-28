import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { NavIcon, LogoutIcon, BurgerIcon } from "../icons";
function Layout({ children }: { children: any }) {
  const [, , removeCookie] = useCookies(["token"]);
  const nav = useNavigate();
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    nav("/login");
  };
  return (
    <div>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-gradient-to-tr from-blue-800 to-purple-700 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <h5 className="hidden mt-4 text-center text-xl font-semibold text-slate-300 lg:block">
              Welcome
            </h5>
          </div>

          <div className="mt-8 text-center">
            <img
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            <li>
              <div className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400">
                <NavIcon />
                <span className="-mr-1 font-medium">User Manager</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-slate-300 group">
            <LogoutIcon />
            <span className="group-hover:text-slate-300" onClick={handleLogout}>
              Logout
            </span>
          </button>
        </div>
      </aside>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
        <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
          <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">
              User App Info
            </h5>
            <button className="w-12 h-16 -mr-2 border-r lg:hidden">
              <BurgerIcon />
            </button>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                aria-label="notification"
                className="w-20 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 lg:hidden"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 pt-6 2xl:container">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
