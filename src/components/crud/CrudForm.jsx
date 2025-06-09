// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Database, Scroll, Plus, X, Save } from "lucide-react";

const CrudForm = ({handleSubmit, formData, setFormData, modalMode, inputText, addInput, removeInput, setInputText, responseText, addResponse, removeResponse, setResponseText, closeModal, isLoading}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Tag Name */}
      <div>
        <label className="text-xs sm:text-sm font-bold mb-2 text-amber-100 flex items-center gap-2">
          <Scroll className="w-4 h-4 text-amber-400" />
          Tag Name
        </label>
        <input
          type="text"
          value={formData.tag}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tag: e.target.value,
            }))
          }
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300 text-amber-100 placeholder-amber-200/50 text-sm"
          disabled={modalMode === "view"}
          placeholder="Enter tag name"
          required
        />
      </div>

      {/* Inputs Section */}
      <div>
        <label className="block text-xs sm:text-sm font-bold mb-2 text-amber-100">
          Inputs
        </label>
        {modalMode !== "view" && (
          <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300 text-amber-100 placeholder-amber-200/50 text-sm"
              placeholder="Add new input"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addInput())
              }
            />
            <motion.button
              type="button"
              onClick={addInput}
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-blue-900 font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg border-2 border-blue-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={18} />
            </motion.button>
          </div>
        )}
        <div className="space-y-2 max-h-40 overflow-y-auto bg-black/20 backdrop-blur-sm border border-amber-400/20 rounded-xl p-2 sm:p-3">
          {Array.isArray(formData.input) && formData.input.length > 0 ? (
            formData.input.map((inp, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="flex-1 text-xs sm:text-sm text-blue-200">
                  {inp || "Empty input"}
                </span>
                {modalMode !== "view" && (
                  <motion.button
                    type="button"
                    onClick={() => removeInput(index)}
                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4 sm:py-6">
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400/50 mx-auto mb-2" />
              <div className="text-xs sm:text-sm text-amber-200/50">
                No inputs added yet
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Responses Section */}
      <div>
        <label className="block text-xs sm:text-sm font-bold mb-2 text-amber-100">
          Responses
        </label>
        {modalMode !== "view" && (
          <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
            <input
              type="text"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300 text-amber-100 placeholder-amber-200/50 text-sm"
              placeholder="Add new response"
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addResponse())
              }
            />
            <motion.button
              type="button"
              onClick={addResponse}
              className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-green-900 font-bold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg border-2 border-green-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={18} />
            </motion.button>
          </div>
        )}
        <div className="space-y-2 max-h-40 overflow-y-auto bg-black/20 backdrop-blur-sm border border-amber-400/20 rounded-xl p-2 sm:p-3">
          {Array.isArray(formData.responses) &&
          formData.responses.length > 0 ? (
            formData.responses.map((resp, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-500/20 border border-green-400/30 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="flex-1 text-xs sm:text-sm text-green-200">
                  {resp || "Empty response"}
                </span>
                {modalMode !== "view" && (
                  <motion.button
                    type="button"
                    onClick={() => removeResponse(index)}
                    className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4 sm:py-6">
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400/50 mx-auto mb-2" />
              <div className="text-xs sm:text-sm text-amber-200/50">
                No responses added yet
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Actions */}
      <div className="flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-amber-400/30">
        <motion.button
          type="button"
          onClick={closeModal}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-black/30 border-2 border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/10 rounded-xl transition-all duration-300 text-amber-200 font-medium text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {modalMode === "view" ? "Close" : "Cancel"}
        </motion.button>
        {modalMode !== "view" && (
          <motion.button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 border-2 border-amber-300 disabled:opacity-50 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-amber-900 border-t-transparent rounded-full"
              />
            ) : (
              <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
            )}
            {modalMode === "create" ? "Create" : "Update"}
          </motion.button>
        )}
      </div>
    </form>
  );
};

export default CrudForm;
