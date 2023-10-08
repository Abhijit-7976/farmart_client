import axios from "axios";
import { useState } from "react";
import copyIcon from "../assets/copy.png";
import deleteIcon from "../assets/delete.png";
import fileIcon from "../assets/file.svg";

const FileCard = ({
  id,
  copiedItem,
  setCopiedItem,
  fileName,
  shortUrl,
  fetchData,
  setsnackStatus,
}) => {
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
    } else {
      Document.execCommand("copy", true, text);
    }
    setCopiedItem(id);
    setsnackStatus(status => {
      return {
        ...status,
        isOpen: true,
        message: "File download url copied",
        severity: "info",
      };
    });
  }

  const deleteHandler = async () => {
    const res = await axios.delete(
      import.meta.env.VITE_BASE_API_URL + "/files/delete/" + id
    );

    if (res.status === 200) {
      setsnackStatus(status => {
        return {
          ...status,
          isOpen: true,
          message: "File deleted successfully",
          severity: "success",
        };
      });
      fetchData();
    } else {
      setsnackStatus(status => {
        return {
          ...status,
          isOpen: true,
          message: "Something went wrong",
          severity: "error",
        };
      });
    }
  };

  return (
    <div className="file">
      <div className="file_name_box">
        <img
          src={fileIcon}
          alt="file-icon"
        />
        <span className="file_name">{fileName}</span>
      </div>
      <div className="url_box">
        <span className="file_url">{shortUrl}</span>
        <button
          onClick={() => {
            copyTextToClipboard(shortUrl);
          }}>
          <img
            src={copyIcon}
            alt="copy-icon"
          />
          <span>{copiedItem == id ? "Copied " : "Copy"}</span>
        </button>
        <button onClick={deleteHandler}>
          <img
            src={deleteIcon}
            alt="delete-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
