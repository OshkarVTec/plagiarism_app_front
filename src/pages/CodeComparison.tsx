import { useParams, useNavigate } from "react-router-dom";
import { useAnalysisStore } from "@/store/useAnalysisStore";
import type { AnalysisState, ClonePair } from "@/types/analysis";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/CodeBlock";

export default function CodeComparisonPage() {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const resultData = useAnalysisStore((state: AnalysisState) => state.resultData);
  const fileContents = useAnalysisStore((state: AnalysisState) => state.fileContents);

  const numericGroupId = groupId ? String(Number(groupId) - 1) : null;

  const [groupPairs, setGroupPairs] = useState<ClonePair[]>([]);
  const [members, setMembers] = useState<Record<string, [number, number][]>>({});
  
  function normalizePath(path: string): string {
  return path.split("\\").join("/");}
  
  useEffect(() => {
    if (!numericGroupId || !resultData) return;

    const cluster = resultData[numericGroupId];
    console.log("Cluster data for group:", cluster);
    if (!cluster || !cluster.file_pairs) return;

    const filtered = cluster.file_pairs.filter((pair) => pair.clone_type !== -1);
    setGroupPairs(filtered);
    setMembers(cluster.members);
  }, [numericGroupId, resultData]);

  return (
    <div className="flex flex-col gap-4 justify-center items-stretch w-full p-4 max-w-[1200px] mx-auto">
      <button
        onClick={() => navigate("/results")}
        className="font-['Roboto'] text-[1rem] self-start  px-2 py-2 border border-black rounded bg-[#7EBDBD] hover:bg-[#65a0a0] font-medium">
        ← Volver a Resultados
      </button>
      <h2 className="font-['Roboto'] text-[1.5rem] text-2xl font-bold">Comparativa del Grupo {groupId}</h2>
      {groupPairs.length > 0 ? (
        console.log("Group pairs:", groupPairs),
        console.log("Members:", members),
        groupPairs.map((pair, index) => (
          <Card
            key={index}
            className="w-full max-w-6xl p-4 border-black border-2 bg-white"
          >
            <h3 className="font-semibold text-lg mb-4">
              Par {index + 1} - Tipo {pair.clone_type}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono text-sm">
              <CodeBlock
                filename={pair.file1}
                content={fileContents?.[normalizePath(pair.file1)] || ""}
                highlightRanges={members?.[pair.file1] || []}
              />
              <CodeBlock
                filename={pair.file2}
                content={fileContents?.[normalizePath(pair.file2)] || ""}
                highlightRanges={members?.[pair.file2] || []}
              />
            </div>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground">
          No hay pares significativos para mostrar.
        </p>
      )}
    </div>
  );
}
