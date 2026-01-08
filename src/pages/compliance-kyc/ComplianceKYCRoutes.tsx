import { Routes, Route, Navigate } from "react-router-dom";
import PendingKYC from "./PendingKYC";
import RejectedKYC from "./RejectedKYC";
import AllKYCLogs from "./AllKYCLogs";

export default function ComplianceKYCRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/compliance/pending" replace />} />
      <Route path="pending" element={<PendingKYC />} />
      <Route path="rejected" element={<RejectedKYC />} />
      <Route path="logs" element={<AllKYCLogs />} />
    </Routes>
  );
}
