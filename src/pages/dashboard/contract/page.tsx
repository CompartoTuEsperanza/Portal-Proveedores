import { useAuth } from "@/hooks/useAuth";

export default function Contract() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-rose-950">Mi Contrato</h2>
        <p className="text-sm text-rose-800/60 mt-1">
          Detalles de su contrato vigente como proveedor
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-rose-100/60 p-6 md:p-8 space-y-6">
        {/* Contract Header */}
        <div className="border-b border-rose-50/60 pb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-semibold text-rose-950">Contrato de Suministro</h3>
              <p className="text-sm text-rose-900/70 mt-1">
                Código de contrato: CONT-{user?.supplier_id}-2026
              </p>
            </div>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
              <i className="ri-check-line mr-1" />
              Vigente
            </span>
          </div>
        </div>

        {/* Party Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white/50 rounded-lg">
            <p className="text-xs font-medium text-rose-800/60 uppercase tracking-wide mb-2">Proveedor</p>
            <p className="text-sm font-semibold text-rose-950">{user?.name}</p>
            <p className="text-sm text-rose-900/70 mt-1">Código: {user?.supplier_id}</p>
            <p className="text-sm text-rose-900/70">Categoría: {user?.category}</p>
          </div>
          <div className="p-4 bg-white/50 rounded-lg">
            <p className="text-xs font-medium text-rose-800/60 uppercase tracking-wide mb-2">Comprador</p>
            <p className="text-sm font-semibold text-rose-950">Legado Inca</p>
            <p className="text-sm text-rose-900/70 mt-1">RUC: 20548796321</p>
            <p className="text-sm text-rose-900/70">Lima, Perú</p>
          </div>
        </div>

        {/* Contract Details */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-rose-950">Términos del Contrato</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-rose-50/60 rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-rose-900/20/50 rounded text-rose-800 flex-shrink-0 text-xs font-bold">1</span>
              <div>
                <p className="text-sm font-medium text-rose-950">Periodo de vigencia</p>
                <p className="text-xs text-rose-800/60 mt-0.5">1 de enero de 2026 hasta 31 de diciembre de 2026. Renovación automática por un año adicional salvo notificación con 60 días de anticipación.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-rose-50/60 rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-rose-900/20/50 rounded text-rose-800 flex-shrink-0 text-xs font-bold">2</span>
              <div>
                <p className="text-sm font-medium text-rose-950">Productos cubiertos</p>
                <p className="text-xs text-rose-800/60 mt-0.5">
                  {user?.category === "cacao"
                    ? "Cacao Chuncho nativo de Echarati, Quillabamba, y especialidades asociadas."
                    : user?.category === "cacao"
                      ? "Cacao Fino de Aroma, Cacao Trinitario y derivados autorizados."
                      : "Productos agrícolas asociados a la categoría registrada."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-rose-50/60 rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-rose-900/20/50 rounded text-rose-800 flex-shrink-0 text-xs font-bold">3</span>
              <div>
                <p className="text-sm font-medium text-rose-950">Pagos</p>
                <p className="text-xs text-rose-800/60 mt-0.5">Los pagos se realizarán dentro de los 15 días hábiles posteriores a la recepción y aprobación del lote. El método de pago será transferencia bancaria a la cuenta designada por el proveedor.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-rose-50/60 rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-rose-900/20/50 rounded text-rose-800 flex-shrink-0 text-xs font-bold">4</span>
              <div>
                <p className="text-sm font-medium text-rose-950">Calidad y estándares</p>
                <p className="text-xs text-rose-800/60 mt-0.5">Todos los productos deben cumplir con las normas de calidad internacional aplicables. Se realizará inspección de cada lote antes de la aceptación definitiva.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-rose-50/60 rounded-md">
              <span className="w-6 h-6 flex items-center justify-center bg-rose-900/20/50 rounded text-rose-800 flex-shrink-0 text-xs font-bold">5</span>
              <div>
                <p className="text-sm font-medium text-rose-950">Confidencialidad</p>
                <p className="text-xs text-rose-800/60 mt-0.5">Ambas partes se comprometen a mantener la confidencialidad de los términos comerciales, precios y condiciones establecidos en este contrato.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="border-t border-rose-50/60 pt-6">
          <p className="text-xs text-rose-800/40">
            Este documento es una representación resumida de su contrato vigente. Para obtener la versión completa firmada, contacte a su representante asignado.
          </p>
        </div>
      </div>
    </div>
  );
}