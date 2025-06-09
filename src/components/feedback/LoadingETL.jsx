import { Database, Crown } from "lucide-react";

const LoadingETL = ({ show, videoSrc }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl p-6 shadow-2xl max-w-md w-[90vw] sm:w-[400px] flex flex-col space-y-4">
        <div className="flex items-center justify-start gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300 shadow-lg">
              <Database className="w-6 h-6 text-amber-900" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border border-amber-300">
              <Crown className="w-2.5 h-2.5 text-amber-900" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-amber-100">Memuat Data</h2>
            <p className="text-amber-200 text-sm">Proses update data model sedang berjalan...</p>
          </div>
        </div>

        <video
          autoPlay
          loop
          muted
          className="w-full rounded-xl border border-amber-500/20 shadow-lg"
        >
          <source src={videoSrc} type="video/mp4" />
          Browser tidak mendukung video.
        </video>

        <p className="text-amber-300 text-sm text-center">Mohon tunggu beberapa saat</p>
      </div>
    </div>
  );
};

export default LoadingETL;
