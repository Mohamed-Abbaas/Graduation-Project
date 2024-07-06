import { useLoaderData, useNavigation } from "react-router";
import { getUsers } from "../services/userApi";
import "./dashUsers.css";
import DashUser from "../components/dashboard/DashUser";
import { useState } from "react";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
function DashUsers() {
  const data = useLoaderData();
  const users = data.data.data.users;
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  const [toastWord, setToastWord] = useState("");
  const [showToast, setShowToast] = useState(false);
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }
  function onToastWord(newWord) {
    setToastWord(newWord);
  }
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dash-users">
          <Toast toastWord={toastWord} showToast={showToast} />
          <div className="users p-20 m-20 bg-white rad-10">
            <h2 className="mt-0 mb-20">Users</h2>
            <div className="responsive-table">
              <table className="fs-15 w-full">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Update</td>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <DashUser
                      user={user}
                      id={user._id}
                      onToastWord={onToastWord}
                      onShowToast={onShowToast}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export async function loader() {
  const data = await getUsers();
  return data;
}
export default DashUsers;
