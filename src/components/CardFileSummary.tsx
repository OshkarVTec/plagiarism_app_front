import { Card, CardContent } from "@/components/ui/card";

export function CardFileSummary({ data }: { data: any }) {
  const clusters = Object.values(data);
  const fileSet = new Set<string>();

  clusters.forEach((cluster: any) => {
    Object.keys(cluster.members).forEach(file => fileSet.add(file));
  });

  return (
    <Card className="w-full max-w-md border-black border-2 bg-white">
      <CardContent>
        <h2 className="font-['Roboto'] text-[1.5rem] font-bold">Archivos analizados:</h2>
        <p className="font-['Roboto'] text-[2rem] font-light">{fileSet.size}</p>
        <h2 className="font-['Roboto'] text-[1.5rem] font-bold">Clusters identificados:</h2>
        <p className="font-['Roboto'] text-[2rem] font-light">{clusters.length}</p>
      </CardContent>
    </Card>
  );
}
