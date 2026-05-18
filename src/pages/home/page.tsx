import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay blocked, muted should handle it
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background Video with Warm Golden Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          poster="https://readdy.ai/api/search-image?query=Stunning%20Peruvian%20Andes%20mountain%20landscape%20at%20golden%20hour%2C%20terraced%20agricultural%20fields%20on%20green%20hillsides%2C%20warm%20amber%20and%20gold%20sunlight%2C%20dramatic%20clouds%2C%20editorial%20photography%20style%2C%20rich%20brown%20and%20golden%20tones%2C%20coffee%20and%20cacao%20growing%20region%2C%20cinematic%20wide%20angle&width=1920&height=1080&seq=hero-bg-2&orientation=landscape"
        >
          <source
            src="https://videos.pexels.com/video-files/857251/857251-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/60 via-rose-900/40 to-stone-900/70" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-3">
          <img
            src="https://public.readdy.ai/ai/img_res/c99949a7-105a-4e7e-b54f-999d11a6f167.png"
            alt="Logo Portal de Proveedores"
            className="h-10 w-auto"
          />
          <span className="text-white font-sans font-medium text-lg tracking-wide hidden sm:block">
            Portal de Proveedores
          </span>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="animate-fade-in-up text-rose-200 font-sans font-bold text-base sm:text-lg tracking-[0.25em] uppercase mb-4">
            Portal Exclusivo
          </p>
          <h1 className="animate-fade-in-up delay-200 font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
            Bienvenidos Proveedores
          </h1>
          <p className="animate-fade-in-up delay-300 mt-8 text-lg md:text-xl text-white/75 max-w-lg mx-auto leading-relaxed font-sans font-bold">
            Acceda a su panel privado para gestionar su información de manera segura y exclusiva.
          </p>
          <div className="animate-fade-in-scale delay-400 mt-12">
            <button
              onClick={() => navigate("/auth")}
              className="relative inline-flex items-center gap-3 bg-rose-600 text-white px-10 py-4 rounded-md font-sans font-medium text-base hover:bg-rose-500 transition-all duration-300 whitespace-nowrap cursor-pointer overflow-hidden"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            >
              <span className="absolute inset-0 pointer-events-none overflow-hidden">
                <span
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                    animation: "shine 2.5s ease-in-out infinite",
                    transform: "skewX(-20deg)",
                  }}
                />
              </span>
              <span className="relative z-10">Acceder al Portal</span>
              <i className="ri-arrow-right-line text-lg relative z-10" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="relative z-10 w-full text-center py-6">
        <p className="animate-fade-in-up delay-500 text-white/40 text-sm font-sans tracking-wide">
          Portal exclusivo para proveedores registrados
        </p>
      </footer>
    </div>
  );
}