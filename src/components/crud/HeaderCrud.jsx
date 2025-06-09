// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Database, Plus } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const HeaderCrud = ({tags, openModal, Icon, name}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300 shadow-lg">
            <Database className="w-5 h-5 text-amber-900" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border border-amber-300">
            <Icon className="w-2 h-2 text-amber-900" />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-amber-100">
            Kelola Data CRUD {name}
          </h2>
          <p className="text-amber-200 text-xs">
            Manajemen kategori percakapan, pertanyaan & respon
          </p>
        </div>
      </div>

      {tags.length >= 15 ? (
        <motion.button
          disabled
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 text-gray-500 font-semibold rounded-xl border-2 border-gray-300 cursor-not-allowed"
          whileHover={{ scale: 1 }} // tidak aktif
          whileTap={{ scale: 1 }} // tidak aktif
        >
          <span className="text-sm sm:text-base">Maksimal 15 tag tercapai</span>
        </motion.button>
      ) : (
        <motion.button
          onClick={() => openModal("create")}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 border-2 border-amber-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={18} />
          <span className="text-sm">Tambah Tag {name} Baru</span>
        </motion.button>
      )}
    </div>
  );
};

export default HeaderCrud;
