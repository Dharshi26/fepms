import React from 'react';
import { useLocation } from 'react-router-dom';

const PAGE_META = {
  '/franchises':      { icon: '🏢', phase: 'Phase 3' },
  '/outlets':         { icon: '📍', phase: 'Phase 3' },
  '/equipment':       { icon: '⚙️',  phase: 'Phase 3' },
  '/maintenance':     { icon: '🔧', phase: 'Phase 4' },
  '/service-logs':    { icon: '📋', phase: 'Phase 5' },
  '/warranty':        { icon: '🛡️',  phase: 'Phase 6' },
  '/warranty-claims': { icon: '📄', phase: 'Phase 6' },
  '/reports':         { icon: '📊', phase: 'Phase 7' },
  '/notifications':   { icon: '🔔', phase: 'Phase 7' },
  '/users':           { icon: '👥', phase: 'Phase 2' },
  '/settings':        { icon: '⚙️',  phase: 'Phase 7' },
};

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] ?? { icon: '🚧', phase: 'Upcoming Phase' };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-6xl mb-4">{meta.icon}</div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">Coming Soon</h2>
      <p className="text-slate-500 text-sm max-w-xs">
        This module will be implemented in <strong>{meta.phase}</strong>.
      </p>
    </div>
  );
}
