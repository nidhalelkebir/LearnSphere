import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Mail, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Edit2, 
  Trash2,
  Filter,
  MoreVertical,
  Loader2
} from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { databaseService } = await import('../../services/database');
        const fetchedUsers = await databaseService.getAllUsers(100);
        setUsers(fetchedUsers);
      } catch (error) {
        setUsers([]);
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const roles = ['all', 'admin', 'user', 'moderator', 'editor'];
  const statuses = ['all', 'active', 'inactive', 'pending', 'suspended'];

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const name = user.fullName || 
        (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 
         user.firstName || user.email || '');
      
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.fullName || `${a.firstName || ''} ${a.lastName || ''}`.trim() || a.email;
          bValue = b.fullName || `${b.firstName || ''} ${b.lastName || ''}`.trim() || b.email;
          break;
        case 'email':
          aValue = a.email || '';
          bValue = b.email || '';
          break;
        case 'role':
          aValue = a.role || '';
          bValue = b.role || '';
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [users, searchTerm, selectedRole, selectedStatus, sortBy, sortOrder]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-amber-500';
      case 'suspended': return 'bg-rose-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
      case 'moderator': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'editor': return 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage user accounts, permissions, and access levels
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Users: <span className="font-semibold text-gray-800 dark:text-white">
                {filteredAndSortedUsers.length}
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {users.filter(u => u.status === 'active').length} active users
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
            </div>
          ) : filteredAndSortedUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <User className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No users found</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                {searchTerm || selectedRole !== 'all' || selectedStatus !== 'all' 
                  ? "Try adjusting your search or filters" 
                  : "No users in the system yet"}
              </p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => toggleSort('name')}
                          className="flex items-center space-x-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          <span>User</span>
                          {sortBy === 'name' && (
                            <span className="text-blue-500">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => toggleSort('email')}
                          className="flex items-center space-x-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                          {sortBy === 'email' && (
                            <span className="text-blue-500">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => toggleSort('role')}
                          className="flex items-center space-x-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Role</span>
                          {sortBy === 'role' && (
                            <span className="text-blue-500">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => toggleSort('status')}
                          className="flex items-center space-x-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                        >
                          <span>Status</span>
                          {sortBy === 'status' && (
                            <span className="text-blue-500">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {filteredAndSortedUsers.map((user) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                                  {user.fullName?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {user.fullName || 
                                    (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 
                                     user.firstName || user.email || 'Unnamed User')}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {user.email || 'No email'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role || 'user'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Active'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {/* Edit functionality */}}
                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit user"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowDeleteModal(true);
                                }}
                                className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                                title="Delete user"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Stats Bar */}
        {!loading && users.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Users</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{users.length}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-emerald-600 dark:text-emerald-400">Active</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-600 dark:text-purple-400">Admins</p>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-sm text-amber-600 dark:text-amber-400">Pending</p>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Delete User
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete {selectedUser?.fullName || selectedUser?.email}? This action cannot be undone.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Delete User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserManagement;