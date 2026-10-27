import { useState, useEffect } from 'react';
import { checkHealth } from '../services/healthService';

export function useHealthCheck() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'connected' | 'disconnected'
  const [data, setData]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    checkHealth()
      .then((res) => {
        if (!cancelled) {
          setData(res.data);
          setStatus('connected');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('disconnected');
      });

    return () => { cancelled = true; };
  }, []);

  return { status, data };
}
