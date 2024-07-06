import "./settingsForm.css";
function SettingsForm({ children, noButton = false, onSubmit }) {
  return (
    <div className="settings-form">
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
}

export default SettingsForm;
