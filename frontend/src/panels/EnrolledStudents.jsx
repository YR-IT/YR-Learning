import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  GraduationCap, 
  Tag, 
  CheckCircle, 
  Clock, 
  X,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getEnrollments, updateEnrollmentStatus, deleteEnrollment } from '../services/enrollmentService';
import './EnrolledStudents.css';

const EnrolledStudents = () => {
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null); // For detail view modal

  const fetchEnrolledStudents = async () => {
    try {
      setLoading(true);
      const data = await getEnrollments();
      setEnrolledUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      toast.error('Failed to load enrolled students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateEnrollmentStatus(id, newStatus);
      setEnrolledUsers(prev => 
        prev.map(user => (user._id === id || user.id === id) ? { ...user, status: newStatus } : user)
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enrollment record?')) return;
    try {
      await deleteEnrollment(id);
      setEnrolledUsers(prev => prev.filter(user => user._id !== id && user.id !== id));
      toast.success('Enrollment deleted successfully');
      if (selectedStudent && (selectedStudent._id === id || selectedStudent.id === id)) {
        setSelectedStudent(null);
      }
    } catch (err) {
      toast.error('Failed to delete enrollment');
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (enrolledUsers.length === 0) {
      toast.error('No enrollment data to export');
      return;
    }

    const headers = [
      'Name',
      'Email',
      'Phone Number',
      'Gender',
      'City',
      'Current Status',
      'Course / Profession',
      'Institution / Company',
      'Course Enrolled For',
      'Mode',
      'Expectations',
      'Coupon Code',
      'Comments',
      'Status',
      'Enrolled Date'
    ];

    const rows = filteredUsers.map(u => [
      `"${u.name || ''}"`,
      `"${u.email || ''}"`,
      `"${u.phoneNumber || ''}"`,
      `"${u.gender || ''}"`,
      `"${u.city || ''}"`,
      `"${u.currentStatus || ''}"`,
      `"${u.currentProfessionOrCourse || ''}"`,
      `"${u.institutionOrCompany || ''}"`,
      `"${u.courseEnrolledFor || u.course || ''}"`,
      `"${u.mode || 'Online'}"`,
      `"${(u.expectations || '').replace(/"/g, '""')}"`,
      `"${u.couponCode || ''}"`,
      `"${(u.comments || '').replace(/"/g, '""')}"`,
      `"${u.status || 'Pending'}"`,
      `"${u.enrolledDate || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `YR_Enrolled_Students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Enrollment records exported as CSV!');
  };

  // Filtered list
  const filteredUsers = enrolledUsers.filter(user => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = 
      (user.name || '').toLowerCase().includes(s) ||
      (user.email || '').toLowerCase().includes(s) ||
      (user.phoneNumber || '').toLowerCase().includes(s) ||
      (user.institutionOrCompany || '').toLowerCase().includes(s) ||
      (user.city || '').toLowerCase().includes(s);

    const matchesCourse = selectedCourse === 'All' || 
      (user.courseEnrolledFor || user.course || '').toLowerCase().includes(selectedCourse.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || (user.status || 'Pending') === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const uniqueCourses = ['All', ...new Set(enrolledUsers.map(u => u.courseEnrolledFor || u.course).filter(Boolean))];

  return (
    <div className="admin-enrollment p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Enrolled Students & Leads</h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage admission applications, training batches, and student information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchEnrolledStudents}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Refresh List"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-600/20 transition-all"
          >
            <FileSpreadsheet size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium">Total Applications</p>
          <p className="text-2xl font-bold text-white mt-1">{enrolledUsers.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium">Confirmed / Active</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {enrolledUsers.filter(u => u.status === 'Confirmed').length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium">Online Mode</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {enrolledUsers.filter(u => (u.mode || 'Online') === 'Online').length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <p className="text-xs text-slate-400 font-medium">Pending Review</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {enrolledUsers.filter(u => !u.status || u.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="relative flex-1 min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, city, college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {uniqueCourses.map(c => (
              <option key={c} value={c}>{c === 'All' ? 'All Courses' : c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Background</th>
                <th className="px-5 py-4">Course & Mode</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                      <span>Loading enrolled students...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400">
                    <Users size={32} className="mx-auto mb-2 text-slate-600" />
                    <p className="font-semibold text-slate-300">No student enrollments found</p>
                    <p className="text-xs text-slate-500 mt-1">Applications submitted on the site will appear here.</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const id = user._id || user.id;
                  const currentStat = user.status || 'Pending';

                  return (
                    <tr key={id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Student info */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-white text-sm">{user.name || 'Student'}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span>{user.gender || 'Not specified'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5"><MapPin size={11} /> {user.city || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Mail size={12} className="text-slate-500 flex-shrink-0" />
                          <a href={`mailto:${user.email}`} className="hover:underline">{user.email || 'N/A'}</a>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Phone size={12} className="text-slate-500 flex-shrink-0" />
                          <a href={`tel:${user.phoneNumber}`} className="hover:underline">{user.phoneNumber || 'N/A'}</a>
                        </div>
                      </td>

                      {/* Academic / Background */}
                      <td className="px-5 py-4 space-y-1">
                        <div className="text-xs font-medium text-slate-200">
                          {user.currentProfessionOrCourse || user.currentStatus || 'Student'}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 truncate max-w-[180px]" title={user.institutionOrCompany}>
                          <Building size={11} className="flex-shrink-0" />
                          <span className="truncate">{user.institutionOrCompany || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Course & Mode */}
                      <td className="px-5 py-4 space-y-1.5">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-950/80 text-indigo-300 border border-indigo-700/50">
                          {user.courseEnrolledFor || user.course || 'Website Development'}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <span className={`px-2 py-0.5 rounded-md font-medium ${
                            (user.mode || 'Online') === 'Online' 
                              ? 'bg-blue-900/40 text-blue-300 border border-blue-600/30' 
                              : 'bg-emerald-900/40 text-emerald-300 border border-emerald-600/30'
                          }`}>
                            {user.mode || 'Online'}
                          </span>
                          {user.couponCode && (
                            <span className="px-2 py-0.5 rounded-md bg-purple-900/40 text-purple-300 border border-purple-600/30 font-mono">
                              🎫 {user.couponCode}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <select
                          value={currentStat}
                          onChange={(e) => handleStatusChange(id, e.target.value)}
                          className={`text-xs font-semibold rounded-xl px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                            currentStat === 'Confirmed' 
                              ? 'bg-emerald-900/40 text-emerald-300 border-emerald-600/40' 
                              : currentStat === 'Contacted'
                              ? 'bg-blue-900/40 text-blue-300 border-blue-600/40'
                              : currentStat === 'Completed'
                              ? 'bg-purple-900/40 text-purple-300 border-purple-600/40'
                              : currentStat === 'Cancelled'
                              ? 'bg-rose-900/40 text-rose-300 border-rose-600/40'
                              : 'bg-amber-900/40 text-amber-300 border-amber-600/40'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedStudent(user)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 transition-colors"
                            title="View Full Application"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-rose-400 hover:text-rose-300 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-white my-auto max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                <p className="text-xs text-blue-200 mt-0.5">Applied on {selectedStudent.enrolledDate || 'Recent'}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60">
                <div>
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <span className="font-semibold text-white">{selectedStudent.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone</span>
                  <span className="font-semibold text-white">{selectedStudent.phoneNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Gender</span>
                  <span className="font-semibold text-white">{selectedStudent.gender || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">City</span>
                  <span className="font-semibold text-white">{selectedStudent.city || 'N/A'}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Current Status</span>
                    <span className="font-semibold text-white">{selectedStudent.currentStatus || 'Student'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Course / Profession</span>
                    <span className="font-semibold text-white">{selectedStudent.currentProfessionOrCourse || 'N/A'}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Institution / Company Name</span>
                  <span className="font-semibold text-white">{selectedStudent.institutionOrCompany || 'N/A'}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Course Enrolled For</span>
                    <span className="font-semibold text-indigo-400">{selectedStudent.courseEnrolledFor || selectedStudent.course}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Mode</span>
                    <span className="font-semibold text-emerald-400">{selectedStudent.mode || 'Online'}</span>
                  </div>
                </div>
                {selectedStudent.couponCode && (
                  <div>
                    <span className="text-slate-400 block text-[11px]">Coupon Code Applied</span>
                    <span className="font-mono text-purple-300 font-bold">{selectedStudent.couponCode}</span>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-1">
                <span className="text-slate-400 block text-[11px] font-medium">Expectations from training</span>
                <p className="text-slate-200 leading-relaxed italic">
                  "{selectedStudent.expectations || 'No specific expectations written.'}"
                </p>
              </div>

              {selectedStudent.comments && (
                <div className="p-4 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-1">
                  <span className="text-slate-400 block text-[11px] font-medium">Comments / Special Requests</span>
                  <p className="text-slate-200 leading-relaxed">
                    {selectedStudent.comments}
                  </p>
                </div>
              )}

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle size={15} />
                <span>Declaration confirmed by applicant.</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledStudents;
