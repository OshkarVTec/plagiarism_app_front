import loco2 from "@/loco2.json";
import loco from "@/loco.json";
import { useNavigate } from "react-router-dom";
import { CardFileSummary } from "@/components/CardFileSummary";
import { CardFileGraphics } from "@/components/CardFileGraphics";
import { CardFileClusterView } from "@/components/CardFileClusterview";

export default function Results() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-stretch w-full p-4 max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4 flex-1">
        <CardFileSummary data={loco} />
        <CardFileGraphics data={loco} />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <CardFileClusterView
          data={loco}
          onViewGroup={(groupId) => {
            navigate(`/comparativo/${groupId}`);
          }}
        />
      </div>
    </div>
  );
}
