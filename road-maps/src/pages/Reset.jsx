import Button from "../components/Button";
import ValidImage from "../components/ValidImage";
import "./reset.css";
function Reset() {
  return (
    <div className="reset container">
      <div className="left">
        <h2>Reset Your Password</h2>
        <p>
          The Verification Code Will Be Sent To The Mailbox. <br /> Please Check
          It
        </p>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Code" />
        <Button type="blue" link="back to log in?" to="/login">
          Confirm
        </Button>
      </div>
      <ValidImage src="../../public/login.jpg" />
    </div>
  );
}

export default Reset;
