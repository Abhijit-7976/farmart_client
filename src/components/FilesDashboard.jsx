import { useState } from "react";
import FileCard from "./FileCard";

const FilesDashboard = ({ data, fetchData, setsnackStatus }) => {
  const [copiedItem, setCopiedItem] = useState(-1);

  return (
    <div className="files">
      {data
        .slice(0)
        .reverse()
        .map(file => {
          return (
            <FileCard
              key={file.id}
              id={file.id}
              fileName={file.fileName}
              shortUrl={file.shortUrl}
              copiedItem={copiedItem}
              setCopiedItem={setCopiedItem}
              fetchData={fetchData}
              setsnackStatus={setsnackStatus}
            />
          );
        })}
    </div>
  );
};

export default FilesDashboard;
