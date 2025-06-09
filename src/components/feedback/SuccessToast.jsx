import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

const SuccessToast = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 4500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed right-4 top-5 z-50">
      <div className="flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-emerald-400/50 text-emerald-100 px-4 py-3 rounded-xl shadow-lg">
        <CheckCircle className="w-5 h-5 text-emerald-300" />
        <p className="text-sm">Model TFJS berhasil diperbaharui!</p>
        <button onClick={onClose} className="hover:text-white/80 transition">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default SuccessToast;
