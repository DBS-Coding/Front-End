// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const EtlTrigger = ({ handleETL, loadingEtl }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClickUpdate = () => {
    setShowConfirmModal(true);
  };

  return (
    <>
      <div className="pt-4 flex justify-end">
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 4px 12px rgba(251, 191, 36, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="border-2 border-amber-400/30 bg-transparent text-amber-400 font-medium rounded-lg px-6 py-2 hover:text-white duration-200"
          onClick={handleClickUpdate}
          disabled={loadingEtl}
        >
          {loadingEtl
            ? "Model TFJS sedang diupdate..."
            : "🚀 Update Model TFJS"}
        </motion.button>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 border border-amber-400/40 rounded-xl p-6 max-w-sm w-full text-center shadow-xl text-amber-100"
          >
            <h2 className="text-lg font-semibold mb-4">
              Konfirmasi Pembaruan Model
            </h2>
            <p className="text-sm mb-6 text-amber-200">
              Apakah Anda yakin ingin melakukan pembaruan Model TFJS sekarang?{" "}
              <br />
              <br />
              Pastikan bahwa:
              <ul className="list-disc list-inside mt-2 text-left text-xs leading-relaxed text-amber-300">
                <li>
                  Seluruh data <strong>tag</strong> sudah diperbarui dan sesuai.
                </li>
                <li>
                  Jumlah data <strong>input latih</strong> sudah mencukupi untuk
                  hasil yang optimal.
                </li>
              </ul>
              <br />
              Proses ini akan memengaruhi performa model ke depannya.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  handleETL();
                }}
                className="px-4 py-2 rounded-lg bg-amber-500 text-black font-medium hover:bg-amber-600 transition"
              >
                Ya, Lanjutkan
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg border border-amber-400/30 text-amber-300 hover:bg-black/30 transition"
              >
                Batal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EtlTrigger;
