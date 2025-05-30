import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#EF4444", "#F59E0B", "#10B981"]; // Rojo, Naranja, Verde

export function CardFileGraphics({ data }: { data: any }) {
  const cloneCounts: Record<string, number> = {};

  // Agrupar tipos de plagio, excluyendo los nulos
  Object.values(data).forEach((cluster: any) => {
    cluster.pairs.forEach((pair: any) => {
      const type = pair.clone_type;
      if (type !== "No Significant Similarity") {
        const label = `Tipo ${type}`;
        cloneCounts[label] = (cloneCounts[label] || 0) + 1;
      }
    });
  });

  const chartData = Object.entries(cloneCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card className="w-full max-w-md border-black border-2 bg-white">
      <CardContent className="p-2">
        <h2 className="font-['Roboto'] text-[1.5rem] font-bold">Tipos de Plagio</h2>
        {chartData.length === 0 ? (
          <p className="font-['Roboto'] text-center text-muted-foreground">No se detectó ningún tipo de plagio significativo.</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                 data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100} // más grande
                paddingAngle={4}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={5} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
