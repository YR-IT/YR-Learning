import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Save, X, Eye, Video, FileText, Book } from 'lucide-react';
import { API_BASE_URL } from '../services/api';

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
    price: ''
  });

  // Lesson form state
  const [lessonForm, setLessonForm] = useState({
    title: '',
    video : null,
    duration: 0,
    content: '',
    contentType: 'video',
    resource:''
    
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
      setLessons(data.data || data || []);
    } catch (error) {
      console.error('Error fetching lessons:', error);
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

        setLessonForm({ ...lessonForm, video: videoUrl });
      }
    };
    client.picker(options).open();
  }

  const resource_upload = (e) => {
    e.preventDefault();
    const apikey = import.meta.env.VITE_FILESTACK_API_KEY;
    const client = filestack.init(apikey);
    const options = {
      onUploadDone: (res) => {
        console.log(res);
        const resourceUrl = res.filesUploaded[0].url;
        setLessonForm({ ...lessonForm, resource: resourceUrl });
      }
    };
    client.picker(options).open();
  }
   

  // Update course
  const updateCourse = async () => {
    setIsUpdatingCourse(true);
    try { 
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/course/updatecourse/${selectedCourse._id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseForm)
      });
      const updatedCourse = await response.json();
      setCourses(courses.map(course => 
        course._id === selectedCourse._id ? updatedCourse : course
      ));
      setSelectedCourse(updatedCourse);
      setIsEditingCourse(false);
    } catch (error) {
      console.error('Error updating course:', error);
    } finally {
        setIsUpdatingCourse(false);
    }
  };

  // Add lesson
   const addLesson = async () => {
    setIsSubmitting(true);
    try {
      if (!lessonForm.title.trim()) return alert('Lesson title is required');
      if (!lessonForm.content.trim()) return alert('Lesson content is required');
      
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/course/addlessons/${selectedCourse._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ lessondata: lessonForm })
      });
      
      const data = await response.json();
      await fetchLessons(selectedCourse._id);
      setIsAddingLesson(false);
      resetLessonForm();
    } catch(error) {
      console.log(error);
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
        body: JSON.stringify({ data: lessonForm })
      });
      await response.json();
      await fetchLessons(selectedCourse._id);
      setEditingLesson(null);
      resetLessonForm();
    } catch (error) {
      console.error('Error updating lesson:', error);
    } finally {
        setIsUpdating(false);
    }
  };

  // Delete lesson
  const deleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
      await fetch(`${API_BASE}/course/deletelessons/${selectedCourse._id}/${lessonId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setLessons(lessons.filter(lesson => lesson._id !== lessonId));
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

const resetLessonForm = () => {
  setLessonForm({
    title: '',
    video: null,
    duration: 0,
    content: '',
    contentType: 'video',
    resource:''
  });
};


  const selectCourse = (course) => {
    setSelectedCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price
    });
    fetchLessons(course._id);
  };

  const startEditingLesson = (lesson) => {
  setEditingLesson(lesson);
  setLessonForm({ ...lesson }); // it's fine to keep _id here for editing
};


  const cancelAddLesson = () => {
    setIsAddingLesson(false);
    resetLessonForm();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getContentIcon = (contentType) => {
    switch (contentType) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'text': return <FileText className="w-4 h-4" />;
      default: return <Book className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Course Management Dashboard</h1>
        
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
                            <p className="text-sm font-semibold text-green-600 mt-1">${course.price}</p>
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
                          <span className="text-sm text-gray-500">Price: <span className="font-medium text-green-600">${selectedCourse.price}</span></span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lessons */}
                <div className="bg-white rounded-lg shadow-sm border">
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
                            value={lessonForm.video || ''}
                            onChange={(e) => setLessonForm({...lessonForm, video: e.target.value})}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <textarea
                            placeholder="Resource URL"
                            value={lessonForm.resource || ''}
                            onChange={(e) => setLessonForm({...lessonForm, resource: e.target.value})}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="number"
                            placeholder="Duration (seconds)"
                            value={lessonForm.duration}
                            onChange={(e) => setLessonForm({...lessonForm, duration: parseInt(e.target.value) || 0})}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <select
                            value={lessonForm.contentType}
                            onChange={(e) => setLessonForm({...lessonForm, contentType: e.target.value})}
                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="video">Video</option>
                            <option value="text">Text</option>
                            <option value="pdf">PDF</option>en-
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                          </select>
                          <textarea
                            placeholder="Lesson Content"
                            value={lessonForm.content}
                            onChange={(e) => setLessonForm({...lessonForm, content: e.target.value})}
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
                          <button id='upload_resource' onClick={resource_upload} className='solid border-width-3 border-[3px] rounded-md border-solid border-green-700 text-md bg-slate-200'>
                            Upload Resource
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
                                  <button onClick={resource_upload} className='solid rounded-md border-gray-800'>
                                    Upload New Resource
                                  </button>
                                   <input
                                  type="number"
                                  value={lessonForm.duration}
                                  onChange={(e) => setLessonForm({...lessonForm, duration: parseInt(e.target.value) || 0})}
                                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <select
                                  value={lessonForm.contentType}
                                  onChange={(e) => setLessonForm({...lessonForm, contentType: e.target.value})}
                                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="video">Video</option>
                                  <option value="text">Text</option>
                                  <option value="pdf">PDF</option>
                                  <option value="quiz">Quiz</option>
                                  <option value="assignment">Assignment</option>
                                </select>
                              </div>
                              <textarea
                                value={lessonForm.content}
                                onChange={(e) => setLessonForm({...lessonForm, content: e.target.value})}
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
                                  {getContentIcon(lesson.contentType)}
                                  <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                  <span className="text-sm text-gray-500">({formatDuration(lesson.duration)})</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{lesson.content}</p>
                                <div className="flex gap-4">
                                {lesson.video && (
                                  <a
                                    href={lesson.video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Video
                                  </a>
                                )}
                                {lesson.resource && (
                                  <a
                                    href={lesson.resource}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View Resource
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
