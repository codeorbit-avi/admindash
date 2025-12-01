import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Mail, Calendar, Shield, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserStatus } from '../types';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, updateUser, isLoading } = useApp();
  
  const [user, setUser] = useState(users.find(u => u.id === id));
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Edit Form State
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState<UserStatus>(UserStatus.Active);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundUser = users.find(u => u.id === id);
    setUser(foundUser);
  }, [users, id]);

  const handleEditClick = () => {
    if (user) {
      setEditName(user.name);
      setEditStatus(user.status);
      setIsEditModalOpen(true);
      setError('');
    }
  };

  const handleSave = () => {
    if (!editName.trim()) {
      setError('Name is required');
      return;
    }
    if (user) {
      updateUser(user.id, { name: editName, status: editStatus });
      setIsEditModalOpen(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading user data...</div>;
  if (!user) return <div className="p-8 text-center text-red-500">User not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => navigate('/users')}
        className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Users
      </button>

      {/* Header Card */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-500 to-cyan-500 opacity-10"></div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-24 h-24 rounded-full ring-4 ring-white dark:ring-gray-900 object-cover shadow-lg"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <Badge status={user.status} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{user.role}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Mail size={16} />
                {user.email}
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                Last Active {new Date(user.lastActive).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0">
             <Button onClick={handleEditClick} variant="secondary">
                <Edit2 size={16} className="mr-2" /> Edit Profile
             </Button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Column */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                   <Shield size={16} /> Two-Factor Auth
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">Enabled</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">Password strength</div>
                <span className="text-xs font-medium text-green-600">Strong</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Column */}
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-6">
               {[1, 2, 3, 4, 5].map((item) => (
                 <div key={item} className="flex gap-4">
                    <div className="w-8 flex flex-col items-center">
                       <div className="w-2 h-2 rounded-full bg-primary-500 mt-2"></div>
                       {item !== 5 && <div className="w-px h-full bg-gray-200 dark:bg-gray-800 mt-2"></div>}
                    </div>
                    <div className="pb-2">
                       <p className="text-sm text-gray-900 dark:text-white font-medium">Updated project settings</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User">
         <div className="space-y-4">
            <Input 
               label="Full Name" 
               value={editName} 
               onChange={(e) => setEditName(e.target.value)} 
               error={error}
            />
            
            <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
               <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as UserStatus)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
               >
                  <option value={UserStatus.Active}>Active</option>
                  <option value={UserStatus.Inactive}>Inactive</option>
               </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
               <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
               <Button onClick={handleSave}>Save Changes</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};