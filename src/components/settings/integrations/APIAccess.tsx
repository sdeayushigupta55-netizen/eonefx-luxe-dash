import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

export default function ApiAccess() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Icon Section */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
              <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="16" height="3" rx="1" fill="currentColor"/>
              <rect x="4" y="11" width="16" height="3" rx="1" fill="currentColor"/>
              <circle cx="8" cy="7.5" r="1" fill="white"/>
              <circle cx="8" cy="12.5" r="1" fill="white"/>
            </svg>
          </div>
          <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center relative">
            <div className="text-4xl font-bold text-muted-foreground">API</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Text Content */}
        <p className="text-muted-foreground text-base leading-relaxed mb-8">
          API Access allows seamless integration with external systems and is available as an add-on upon request. Please request access only if your system requires external connectivity.
        </p>

        {/* Button */}
        <Button size="lg" className="gap-2">
          <Key className="h-5 w-5" />
          Request Access
        </Button>
      </div>
    </div>
  );
}