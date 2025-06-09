import { useState, useEffect } from 'react';
import { createOrUpdateTag, getSoekarnoTags, getHattaTags, getSpecificTag, deleteTag, updateTag } from '../api/npcApi';

export const useCrudPresenter = ({npc}) => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');

  useEffect(() => {
    loadTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTags = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = npc==="soekarno" ? await getSoekarnoTags() : await getHattaTags();
      // console.log('Full response:', response);
      
      const apiResponse = response?.data;
      const tagsData = apiResponse?.data;
      
      // console.log('API Response:', apiResponse);
      // console.log('Tags Data:', tagsData);
      
      if (Array.isArray(tagsData)) {
        setTags(tagsData);
      } else {
        setTags([]);
        console.warn('Tags data is not an array:', tagsData);
      }
    } catch (err) {
      setError('Gagal memuat data tags');
      setTags([]);
      console.error('Error loading tags:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // "code": 201,
  //   "status": "success",
  //   "message": "Tag diperbarui (data ditambahkan)" (if tag exist),
  // "message": "Tag baru dibuat", (if tag not exist)
  // "data": {
  //       "tag": "newa",
  //       "nama": "soekarno" || "hatta",
  //       "added_inputs": 3,
  //       "added_responses": 2
  //   }

  const handleCreateOrUpdateTag = async (tagData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createOrUpdateTag(tagData);
      await loadTags();
      setIsModalOpen(false);
      setSelectedTag(null);
      return { success: true, message: `${response.message} (${response.data.added_inputs} inputs, ${response.data.added_responses} responses)` };
    }  catch (error) {
      setError(error); // ✅ simpan error (bisa ditampilkan ke user)
      console.error("Presenter Failed to create/update tag:", error); // log error
      const errorMessage = error.response?.data?.message || 'Gagal Create/Update Tag';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTag = async (tagData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await updateTag(selectedTag.id, tagData);
      const apiResponse = response?.data;
      await loadTags();
      setIsModalOpen(false);
      setSelectedTag(null);
      return { success: true, message: apiResponse?.message || 'Tag berhasil diperbarui' };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Gagal memperbarui tag';
      setError(errorMessage);
      console.error('Error updating tag:', err);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const removeTag = async (tagId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await deleteTag(tagId);
      const apiResponse = response?.data;
      
      if (response.status === 200 || apiResponse?.code === 200) {
        await loadTags();
        return { success: true, message: apiResponse?.message || 'Tag berhasil dihapus' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Gagal menghapus tag';
      setError(errorMessage);
      console.error('Error deleting tag:', err);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const getTagDetails = async (tagName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getSpecificTag(tagName);
      const apiResponse = response?.data;
      
      if (response.status === 200 || apiResponse?.code === 200) {
        const tagData = apiResponse?.data;
        setSelectedTag(tagData);
        return { success: true, data: tagData };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Gagal memuat detail tag';
      setError(errorMessage);
      console.error('Error getting tag details:', err);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (mode, tag = null) => {
    setModalMode(mode);
    setSelectedTag(tag);
    setIsModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  return {
    tags,
    isLoading,
    error,
    selectedTag,
    isModalOpen,
    modalMode,
    handleCreateOrUpdateTag,
    handleUpdateTag,
    removeTag,
    getTagDetails,
    openModal,
    closeModal,
    clearError,
  };
};