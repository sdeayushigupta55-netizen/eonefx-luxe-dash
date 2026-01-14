import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function VerifyBanner({ onBeginVerification }: { onBeginVerification?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full">
      <h5 className="text-center text-base sm:text-sm flex items-center gap-2">
        Verify your account to unlock additional features.
        <span
          className="text-blue-600 cursor-pointer inline-flex items-center gap-1 font-semibold"
          onClick={() => {
            if (onBeginVerification) {
              onBeginVerification();
            } else {
              navigate("/user/userkyc");
            }
          }}
        >
          Begin Verification
          <ArrowRight className="inline h-4 w-4" />
        </span>
      </h5>
    </div>
  );
}