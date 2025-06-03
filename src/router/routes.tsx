import type { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import Results from "@/pages/Results";
import CodeComparison from "@/pages/CodeComparison";

export const routes: RouteObject[] = [
  { path: "/", element: <Index /> },
  {path: "/Results", element: <Results />},
  {path:"/Comparativo/:groupId", element: <CodeComparison />}
];
