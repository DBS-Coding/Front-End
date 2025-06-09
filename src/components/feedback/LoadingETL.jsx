import { Database, Crown } from "lucide-react";

const LoadingETL = ({ show, seconds, videoUrl }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl p-6 shadow-2xl w-[90vw] sm:w-[400px] flex flex-col space-y-4">
        {/* Header */}
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
            <h2 className="text-xl font-bold text-amber-100">Memuat ETL model TFJS</h2>
            <p className="text-amber-200 text-sm">
              Selagi menunggu, kamu bisa menikmati tayangan ini!
            </p>
          </div>
        </div>

        {/* YouTube Video */}
        <iframe
          width="100%"
          height="300"
          src={`https://www.youtube.com/embed/${videoUrl}`}
          title="YouTube video player"
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl border border-amber-500/20 shadow-lg"
        />

        {/* ETA */}
        <p className="text-amber-300 text-sm text-center">
          (ETA 1 menit • {seconds}s){" "}
          <a
            href="https://github.com/DBS-Coding/histotalk-model1-tfjs/actions"
            target="_blank"
            rel="noopener noreferrer"
          >
            ⏩
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoadingETL;
