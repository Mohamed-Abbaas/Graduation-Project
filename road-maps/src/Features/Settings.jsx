import Input from "../components/Input";
import DashboardHeader from "../components/DashboardHeader";
import SettingsForm from "../components/SettingsForm";
import "./settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
const passwordPlaceholder = "**********";
function Settings() {
  return (
    <div className="settings">
      <DashboardHeader title="Settings" />
      <div className="content">
        <SettingsForm title="Your Account Settings">
          <label for="file">
            <FontAwesomeIcon icon={faImage} className="image-icon" />{" "}
          </label>
          <input type="file" />
          <Input
            id={"name"}
            type="text"
            placeholder="Enter Your Name"
            label="Name"
          />
          <Input
            id={"email"}
            type="email"
            placeholder="admit@email.com"
            label="Email"
          />
        </SettingsForm>
        <hr />
        <SettingsForm>
          <DashboardHeader title="Password" />
          <Input
            id={"curr-pass"}
            type="password"
            placeholder={passwordPlaceholder}
            label="Current Pass"
          />
          <Input
            id={"new-pass"}
            type="password"
            placeholder={passwordPlaceholder}
            label="New Pass"
          />
          <Input
            id={"confirm-pass"}
            type="password"
            placeholder={passwordPlaceholder}
            label="Confirm Pass"
          />
        </SettingsForm>
      </div>
    </div>
  );
}

export default Settings;
