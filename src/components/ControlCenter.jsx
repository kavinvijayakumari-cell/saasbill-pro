import { useState, useEffect } from "react";

function ControlCenter() {

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [theme, setTheme] = useState("Light");
  const [notification, setNotification] = useState(true);

  useEffect(() => {

    const data = JSON.parse(localStorage.getItem("settings"));

    if (data) {
      setCompany(data.company);
      setEmail(data.email);
      setCurrency(data.currency);
      setTheme(data.theme);
      setNotification(data.notification);
    }

  }, []);

  function saveSettings() {

    const settings = {
      company,
      email,
      currency,
      theme,
      notification
    };

    localStorage.setItem("settings", JSON.stringify(settings));

    alert("Settings Saved Successfully");
  }

  function resetProject() {

    if(window.confirm("Delete all project data?")){

      localStorage.clear();

      alert("All Data Deleted");

      window.location.reload();

    }

  }

  function exportData(){

    const data = JSON.stringify(localStorage);

    const blob = new Blob([data],{type:"application/json"});

    const link=document.createElement("a");

    link.href=URL.createObjectURL(blob);

    link.download="SaaSBillPro_Backup.json";

    link.click();

  }

  return (

    <div className="tenant-page">

      <h1>Control Center</h1>

      <div className="tenant-form">

        <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e)=>setCompany(e.target.value)}
        />

        <input
        type="email"
        placeholder="Admin Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <select
        value={currency}
        onChange={(e)=>setCurrency(e.target.value)}
        >
          <option>INR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>

        <select
        value={theme}
        onChange={(e)=>setTheme(e.target.value)}
        >
          <option>Light</option>
          <option>Dark</option>
        </select>

      </div>

      <br/>

      <label>

        <input
        type="checkbox"
        checked={notification}
        onChange={()=>setNotification(!notification)}
        />

        Enable Notifications

      </label>

      <br/><br/>

      <button className="save-btn" onClick={saveSettings}>
        Save Settings
      </button>

      <button className="export-btn" onClick={exportData}>
        Export Data
      </button>

      <button className="reset-btn" onClick={resetProject}>
        Reset Project
      </button>

    </div>

  );

}

export default ControlCenter;