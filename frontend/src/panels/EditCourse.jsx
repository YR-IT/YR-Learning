import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Save, X, Eye, Video } from 'lucide-react';
import { API_BASE_URL } from '../services/api';
import toast from 'react-hot-toast';
import './EditCourse.css';

const EditCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdatingCourse, setIsUpdatingCourse] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Course form state
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    curriculum: [],
  });

  // Lesson form state
  const [lessonForm, setLessonForm] = useState({
    title: '',
    videoUrl: '',
    duration: '15:00',
    description: '',
  });
 
  


  // API base URL
  const API_BASE = API_BASE_URL;

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/course/allcourses`);
      const data = await response.json();
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    setLoading(false);
  };

  // Fetch lessons for a specific course
  const fetchLessons = async (courseId) => {
    try {
      const response = await fetch(`${API_BASE}/course/lessons/${courseId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch lessons.');
      setLessons(Array.isArray(data) ? data : data.lessons || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      toast.error(error.message || 'Could not load lessons.');
      setLessons([]);
    }
  };

  // Delete course
  const deleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      await fetch(`${API_BASE}/course/deletecourse/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCourses(courses.filter(course => course._id !== courseId));
      if (selectedCourse && selectedCourse._id === courseId) {
        setSelectedCourse(null);
        setLessons([]);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  const video_upload = (e) => {
    e.preventDefault();
    const apikey = import.meta.env.VITE_FILESTACK_API_KEY;
    const client = filestack.init(apikey);
    const options = {
      onUploadDone: (res) => {
        console.log(res);
        const videoUrl = res.filesUploaded[0].url;

        setLessonForm((current) => ({ ...current, videoUrl }));
      }
    };
    client.picker(options).open();
  }
   

  // Update course
  const updateCourse = async () => {
    const sections = (courseForm.curriculum || [])
      .map((section) => ({
        title: section.title.trim(),
        lessons: section.lessons.map((lesson) => ({ title: lesson.title.trim() })).filter((lesson) => lesson.title),
      }))
      .filter((section) => section.title || section.lessons.length);
    if (!sections.length || sections.some((section) => !section.title || !section.lessons.length)) {
      toast.error('Add a title and at least one topic to each curriculum section.');
      return;
    }

    setIsUpdatingCourse(true);
    try { 
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/course/updatecourse/${selectedCourse._id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...courseForm, curriculum: { sections } })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update course.');
      const updatedCourse = data.course || data;
      setCourses(current => current.map(course =>
        course._id === selectedCourse._id ? updatedCourse : course
      ));
      setSelectedCourse(updatedCourse);
      setIsEditingCourse(false);
      toast.success('Course updated.');
    } catch (error) {
      console.error('Error updating course:', error);
      toast.error(error.message || 'Could not update course.');
    } finally {
        setIsUpdatingCourse(false);
    }
  };

  // Add lesson
   const addLesson = async () => {
    setIsSubmitting(true);
    try {
      if (!lessonForm.title.trim()) return toast.error('Lesson title is required.');
      
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/course/addlessons/${selectedCourse._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: lessonForm.title.trim(),
          duration: lessonForm.duration || '15:00',
          videoUrl: lessonForm.videoUrl.trim(),
          description: lessonForm.description.trim(),
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add lesson.');
      await fetchLessons(selectedCourse._id);
      setIsAddingLesson(false);
      resetLessonForm();
      toast.success('Lesson added.');
    } catch(error) {
      console.error('Error adding lesson:', error);
      toast.error(error.message || 'Could not add lesson.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update lesson
  const updateLesson = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/course/updatelessons/${selectedCourse._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lessonId: editingLesson._id,
          title: lessonForm.title.trim(),
          duration: lessonForm.duration || '15:00',
          videoUrl: lessonForm.videoUrl.trim(),
          description: lessonForm.description.trim(),
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update lesson.');
      await fetchLessons(selectedCourse._id);
      setEditingLesson(null);
      resetLessonForm();
      toast.success('Lesson updated.');
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast.error(error.message || 'Could not update lesson.');
    } finally {
        setIsUpdating(false);
    }
  };

  // Delete lesson
  const deleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/course/deletelessons/${selectedCourse._id}/${lessonId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete lesson.');
      setLessons(current => current.filter(lesson => lesson._id !== lessonId));
      toast.success('Lesson deleted.');
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error(error.message || 'Could not delete lesson.');
    }
  };

const resetLessonForm = () => {
  setLessonForm({
    title: '',
    videoUrl: '',
    duration: '15:00',
    description: '',
  });
};


  const selectCourse = (course) => {
    setSelectedCourse(course);
    const sections = course.curriculum?.sections?.length
      ? course.curriculum.sections
      : (course.chapters || []).map((chapter) => ({ title: chapter.title, lessons: [] }));
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price,
      curriculum: sections.map((section) => ({
        title: section.title || '',
        lessons: (section.lessons || []).map((lesson) => ({ title: typeof lesson === 'string' ? lesson : lesson.title || '' })),
      })),
    });
    setLessons([]);
  };

  const startEditingLesson = (lesson) => {
  setEditingLesson(lesson);
  setLessonForm({
    title: lesson.title || '',
    videoUrl: lesson.videoUrl || lesson.video || '',
    duration: lesson.duration || '15:00',
    description: lesson.description || lesson.content || '',
  });
};


  const cancelAddLesson = () => {
    setIsAddingLesson(false);
    resetLessonForm();
  };

  const formatDuration = (duration) => {
    if (typeof duration === 'string' && duration.includes(':')) return duration;
    const seconds = Number(duration);
    if (!Number.isFinite(seconds)) return duration || '15:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="edit-course-admin">
      <div className="max-w-7xl mx-auto">
        <header className="edit-course-heading">
          <p className="admin-eyebrow">COURSE CONTENT</p>
          <h1>Manage course curriculum</h1>
          <p>Choose a course to update its details and curriculum topics.</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Courses</h2>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  <div className="space-y-2">
                    {courses.map(course => (
                      <div
                        key={course._id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedCourse?._id === course._id 
                            ? 'bg-blue-50 border-blue-200' 
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => selectCourse(course)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 text-sm">{course.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{course.category}</p>
                            <p className="text-sm font-semibold text-green-600 mt-1">Rs. {Number(course.price || 0).toLocaleString('en-IN')}</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCourse(course._id);
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Course Details and Lessons */}
          <div className="lg:col-span-2">
            {selectedCourse ? (
              <div className="space-y-6">
                {/* Course Details */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Course Details</h2>
                    <button
                      onClick={() => setIsEditingCourse(!isEditingCourse)}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {isEditingCourse ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      {isEditingCourse ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  <div className="p-4">
                    {isEditingCourse ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Course Title"
                          value={courseForm.title}
                          onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <textarea
                          placeholder="Course Description"
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Category"
                          value={courseForm.category}
                          onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          value={courseForm.price}
                          onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={updateCourse}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                          disabled={isUpdatingCourse}>
                          {isUpdatingCourse ? (
                              <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div><span>Saving...</span></>
                          ) : (
                              <><Save className="w-4 h-4" /><span>Save Changes</span></>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h3>
                        <p className="text-gray-600">{selectedCourse.description}</p>
                        <div className="flex gap-4">
                          <span className="text-sm text-gray-500">Category: <span className="font-medium">{selectedCourse.category}</span></span>
                          <span className="text-sm text-gray-500">Price: <span className="font-medium text-green-600">Rs. {Number(selectedCourse.price || 0).toLocaleString('en-IN')}</span></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Curriculum</h2>
                    {isEditingCourse && (
                      <button
                        type="button"
                        onClick={() => setCourseForm((current) => ({ ...current, curriculum: [...current.curriculum, { title: '', lessons: [{ title: '' }] }] }))}
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4" /> Add section
                      </button>
                    )}
                  </div>
                  <div className="p-4 space-y-4">
                    {(courseForm.curriculum || []).map((section, sectionIndex) => (
                      <div key={sectionIndex} className="rounded-lg border border-gray-200 p-4 space-y-3">
                        {isEditingCourse ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={section.title}
                              placeholder={`Section ${sectionIndex + 1}`}
                              aria-label={`Section ${sectionIndex + 1} title`}
                              onChange={(event) => setCourseForm((current) => ({
                                ...current,
                                curriculum: current.curriculum.map((item, index) => index === sectionIndex ? { ...item, title: event.target.value } : item),
                              }))}
                              className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <button
                              type="button"
                              onClick={() => setCourseForm((current) => ({ ...current, curriculum: current.curriculum.filter((_, index) => index !== sectionIndex) }))}
                              className="text-red-600 hover:text-red-800"
                              aria-label={`Remove section ${sectionIndex + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                        )}
                        <ol className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex items-center gap-2">
                              {isEditingCourse ? (
                                <>
                                  <input
                                    type="text"
                                    value={lesson.title}
                                    placeholder={`Topic ${lessonIndex + 1}`}
                                    aria-label={`Section ${sectionIndex + 1} topic ${lessonIndex + 1}`}
                                    onChange={(event) => setCourseForm((current) => ({
                                      ...current,
                                      curriculum: current.curriculum.map((item, index) => index === sectionIndex ? {
                                        ...item,
                                        lessons: item.lessons.map((topic, topicIndex) => topicIndex === lessonIndex ? { ...topic, title: event.target.value } : topic),
                                      } : item),
                                    }))}
                                    className="flex-1 p-2 border border-gray-300 rounded"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setCourseForm((current) => ({
                                      ...current,
                                      curriculum: current.curriculum.map((item, index) => index === sectionIndex ? { ...item, lessons: item.lessons.filter((_, topicIndex) => topicIndex !== lessonIndex) } : item),
                                    }))}
                                    className="text-red-600 hover:text-red-800"
                                    aria-label={`Remove topic ${lessonIndex + 1}`}
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <span className="text-gray-700">{lesson.title}</span>
                              )}
                            </li>
                          ))}
                        </ol>
                        {isEditingCourse && (
                          <button
                            type="button"
                            onClick={() => setCourseForm((current) => ({
                              ...current,
                              curriculum: current.curriculum.map((item, index) => index === sectionIndex ? { ...item, lessons: [...item.lessons, { title: '' }] } : item),
                            }))}
                            className="text-sm font-medium text-blue-700 hover:text-blue-900"
                          >
                            Add topic
                          </button>
                        )}
                      </div>
                    ))}
                    {(!courseForm.curriculum || courseForm.curriculum.length === 0) && (
                      <p className="text-sm text-gray-500">No curriculum sections yet. Choose Edit to add one.</p>
                    )}
                  </div>
                </div>

                {/* Lessons */}
                <div className="hidden">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Lessons ({lessons.length})</h2>
                    <button id = "addlesson"
                      onClick={() => {
                        setIsAddingLesson(true);
                        resetLessonForm();
                      }}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lesson
                    </button>
                  </div>
                  <div className="p-4">
                    {/* Add Lesson Form */}
                    {isAddingLesson && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                        <h3 className="font-medium text-gray-900 mb-3">Add New Lesson</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Lesson Title"
                            value={lessonForm.title}
                            onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <textarea
                            placeholder="Video URL"
                            value={lessonForm.videoUrl}
                            onChange={(e) => setLessonForm({...lessonForm, videoUrl: e.target.value})}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Duration (MM:SS)"
                            value={lessonForm.duration}
                            onChange={(e) => setLessonForm({...lessonForm, duration: e.target.value})}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <textarea
                            placeholder="Lesson Description"
                            value={lessonForm.description}
                            onChange={(e) => setLessonForm({...lessonForm, description: e.target.value})}
                            className="md:col-span-2 p-2 border border-gray-300 rounded h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={addLesson}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-gre700"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                                <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div><span>Adding...</span></>
                            ) : (
                                <><Save className="w-4 h-4" /><span>Add Lesson</span></>
                            )}
                          </button>
                          <button id='upload' onClick={video_upload} className='solid rounded-md  border-[3px] border-solid border-green-700 text-md bg-slate-200'>
                            Upload Video
                          </button>
                          <button
                            onClick={cancelAddLesson}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded border-orange-300 hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Lessons List */}
                    <div className="space-y-3">
                      {lessons.map((lesson, index) => (
                        <div key={lesson._id} className="border border-gray-200 rounded-lg p-4">
                          {editingLesson?._id === lesson._id ? (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={lessonForm.title}
                                  onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                 <button onClick={video_upload} className='solid rounded-md border-gray-800'>
                                    Upload New Video
                                  </button>
                                   <input
                                  type="text"
                                  placeholder="Duration (MM:SS)"
                                  value={lessonForm.duration}
                                  onChange={(e) => setLessonForm({...lessonForm, duration: e.target.value})}
                                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                              <textarea
                                placeholder="Lesson Description"
                                value={lessonForm.description}
                                onChange={(e) => setLessonForm({...lessonForm, description: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={updateLesson}
                                  className="flex items-center justify-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                                  disabled={isUpdating}
                                >
                                  {isUpdating ? (
                                    <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div><span>Saving...</span></>
                                  ) : (
                                    <><Save className="w-4 h-4" /><span>Save</span></>
                                  )}
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingLesson(null);
                                    resetLessonForm();
                                  }}
                                  className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                                  <Video className="w-4 h-4" />
                                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                  <span className="text-sm text-gray-500">({formatDuration(lesson.duration)})</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{lesson.description || lesson.content}</p>
                                <div className="flex gap-4">
                                {(lesson.videoUrl || lesson.video) && (
                                  <a
                                    href={lesson.videoUrl || lesson.video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Video
                                  </a>
                                )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEditingLesson(lesson)}
                                  className="text-blue-600 hover:text-blue-800 p-1"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteLesson(lesson._id)}
                                  className="text-red-600 hover:text-red-800 p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {lessons.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No lessons found. Click "Add Lesson" to create your first lesson.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <h2 className="text-xl font-medium text-gray-900 mb-2">Select a Course</h2>
                <p className="text-gray-500">Choose a course from the list to view and manage its details and lessons.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
