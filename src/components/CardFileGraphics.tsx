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

type ClusterRawData = Record<
  string,
  {
    file_pairs: {
      clone_type: number;
    }[];
  }
>;

type Props = {
  data: ClusterRawData;
};

export function CardFileGraphics({ data }: Props) {
  const cloneTypeCounts: Record<number, number> = {};

  // Aggregate clone_type counts, ignoring -1
  Object.values(data).forEach((cluster) => {
    cluster.file_pairs.forEach((pair) => {
      const { clone_type } = pair;
      if (clone_type !== -1) {
        cloneTypeCounts[clone_type] = (cloneTypeCounts[clone_type] || 0) + 1;
      }
    });
  });

  // Format data for the chart
  const chartData = Object.entries(cloneTypeCounts).map(([type, count]) => ({
    name: `Tipo ${type}`,
    count,
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
                dataKey="count"
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
              <Tooltip formatter={(value: number, name: string) =>
                [`${value} ${value === 1 ? "Par" : "Pares"}`, name]}
                />
              <Legend verticalAlign="bottom" height={5} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
