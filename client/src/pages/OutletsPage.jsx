import React, { useState, useMemo } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  SearchBar, 
  Input, 
  Select, 
  Badge,
  Table,
  TableActions,
  TablePagination,
  Modal,
  ConfirmDialog,
  EmptyState,
  Progress
} from '../components';
import { 
  MapVisualization 
} from '../components/visualization';
import { 
  mockOutlets, 
  outletStats, 
  outletTypes, 
  outletStatuses,
  geographicRegions,
  equipmentByOutletType,
  revenueByOutlet,
  outletLocations 
} from '../mock/outlets';

/**
 * FEPMS Premium Outlets Page
 * Enterprise-grade outlet management with location mapping
 * Uses mock data only - no backend integration
 */
const OutletsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);
  
  // Filter outlets based on search and filters
  const filteredOutlets = useMemo(() => {
    return mockOutlets.filter(outlet => {
      const matchesSearch = searchQuery === '' || 
        outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outlet.franchise.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || outlet.status === statusFilter;
      const matchesType = typeFilter === 'all' || outlet.type.toLowerCase() === typeFilter.toLowerCase();
      
      // Region filter logic
      let matchesRegion = true;
      if (regionFilter !== 'all') {
        const region = geographicRegions.find(r => r.region === regionFilter);
        matchesRegion = region && region.outlets.includes(outlet.id);
      }
      
      return matchesSearch && matchesStatus && matchesType && matchesRegion;
    });
  }, [searchQuery, statusFilter, typeFilter, regionFilter]);
  
  // Pagination
  const totalPages = Math.ceil(filteredOutlets.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOutlets = filteredOutlets.slice(startIndex, startIndex + pageSize);
  
  // Handle outlet selection
  const handleSelectOutlet = (outletId) => {
    setSelectedOutlets(prev => 
      prev.includes(outletId) 
        ? prev.filter(id => id !== outletId)
        : [...prev, outletId]
    );
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectedOutlets.length === paginatedOutlets.length) {
      setSelectedOutlets([]);
    } else {
      setSelectedOutlets(paginatedOutlets.map(o => o.id));
    }
  };
  
  // Handle add outlet
  const handleAddOutlet = () => {
    setShowAddModal(true);
    setSelectedOutlet(null);
  };
  
  // Handle edit outlet
  const handleEditOutlet = (outlet) => {
    setSelectedOutlet(outlet);
    setShowEditModal(true);
  };
  
  // Handle view outlet details
  const handleViewOutlet = (outlet) => {
    console.log('View outlet:', outlet);
    // In a real app, you might navigate to a detail page
    alert(`Viewing ${outlet.name}\n\nLocation: ${outlet.address.city}, ${outlet.address.state}\nStatus: ${outlet.status}\nEquipment: ${outlet.equipmentCount} units\nRevenue: $${outlet.revenue.toLocaleString()}`);
  };
  
  // Handle delete
  const handleDelete = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Deleting outlets:', selectedOutlets);
      setSelectedOutlets([]);
      setShowDeleteConfirm(false);
      setLoading(false);
      alert(`Successfully deactivated ${selectedOutlets.length} outlet(s)`);
    }, 1000);
  };
  
  // Handle location click on map
  const handleLocationClick = (location) => {
    if (location) {
      const outlet = mockOutlets.find(o => o.id === location.id);
      setMapLocation(outlet);
      console.log('Selected outlet on map:', outlet);
    } else {
      setMapLocation(null);
    }
  };
  
  // Table columns
  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={selectedOutlets.length === paginatedOutlets.length && paginatedOutlets.length > 0}
          onChange={handleSelectAll}
          className="rounded border-border text-brand-600 focus:ring-brand-500"
        />
      ),
      accessor: 'id',
      align: 'center',
      width: '50px',
      render: (value, outlet) => (
        <input
          type="checkbox"
          checked={selectedOutlets.includes(outlet.id)}
          onChange={() => handleSelectOutlet(outlet.id)}
          className="rounded border-border text-brand-600 focus:ring-brand-500"
        />
      ),
    },
    {
      header: 'Outlet',
      accessor: 'name',
      render: (value, outlet) => (
        <div>
          <div className="font-medium text-text-primary cursor-pointer hover:text-brand-600" onClick={() => handleViewOutlet(outlet)}>
            {outlet.name}
          </div>
          <div className="text-sm text-text-tertiary">Code: {outlet.code}</div>
          <div className="text-xs text-text-tertiary mt-1">
            {outlet.address.street}, {outlet.address.city}, {outlet.address.state}
          </div>
        </div>
      ),
    },
    {
      header: 'Franchise',
      accessor: 'franchise',
      render: (value) => (
        <div>
          <div className="font-medium text-text-primary">{value.name}</div>
          <div className="text-sm text-text-tertiary">Code: {value.code}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'contactPerson',
      render: (value, outlet) => (
        <div>
          <div className="font-medium text-text-primary">{outlet.contactPerson}</div>
          <div className="text-sm text-text-tertiary">{outlet.email}</div>
          <div className="text-sm text-text-tertiary">{outlet.phone}</div>
        </div>
      ),
    },
    {
      header: 'Metrics',
      accessor: 'equipmentCount',
      render: (value, outlet) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">Equipment:</span>
            <span className="text-sm font-medium text-text-primary">{outlet.equipmentCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">Revenue:</span>
            <span className="text-sm font-medium text-text-primary">${(outlet.revenue / 1000).toFixed(0)}k</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">Due:</span>
            <span className={`text-sm font-medium ${
              outlet.maintenanceDue > 10 ? 'text-danger-600' : 
              outlet.maintenanceDue > 5 ? 'text-warning-600' : 
              outlet.maintenanceDue > 0 ? 'text-success-600' : 
              'text-text-tertiary'
            }`}>
              {outlet.maintenanceDue}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value, outlet) => {
        const statusConfig = {
          active: { label: 'Active', variant: 'success' },
          pending: { label: 'Pending', variant: 'warning' },
          inactive: { label: 'Inactive', variant: 'neutral' },
        };
        
        const config = statusConfig[value] || { label: value, variant: 'neutral' };
        return (
          <div className="flex flex-col gap-1">
            <Badge variant={config.variant}>{config.label}</Badge>
            <div className="text-xs text-text-tertiary">{outlet.type}</div>
          </div>
        );
      },
    },
    {
      header: 'Last Service',
      accessor: 'lastServiceDate',
      render: (value, outlet) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-text-primary">
            {new Date(outlet.lastServiceDate).toLocaleDateString()}
          </div>
          <div className="text-xs text-text-tertiary">
            Next: {outlet.nextServiceDate ? new Date(outlet.nextServiceDate).toLocaleDateString() : 'N/A'}
          </div>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      align: 'right',
      render: (value, outlet) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon="eye"
            className="text-text-tertiary hover:text-brand-600"
            onClick={() => handleViewOutlet(outlet)}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon="edit"
            className="text-text-tertiary hover:text-brand-600"
            onClick={() => handleEditOutlet(outlet)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];
  
  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'neutral';
      default: return 'neutral';
    }
  };

  // Region options
  const regionOptions = [
    { label: 'All Regions', value: 'all' },
    ...geographicRegions.map(region => ({
      label: `${region.region} (${region.count})`,
      value: region.region,
    })),
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Outlets</h1>
          <p className="text-text-tertiary mt-1">
            Manage franchise outlets with geographic location mapping and maintenance tracking
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedOutlets.length > 0 && (
            <Button
              variant="outline"
              icon="download"
              onClick={() => console.log('Export selected:', selectedOutlets)}
            >
              Export Selected
            </Button>
          )}
          
          <Button
            variant="outline"
            icon="download"
            onClick={() => console.log('Export all outlets')}
          >
            Export All
          </Button>
          
          <Button
            variant="primary"
            icon="plus"
            onClick={handleAddOutlet}
          >
            Add Outlet
          </Button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-tertiary">Total Outlets</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{outletStats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-success-500" />
                <span className="text-text-tertiary">Active: {outletStats.active}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-warning-500" />
                <span className="text-text-tertiary">Pending: {outletStats.pending}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-tertiary">Total Equipment</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{outletStats.totalEquipment}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-warning-50 flex items-center justify-center">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-text-tertiary">Avg per outlet</span>
                <span className="font-medium">{(outletStats.totalEquipment / outletStats.total).toFixed(0)}</span>
              </div>
              <Progress value={(outletStats.totalEquipment / (outletStats.total * 50)) * 100} size="sm" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-tertiary">Maintenance Due</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{outletStats.maintenanceDue}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-danger-50 flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-text-tertiary">Overdue: {outletStats.maintenanceOverdue}</span>
                <span className="font-medium text-danger-600">Urgent</span>
              </div>
              <Progress 
                value={(outletStats.maintenanceDue / outletStats.total) * 100} 
                color="danger"
                size="sm" 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-tertiary">Avg Rating</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <p className="text-2xl font-bold text-text-primary">{outletStats.averageRating}</p>
                  <p className="text-sm text-text-tertiary">/5</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success-50 flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${
                    star <= outletStats.averageRating
                      ? 'text-warning-500 fill-warning-500'
                      : 'text-neutral-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Geographic Map Visualization */}
      <MapVisualization
        locations={outletLocations}
        onLocationClick={handleLocationClick}
        height="400px"
        className="shadow-lg"
        showControls={true}
      />
      
      {/* Selected Outlet Details */}
      {mapLocation && (
        <Card className="border-l-4 border-l-brand-500">
          <CardContent>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-text-primary">{mapLocation.name}</h3>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-text-tertiary">Location</p>
                    <p className="font-medium">{mapLocation.address.city}, {mapLocation.address.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-tertiary">Equipment</p>
                    <p className="font-medium">{mapLocation.equipmentCount} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-tertiary">Maintenance Due</p>
                    <p className={`font-medium ${
                      mapLocation.maintenanceDue > 10 ? 'text-danger-600' :
                      mapLocation.maintenanceDue > 0 ? 'text-warning-600' :
                      'text-success-600'
                    }`}>
                      {mapLocation.maintenanceDue}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-tertiary">Revenue</p>
                    <p className="font-medium">${mapLocation.revenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMapLocation(null)}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Filters and Search */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <SearchBar
                placeholder="Search outlets by name, code, city, or franchise..."
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={setSearchQuery}
                size="md"
              />
            </div>
            
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: 'All Statuses', value: 'all' },
                ...outletStatuses.map(status => ({
                  label: status.label,
                  value: status.value,
                })),
              ]}
            />
            
            <Select
              label="Outlet Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { label: 'All Types', value: 'all' },
                ...outletTypes.map(type => ({
                  label: `${type.label} (${type.count})`,
                  value: type.value,
                })),
              ]}
            />
            
            <Select
              label="Region"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={regionOptions}
            />
          </div>
          
          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
                setRegionFilter('all');
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 text-sm rounded-full ${
                statusFilter === 'all' && typeFilter === 'all' && regionFilter === 'all' && searchQuery === ''
                  ? 'bg-brand-100 text-brand-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Outlets
            </button>
            
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 text-sm rounded-full ${
                statusFilter === 'active'
                  ? 'bg-success-100 text-success-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Active Only
            </button>
            
            <button
              onClick={() => {
                const highMaintenance = mockOutlets.filter(o => o.maintenanceDue > 10);
                console.log('High maintenance outlets:', highMaintenance);
                setStatusFilter('all');
                setSearchQuery('');
                // Filter for high maintenance
                alert(`Found ${highMaintenance.length} outlets with overdue maintenance`);
              }}
              className="px-3 py-1.5 text-sm rounded-full bg-danger-100 text-danger-700 hover:bg-danger-200"
            >
              High Maintenance ({mockOutlets.filter(o => o.maintenanceDue > 10).length})
            </button>
            
            <button
              onClick={() => setRegionFilter('Midwest')}
              className={`px-3 py-1.5 text-sm rounded-full ${
                regionFilter === 'Midwest'
                  ? 'bg-brand-100 text-brand-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Midwest Region
            </button>
            
            <button
              onClick={() => setTypeFilter('restaurant')}
              className={`px-3 py-1.5 text-sm rounded-full ${
                typeFilter === 'restaurant'
                  ? 'bg-warning-100 text-warning-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Restaurants Only
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Bulk Actions */}
      {selectedOutlets.length > 0 && (
        <TableActions selectedCount={selectedOutlets.length}>
          <Button
            variant="outline"
            size="sm"
            icon="download"
            onClick={() => console.log('Export selected:', selectedOutlets)}
          >
            Export Selected
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            icon="bell"
            onClick={() => {
              console.log('Notify selected:', selectedOutlets);
              alert(`Notification sent to ${selectedOutlets.length} outlet(s)`);
            }}
          >
            Send Notification
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            icon="delete"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Deactivate Selected
          </Button>
        </TableActions>
      )}
      
      {/* Outlets Table */}
      <Table
        columns={columns}
        data={paginatedOutlets}
        loading={loading}
        striped
        hover
        onRowClick={(outlet) => handleViewOutlet(outlet)}
        emptyText="No outlets match your search criteria"
        emptyState={
          <EmptyState
            variant="search"
            title="No Outlets Found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setTypeFilter('all');
                  setRegionFilter('all');
                }}
              >
                Clear Filters
              </Button>
            }
          />
        }
      />
      
      {/* Table Pagination */}
      {filteredOutlets.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredOutlets.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Outlet Type Distribution</h3>
            <div className="space-y-3">
              {outletTypes.map((type) => (
                <div key={type.value} className="flex items-center justify-between">
                  <span className="text-sm text-text-tertiary">{type.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-brand-500 h-2 rounded-full" 
                        style={{ width: `${(type.count / outletStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{type.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Top Revenue Outlets</h3>
            <div className="space-y-3">
              {revenueByOutlet
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5)
                .map((outlet, index) => (
                  <div key={outlet.outlet} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-success-50 text-success-700 text-xs font-semibold rounded">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-text-primary truncate max-w-[120px]">
                        {outlet.outlet}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      ${(outlet.revenue / 1000).toFixed(0)}k
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Equipment by Outlet Type</h3>
            <div className="space-y-3">
              {equipmentByOutletType.map((type) => (
                <div key={type.type} className="flex items-center justify-between">
                  <span className="text-sm text-text-tertiary">{type.type}</span>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-text-primary">
                      Avg: {type.avgEquipment}
                    </div>
                    <div className="w-24 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-warning-500 h-2 rounded-full" 
                        style={{ width: `${(type.avgEquipment / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Outlet Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Outlet"
        size="lg"
        onConfirm={() => {
          console.log('Adding new outlet');
          setShowAddModal(false);
          alert('Outlet created successfully (mock data)');
        }}
        onCancel={() => setShowAddModal(false)}
        confirmText="Create Outlet"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Outlet Name"
              placeholder="Enter outlet name"
              required
            />
            
            <Input
              label="Outlet Code"
              placeholder="Enter outlet code"
              required
            />
            
            <Select
              label="Franchise"
              options={[
                { label: 'McDonald\'s Corporation', value: 'MCD' },
                { label: 'Burger King Holdings', value: 'BKH' },
                { label: 'KFC Franchise Group', value: 'KFC' },
                { label: 'Subway Restaurants', value: 'SUB' },
                { label: 'Pizza Hut Franchise', value: 'PHF' },
              ]}
              placeholder="Select franchise"
              required
            />
            
            <Select
              label="Outlet Type"
              options={outletTypes.map(type => ({
                label: type.label,
                value: type.value,
              }))}
              placeholder="Select outlet type"
              required
            />
            
            <Input
              label="Contact Person"
              placeholder="Enter contact name"
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="contact@example.com"
              required
            />
            
            <Input
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
            />
            
            <Select
              label="Status"
              options={outletStatuses.map(status => ({
                label: status.label,
                value: status.value,
              }))}
              placeholder="Select status"
              required
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Address</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input label="Street Address" />
              <Input label="City" />
              <Input label="State/Province" />
              <Input label="ZIP/Postal Code" />
              <Input label="Country" />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Operating Information</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input label="Opening Date" type="date" />
              <Input label="Operating Hours" placeholder="e.g., 8:00 AM - 10:00 PM" />
            </div>
          </div>
        </div>
      </Modal>
      
      {/* Edit Outlet Modal */}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Outlet"
        size="lg"
        onConfirm={() => {
          console.log('Updating outlet:', selectedOutlet);
          setShowEditModal(false);
          alert('Outlet updated successfully (mock data)');
        }}
        onCancel={() => setShowEditModal(false)}
        confirmText="Update Outlet"
        cancelText="Cancel"
      >
        {selectedOutlet && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Outlet Name"
                defaultValue={selectedOutlet.name}
                required
              />
              
              <Input
                label="Outlet Code"
                defaultValue={selectedOutlet.code}
                required
                disabled
              />
              
              <div>
                <label className="block text-sm font-medium text-text-tertiary mb-1">Franchise</label>
                <div className="px-3 py-2 bg-neutral-50 rounded-lg text-text-primary">
                  {selectedOutlet.franchise.name} ({selectedOutlet.franchise.code})
                </div>
              </div>
              
              <Select
                label="Outlet Type"
                defaultValue={selectedOutlet.type}
                options={outletTypes.map(type => ({
                  label: type.label,
                  value: type.value,
                }))}
                required
              />
              
              <Input
                label="Contact Person"
                defaultValue={selectedOutlet.contactPerson}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                defaultValue={selectedOutlet.email}
                required
              />
              
              <Input
                label="Phone Number"
                defaultValue={selectedOutlet.phone}
              />
              
              <Select
                label="Status"
                defaultValue={selectedOutlet.status}
                options={outletStatuses.map(status => ({
                  label: status.label,
                  value: status.value,
                }))}
                required
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Address</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input label="Street Address" defaultValue={selectedOutlet.address.street} />
                <Input label="City" defaultValue={selectedOutlet.address.city} />
                <Input label="State/Province" defaultValue={selectedOutlet.address.state} />
                <Input label="ZIP/Postal Code" defaultValue={selectedOutlet.address.zipCode} />
                <Input label="Country" defaultValue={selectedOutlet.address.country} />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Maintenance Information</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Input
                  label="Equipment Count"
                  type="number"
                  defaultValue={selectedOutlet.equipmentCount}
                />
                <Input
                  label="Maintenance Due Count"
                  type="number"
                  defaultValue={selectedOutlet.maintenanceDue}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Deactivate Outlets"
        message={`Are you sure you want to deactivate ${selectedOutlets.length} selected outlet(s)? This will mark them as inactive.`}
        confirmText="Deactivate"
        cancelText="Cancel"
        variant="danger"
        confirmLoading={loading}
      />
    </div>
  );
};

export default OutletsPage;