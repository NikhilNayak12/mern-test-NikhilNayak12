import { useState, useEffect } from 'react'
import axios from 'axios'

function Courses() {
  const [courses, setCourses] = useState([])
  const [courseName, setCourseName] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/courses')
      setCourses(res.data)
    } catch (err) {
      console.error('Error fetching courses:', err)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleAddCourse = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      const res = await axios.post(
        '/api/courses',
        { courseName, courseDescription, instructor },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCourses([...courses, res.data])
      setCourseName('')
      setCourseDescription('')
      setInstructor('')
      setMessage('Course added successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add course')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setCourses(courses.filter((course) => course._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {token && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-indigo-400 mb-5">Add New Course</h2>
          {message && (
            <div className="bg-emerald-900/40 border border-emerald-700 text-emerald-300 text-center rounded-lg p-3 mb-4">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-900/40 border border-red-700 text-red-300 text-center rounded-lg p-3 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleAddCourse} className="space-y-4">
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
            <input
              type="text"
              placeholder="Instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition cursor-pointer"
            >
              Add Course
            </button>
          </form>
        </div>
      )}

      <h2 className="text-2xl font-bold text-gray-100 mb-6">All Courses</h2>
      {courses.length === 0 && (
        <p className="text-gray-500 text-center py-10">No courses found.</p>
      )}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-center shadow-lg hover:border-gray-700 transition"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-100">{course.courseName}</h3>
              <p className="text-gray-400 mt-1">{course.courseDescription}</p>
              <p className="text-sm text-indigo-400 mt-2">
                <span className="text-gray-500">Instructor:</span> {course.instructor}
              </p>
            </div>
            {token && (
              <button
                onClick={() => handleDelete(course._id)}
                className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition shrink-0 cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
