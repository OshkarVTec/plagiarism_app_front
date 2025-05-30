import { useState } from "react";
import axios from "axios";
import { FileUploadPreview } from "@/components/fileUploadPreview";
import { FileUploadButton } from "@/components/FileUploadButton";

export default function Index() {
  const [files, setFiles] = useState<File[]>([]);

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
            onAnalyze={async(files) => {
            console.log("Archivos a analizar:", files);
             try {
              const formData = new FormData();
              files.forEach(file => formData.append("files", file));

              const response = await axios.post(
                "http://localhost:8000/plagiarism/",
                formData
              );

              console.log("Respuesta API:", response.data);
              // Aquí guarda response.data en estado para mostrar resultados

            } catch (error) {
              console.error("Error al llamar API:", error);
              // Opcional: manejar error en UI
            }
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
