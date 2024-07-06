import { useState } from "react";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import { unVerified } from "../services/userApi";
import { useLoaderData, useNavigation } from "react-router";
import DashUser from "../components/dashboard/DashUser";

function DashRules() {
  const [toastWord, setToastWord] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  const data = useLoaderData();
  const users = data.data.data.users;
  console.log(users);
  function onShowToast() {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }
  function onToastWord(newWord) {
    setToastWord(newWord);
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dash-users">
          <Toast toastWord={toastWord} showToast={showToast} />
          <div className="users p-20 m-20 bg-white rad-10">
            <h2 className="mt-0 mb-20">Verify Experts</h2>
            <div className="responsive-table">
              <table className="fs-15 w-full">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>File</td>
                    <td>Role</td>
                    <td>Verify</td>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <DashUser
                      rule={true}
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
  const users = await unVerified();
  return users;
}
export default DashRules;
