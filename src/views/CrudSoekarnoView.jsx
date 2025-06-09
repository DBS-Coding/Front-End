import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  AlertCircle,
  Crown,
  Scroll,
  Database,
  Settings,
  Shield,
  Search,
} from 'lucide-react';
import Layout from '../components/common/Layout';
import { useCrudSoekarnoPresenter } from '../presenters/CrudSoekarnoPresenter';
import { clsx } from 'clsx';
import { etlSoekarno } from '../api/npcApi';
import video from "../assets/gif.mp4";
import SuccessToast from '../components/feedback/successToast';
import ErrorToast from '../components/feedback/errorToast';
import LoadingETL from '../components/feedback/LoadingETL';

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
    responses: [],
  });
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [notification, setNotification] = useState(null);
  const [loadingEtl, setLoadingEtl] = useState(false);
  const [successEtl, setSuccessEtl] = useState(false);
  const [errorEtl, setErrorEtl] = useState(false);

  useEffect(() => {
    if (selectedTag) {
      setFormData({
        nama: selectedTag?.nama || '',
        tag: selectedTag?.tag || '',
        input: Array.isArray(selectedTag?.input) ? selectedTag.input : [],
        responses: Array.isArray(selectedTag?.responses)
          ? selectedTag.responses
          : [],
      });
    } else {
      setFormData({
        nama: '',
        tag: '',
        input: [],
        responses: [],
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

    const result =
      modalMode === 'create'
        ? await createTag(formData)
        : await updateTag(formData);

    if (result?.success) {
      showNotification(result.message, 'success');
    } else if (result?.message) {
      showNotification(result.message, 'error');
    }
  };

  const handleDelete = async (tagId, tagName) => {
    if (window.confirm(`Are you sure you want to delete "${tagName}"?`)) {
      const result = await removeTag(tagId);
      if (result?.success) {
        showNotification(result.message, 'success');
      } else if (result?.message) {
        showNotification(result.message, 'error');
      }
    }
  };

  const addInput = () => {
    if (inputText.trim()) {
      setFormData((prev) => ({
        ...prev,
        input: [...prev.input, inputText.trim()],
      }));
      setInputText('');
    }
  };

  const removeInput = (index) => {
    setFormData((prev) => ({
      ...prev,
      input: prev.input.filter((_, i) => i !== index),
    }));
  };

  const addResponse = () => {
    if (responseText.trim()) {
      setFormData((prev) => ({
        ...prev,
        responses: [...prev.responses, responseText.trim()],
      }));
      setResponseText('');
    }
  };

  const removeResponse = (index) => {
    setFormData((prev) => ({
      ...prev,
      responses: prev.responses.filter((_, i) => i !== index),
    }));
  };

  const handleETL = async () => {
    setLoadingEtl(true);
    setSuccessEtl(false);
    setErrorEtl(false);
    try {
      await etlSoekarno();
      setSuccessEtl(true);
    } catch(err) {
      console.error(err);
      setErrorEtl(true);
    } finally {
      setLoadingEtl(false);
    }
  };

  return (
    <Layout>
      {loadingEtl && (
          <LoadingETL show={loadingEtl} videoSrc={video}/>
      )}

      {!loadingEtl && successEtl && (
          <SuccessToast show={successEtl} onClose={() => setSuccessEtl(false)}/>
      )}

      {!loadingEtl && errorEtl && (
          <ErrorToast show={errorEtl} onClose={() => setErrorEtl(false)}/>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='h-full'
      >
        <div className='bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl p-4 sm:p-6 shadow-2xl h-full'>
          {/* Header */}
          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300 shadow-lg'>
                  <Database className='w-6 h-6 text-amber-900' />
                </div>
                <div className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center border border-amber-300'>
                  <Crown className='w-2.5 h-2.5 text-amber-900' />
                </div>
              </div>
              <div>
                <h2 className='text-xl sm:text-2xl font-bold text-amber-100'>
                  Kelola Data CRUD Soekarno
                </h2>
                <p className='text-amber-200 text-xs sm:text-sm'>
                  Manajemen konten percakapan dengan IR. Soekarno
                </p>
              </div>
            </div>

            <motion.button
              onClick={() => openModal('create')}
              className='w-full md:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 border-2 border-amber-300'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={18} />
              <span className='text-sm sm:text-base'>Tambah Tag Baru</span>
            </motion.button>
          </div>

          {/* Notifications */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={clsx(
                  'mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl border-2 flex items-center gap-3 backdrop-blur-sm',
                  {
                    'bg-green-500/20 border-green-400/50 text-green-200':
                      notification.type === 'success',
                    'bg-red-500/20 border-red-400/50 text-red-200':
                      notification.type === 'error',
                  }
                )}
              >
                <AlertCircle size={18} />
                <span className='text-sm sm:text-base font-medium'>
                  {notification.message}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/20 border-2 border-red-400/50 rounded-xl text-red-200 flex items-center gap-3 backdrop-blur-sm'
            >
              <Shield size={18} />
              <span className='flex-1 text-sm sm:text-base font-medium'>
                {error}
              </span>
              <button
                onClick={clearError}
                className='hover:bg-red-500/20 p-1 rounded-lg transition-colors'
              >
                <X size={18} />
              </button>
            </motion.div>
          )}

          {/* Data Table */}
          <div className='bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl overflow-hidden shadow-xl'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-b-2 border-amber-400/30'>
                    <th className='text-left py-3 px-4 font-bold text-amber-100 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Crown className='w-4 h-4 text-amber-400' />
                        Tag
                      </div>
                    </th>
                    <th className='text-left py-3 px-4 font-bold text-amber-100 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Scroll className='w-4 h-4 text-amber-400' />
                        Tokoh
                      </div>
                    </th>
                    <th className='text-left py-3 px-4 font-bold text-amber-100 text-sm hidden sm:table-cell'>
                      Input
                    </th>
                    <th className='text-left py-3 px-4 font-bold text-amber-100 text-sm hidden md:table-cell'>
                      Response
                    </th>
                    <th className='text-left py-3 px-4 font-bold text-amber-100 text-sm'>
                      <div className='flex items-center gap-2'>
                        <Settings className='w-4 h-4 text-amber-400' />
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan='5' className='text-center py-8 sm:py-12'>
                        <div className='flex flex-col items-center gap-3'>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: 'linear',
                            }}
                            className='w-6 h-6 sm:w-8 sm:h-8 border-3 border-amber-400 border-t-transparent rounded-full'
                          />
                          <span className='text-amber-200 text-sm font-medium'>
                            Memuat data...
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : !Array.isArray(tags) ||
                    tags.length === 0 ? (
                    <tr>
                      <td colSpan='5' className='text-center py-8 sm:py-12'>
                        <div className='flex flex-col items-center gap-3'>
                          <Database className='w-10 h-10 sm:w-12 sm:h-12 text-amber-400/50' />
                          <span className='text-amber-200/70 text-sm font-medium'>
                            {!Array.isArray(tags)
                              ? 'Error: Data tidak valid'
                              : 'Belum ada data tag'}
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
                        className='border-b border-amber-400/20 hover:bg-amber-500/10 transition-all duration-300'
                      >
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-amber-400 rounded-full'></div>
                            <span className='font-medium text-amber-100 text-sm'>
                              {tag?.tag || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex items-center gap-2'>
                            <Crown className='w-4 h-4 text-amber-400' />
                            <span className='text-amber-200 text-sm'>
                              {tag?.nama || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className='py-3 px-4 hidden sm:table-cell'>
                          <div className='flex flex-wrap gap-1.5'>
                            {Array.isArray(tag?.input)
                              ? tag.input.slice(0, 2).map((inp, i) => (
                                  <span
                                    key={i}
                                    className='text-xs bg-blue-500/20 border border-blue-400/30 px-2 py-0.5 rounded-full max-w-[100px] truncate text-blue-200'
                                  >
                                    {inp || 'N/A'}
                                  </span>
                                ))
                              : null}
                            {Array.isArray(tag?.input) &&
                              tag.input.length > 2 && (
                                <span className='text-xs text-amber-300 font-medium'>
                                  +{tag.input.length - 2}
                                </span>
                              )}
                            {!Array.isArray(tag?.input) && (
                              <span className='text-xs text-amber-400/50'>
                                No inputs
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='py-3 px-4 hidden md:table-cell'>
                          <div className='flex flex-wrap gap-1.5'>
                            {Array.isArray(tag?.responses)
                              ? tag.responses.slice(0, 2).map((resp, i) => (
                                  <span
                                    key={i}
                                    className='text-xs bg-green-500/20 border border-green-400/30 px-2 py-0.5 rounded-full max-w-[100px] truncate text-green-200'
                                  >
                                    {resp || 'N/A'}
                                  </span>
                                ))
                              : null}
                            {Array.isArray(tag?.responses) &&
                              tag.responses.length > 2 && (
                                <span className='text-xs text-amber-300 font-medium'>
                                  +{tag.responses.length - 2}
                                </span>
                              )}
                            {!Array.isArray(tag?.responses) && (
                              <span className='text-xs text-amber-400/50'>
                                No responses
                              </span>
                            )}
                          </div>
                        </td>
                        <td className='py-3 px-4'>
                          <div className='flex gap-2'>
                            <motion.button
                              onClick={() => openModal('view', tag)}
                              className='p-1.5 sm:p-2 bg-black/30 border border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/10 rounded-lg transition-all duration-300'
                              title='View'
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Eye size={16} className='text-amber-300' />
                            </motion.button>
                            <motion.button
                              onClick={() => openModal('edit', tag)}
                              className='p-1.5 sm:p-2 bg-black/30 border border-blue-400/30 hover:border-blue-400/60 hover:bg-blue-500/10 rounded-lg transition-all duration-300'
                              title='Edit'
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Edit size={16} className='text-blue-300' />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDelete(tag?.id, tag?.tag)}
                              className='p-1.5 sm:p-2 bg-black/30 border border-red-400/30 hover:border-red-400/60 hover:bg-red-500/10 rounded-lg transition-all duration-300'
                              title='Delete'
                              disabled={!tag?.tag}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={16} className='text-red-300' />
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
          <div className="pt-4 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(251, 191, 36, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border-2 border-amber-400/30 bg-transparent text-amber-400 font-medium rounded-lg px-6 py-2 hover:text-white duration-200"
              onClick={handleETL} disabled={loadingEtl}
            >
              {loadingEtl ? "Data Model sedang diupdate" : "Update Data Model"}
            </motion.button>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className='bg-black/40 backdrop-blur-md border-2 border-amber-400/30 rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl'
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className='flex justify-between items-center mb-4 sm:mb-6'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300'>
                      {modalMode === 'create' && (
                        <Plus className='w-5 h-5 text-amber-900' />
                      )}
                      {modalMode === 'edit' && (
                        <Edit className='w-5 h-5 text-amber-900' />
                      )}
                      {modalMode === 'view' && (
                        <Eye className='w-5 h-5 text-amber-900' />
                      )}
                    </div>
                    <div>
                      <h3 className='text-xl sm:text-2xl font-bold text-amber-100'>
                        {modalMode === 'create' && 'Tambah Tag Baru'}
                        {modalMode === 'edit' && 'Edit Tag'}
                        {modalMode === 'view' && 'Detail Tag'}
                      </h3>
                      <p className='text-amber-200 text-xs sm:text-sm'>
                        {modalMode === 'create' &&
                          'Buat konten percakapan baru'}
                        {modalMode === 'edit' && 'Perbarui konten percakapan'}
                        {modalMode === 'view' &&
                          'Lihat detail konten percakapan'}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className='p-2 hover:bg-amber-500/20 rounded-lg transition-colors'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} className='text-amber-300' />
                  </motion.button>
                </div>

                {/* Modal Form */}
                <form
                  onSubmit={handleSubmit}
                  className='space-y-4 sm:space-y-6'
                >
                  {/* Tokoh Selection */}
                  <div>
                    <label className='text-xs sm:text-sm font-bold mb-2 text-amber-100 flex items-center gap-2'>
                      <Crown className='w-4 h-4 text-amber-400' />
                      Tokoh
                    </label>
                    <select
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nama: e.target.value,
                        }))
                      }
                      className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300 text-amber-100 text-sm'
                      disabled={modalMode === 'view'}
                      required
                    >
                      <option value='' className='bg-black text-amber-100'>
                        Pilih Tokoh
                      </option>
                      <option
                        value='Soekarno'
                        className='bg-black text-amber-100'
                      >
                        Soekarno
                      </option>
                      <option value='Hatta' className='bg-black text-amber-100'>
                        Hatta
                      </option>
                    </select>
                  </div>

                  {/* Tag Name */}
                  <div>
                    <label className='text-xs sm:text-sm font-bold mb-2 text-amber-100 flex items-center gap-2'>
                      <Scroll className='w-4 h-4 text-amber-400' />
                      Tag Name
                    </label>
                    <input
                      type='text'
                      value={formData.tag}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tag: e.target.value,
                        }))
                      }
                      className='w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300 text-amber-100 placeholder-amber-200/50 text-sm'
                      disabled={modalMode === 'view'}
                      placeholder='Enter tag name'
                      required
                    />
                  </div>

                  {/* Inputs Section */}
                  <div>
                    <label className='block text-xs sm:text-sm font-bold mb-2 text-amber-100'>
                      Inputs
                    </label>
                    {modalMode !== 'view' && (
                      <div className='flex gap-2 sm:gap-3 mb-3 sm:mb-4'>
                        <input
                          type='text'
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          className='flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300 text-amber-100 placeholder-amber-200/50 text-sm'
                          placeholder='Add new input'
                          onKeyPress={(e) =>
                            e.key === 'Enter' &&
                            (e.preventDefault(), addInput())
                          }
                        />
                        <motion.button
                          type='button'
                          onClick={addInput}
                          className='px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-blue-900 font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg border-2 border-blue-300'
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Plus size={18} />
                        </motion.button>
                      </div>
                    )}
                    <div className='space-y-2 max-h-40 overflow-y-auto bg-black/20 backdrop-blur-sm border border-amber-400/20 rounded-xl p-2 sm:p-3'>
                      {Array.isArray(formData.input) &&
                      formData.input.length > 0 ? (
                        formData.input.map((inp, index) => (
                          <motion.div
                            key={index}
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <span className='flex-1 text-xs sm:text-sm text-blue-200'>
                              {inp || 'Empty input'}
                            </span>
                            {modalMode !== 'view' && (
                              <motion.button
                                type='button'
                                onClick={() => removeInput(index)}
                                className='text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-colors'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X size={16} />
                              </motion.button>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <div className='text-center py-4 sm:py-6'>
                          <Database className='w-6 h-6 sm:w-8 sm:h-8 text-amber-400/50 mx-auto mb-2' />
                          <div className='text-xs sm:text-sm text-amber-200/50'>
                            No inputs added yet
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Responses Section */}
                  <div>
                    <label className='block text-xs sm:text-sm font-bold mb-2 text-amber-100'>
                      Responses
                    </label>
                    {modalMode !== 'view' && (
                      <div className='flex gap-2 sm:gap-3 mb-3 sm:mb-4'>
                        <input
                          type='text'
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          className='flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-black/30 backdrop-blur-sm border-2 border-amber-400/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60 transition-all duration-300 text-amber-100 placeholder-amber-200/50 text-sm'
                          placeholder='Add new response'
                          onKeyPress={(e) =>
                            e.key === 'Enter' &&
                            (e.preventDefault(), addResponse())
                          }
                        />
                        <motion.button
                          type='button'
                          onClick={addResponse}
                          className='px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-green-900 font-bold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg border-2 border-green-300'
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Plus size={18} />
                        </motion.button>
                      </div>
                    )}
                    <div className='space-y-2 max-h-40 overflow-y-auto bg-black/20 backdrop-blur-sm border border-amber-400/20 rounded-xl p-2 sm:p-3'>
                      {Array.isArray(formData.responses) &&
                      formData.responses.length > 0 ? (
                        formData.responses.map((resp, index) => (
                          <motion.div
                            key={index}
                            className='flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-500/20 border border-green-400/30 rounded-lg'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <span className='flex-1 text-xs sm:text-sm text-green-200'>
                              {resp || 'Empty response'}
                            </span>
                            {modalMode !== 'view' && (
                              <motion.button
                                type='button'
                                onClick={() => removeResponse(index)}
                                className='text-red-400 hover:text-red-300 p-1 hover:bg-red-500/20 rounded transition-colors'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X size={16} />
                              </motion.button>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <div className='text-center py-4 sm:py-6'>
                          <Database className='w-6 h-6 sm:w-8 sm:h-8 text-amber-400/50 mx-auto mb-2' />
                          <div className='text-xs sm:text-sm text-amber-200/50'>
                            No responses added yet
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className='flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-amber-400/30'>
                    <motion.button
                      type='button'
                      onClick={closeModal}
                      className='px-4 sm:px-6 py-2.5 sm:py-3 bg-black/30 border-2 border-amber-400/30 hover:border-amber-400/60 hover:bg-amber-500/10 rounded-xl transition-all duration-300 text-amber-200 font-medium text-sm'
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {modalMode === 'view' ? 'Close' : 'Cancel'}
                    </motion.button>
                    {modalMode !== 'view' && (
                      <motion.button
                        type='submit'
                        disabled={isLoading}
                        className='flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 font-bold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 border-2 border-amber-300 disabled:opacity-50 text-sm'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: 'linear',
                            }}
                            className='w-4 h-4 sm:w-5 sm:h-5 border-2 border-amber-900 border-t-transparent rounded-full'
                          />
                        ) : (
                          <Save size={16} className='sm:w-[18px] sm:h-[18px]' />
                        )}
                        {modalMode === 'create' ? 'Create' : 'Update'}
                      </motion.button>
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
