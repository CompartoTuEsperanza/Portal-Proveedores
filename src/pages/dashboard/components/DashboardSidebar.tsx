import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { path: "/dashboard", label: "Resumen", icon: "ri-dashboard-line" },
  { path: "/dashboard/products", label: "Mis Productos", icon: "ri-shopping-bag-line" },
  { path: "/dashboard/orders", label: "Órdenes", icon: "ri-file-list-3-line" },
  { path: "/dashboard/new-lot", label: "Nuevo Lote", icon: "ri-add-circle-line" },
  { path: "/dashboard/my-lots", label: "Mis Lotes", icon: "ri-archive-line" },
  { path: "/dashboard/payments", label: "Estado de Pagos", icon: "ri-money-dollar-circle-line" },
  { path: "/dashboard/contract", label: "Mi Contrato", icon: "ri-article-line" },
  { path: "/dashboard/profile", label: "Perfil", icon: "ri-user-settings-line" },
];

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-b border-rose-100/60 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://public.readdy.ai/ai/img_res/c99949a7-105a-4e7e-b54f-999d11a6f167.png"
            alt="Logo"
            className="h-7 w-auto"
          />
          <span className="text-sm font-medium text-rose-900">Portal</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md hover:bg-rose-50/50 cursor-pointer"
        >
          <i className={`ri-${mobileOpen ? "close" : "menu"}-line text-lg text-rose-900`} />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col bg-black/25 backdrop-blur-md border-r border-rose-100/40 min-h-screen">
        {/* Logo area */}
        <div className="px-6 py-5 border-b border-rose-100/40">
          <div className="flex items-center gap-3">
            <img
              src="https://public.readdy.ai/ai/img_res/c99949a7-105a-4e7e-b54f-999d11a6f167.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            <div>
              <span className="text-sm font-semibold text-rose-950 block">Portal Proveedores</span>
              <span className="text-xs text-rose-800/60 capitalize">{user?.category || "Proveedor"}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ease-out cursor-pointer group relative overflow-hidden ${
                isActive(item.path)
                  ? "bg-rose-800 text-white shadow-sm"
                  : "text-rose-900/70 hover:bg-rose-100/60 hover:text-rose-950 hover:translate-x-1.5 active:scale-[0.98]"
              }`}
            >
              {!isActive(item.path) && (
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-rose-50/40 to-transparent pointer-events-none" />
              )}
              <span className="w-5 h-5 flex items-center justify-center relative z-10 transition-transform duration-200 group-hover:scale-110">
                <i className={item.icon} />
              </span>
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User info */}
        <div className="px-4 py-4 border-t border-rose-100/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-sm font-semibold text-rose-800">
              {user?.name?.charAt(0) || "P"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-rose-950 truncate">{user?.name}</p>
              <p className="text-xs text-rose-800/60 truncate">{user?.supplier_id}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-black/30 backdrop-blur-lg shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile sidebar header */}
            <div className="px-4 py-4 border-b border-rose-100/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://public.readdy.ai/ai/img_res/c99949a7-105a-4e7e-b54f-999d11a6f167.png"
                  alt="Logo"
                  className="h-7 w-auto"
                />
                <span className="text-sm font-medium text-rose-900">Portal</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1 cursor-pointer">
                <i className="ri-close-line text-lg text-rose-700" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ease-out cursor-pointer group relative overflow-hidden ${
                    isActive(item.path)
                      ? "bg-rose-800 text-white"
                      : "text-rose-900/70 hover:bg-rose-100/60 hover:text-rose-950 hover:translate-x-1.5 active:scale-[0.98]"
                  }`}
                >
                  {!isActive(item.path) && (
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-rose-50/40 to-transparent pointer-events-none" />
                  )}
                  <span className="w-5 h-5 flex items-center justify-center relative z-10 transition-transform duration-200 group-hover:scale-110">
                    <i className={item.icon} />
                  </span>
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="px-4 py-4 border-t border-rose-100/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-sm font-semibold text-rose-800">
                  {user?.name?.charAt(0) || "P"}
                </div>
                <div>
                  <p className="text-sm font-medium text-rose-950">{user?.name}</p>
                  <p className="text-xs text-rose-800/60">{user?.supplier_id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}