import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useNavigate } from "react-router-dom";
import { CardFileSummary } from "@/components/CardFileSummary";
import { CardFileGraphics } from "@/components/CardFileGraphics";
import { CardFileClusterView } from "@/components/CardFileClusterview";

function filterValidPlagiarismClusters(data: Record<string, any>) {
  // Solo deja los clusters que contienen al menos un file_pair con clone_type !== -1
  return Object.fromEntries(
    Object.entries(data).filter(([_, cluster]) =>
      cluster.file_pairs?.some((pair: any) => pair.clone_type !== -1)
    )
  );
}

export default function Results() {
  const navigate = useNavigate();
    const resultData = useAnalysisStore(state => state.resultData);
    if (!resultData) return <p className="font-['Roboto'] text-[1.5rem] text-center">No hay resultados cargados</p>;
   const filteredData = filterValidPlagiarismClusters(resultData);
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch w-full p-4 max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 flex-1">
        <CardFileSummary data={filteredData} />
        <CardFileGraphics data={filteredData} />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <CardFileClusterView
          data={filteredData}
          onViewGroup={(groupId) => {
            navigate(`/comparativo/${groupId}`);
          }}
        />
      </div>
    </div>
  );
}
