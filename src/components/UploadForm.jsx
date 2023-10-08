import axios from "axios";
import { useRef } from "react";

const UploadForm = ({ fetchData, setsnackStatus }) => {
  const fileInput = useRef(null);

  const submitHandler = async e => {
    e.preventDefault();
    const file = fileInput.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    if (file === undefined) {
      setsnackStatus(status => {
        return {
          ...status,
          isOpen: true,
          message: "Please select a file",
          severity: "error",
        };
      });
      return;
    }

    const res = await axios.post(
      import.meta.env.VITE_BASE_API_URL + "/files/upload",
      formData
    );

    if (res.status === 200) {
      setsnackStatus(status => {
        return {
          ...status,
          isOpen: true,
          message: "File uploaded successfully",
          severity: "success",
        };
      });
    }
    fetchData();
  };

  return (
    <form
      onSubmit={e => {
        submitHandler(e);
      }}>
      <div className="input-group">
        <label htmlFor="files">Select files</label>
        <input
          type="file"
          ref={fileInput}
        />
      </div>
      <button
        className="submit-btn"
        type="submit">
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
