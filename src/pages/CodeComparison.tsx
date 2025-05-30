import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type ClonePair = {
  file1: string;
  lines1: number[];
  file2: string;
  lines2: number[];
  clone_type: number | "No Significant Similarity";
};

type Cluster = {
  members: Record<string, number[][]>;
  pairs: ClonePair[];
};

type AnalysisData = Record<string, Cluster>;

import mockData from "@/loco.json"; // reemplaza esto con tu estado/contexto/fetch

export function CodeComparison() {
  const { groupId } = useParams<{ groupId: string }>();
  const [pairData, setPairData] = useState<ClonePair[]>([]);

  useEffect(() => {
  if (!groupId) return;

  const cluster = (mockData as AnalysisData)[groupId];

  if (cluster) {
    const filtered = cluster.pairs.filter(
      (p) => p.clone_type !== "No Significant Similarity"
    );
    setPairData(filtered);
  }
}, [groupId]);

  return (
    <div className="p-6 flex flex-col gap-6 items-center">
      <h1 className="text-2xl font-bold font-['Roboto']">Comparativa del Grupo {groupId}</h1>

      {pairData.length === 0 ? (
        <p className="text-muted-foreground">No hay comparativas con similitud significativa.</p>
      ) : (
        pairData.map((pair, index) => (
          <Card key={index} className="w-full max-w-5xl border-black border-2 bg-white">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm font-bold">
                <span>{pair.file1} (líneas {pair.lines1[0]}–{pair.lines1[1]})</span>
                <span>Tipo {pair.clone_type}</span>
                <span>{pair.file2} (líneas {pair.lines2[0]}–{pair.lines2[1]})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <pre className="text-left text-sm p-2 bg-zinc-100 border rounded h-[200px] overflow-auto">
                  {/* Aquí luego renderizas el fragmento real */}
                  <code>Líneas {pair.lines1[0]} - {pair.lines1[1]} de {pair.file1}</code>
                </pre>
                <pre className="text-left text-sm p-2 bg-zinc-100 border rounded h-[200px] overflow-auto">
                  <code>Líneas {pair.lines2[0]} - {pair.lines2[1]} de {pair.file2}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
