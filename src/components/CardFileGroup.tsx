import { Button } from "@/components/ui/button";

type Props = {
  groupId: number;
  cloneType: number[];
  fileCount: number;
  onView: () => void;
};

export function CardFileGroup({ groupId, cloneType, fileCount, onView }: Props) {
  return (
    <div className="bg-[#D8BE96] border-2 border-black rounded px-4 py-3 text-center space-y-2">
      <h3 className="font-['Roboto'] font-bold text-lg">Grupo {groupId}</h3>
      <div className="font-['Roboto'] flex justify-between text-base font-medium">
        <span>
          Tipo{cloneType.length > 1 ? "s" : ""} de plagio: {cloneType.join(", ")}
        </span>
        <span>Archivos: {fileCount}</span>
      </div>
      <Button
        onClick={onView}
        className="bg-[#7EBDBD] text-black border-2 border-black hover:bg-[#65a0a0]"
      >
        Visualizar
      </Button>
    </div>
  );
}
