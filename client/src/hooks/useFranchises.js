import { useState, useCallback } from 'react';
import api from '../services/api';

export function useFranchises() {
  const [franchises, setFranchises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const getFranchises = useCallback(
    async (page = 1, limit = 10, search = '', status = '') => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        if (search) params.append('search', search);
        if (status) params.append('status', status);

        const response = await api.get(`/franchises?${params.toString()}`);
        setFranchises(response.data.data);
        setPagination(response.data.pagination);
        return { success: true, data: response.data.data };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch franchises';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getFranchise = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/franchises/${id}`);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch franchise';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const createFranchise = useCallback(async (franchiseData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/franchises', franchiseData);
      setFranchises((prev) => [response.data.data, ...prev]);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create franchise';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFranchise = useCallback(async (id, franchiseData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/franchises/${id}`, franchiseData);
      setFranchises((prev) =>
        prev.map((f) => (f._id === id ? response.data.data : f))
      );
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update franchise';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFranchise = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/franchises/${id}`);
      setFranchises((prev) => prev.filter((f) => f._id !== id));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete franchise';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    franchises,
    loading,
    error,
    pagination,
    getFranchises,
    getFranchise,
    createFranchise,
    updateFranchise,
    deleteFranchise,
  };
}
