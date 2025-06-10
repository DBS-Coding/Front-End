import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Eye, X, AlertCircle, Crown } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useCrudPresenter } from '../presenters/CrudPresenter';
import { clsx } from 'clsx';
import { etlSoekarno } from '../api/npcApi';
import SuccessToast from '../components/feedback/SuccessToast';
import ErrorToast from '../components/feedback/ErrorToast';
import LoadingETL from '../components/feedback/LoadingETL';
import HeaderCrud from '../components/crud/HeaderCrud';
import DataTable from '../components/crud/DataTable';
import CrudForm from '../components/crud/CrudForm';
import EtlTrigger from '../components/crud/EtlTrigger';

const CrudSoekarnoView = () => {
  const {
    tags,
    isLoading,
    error,
    selectedTag,
    isModalOpen,
    modalMode,
    handleCreateOrUpdateTag,
    handleUpdateTag,
    removeTag,
    openModal,
    closeModal,
    clearError,
  } = useCrudPresenter({ npc: 'soekarno' });

  const [formData, setFormData] = useState({
    nama: 'soekarno',
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
  const [seconds, setSeconds] = useState(0); // timer ETL

  // Jalankan timer saat loadingEtl aktif
  useEffect(() => {
    let interval;

    if (loadingEtl) {
      setSeconds(0); // Reset ke 0 saat mulai ETL
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval); // Bersihkan interval saat loadingEtl selesai
    };
  }, [loadingEtl]);

  useEffect(() => {
    if (selectedTag) {
      setFormData({
        nama: 'soekarno',
        tag: selectedTag?.tag || '',
        input: Array.isArray(selectedTag?.input) ? selectedTag.input : [],
        responses: Array.isArray(selectedTag?.responses)
          ? selectedTag.responses
          : [],
      });
    } else {
      setFormData({
        nama: 'soekarno',
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
        ? await handleCreateOrUpdateTag(formData)
        : await handleUpdateTag(formData);

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

      setTimeout(() => {
        window.open(
          'https://github.com/DBS-Coding/histotalk-model1-tfjs/tree/main/tfjs_saved_model/soekarno',
          '_blank'
        );
      }, 3000);
    } catch (err) {
      console.error(err);
      setErrorEtl(true);
    } finally {
      setLoadingEtl(false);
    }
  };

  return (
    <Layout>
      {loadingEtl && (
        <LoadingETL
          show={loadingEtl}
          seconds={seconds}
          videoUrl='k4AwFdbkSMc'
        />
      )}

      {!loadingEtl && successEtl && (
        <SuccessToast show={successEtl} onClose={() => setSuccessEtl(false)} />
      )}

      {!loadingEtl && errorEtl && (
        <ErrorToast show={errorEtl} onClose={() => setErrorEtl(false)} />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='h-full mb-4'
      >
        <div className='bg-black/20 backdrop-blur-sm border-2 border-amber-400/30 rounded-2xl p-4 shadow-2xl h-full'>
          {/* Header */}
          <HeaderCrud
            tags={tags}
            openModal={openModal}
            Icon={Crown}
            name='Soekarno'
          />

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
              <Crown size={18} />
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
          <DataTable
            isLoading={isLoading}
            tags={tags}
            handleDelete={handleDelete}
            openModal={openModal}
            Icon={Crown}
          />

          {/* ETL Trigger */}
          <EtlTrigger handleETL={handleETL} loadingEtl={loadingEtl} />
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
                        {modalMode === 'create' && 'Tambah Tag Soekarno'}
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

                {/* Notifications: Just Validation Error */}
                <AnimatePresence>
                  {modalMode !== 'view' && notification && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={clsx(
                        'mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl border-2 flex items-center gap-3 backdrop-blur-sm bg-red-500/20 border-red-400/50 text-red-200'
                      )}
                    >
                      <AlertCircle size={18} />
                      <span className='text-sm sm:text-base font-medium'>
                        {notification.message}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Modal Form */}
                <CrudForm
                  handleSubmit={handleSubmit}
                  formData={formData}
                  setFormData={setFormData}
                  modalMode={modalMode}
                  inputText={inputText}
                  addInput={addInput}
                  removeInput={removeInput}
                  setInputText={setInputText}
                  responseText={responseText}
                  addResponse={addResponse}
                  removeResponse={removeResponse}
                  setResponseText={setResponseText}
                  closeModal={closeModal}
                  isLoading={isLoading}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Layout>
  );
};

export default CrudSoekarnoView;
