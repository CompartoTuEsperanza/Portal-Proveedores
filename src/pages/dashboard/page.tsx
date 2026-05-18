import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { products, orders, lots, payments } from "@/mocks/suppliers";
import StatCard from "./components/StatCard";
import RecentOrdersTable from "./components/RecentOrdersTable";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const myProducts = products.filter((p) => p.supplier_id === user?.supplier_id);
  const myOrders = orders.filter((o) => o.supplier_id === user?.supplier_id);
  const myLots = lots.filter((l) => l.supplier_id === user?.supplier_id);
  const myPayments = payments.filter((p) => p.supplier_id === user?.supplier_id);

  const activeOrders = myOrders.filter((o) => o.status === "en_proceso" || o.status === "pendiente").length;
  const pendingPayments = myPayments.filter((p) => p.status === "pendiente").length;
  const totalPaid = myPayments
    .filter((p) => p.status === "pagado")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="animate-card-stagger stagger-1">
        <h2 className="text-xl font-semibold text-rose-950">Panel de Control</h2>
        <p className="text-sm text-rose-800/60 mt-1">
          Resumen de su actividad como proveedor
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="ri-shopping-bag-line"
          label="Total Productos"
          value={myProducts.length.toString()}
          color="bg-emerald-50 text-emerald-600"
          onClick={() => navigate("/dashboard/products")}
          index={1}
        />
        <StatCard
          icon="ri-file-list-3-line"
          label="Órdenes Activas"
          value={activeOrders.toString()}
          color="bg-white text-rose-600"
          onClick={() => navigate("/dashboard/orders")}
          index={2}
        />
        <StatCard
          icon="ri-archive-line"
          label="Mis Lotes"
          value={myLots.length.toString()}
          color="bg-blue-50 text-blue-600"
          onClick={() => navigate("/dashboard/my-lots")}
          index={3}
        />
        <StatCard
          icon="ri-money-dollar-circle-line"
          label="Pagos Pendientes"
          value={pendingPayments.toString()}
          color="bg-red-50 text-red-600"
          onClick={() => navigate("/dashboard/payments")}
          index={4}
        />
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-rose-100/60 p-5 transition-all duration-300 ease-out hover:border-rose-200 hover:shadow-sm group animate-card-stagger stagger-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-rose-950">Órdenes Recientes</h3>
            <button
              onClick={() => navigate("/dashboard/orders")}
              className="text-sm text-rose-800/60 hover:text-rose-950 transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              Ver todas <i className="ri-arrow-right-s-line" />
            </button>
          </div>
          <RecentOrdersTable orders={myOrders.slice(0, 5)} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg border border-rose-100/60 p-5 space-y-4 transition-all duration-300 ease-out hover:border-rose-200 hover:shadow-sm animate-card-stagger stagger-6">
          <h3 className="text-base font-semibold text-rose-950">Resumen Financiero</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/50 rounded-md">
              <span className="text-sm text-rose-900/70">Total Pagado</span>
              <span className="text-sm font-semibold text-emerald-700">
                ${totalPaid.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/50 rounded-md">
              <span className="text-sm text-rose-900/70">Lotes Registrados</span>
              <span className="text-sm font-semibold text-rose-950">{myLots.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/50 rounded-md">
              <span className="text-sm text-rose-900/70">Categoría</span>
              <span className="text-xs font-medium px-2 py-1 bg-rose-100/60 rounded-full text-rose-950 capitalize">
                {user?.category}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/new-lot")}
            className="w-full bg-rose-800 text-white py-2.5 rounded-md text-sm font-medium hover:bg-rose-900 transition-all duration-200 cursor-pointer whitespace-nowrap hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
          >
            <i className="ri-add-line mr-1" />
            Registrar Nuevo Lote
          </button>
        </div>
      </div>
    </div>
  );
}
