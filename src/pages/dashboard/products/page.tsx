import { useAuth } from "@/hooks/useAuth";
import { products } from "@/mocks/suppliers";

export default function Products() {
  const { user } = useAuth();
  const myProducts = products.filter((p) => p.supplier_id === user?.supplier_id);

  function statusBadge(status: string) {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      activo: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Activo" },
      pendiente: { bg: "bg-white", text: "text-rose-700", label: "Pendiente" },
      inactivo: { bg: "bg-red-50", text: "text-red-700", label: "Inactivo" },
    };
    const s = map[status] || { bg: "bg-white/40", text: "text-rose-900", label: status };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
        {s.label}
      </span>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-rose-950">Mis Productos</h2>
        <p className="text-sm text-rose-800/60 mt-1">
          Productos registrados bajo su código de proveedor
        </p>
      </div>

      <div className="bg-white rounded-lg border border-rose-100/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/50 border-b border-rose-100/60">
                <th className="text-left py-3 px-4 text-rose-900/70 font-semibold">ID</th>
                <th className="text-left py-3 px-4 text-rose-900/70 font-semibold">Nombre</th>
                <th className="text-left py-3 px-4 text-rose-900/70 font-semibold">Categoría</th>
                <th className="text-left py-3 px-4 text-rose-900/70 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {myProducts.map((product) => (
                <tr key={product.id} className="border-b border-rose-50/60 hover:bg-white/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-rose-800/60">{product.id}</td>
                  <td className="py-3 px-4 font-medium text-rose-950">{product.name}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-medium px-2 py-1 bg-rose-50/50 rounded-full text-rose-950 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">{statusBadge(product.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {myProducts.length === 0 && (
          <div className="text-center py-10 text-rose-700/40 text-sm">
            No tiene productos registrados
          </div>
        )}
      </div>
    </div>
  );
}