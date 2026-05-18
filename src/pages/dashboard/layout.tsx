import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import PageTransition from "@/components/feature/PageTransition";

export default function DashboardLayout() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white/30">
        <div className="flex items-center gap-3 text-rose-800/60">
          <i className="ri-loader-4-line animate-spin text-xl" />
          <span className="text-sm">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
      {/* Background andino fijo */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Aerial%20view%20of%20Peruvian%20Andes%20mountains%20with%20golden%20terraced%20fields%2C%20warm%20earthy%20tones%2C%20misty%20valleys%2C%20soft%20morning%20light%2C%20cinematic%20landscape%20photography%2C%20rich%20amber%20and%20green%20tones%2C%20serene%20nature%2C%20wide%20panoramic%20view&width=1920&height=1080&seq=dashboard-bg-andes&orientation=landscape')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay suave para legibilidad */}
        <div className="absolute inset-0 bg-white/88" />
      </div>

      {/* Sidebar */}
      <div className="relative z-10">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
