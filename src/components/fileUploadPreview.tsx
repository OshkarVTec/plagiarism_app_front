import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  files: File[];
  onRemove: (filename: string) => void;
  onAddFiles: (files: FileList) => void;
  onAnalyze: (files: File[]) => void;
};

export function FileUploadPreview({ files, onRemove, onAddFiles, onAnalyze }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAddFiles(e.target.files);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 pt-18">
      <Card className="w-[340px] border-2 border-black rounded-lg bg-white">
        <CardContent className="p-4">
          <h2 className="text-center font-bold mb-4">ARCHIVOS SUBIDOS</h2>

          <div className="flex flex-col gap-3 max-h-70 overflow-y-auto pr-1">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex justify-between items-center bg-[#D8BE96] border-2 border-black px-4 py-2 rounded"
              >
                <span className="font-bold">{file.name}</span>
                <button
                  onClick={() => onRemove(file.name)}
                  className="text-black text-lg font-bold hover:scale-110 transition"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>

          <hr className="my-4 border border-black" />

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-black bg-[#7EBDBD] text-black hover:bg-[#65a0a0]"
          >
            Agregar
          </Button>

          <input
            type="file"
            multiple
            accept=".py"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      <Button
        onClick={() => onAnalyze(files)}
        className="w-[200px] border-2 border-black bg-[#C78888] text-black hover:bg-[#b16f6f]"
        disabled={files.length < 2}
      >
        Analizar
      </Button>
    </div>
  );
}