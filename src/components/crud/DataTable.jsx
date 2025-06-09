// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Database, Settings, Eye, Edit, Trash2 } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const DataTable = ({isLoading, tags, handleDelete, openModal, Icon}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-b-2 border-amber-400/30">
              <th className="text-left py-3 px-4 font-bold text-amber-100 text-sm">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-amber-400" />
                  Tag
                </div>
              </th>
              <th className="text-left py-3 px-4 font-bold text-amber-100 text-sm hidden sm:table-cell">
                Input
              </th>
              <th className="text-left py-3 px-4 font-bold text-amber-100 text-sm hidden md:table-cell">
                Response
              </th>
              <th className="text-left py-3 px-4 font-bold text-amber-100 text-sm">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-400" />
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 sm:py-12">
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-6 h-6 sm:w-8 sm:h-8 border-3 border-amber-400 border-t-transparent rounded-full"
                    />
                    <span className="text-amber-200 text-sm font-medium">
                      Memuat data...
                    </span>
                  </div>
                </td>
              </tr>
            ) : !Array.isArray(tags) || tags.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 sm:py-12">
                  <div className="flex flex-col items-center gap-3">
                    <Database className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400/50" />
                    <span className="text-amber-200/70 text-sm font-medium">
                      {!Array.isArray(tags)
                        ? "Error: Data tidak valid"
                        : "Belum ada data tag"}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              tags.map((tag, index) => (
                <motion.tr
                  key={tag?.tag || `tag-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-amber-400/20 hover:bg-amber-500/10 transition-all duration-300"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs font-semibold text-black">
                        {index + 1}
                      </div>
                      <span className="font-medium text-amber-100 text-sm">
                        {tag?.tag}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(tag?.input)
                        ? tag.input.slice(0, 2).map((inp, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-500/20 border border-blue-400/30 px-2 py-0.5 rounded-full max-w-[100px] truncate text-blue-200"
                            >
                              {inp || "N/A"}
                            </span>
                          ))
                        : null}
                      {Array.isArray(tag?.input) && tag.input.length > 2 && (
                        <span className="text-xs text-amber-300 font-medium">
                          +{tag.input.length - 2}
                        </span>
                      )}
                      {!Array.isArray(tag?.input) && (
                        <span className="text-xs text-amber-400/50">
                          No inputs
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(tag?.responses)
                        ? tag.responses.slice(0, 2).map((resp, i) => (
                            <span
                              key={i}
                              className="text-xs bg-green-500/20 border border-green-400/30 px-2 py-0.5 rounded-full max-w-[100px] truncate text-green-200"
                            >
                              {resp || "N/A"}
                            </span>
                          ))
                        : null}
                      {Array.isArray(tag?.responses) &&
                        tag.responses.length > 2 && (
                          <span className="text-xs text-amber-300 font-medium">
                            +{tag.responses.length - 2}
                          </span>
                        )}
                      {!Array.isArray(tag?.responses) && (
                        <span className="text-xs text-amber-400/50">
                          No responses
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => openModal("view", tag)}
                        className="p-1.5 sm:p-2 bg-black/30 border border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/10 rounded-lg transition-all duration-300"
                        title="View"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={16} className="text-amber-300" />
                      </motion.button>
                      <motion.button
                        onClick={() => openModal("edit", tag)}
                        className="p-1.5 sm:p-2 bg-black/30 border border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
                        title="Edit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={16} className="text-blue-300" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(tag?.id, tag?.tag)}
                        className="p-1.5 sm:p-2 bg-black/30 border border-red-400/30 hover:border-red-400/60 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                        title="Delete"
                        disabled={!tag?.tag}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={16} className="text-red-300" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
