import React, { useState, useMemo } from 'react';
import { Button } from '../ui';

/**
 * FEPMS Map Visualization Component
 * Premium interactive map for visualizing outlet locations
 * Uses SVG-based visualization with interactive markers
 */
const MapVisualization = ({
  locations = [],
  onLocationClick = () => {},
  height = '400px',
  className = '',
  showControls = true,
  initialZoom = 1,
}) => {
  const [zoom, setZoom] = useState(initialZoom);
  const [center, setCenter] = useState({ x: 0, y: 0 });
  const [mapType, setMapType] = useState('geographic'); // 'geographic', 'heatmap', 'clusters'
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'active', 'due', 'overdue'

  // Process locations for visualization
  const processedLocations = useMemo(() => {
    return locations.map(location => {
      // Normalize coordinates for visualization
      const x = ((location.longitude + 180) / 360) * 100;
      const y = (1 - (location.latitude + 90) / 180) * 100;
      
      // Determine status color
      let statusColor = 'text-brand-500';
      if (location.status === 'inactive') {
        statusColor = 'text-neutral-400';
      } else if (location.maintenanceDue > 5) {
        statusColor = 'text-warning-500';
      } else if (location.maintenanceDue > 10) {
        statusColor = 'text-danger-500';
      }

      // Determine size based on equipment count
      const size = Math.min(40, Math.max(12, location.equipmentCount / 2));
      
      return {
        ...location,
        x,
        y,
        statusColor,
        size,
      };
    });
  }, [locations]);

  // Calculate geographic distribution
  const geographicData = useMemo(() => {
    const regions = {
      'Northeast': { count: 0, equipment: 0, maintenance: 0 },
      'Midwest': { count: 0, equipment: 0, maintenance: 0 },
      'South': { count: 0, equipment: 0, maintenance: 0 },
      'West': { count: 0, equipment: 0, maintenance: 0 },
    };

    processedLocations.forEach(location => {
      // Simple region classification based on state/coordinates
      const { state, latitude, longitude } = location;
      
      let region = 'Other';
      if (latitude > 39 && latitude < 47 && longitude < -85) {
        region = 'Northeast';
      } else if (latitude > 36 && latitude < 49 && longitude > -105 && longitude < -85) {
        region = 'Midwest';
      } else if (latitude > 24 && latitude < 39) {
        region = 'South';
      } else if (latitude > 31 && latitude < 49 && longitude > -124 && longitude < -102) {
        region = 'West';
      }

      if (regions[region]) {
        regions[region].count += 1;
        regions[region].equipment += location.equipmentCount;
        regions[region].maintenance += location.maintenanceDue;
      }
    });

    return Object.entries(regions).map(([name, data]) => ({
      name,
      ...data,
    }));
  }, [processedLocations]);

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setCenter({ x: 0, y: 0 });
  };

  // Handle location click
  const handleLocationClick = (location, event) => {
    event.stopPropagation();
    onLocationClick(location);
  };

  // Handle map click (reset selection)
  const handleMapClick = () => {
    onLocationClick(null);
  };

  // Filter locations based on selected filter
  const filteredLocations = useMemo(() => {
    if (selectedFilter === 'all') return processedLocations;
    return processedLocations.filter(location => {
      if (selectedFilter === 'active') return location.status === 'active';
      if (selectedFilter === 'due') return location.maintenanceDue > 0;
      if (selectedFilter === 'overdue') return location.maintenanceDue > 10;
      return true;
    });
  }, [processedLocations, selectedFilter]);

  // Render map based on map type
  const renderMapContent = () => {
    if (mapType === 'geographic') {
      return (
        <>
          {/* Simplified USA outline (SVG paths) */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Background */}
            <rect
              width="100%"
              height="100%"
              className="fill-neutral-50"
            />
            
            {/* Simplified USA states representation */}
            <path
              d="M10,10 L90,10 L90,90 L10,90 Z" // Simplified outline
              className="stroke-neutral-300 stroke-2 fill-white"
            />
            
            {/* Region labels */}
            <g className="text-xs text-neutral-500">
              <text x="20" y="30" className="font-medium">Northeast</text>
              <text x="50" y="50" className="font-medium">Midwest</text>
              <text x="40" y="70" className="font-medium">South</text>
              <text x="70" y="40" className="font-medium">West</text>
            </g>
          </svg>

          {/* Location markers */}
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 hover:scale-110 focus:outline-none ${location.statusColor}`}
              style={{
                left: `${(location.x * zoom) + center.x}%`,
                top: `${(location.y * zoom) + center.y}%`,
                width: `${location.size}px`,
                height: `${location.size}px`,
              }}
              onClick={(e) => handleLocationClick(location, e)}
              title={`${location.name} (${location.city}, ${location.state})\nEquipment: ${location.equipmentCount}\nMaintenance Due: ${location.maintenanceDue}`}
            >
              {/* Marker background */}
              <div className="absolute inset-0 bg-current rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
              
              {/* Marker center */}
              <div className="absolute inset-2 bg-current rounded-full" />
              
              {/* Maintenance status indicator */}
              {location.maintenanceDue > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-white flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${
                    location.maintenanceDue > 10 ? 'bg-danger-500' :
                    location.maintenanceDue > 5 ? 'bg-warning-500' :
                    'bg-success-500'
                  }`} />
                </div>
              )}
              
              {/* Hover tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white shadow-lg rounded-lg border border-neutral-200 text-xs text-left whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                <div className="font-medium text-neutral-900">{location.name}</div>
                <div className="text-neutral-600">{location.city}, {location.state}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-neutral-500">Equipment:</span>
                  <span className="font-medium">{location.equipmentCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Due:</span>
                  <span className={`font-medium ${
                    location.maintenanceDue > 10 ? 'text-danger-600' :
                    location.maintenanceDue > 0 ? 'text-warning-600' :
                    'text-success-600'
                  }`}>
                    {location.maintenanceDue}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </>
      );
    }

    if (mapType === 'heatmap') {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-green-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl mb-2">🔥</div>
            <h3 className="font-semibold text-neutral-700">Heatmap View</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Visualizing outlet density and maintenance needs
            </p>
          </div>
        </div>
      );
    }

    if (mapType === 'clusters') {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-white to-pink-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-semibold text-neutral-700">Cluster View</h3>
            <p className="text-sm text-neutral-500 mt-1">
              Grouping outlets by region and franchise
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`bg-white border border-neutral-200 rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <div>
          <h3 className="font-semibold text-neutral-900">Outlet Locations</h3>
          <p className="text-sm text-neutral-500">
            {processedLocations.length} locations across {geographicData.filter(r => r.count > 0).length} regions
          </p>
        </div>

        {showControls && (
          <div className="flex items-center gap-2">
            {/* Map type selector */}
            <div className="flex items-center bg-neutral-100 rounded-lg p-1">
              {['geographic', 'heatmap', 'clusters'].map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    mapType === type
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  onClick={() => setMapType(type)}
                >
                  {type === 'geographic' ? '🗺️ Map' :
                   type === 'heatmap' ? '🔥 Heat' :
                   '📊 Clusters'}
                </button>
              ))}
            </div>

            {/* Filter selector */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-1.5 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
            >
              <option value="all">📍 All Outlets</option>
              <option value="active">✅ Active Only</option>
              <option value="due">⚠️ Maintenance Due</option>
              <option value="overdue">🔴 Overdue</option>
            </select>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative" style={{ height }}>
        <div
          className="absolute inset-0 overflow-hidden"
          onClick={handleMapClick}
        >
          {renderMapContent()}
        </div>

        {/* Zoom Controls */}
        {showControls && mapType === 'geographic' && (
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-white border border-neutral-300 rounded-lg shadow-sm hover:bg-neutral-50 flex items-center justify-center text-neutral-700 hover:text-neutral-900"
              title="Zoom In"
            >
              <span className="text-lg">+</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-white border border-neutral-300 rounded-lg shadow-sm hover:bg-neutral-50 flex items-center justify-center text-neutral-700 hover:text-neutral-900"
              title="Zoom Out"
            >
              <span className="text-lg">−</span>
            </button>
            <button
              onClick={handleResetView}
              className="w-10 h-10 bg-white border border-neutral-300 rounded-lg shadow-sm hover:bg-neutral-50 flex items-center justify-center text-neutral-700 hover:text-neutral-900"
              title="Reset View"
            >
              <span className="text-sm">↺</span>
            </button>
          </div>
        )}

        {/* Legend */}
        {showControls && (
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-neutral-200 rounded-lg shadow-sm p-3 max-w-xs">
            <div className="text-sm font-medium text-neutral-900 mb-2">Legend</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-500" />
                <span className="text-xs text-neutral-600">Active Outlet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-400" />
                <span className="text-xs text-neutral-600">Inactive Outlet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning-500" />
                <span className="text-xs text-neutral-600">Maintenance Due</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-danger-500" />
                <span className="text-xs text-neutral-600">Maintenance Overdue</span>
              </div>
              <div className="text-xs text-neutral-500 mt-2">
                Marker size represents equipment count
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Geographic Stats Footer */}
      <div className="border-t border-neutral-200">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200">
          {geographicData.filter(region => region.count > 0).map((region) => (
            <div key={region.name} className="p-3 text-center">
              <div className="text-sm font-medium text-neutral-900">{region.name}</div>
              <div className="mt-1 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-neutral-500">Outlets:</span>
                  <span className="text-sm font-semibold text-neutral-900">{region.count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-neutral-500">Equipment:</span>
                  <span className="text-sm font-semibold text-neutral-900">{region.equipment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapVisualization;