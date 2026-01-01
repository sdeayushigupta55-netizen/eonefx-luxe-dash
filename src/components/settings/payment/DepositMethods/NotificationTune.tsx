import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

/* Seed tunes */
const initialTunes = [
  { name: "Bewitched", icon: "🎵", mode: "Play", status: "Inactive" },
  { name: "Crunchy", icon: "🎷", mode: "Stop", status: "Inactive" },
  { name: "Expert Notification", icon: "🥁", mode: "Play", status: "Active" },
  { name: "knock knock", icon: "🎼", mode: "Play", status: "Active" },
  { name: "Silencer", icon: "📼", mode: "Play", status: "Inactive" },
  { name: "Sticky", icon: "📻", mode: "Play", status: "Inactive" },
  { name: "Vopvoopvvoop", icon: "💿", mode: "Play", status: "Inactive" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-[#0d2e1e] text-[#4ade80] border border-[#1a5e41]",
  Inactive: "bg-[#2e0f0f] text-[#f87171] border border-[#7f1d1d]",
};

export default function NotificationTune() {
  const [tunes, setTunes] = useState(initialTunes);

  const toggleStatus = (index: number) => {
    const updated = [...tunes];
    updated[index].status = updated[index].status === "Active" ? "Inactive" : "Active";
    setTunes(updated);
  };

  const togglePlay = (index: number) => {
    const updated = [...tunes];
    updated[index].mode = updated[index].mode === "Play" ? "Stop" : "Play";
    setTunes(updated);
  };

  return (
    <div className="space-y-6">
     
      <div className="space-y-4">
        {tunes.map((tune, index) => (
          <div key={index} className="flex justify-between items-center border border-border rounded-md p-4 bg-card">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{tune.icon}</span>
              <span className="font-medium">{tune.name}</span>
            </div>

            <div className="flex gap-2">
              <Button  className="flex items-center gap-2 " onClick={() => togglePlay(index)}>
                {tune.mode === "Play" ? (<><Play size={16} /> Play</>) : (<><Pause size={16} /> Stop</>)}
              </Button>
             <Button
  className={`flex items-center gap-2 ${statusClasses[tune.status]} ${
    tune.status === "Active"
      ? "hover:bg-[#0d2e1e] hover:text-[#4ade80] hover:border-[#1a5e41]"
      : "hover:bg-[#2e0f0f] hover:text-[#f87171] hover:border-[#7f1d1d]"
  } focus-visible:outline-none focus-visible:ring-0 transition-none`}
  onClick={() => toggleStatus(index)}
>
  {tune.status === "Active" ? "✔ Active" : "✖ Inactive"}
</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}