import { useState, useCallback } from 'react';
import api from '../services/api';

export function useOutlets() {
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const getOutlets = useCallback(
    async (page = 1, limit = 10, search = '', status = '', franchise = '') => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', limit);
        if (search) params.append('search', search);
        if (status) params.append('status', status);
        if (franchise) params.append('franchise', franchise);

        const response = await api.get(`/outlets?${params.toString()}`);
        setOutlets(response.data.data);
        setPagination(response.data.pagination);
        return { success: true, data: response.data.data };
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch outlets';
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getOutlet = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/outlets/${id}`);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch outlet';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const createOutlet = useCallback(async (outletData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/outlets', outletData);
      setOutlets((prev) => [response.data.data, ...prev]);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create outlet';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOutlet = useCallback(async (id, outletData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/outlets/${id}`, outletData);
      setOutlets((prev) =>
        prev.map((o) => (o._id === id ? response.data.data : o))
      );
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update outlet';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOutlet = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/outlets/${id}`);
      setOutlets((prev) => prev.filter((o) => o._id !== id));
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete outlet';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    outlets,
    loading,
    error,
    pagination,
    getOutlets,
    getOutlet,
    createOutlet,
    updateOutlet,
    deleteOutlet,
  };
}
