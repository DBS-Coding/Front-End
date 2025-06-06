import { useState, useEffect } from 'react';
import { createOrUpdateTag, getAllTags, getHattaTags, getSpecificTag, deleteTag } from '../api/npcApi';

export const useCrudSoekarnoPresenter = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getHattaTags();
      console.log('Full response:', response);
      
      const apiResponse = response?.data;
      const tagsData = apiResponse?.data;
      
      console.log('API Response:', apiResponse);
      console.log('Tags Data:', tagsData);
      
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

  const createTag = async (tagData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createOrUpdateTag(tagData);
      const apiResponse = response?.data;
      
      if (response.status === 200 || response.status === 201 || apiResponse?.code === 200) {
        await loadTags();
        setIsModalOpen(false);
        setSelectedTag(null);
        return { success: true, message: apiResponse?.message || 'Tag berhasil dibuat' };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Gagal membuat tag';
      setError(errorMessage);
      console.error('Error creating tag:', err);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const updateTag = async (tagData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createOrUpdateTag(tagData);
      const apiResponse = response?.data;
      
      if (response.status === 200 || apiResponse?.code === 200) {
        await loadTags();
        setIsModalOpen(false);
        setSelectedTag(null);
        return { success: true, message: apiResponse?.message || 'Tag berhasil diperbarui' };
      }
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
    loadTags,
    createTag,
    updateTag,
    removeTag,
    getTagDetails,
    openModal,
    closeModal,
    clearError,
  };
};