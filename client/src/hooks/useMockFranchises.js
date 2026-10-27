import { useState, useCallback, useMemo } from 'react';
import { mockFranchises, franchiseStats } from '../mock/franchises';

/**
 * Mock franchise hook for frontend-only development
 * Replaces useFranchises which depends on backend API
 */
export function useMockFranchises() {
  const [franchises, setFranchises] = useState(mockFranchises);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: franchiseStats.total,
    page: 1,
    limit: 10,
    pages: Math.ceil(franchiseStats.total / 10),
  });

  const getFranchises = useCallback(
    async (page = 1, limit = 10, search = '', status = '', type = '') => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Filter franchises
        let filtered = [...mockFranchises];
        
        if (search) {
          const searchLower = search.toLowerCase();
          filtered = filtered.filter(f => 
            f.name.toLowerCase().includes(searchLower) ||
            f.code.toLowerCase().includes(searchLower) ||
            f.contactPerson.toLowerCase().includes(searchLower)
          );
        }
        
        if (status && status !== 'all') {
          filtered = filtered.filter(f => f.status === status);
        }
        
        if (type && type !== 'all') {
          filtered = filtered.filter(f => f.type.toLowerCase() === type.toLowerCase());
        }
        
        // Pagination
        const startIndex = (page - 1) * limit;
        const paginated = filtered.slice(startIndex, startIndex + limit);
        
        setFranchises(paginated);
        setPagination({
          total: filtered.length,
          page,
          limit,
          pages: Math.ceil(filtered.length / limit),
        });
        
        return { success: true, data: paginated };
      } catch (err) {
        const message = 'Failed to fetch franchises';
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
      await new Promise(resolve => setTimeout(resolve, 200));
      const franchise = mockFranchises.find(f => f.id === id);
      
      if (franchise) {
        return { success: true, data: franchise };
      } else {
        return { success: false, error: 'Franchise not found' };
      }
    } catch (err) {
      return { success: false, error: 'Failed to fetch franchise' };
    } finally {
      setLoading(false);
    }
  }, []);

  const createFranchise = useCallback(async (franchiseData) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate mock ID
      const newFranchise = {
        id: `FR-${Date.now()}`,
        ...franchiseData,
        createdAt: new Date().toISOString(),
        outletsCount: 0,
        equipmentCount: 0,
        maintenanceDue: 0,
        performance: { uptime: 95, compliance: 90 },
      };
      
      setFranchises(prev => [newFranchise, ...prev]);
      return { success: true, data: newFranchise };
    } catch (err) {
      return { success: false, error: 'Failed to create franchise' };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateFranchise = useCallback(async (id, franchiseData) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFranchises(prev =>
        prev.map(f => f.id === id ? { ...f, ...franchiseData } : f)
      );
      
      return { success: true, data: { id, ...franchiseData } };
    } catch (err) {
      return { success: false, error: 'Failed to update franchise' };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteFranchise = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFranchises(prev => prev.filter(f => f.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Failed to delete franchise' };
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