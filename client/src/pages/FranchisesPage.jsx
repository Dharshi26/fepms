import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  StatCard, 
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
  LoadingSkeleton
} from '../components';
import { 
  mockFranchises, 
  franchiseStats, 
  franchiseTypes, 
  franchiseStatuses,
  franchisePerformanceData,
  franchiseGrowthData,
  franchiseGeographicData
} from '../mock/franchises';

/**
 * FEPMS Franchises Page
 * Premium franchise management interface with data visualization
 */
const FranchisesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedFranchises, setSelectedFranchises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Filter franchises based on search and filters
  const filteredFranchises = mockFranchises.filter(franchise => {
    const matchesSearch = searchQuery === '' || 
      franchise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      franchise.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      franchise.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || franchise.status === statusFilter;
    const matchesType = typeFilter === 'all' || franchise.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredFranchises.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFranchises = filteredFranchises.slice(startIndex, startIndex + pageSize);
  
  // Handle franchise selection
  const handleSelectFranchise = (franchiseId) => {
    setSelectedFranchises(prev => 
      prev.includes(franchiseId) 
        ? prev.filter(id => id !== franchiseId)
        : [...prev, franchiseId]
    );
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectedFranchises.length === paginatedFranchises.length) {
      setSelectedFranchises([]);
    } else {
      setSelectedFranchises(paginatedFranchises.map(f => f.id));
    }
  };
  
  // Handle delete
  const handleDelete = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Deleting franchises:', selectedFranchises);
      setSelectedFranchises([]);
      setShowDeleteConfirm(false);
      setLoading(false);
    }, 1000);
  };
  
  // Table columns
  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={selectedFranchises.length === paginatedFranchises.length && paginatedFranchises.length > 0}
          onChange={handleSelectAll}
          className="rounded border-border text-brand-600 focus:ring-brand-500"
        />
      ),
      accessor: 'id',
      align: 'center',
      width: '50px',
      render: (value, franchise) => (
        <input
          type="checkbox"
          checked={selectedFranchises.includes(franchise.id)}
          onChange={() => handleSelectFranchise(franchise.id)}
          className="rounded border-border text-brand-600 focus:ring-brand-500"
        />
      ),
    },
    {
      header: 'Franchise',
      accessor: 'name',
      render: (value, franchise) => (
        <div>
          <div className="font-medium text-text-primary">{franchise.name}</div>
          <div className="text-sm text-text-tertiary">Code: {franchise.code}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'contactPerson',
      render: (value, franchise) => (
        <div>
          <div className="font-medium text-text-primary">{franchise.contactPerson}</div>
          <div className="text-sm text-text-tertiary">{franchise.email}</div>
          <div className="text-sm text-text-tertiary">{franchise.phone}</div>
        </div>
      ),
    },
    {
      header: 'Metrics',
      accessor: 'outletsCount',
      render: (value, franchise) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">Outlets:</span>
            <span className="text-sm font-medium text-text-primary">{franchise.outletsCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">Equipment:</span>
            <span className="text-sm font-medium text-text-primary">{franchise.equipmentCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-tertiary">Due:</span>
            <span className={`text-sm font-medium ${
              franchise.maintenanceDue > 10 ? 'text-danger-600' : 
              franchise.maintenanceDue > 5 ? 'text-warning-600' : 
              'text-success-600'
            }`}>
              {franchise.maintenanceDue}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => {
        const statusConfig = {
          active: { label: 'Active', variant: 'success' },
          pending: { label: 'Pending', variant: 'warning' },
          inactive: { label: 'Inactive', variant: 'neutral' },
        };
        
        const config = statusConfig[value] || { label: value, variant: 'neutral' };
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      header: 'Performance',
      accessor: 'performance',
      render: (value) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-16 bg-neutral-200 rounded-full h-1.5">
              <div 
                className="bg-success-500 h-1.5 rounded-full" 
                style={{ width: `${value.uptime}%` }}
              />
            </div>
            <span className="text-xs text-text-tertiary">{value.uptime}%</span>
          </div>
          <div className="text-xs text-text-tertiary">
            Compliance: {value.compliance}%
          </div>
        </div>
      ),
    },
    {
      header: 'Actions',
      accessor: 'id',
      align: 'right',
      render: (value, franchise) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon="eye"
            className="text-text-tertiary hover:text-text-primary"
            onClick={() => console.log('View franchise:', franchise.id)}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon="edit"
            className="text-text-tertiary hover:text-text-primary"
            onClick={() => {}}
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Franchises</h1>
          <p className="text-text-tertiary mt-1">
            Manage franchise organizations and their outlets
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            icon="download"
            onClick={() => {}}
          >
            Export
          </Button>
          
          <Button
            variant="primary"
            icon="plus"
            onClick={() => setShowAddModal(true)}
          >
            Add Franchise
          </Button>
        </div>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Franchises"
          value={franchiseStats.total}
          description={`${franchiseStats.active} active • ${franchiseStats.pending} pending`}
          icon="🏢"
          trend="+2"
          trendDirection="up"
        />
        
        <StatCard
          title="Total Outlets"
          value={franchiseStats.totalOutlets}
          description="Across all franchises"
          icon="📍"
          trend="+15"
          trendDirection="up"
        />
        
        <StatCard
          title="Total Equipment"
          value={franchiseStats.totalEquipment.toLocaleString()}
          description="Equipment units tracked"
          icon="⚙️"
          trend="+42"
          trendDirection="up"
        />
        
        <StatCard
          title="Maintenance Due"
          value={franchiseStats.maintenanceDue}
          description="Requires attention"
          icon="🔧"
          trend="+3"
          trendDirection="up"
          className="text-danger-600"
        />
      </div>
      
      {/* Performance Metrics */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Average Uptime</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-text-primary">{franchiseStats.averageUptime}%</span>
                <span className="text-sm text-success-600">+1.2%</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-tertiary">Industry Average</span>
                  <span className="font-medium">94.5%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-success-500 h-2 rounded-full" 
                    style={{ width: `${franchiseStats.averageUptime}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Compliance Rate</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-text-primary">{franchiseStats.averageCompliance}%</span>
                <span className="text-sm text-success-600">+2.1%</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-tertiary">Target</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-warning-500 h-2 rounded-full" 
                    style={{ width: `${franchiseStats.averageCompliance}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">Satisfaction Score</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-text-primary">{franchiseStats.averageSatisfaction}/5</span>
                <span className="text-sm text-success-600">+0.3</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(franchiseStats.averageSatisfaction)
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
                <div className="text-sm text-text-tertiary mt-2">
                  Based on franchise feedback
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Filters and Search */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <SearchBar
                placeholder="Search franchises by name, code, or contact..."
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
                ...franchiseStatuses.map(status => ({
                  label: status.label,
                  value: status.value,
                })),
              ]}
            />
            
            <Select
              label="Franchise Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { label: 'All Types', value: 'all' },
                ...franchiseTypes.map(type => ({
                  label: `${type.label} (${type.count})`,
                  value: type.value,
                })),
              ]}
            />
          </div>
          
          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => {
                setStatusFilter('all');
                setTypeFilter('all');
                setSearchQuery('');
              }}
              className={`px-3 py-1.5 text-sm rounded-full ${
                statusFilter === 'all' && typeFilter === 'all' && searchQuery === ''
                  ? 'bg-brand-100 text-brand-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Franchises
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
              onClick={() => setTypeFilter('corporate')}
              className={`px-3 py-1.5 text-sm rounded-full ${
                typeFilter === 'corporate'
                  ? 'bg-brand-100 text-brand-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Corporate Franchises
            </button>
            
            <button
              onClick={() => {
                const highMaintenance = mockFranchises.filter(f => f.maintenanceDue > 10);
                console.log('High maintenance franchises:', highMaintenance);
              }}
              className="px-3 py-1.5 text-sm rounded-full bg-warning-100 text-warning-700 hover:bg-warning-200"
            >
              High Maintenance ({mockFranchises.filter(f => f.maintenanceDue > 10).length})
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* Table with actions */}
      {selectedFranchises.length > 0 && (
        <TableActions selectedCount={selectedFranchises.length}>
          <Button
            variant="outline"
            size="sm"
            icon="download"
            onClick={() => {}}
          >
            Export Selected
          </Button>
          
          <Button
            variant="danger"
            size="sm"
            icon="delete"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Selected
          </Button>
        </TableActions>
      )}
      
      {/* Franchises Table */}
      <Table
        columns={columns}
        data={paginatedFranchises}
        loading={loading}
        striped
        hover
        onRowClick={() => {}}
        emptyText="No franchises match your search criteria"
        emptyState={
          <EmptyState
            variant="search"
            title="No Franchises Found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setTypeFilter('all');
                }}
              >
                Clear Filters
              </Button>
            }
          />
        }
      />
      
      {/* Table Pagination */}
      {filteredFranchises.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredFranchises.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Franchise Distribution</h3>
            <div className="space-y-3">
              {franchiseTypes.map((type) => (
                <div key={type.value} className="flex items-center justify-between">
                  <span className="text-sm text-text-tertiary">{type.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-brand-500 h-2 rounded-full" 
                        style={{ width: `${(type.count / franchiseStats.total) * 100}%` }}
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
            <h3 className="text-sm font-semibold text-text-primary mb-4">Performance Leaders</h3>
            <div className="space-y-3">
              {franchisePerformanceData
                .sort((a, b) => b.uptime - a.uptime)
                .slice(0, 5)
                .map((franchise, index) => (
                  <div key={franchise.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center bg-brand-50 text-brand-700 text-xs font-semibold rounded">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-text-primary truncate max-w-[120px]">
                        {franchise.name}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                      {franchise.uptime}%
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Geographic Distribution</h3>
            <div className="space-y-3">
              {franchiseGeographicData.map((region) => (
                <div key={region.region} className="flex items-center justify-between">
                  <span className="text-sm text-text-tertiary">{region.region}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-success-500 h-2 rounded-full" 
                        style={{ width: `${region.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{region.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add Franchise Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Franchise"
        size="lg"
        onConfirm={() => {
          console.log('Adding new franchise');
          setShowAddModal(false);
        }}
        onCancel={() => setShowAddModal(false)}
        confirmText="Create Franchise"
        cancelText="Cancel"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Franchise Name"
              placeholder="Enter franchise name"
              required
            />
            
            <Input
              label="Franchise Code"
              placeholder="Enter franchise code"
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
              label="Franchise Type"
              options={franchiseTypes.map(type => ({
                label: type.label,
                value: type.value,
              }))}
              placeholder="Select franchise type"
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
        </div>
      </Modal>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Franchises"
        message={`Are you sure you want to delete ${selectedFranchises.length} selected franchise(s)? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        confirmLoading={loading}
      />
    </div>
  );
};

export default FranchisesPage;