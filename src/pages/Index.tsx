import axios from "axios";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileUploadPreview } from "@/components/fileUploadPreview";
import { FileUploadButton } from "@/components/FileUploadButton";

export default function Index() {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { setResultData, setFileContents } = useAnalysisStore();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      {files.length >= 2 ? (
        <FileUploadPreview
          files={files}
          onRemove={(filename) =>
            setFiles((prev) => prev.filter((f) => f.name !== filename))
          }
          onAddFiles={(newFiles) => {
            const uploadedFiles = Array.from(newFiles);
            setFiles((prev) => [...prev, ...uploadedFiles]);
          }}
          onAnalyze={async (files) => {
            try {
              const formData = new FormData();
              files.forEach((file) => formData.append("files", file));

              const response = await axios.post(
                "http://localhost:8000/plagiarism/",
                formData
              );

              // Guardar resultado del análisis
              setResultData(response.data);

              // Leer contenidos de los archivos
              const contents: Record<string, string> = {};
              for (const file of files) {
                const text = await file.text();
                contents[`uploaded_files/${file.name}`] = text;
              }

              // Guardar contenidos en Zustand
              setFileContents(contents);

              // Redirigir a resultados
              navigate("/Results");
            } catch (error) {
              console.error("Error al llamar API:", error);
            }
          }}
        />
      ) : (
        <FileUploadButton
          onFilesSelected={(newFiles) => {
            const uploadedFiles = Array.from(newFiles);
            setFiles((prev) => [...prev, ...uploadedFiles]);
          }}
        />
      )}
    </div>
  );
}
