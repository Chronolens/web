"use client";
import {
  UploadFile,
  UploadFileStatus,
  useUploadFilesContext,
} from "@/providers/uploadFilesProvider";
import { useUploadModalContext } from "@/providers/uploadModalProvider";
import Image from "next/image";
import removeItemIcon from "@/public/static/icons/X.svg";
import retryItemIcon from "@/public/static/icons/ArrowCounterClockwise.svg";
import addMoreIcon from "@/public/static/icons/Plus.svg";
import { useEffect } from "react";

export default function UploadModal() {
  const { isUploadModalOpen, closeUploadModal } = useUploadModalContext();
  const { addFiles } = useUploadFilesContext();
  const handleChange = (e) => {
    const files = e.target.files;
    console.log(files);
    if (!files.length) return;
    addFiles(files);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeUploadModal();
      }
    };
    if (isUploadModalOpen) window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUploadModalOpen, closeUploadModal]);
  if (!isUploadModalOpen) return null;
  return (
    <div
      onClick={closeUploadModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-lg w-[780px] h-[880px] bg-gradient-metadata justify-center"
      >
        <input
          id="hiddenFileInput"
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleChange}
        />

        <DragAndDrop />

        <div className="flex mt-4 mb-4 w-full items-center justify-center">
          <UploadButton />
        </div>
      </div>
    </div>
  );
}

const triggerFileInput = () => {
  document.getElementById("hiddenFileInput").click();
};

function DragAndDrop() {
  const { files, addFiles } = useUploadFilesContext();
  // const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // TODO: add a mime type check
    if (files.length) {
      addFiles(files);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    // setIsDragging(true);
  };

  const handleDragLeave = () => {
    // setIsDragging(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className="flex-1"
    >
      {files.length != 0 ? (
        <div>
          <div className="flex items-center h-20">
            <h2 className="ml-8 text-lg">Selected Files</h2>
            <button
              onClick={triggerFileInput}
              className="flex flex-row ml-auto mr-8 bg-foreground text-background rounded-lg px-4 py-2"
            >
              <span>Add More</span>
              <Image className="ml-1 invert" src={addMoreIcon} alt="" />
            </button>
          </div>
          <div className="h-[720px] px-10 overflow-scroll">
            <table className="w-full table-fixed">
              <tbody>
                {files.map((file, index) => (
                  <UploadFileListItem key={index} index={index} file={file} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="h-full px-10 pt-10">
          <div className="flex h-full items-center justify-center rounded-lg border-2">
            <span>Drag & Drop your media here</span>
          </div>
        </div>
      )}
    </div>
  );
}

function UploadFileListItem({
  index,
  file,
}: {
  index: number;
  file: UploadFile;
}) {
  const { removeFile, retryUpload } = useUploadFilesContext();
  return (
    <tr>
      <td className="w-1/12 py-3">
        <Image src={file.url} alt="" height={64} width={64} />
      </td>
      <td className="w-5/12 pl-4 py-3 truncate">
        <span>{file.name} </span>
      </td>
      <td className="w-2/12 py-3">
        <div className="flex justify-center items-center">
          <span>{file.sizeString}</span>
        </div>
      </td>
      <td className="w-3/12 py-3">
        <div className="flex justify-center items-center">
          <FileStatus status={file.status} />
        </div>
      </td>
      <td className="w-1/12 py-3">
        <div className="flex justify-center items-center">
          {file.status === UploadFileStatus.ERROR ? (
            <button onClick={() => retryUpload(index)}>
              <Image src={retryItemIcon} alt="Retry Icon" />
            </button>
          ) : (
            <button onClick={() => removeFile(index)}>
              <Image src={removeItemIcon} alt="Remove Icon" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

function FileStatus({ status }: { status: UploadFileStatus }) {
  switch (status) {
    case UploadFileStatus.IDLE:
      return <span className="text-yellow-light"> Not Uploaded </span>;
    case UploadFileStatus.UPLOADING:
      return <span className="text-blue-light"> Uploading... </span>;
    case UploadFileStatus.UPLOADED:
      return <span className="text-green-light"> Uploaded </span>;
    case UploadFileStatus.ALREADY_EXISTS:
      return <span className="text-yellow-light"> Already Uploaded </span>;
    case UploadFileStatus.ERROR:
      return <span className="text-red-light"> Failed to Upload </span>;
    default:
      return <span className="text-red-light"> Status not supported </span>;
  }
}

function UploadButton() {
  const { files, uploadAllFiles, clearFiles} = useUploadFilesContext();
  const className = "w-80 bg-foreground text-background px-4 py-2 rounded-lg";
  if (files.length != 0) {
    if (files.some((file) => file.status === UploadFileStatus.UPLOADING)) {
      return (
        <button className={className} disabled>
          Uploading...
        </button>
      );
    } else if (files.some((file) => file.status === UploadFileStatus.IDLE)) {
    return (
      <button className={className} onClick={uploadAllFiles}>
        Upload All Files
      </button>
    );
    } else {
      return (
        <button className={className} onClick={clearFiles}>
          Clear All Files
        </button>
      );
    }
  } else {
    return (
      <button
        className={className}
        onClick={() => document.getElementById("hiddenFileInput").click()}
      >
        Browse Files
      </button>
    );
  }
}
