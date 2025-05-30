import { Card, CardContent } from "@/components/ui/card";
import { CardFileGroup } from "./CardFileGroup.tsx";

type ClusterRawData = any;

function extractGroupsFromClusters(clustersData: Record<string, {
  members: Record<string, [number, number][]>;
  pairs: {
    file1: string;
    lines1: [number, number];
    file2: string;
    lines2: [number, number];
    clone_type: number | "No Significant Similarity";
  }[];
}>): { id: number; cloneType: number[]; files: string[] }[] {
  return Object.entries(clustersData)
    .map(([_, cluster], index) => {
      const files = Object.keys(cluster.members);

     const cloneTypes = Array.from(
        new Set(
          cluster.pairs
            .filter((pair) => pair.clone_type !== "No Significant Similarity")
            .map((pair) => pair.clone_type as number)
        )
      );

      return {
        id: index + 1,
        cloneType: cloneTypes,
        files,
      };
    })
    .filter((group) => group.cloneType.length > 0);
}

type Props = {
  data: ClusterRawData;
  onViewGroup: (groupId: number) => void;
}

export function CardFileClusterView({ data, onViewGroup }: Props) {
  const groups = extractGroupsFromClusters(data);

  return (
    <Card className="max-h-[calc(90vh)] h-[73vh] border-black border-2 bg-white flex flex-co">
      <h2 className="font-['Roboto'] text-[1.5rem] text-center font-bold text-xl">Grupos de Archivos</h2>
      <CardContent className="p-4 space-y-4 overflow-y-auto flex flex-col flex-1">
        {groups.length > 0 ? (
          groups.map((group) => (
            <CardFileGroup
              key={group.id}
              groupId={group.id}
              cloneType={group.cloneType}
              fileCount={group.files.length}
              onView={() => onViewGroup(group.id)}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">No hay grupos disponibles.</p>
        )}
      </CardContent>
</Card> 
  );
}
