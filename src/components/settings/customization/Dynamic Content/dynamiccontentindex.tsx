import { useState } from "react";
import { cn } from "@/lib/utils";
import Success from "./Success";
import Error from "./Error";
const tabs = ["Success Page", "Error Page", "404 Page"];

export default function DynamicContentIndex() {
  const [activeTab, setActiveTab] = useState("Success Page");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Success Page":
        return <Success />;
      case "Error Page":
        return <Error />
      case "404 Page":
        return <div>404 Page Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {/* Dynamic Title */}
        <h1 className="text-xl font-semibold">{activeTab}</h1>
      </div>

      {/* TABS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 border rounded-md",
              activeTab === tab && "bg-primary text-primary-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {renderTabContent()}
    </div>
  );
}
