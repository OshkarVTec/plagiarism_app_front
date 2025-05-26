import { useRef } from "react";

type Props = {
  onFilesSelected: (files: FileList) => void;
};

export function FileUploadButton({ onFilesSelected }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">

      <div
      onClick={handleClick}
        className="w-80 h-80 border-4 p-2 border-black rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition"
      >
        <span
          className="font-['Roboto'] text-[10rem] font-light">
          +
        </span>
      </div>
      <p
        className="font-['Roboto'] font-light text-[1.2rem] mt-6 text-center" >
        Agregue al menos dos archivos (.py) para comenzar el análisis.
      </p>

      <input
        type="file"
        multiple
        accept=".py"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
