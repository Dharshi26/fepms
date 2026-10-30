import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-bold text-slate-300 mb-4">404</div>
        
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Page Not Found</h1>
          <p className="text-slate-600 text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 text-left">
          <h3 className="font-semibold text-slate-900 mb-3">Quick Navigation:</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => navigate('/')}
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                → Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/franchises')}
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                → Franchises
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/equipment')}
                className="text-primary-600 hover:text-primary-700 hover:underline"
              >
                → Equipment
              </button>
            </li>
          </ul>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}
