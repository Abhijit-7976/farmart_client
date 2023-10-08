import axios from "axios";
import { useEffect, useState } from "react";
import CustomSnackbar from "./components/CustomSnackbar";
import FilesDashboard from "./components/FilesDashboard";
import UploadForm from "./components/UploadForm";
import "./css/App.scss";

function App() {
  const [userFiles, setUserFiles] = useState([]);
  const [snackStatus, setsnackStatus] = useState({
    isOpen: false,
    message: "",
    severity: "info",
  });

  async function fetchData() {
    const response = await axios.get(
      import.meta.env.VITE_BASE_API_URL + "/files"
    );
    const data = await response.data;
    setUserFiles(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <CustomSnackbar
        snackStatus={snackStatus}
        setsnackStatus={setsnackStatus}
      />
      <UploadForm
        fetchData={fetchData}
        setsnackStatus={setsnackStatus}
      />
      {userFiles ? (
        <FilesDashboard
          data={userFiles}
          fetchData={fetchData}
          setsnackStatus={setsnackStatus}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
