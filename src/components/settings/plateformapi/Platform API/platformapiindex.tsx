import { useState } from "react";
import { Settings } from "lucide-react";
import CTrader from "./CTrader";
import MetaTrader from "./MetaTrader";
import X9Trader from "./X9Trader";

export default function PlatformAPIIndex() {
  const [activeProvider, setActiveProvider] = useState("MetaTrader");

  const providers = ["CTrader", "MetaTrader", "X9 Trader"];

  const renderContent = () => {
    switch (activeProvider) {
      case "CTrader":
        return <CTrader />;
      case "MetaTrader":
        return <MetaTrader />;
      case "X9 Trader":
        return <X9Trader />;
      default:
        return <MetaTrader />;
    }
  };

  const getTitle = () => {
    switch (activeProvider) {
      case "CTrader":
        return "CTrader API Settings";
      case "MetaTrader":
        return "MetaTrader API Settings";
      case "X9 Trader":
        return "X9trader API Settings";
      default:
        return "MetaTrader API Settings";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        
        <div>
          <h2 className="text-xl font-semibold">{getTitle()}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Set up Trading Platform API's provided by your provider.
          </p>
        </div>
      </div>

      {/* Provider Tabs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center bg-muted/30 p-4 rounded-xl border">
        {providers.map((provider) => (
          <button
            key={provider}
            onClick={() => setActiveProvider(provider)}
            className={`px-4 py-2 rounded-md border ${
              activeProvider === provider
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {provider}
          </button>
        ))}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
}
