import { useRef,useState } from "react";
import { FileUploadPreview } from "@/components/fileUploadPreview";
import { FileUploadButton } from "@/components/FileUploadButton";

export default function Index() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

const handleAddFiles = (fileList: FileList) => {
  const newFiles = Array.from(fileList);
  setFiles(prev => [...prev, ...newFiles]);
};

const handleRemoveFile = (filename: string) => {
  setFiles(prev => prev.filter(file => file.name !== filename));
};

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">

      {files.length >= 2 ? (
        <FileUploadPreview
            files={files}
            onRemove={(filename) =>
            setFiles(prev => prev.filter(f => f.name !== filename))
            }
            onAddFiles={(newFiles) => {
            const uploadedFiles = Array.from(newFiles);
            setFiles(prev => [...prev, ...uploadedFiles]);
            }}
            onAnalyze={(files) => {
            console.log("Archivos a analizar:", files);
            }}
        />
        ) : (
        <FileUploadButton
            onFilesSelected={(newFiles) => {
            const uploadedFiles = Array.from(newFiles);
            setFiles(prev => [...prev, ...uploadedFiles]);
            }}
        />
        )}
        </div>
    );
}
