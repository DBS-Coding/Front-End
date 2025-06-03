import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, X, Save, AlertCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useCrudSoekarnoPresenter } from '../presenters/CrudSoekarnoPresenter';
import { clsx } from 'clsx';

const CrudSoekarnoView = () => {
  const {
    tags,
    isLoading,
    error,
    selectedTag,
    isModalOpen,
    modalMode,
    createTag,
    updateTag,
    removeTag,
    openModal,
    closeModal,
    clearError,
  } = useCrudSoekarnoPresenter();

  const [formData, setFormData] = useState({
    nama: '',
    tag: '',
    input: [],
    responses: []
  });
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [notification, setNotification] = useState(null);

  React.useEffect(() => {
    if (selectedTag) {
      setFormData({
        nama: selectedTag?.nama || '',
        tag: selectedTag?.tag || '',
        input: Array.isArray(selectedTag?.input) ? selectedTag.input : [],
        responses: Array.isArray(selectedTag?.responses) ? selectedTag.responses : []
      });
    } else {
      setFormData({
        nama: '',
        tag: '',
        input: [],
        responses: []
      });
    }
  }, [selectedTag]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nama.trim()) {
      showNotification('Tokoh is required', 'error');
      return;
    }

    if (!formData.tag.trim()) {
      showNotification('Tag name is required', 'error');
      return;
    }

    if (!Array.isArray(formData.input) || formData.input.length === 0) {
      showNotification('At least one input is required', 'error');
      return;
    }

    if (!Array.isArray(formData.responses) || formData.responses.length === 0) {
      showNotification('At least one response is required', 'error');
      return;
    }

    const result = modalMode === 'create' 
      ? await createTag(formData)
      : await updateTag(formData);

    if (result?.success) {
      showNotification(result.message, 'success');
    } else if (result?.message) {
      showNotification(result.message, 'error');
    }
  };

  const handleDelete = async (tagName) => {
    if (window.confirm(`Are you sure you want to delete "${tagName}"?`)) {
      const result = await removeTag(tagName);
      if (result?.success) {
        showNotification(result.message, 'success');
      } else if (result?.message) {
        showNotification(result.message, 'error');
      }
    }
  };

  const addInput = () => {
    if (inputText.trim()) {
      setFormData(prev => ({
        ...prev,
        input: [...prev.input, inputText.trim()]
      }));
      setInputText('');
    }
  };

  const removeInput = (index) => {
    setFormData(prev => ({
      ...prev,
      input: prev.input.filter((_, i) => i !== index)
    }));
  };

  const addResponse = () => {
    if (responseText.trim()) {
      setFormData(prev => ({
        ...prev,
        responses: [...prev.responses, responseText.trim()]
      }));
      setResponseText('');
    }
  };

  const removeResponse = (index) => {
    setFormData(prev => ({
      ...prev,
      responses: prev.responses.filter((_, i) => i !== index)
    }));
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-full"
      >
        <div className="bg-transparent border border-[#ffffff34] rounded-lg p-4 md:p-6 h-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Kelola Data CRUD Soekarno</h2>
            <button
              onClick={() => openModal('create')}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-transparent border border-[#ffffff34] hover:ring-1 hover:ring-neutral-400 rounded-lg transition-all duration-200"
            >
              <Plus size={16} />
              Tambah Tag
            </button>
          </div>

          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={clsx(
                  "mb-4 p-3 rounded-lg border flex items-center gap-2 text-sm",
                  {
                    'bg-green-900/40 border-green-600/40 text-green-300': notification.type === 'success',
                    'bg-red-900/40 border-red-600/40 text-red-300': notification.type === 'error'
                  }
                )}
              >
                <AlertCircle size={16} />
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-900/40 border border-red-600/40 rounded-lg text-red-300 flex items-center gap-2 text-sm"
            >
              <AlertCircle size={16} />
              {error}
              <button onClick={clearError} className="ml-auto">
                <X size={16} />
              </button>
            </motion.div>
          )}

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#ffffff34]">
                  <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Tag</th>
                  <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Tokoh</th>
                  <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Input</th>
                  <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Response</th>
                  <th className="text-left py-3 px-4 font-semibold whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-gray-600 border-t-white rounded-full"
                        />
                        <span className="ml-2">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : !Array.isArray(tags) || tags.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">
                      {!Array.isArray(tags) ? 'Error: Data tidak valid' : 'Belum ada data tag'}
                    </td>
                  </tr>
                ) : (
                  tags.map((tag, index) => (
                    <motion.tr
                      key={tag?.tag || `tag-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-[#ffffff34] hover:bg-gray-800/20"
                    >
                      <td className="py-3 px-4 font-medium whitespace-nowrap">{tag?.tag || 'N/A'}</td>
                      <td className="py-3 px-4">{tag?.nama || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(tag?.input) ? tag.input.slice(0, 2).map((inp, i) => (
                            <span key={i} className="text-xs bg-blue-900/40 px-2 py-1 rounded max-w-[150px] truncate">
                              {inp || 'N/A'}
                            </span>
                          )) : (
                            <span className="text-xs text-gray-400">No inputs</span>
                          )}
                          {Array.isArray(tag?.input) && tag.input.length > 2 && (
                            <span className="text-xs text-gray-400">+{tag.input.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(tag?.responses) ? tag.responses.slice(0, 2).map((resp, i) => (
                            <span key={i} className="text-xs bg-green-900/40 px-2 py-1 rounded max-w-[150px] truncate">
                              {resp || 'N/A'}
                            </span>
                          )) : (
                            <span className="text-xs text-gray-400">No responses</span>
                          )}
                          {Array.isArray(tag?.responses) && tag.responses.length > 2 && (
                            <span className="text-xs text-gray-400">+{tag.responses.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal('view', tag)}
                            className="p-1 hover:bg-gray-700 rounded"
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openModal('edit', tag)}
                            className="p-1 hover:bg-gray-700 rounded"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(tag?.tag)}
                            className="p-1 hover:bg-red-700 rounded text-red-400"
                            title="Delete"
                            disabled={!tag?.tag}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#212529] border border-[#ffffff34] rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {modalMode === 'create' && 'Tambah Tag Baru'}
                    {modalMode === 'edit' && 'Edit Tag'}
                    {modalMode === 'view' && 'Detail Tag'}
                  </h3>
                  <button onClick={closeModal} className="hover:bg-gray-700 p-1 rounded">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tokoh</label>
                    <select
                      value={formData.nama}
                      onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                      className="w-full px-3 py-2 bg-neutral-800 text-white border border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600"
                      disabled={modalMode === 'view'}
                      required
                    >
                      <option value="" className="bg-neutral-800 text-white">Pilih Tokoh</option>
                      <option value="Soekarno" className="bg-neutral-800 text-white">Soekarno</option>
                      <option value="Hatta" className="bg-neutral-800 text-white">Hatta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tag Name</label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                      className="w-full px-3 py-2 bg-transparent border border-[#ffffff34] rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600"
                      disabled={modalMode === 'view'}
                      placeholder="Enter tag name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Inputs</label>
                    {modalMode !== 'view' && (
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          className="flex-1 px-3 py-2 bg-transparent border border-[#ffffff34] rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600"
                          placeholder="Add new input"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInput())}
                        />
                        <button
                          type="button"
                          onClick={addInput}
                          className="px-3 py-2 bg-transparent border border-[#ffffff34] hover:ring-1 hover:ring-neutral-400 rounded-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {Array.isArray(formData.input) && formData.input.length > 0 ? (
                        formData.input.map((inp, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-800/20 rounded">
                            <span className="flex-1 text-sm">{inp || 'Empty input'}</span>
                            {modalMode !== 'view' && (
                              <button
                                type="button"
                                onClick={() => removeInput(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-400 p-2">No inputs added yet</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Responses</label>
                    {modalMode !== 'view' && (
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          className="flex-1 px-3 py-2 bg-transparent border border-[#ffffff34] rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600"
                          placeholder="Add new response"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponse())}
                        />
                        <button
                          type="button"
                          onClick={addResponse}
                          className="px-3 py-2 bg-transparent border border-[#ffffff34] hover:ring-1 hover:ring-neutral-400 rounded-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {Array.isArray(formData.responses) && formData.responses.length > 0 ? (
                        formData.responses.map((resp, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-800/20 rounded">
                            <span className="flex-1 text-sm">{resp || 'Empty response'}</span>
                            {modalMode !== 'view' && (
                              <button
                                type="button"
                                onClick={() => removeResponse(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-400 p-2">No responses added yet</div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-[#ffffff34] hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {modalMode === 'view' ? 'Close' : 'Cancel'}
                    </button>
                    {modalMode !== 'view' && (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-transparent border border-[#ffffff34] hover:ring-1 hover:ring-neutral-400 rounded-lg transition-all duration-200 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-gray-600 border-t-white rounded-full"
                          />
                        ) : (
                          <Save size={16} />
                        )}
                        {modalMode === 'create' ? 'Create' : 'Update'}
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
};

export default CrudSoekarnoView;