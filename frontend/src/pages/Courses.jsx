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
    <div className="container">
      {token && (
        <div className="add-course-form">
          <h2>Add New Course</h2>
          {message && <div className="message success">{message}</div>}
          {error && <div className="message error">{error}</div>}
          <form onSubmit={handleAddCourse}>
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
              rows={3}
            />
            <input
              type="text"
              placeholder="Instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              required
            />
            <button type="submit">Add Course</button>
          </form>
        </div>
      )}

      <h2>All Courses</h2>
      {courses.length === 0 && <p>No courses found.</p>}
      {courses.map((course) => (
        <div className="course-card" key={course._id}>
          <div>
            <h3>{course.courseName}</h3>
            <p>{course.courseDescription}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
          </div>
          {token && (
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Courses
