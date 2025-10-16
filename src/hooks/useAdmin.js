import useAdminApplications from "./admin/useAdminApplication";
import useAdminDashboard from "./admin/useAdminDashboard";
import useAdminContracts from "./admin/useAdminContracts";
import useAdminCredits from "./admin/useAdminCredits";

export default function useAdmin() {
  return {
    ...useAdminApplications(),
    ...useAdminDashboard(),
    ...useAdminContracts(),
    ...useAdminCredits(),
  };
}
