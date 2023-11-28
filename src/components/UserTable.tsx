import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../data/entities/UserModel";
import UserUseCase from "../data/usecases/UserUseCase";
import { useCookies } from "react-cookie";
function UserTable({ users }: { users: User[] | undefined }) {
  const [cookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const UserCase = new UserUseCase();
  const handleDelete = async (userId: number | undefined) => {
    const res = await UserCase.deleteUser(userId, cookie)
    if(res.status === "success") navigate("/")
  }
  return (
    <div className="overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-white border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              #
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr
              key={index}
              className={
                (index + 1) % 2 === 0
                  ? "bg-gray-100 border-b"
                  : "bg-white border-b"
              }
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <NavLink to={`/user/edit/${user.id}`}>Edit</NavLink>
                {user.id !==1 ? <span className="cursor-pointer" onClick={()=> handleDelete(user.id)}> | Delete</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
