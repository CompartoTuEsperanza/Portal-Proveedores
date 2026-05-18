import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type AuthMode = "login" | "register" | "new";

export default function Auth() {
  const navigate = useNavigate();
  const { login, registerFirstAccess, registerNewSupplier, isFirstAccess, supplierExists } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [supplierId, setSupplierId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSupplierId, setNewSupplierId] = useState("");

  function switchMode(newMode: AuthMode) {
    setMode(newMode);
    setError("");
    setSuccess("");
    setNewSupplierId("");
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const result = await login(supplierId.trim().toUpperCase(), password);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate("/dashboard"), 800);
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const result = await registerFirstAccess(supplierId.trim().toUpperCase(), password, confirmPassword);
    if (result.success) {
      setSuccess(result.message);
      setTimeout(() => navigate("/dashboard"), 1200);
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  }

  async function handleNewSupplier(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const result = await registerNewSupplier(name, "", password, confirmPassword);
    if (result.success) {
      setNewSupplierId(result.supplier_id || "");
      setSuccess(result.message);
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      setError(result.message);
    }
    setIsSubmitting(false);
  }

  function handleSupplierIdChange(value: string) {
    setSupplierId(value);
    setError("");
    setSuccess("");
  }

  const id = supplierId.trim().toUpperCase();
  const showFirstAccessHint = id && supplierExists(id) && isFirstAccess(id) && mode === "login";
  const showNormalAccessHint = id && supplierExists(id) && !isFirstAccess(id) && mode === "register";

  const categoryOptions = [
    { value: "café", label: "Café" },
    { value: "cacao", label: "Cacao" },
    { value: "té", label: "Té" },
    { value: "especias", label: "Especias" },
    { value: "otro", label: "Otro" },
  ];

  return (
    <div className="min-h-screen w-full bg-white/50 flex flex-col items-center justify-center px-4 py-8">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://readdy.ai/api/search-image?query=Peruvian%20Andes%20mountains%20panorama%20at%20golden%20hour%2C%20majestic%20peaks%20and%20green%20valleys%2C%20warm%20amber%20light%2C%20cinematic%20aerial%20view%2C%20nature%20landscape%20photography%2C%20rich%20brown%20and%20golden%20tones%2C%20coffee%20and%20cacao%20growing%20region&width=1920&height=1080&seq=auth-video-poster&orientation=landscape"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/35 via-rose-900/20 to-stone-900/40" />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8 flex flex-col items-center gap-3">
        <img
          src="https://public.readdy.ai/ai/img_res/c99949a7-105a-4e7e-b54f-999d11a6f167.png"
          alt="Logo Portal de Proveedores"
          className="h-14 w-auto"
        />
        <span className="text-rose-100 font-sans font-bold text-lg tracking-wide">Portal de Proveedores</span>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-rose-100/40 p-6 md:p-8">
        {/* Tabs */}
        <div className="flex rounded-full bg-rose-50/60 p-1 mb-8">
          <button
            onClick={() => switchMode("login")}
            className={`flex-1 py-2.5 px-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              mode === "login"
                ? "bg-rose-800 text-white shadow-sm"
                : "text-rose-900/70 hover:text-rose-950"
            }`}
          >
            Acceso Normal
          </button>
          <button
            onClick={() => switchMode("register")}
            className={`flex-1 py-2.5 px-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              mode === "register"
                ? "bg-rose-800 text-white shadow-sm"
                : "text-rose-900/70 hover:text-rose-950"
            }`}
          >
            Primer Acceso
          </button>
          <button
            onClick={() => switchMode("new")}
            className={`flex-1 py-2.5 px-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              mode === "new"
                ? "bg-rose-800 text-white shadow-sm"
                : "text-rose-900/70 hover:text-rose-950"
            }`}
          >
            Nuevo
          </button>
        </div>

        {/* Content with transition */}
        <div key={mode} className="animate-auth-fade-in">
          {/* Title */}
          <h2 className="text-xl font-serif font-bold text-rose-950 mb-1">
          {mode === "login"
            ? "Iniciar Sesión"
            : mode === "register"
              ? "Configurar Contraseña"
              : "Registrarse como Proveedor"}
        </h2>
        <p className="text-sm text-rose-800/60 mb-6">
          {mode === "login"
            ? "Ingrese su código de proveedor y contraseña."
            : mode === "register"
              ? "Ingrese su código de proveedor para crear su contraseña."
              : "Complete sus datos para obtener un código de proveedor único."}
        </p>

        {/* Form */}
        <form
          onSubmit={
            mode === "login"
              ? handleLogin
              : mode === "register"
                ? handleRegister
                : handleNewSupplier
          }
          className="space-y-4"
        >
          {/* Código de proveedor - solo login y primer acceso */}
          {(mode === "login" || mode === "register") && (
            <div>
              <label htmlFor="supplier_id" className="block text-sm font-medium text-rose-900/80 mb-1.5">
                Código de Proveedor
              </label>
              <input
                id="supplier_id"
                type="text"
                value={supplierId}
                onChange={(e) => handleSupplierIdChange(e.target.value)}
                placeholder="Ej: SUP-001"
                className="w-full px-4 py-3 rounded-md border border-rose-200/70 text-sm text-rose-950 placeholder:text-rose-700/50 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all bg-white/30"
                required
              />
            </div>
          )}

          {/* Nombre - solo nuevo registro */}
          {mode === "new" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-rose-900/80 mb-1.5">
                Nombre Completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Ej: María García"
                className="w-full px-4 py-3 rounded-md border border-rose-200/70 text-sm text-rose-950 placeholder:text-rose-700/50 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all bg-white/30"
                required
              />
            </div>
          )}


          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-rose-900/80 mb-1.5">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                mode === "login"
                  ? "Ingrese su contraseña"
                  : "Cree su contraseña (mín. 6 caracteres)"
              }
              className="w-full px-4 py-3 rounded-md border border-rose-200/70 text-sm text-rose-950 placeholder:text-rose-700/50 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all bg-white/30"
              required
              minLength={mode === "register" || mode === "new" ? 6 : undefined}
            />
          </div>

          {/* Confirmar contraseña - solo primer acceso y nuevo registro */}
          {(mode === "register" || mode === "new") && (
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-rose-900/80 mb-1.5">
                Confirmar Contraseña
              </label>
              <input
                id="confirm_password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita su contraseña"
                className="w-full px-4 py-3 rounded-md border border-rose-200/70 text-sm text-rose-950 placeholder:text-rose-700/50 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-transparent transition-all bg-white/30"
                required
              />
            </div>
          )}

          {/* Hints */}
          {showFirstAccessHint && (
            <div className="bg-white border border-rose-100 rounded-md p-3 flex items-start gap-2">
              <i className="ri-information-line text-rose-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-rose-800">
                Este es su primer acceso. Por favor, use la pestaña{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="font-semibold underline cursor-pointer"
                >
                  Primer Acceso
                </button>{" "}
                para configurar su contraseña.
              </p>
            </div>
          )}

          {showNormalAccessHint && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 flex items-start gap-2">
              <i className="ri-check-line text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-700">
                Este proveedor ya tiene contraseña configurada. Use la pestaña{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="font-semibold underline cursor-pointer"
                >
                  Acceso Normal
                </button>{" "}
                para ingresar.
              </p>
            </div>
          )}

          {/* Nuevo código mostrado tras registro exitoso */}
          {newSupplierId && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 text-center">
              <p className="text-xs text-emerald-700 mb-1">Su código de proveedor es:</p>
              <p className="text-lg font-bold font-mono text-emerald-800">{newSupplierId}</p>
              <p className="text-xs text-emerald-600 mt-1">Guárdelo para futuros accesos</p>
            </div>
          )}

          {/* Error / Success messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-start gap-2">
              <i className="ri-error-warning-line text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {success && !newSupplierId && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 flex items-start gap-2">
              <i className="ri-check-line text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-emerald-700">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-800 text-white py-3 rounded-md font-sans font-medium text-sm hover:bg-rose-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            {isSubmitting
              ? "Procesando..."
              : mode === "login"
                ? "Ingresar al Portal"
                : mode === "register"
                  ? "Crear Contraseña e Ingresar"
                  : "Registrarme y Obtener Código"}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-rose-900/50 hover:text-rose-950 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-1" />
            Volver al inicio
          </button>
        </div>
        </div>
      </div>

      {/* Help text */}],
      <p className="relative z-10 mt-6 text-xs text-rose-100/50 text-center max-w-sm font-sans">
        Códigos de prueba: SUP-001 (café, sin contraseña), SUP-002 (cacao, sin contraseña), SUP-003 (café, contraseña: demo123)
      </p>
    </div>
  );
}