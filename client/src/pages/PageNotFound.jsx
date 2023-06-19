import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col items-center mt-64">
      <div className="text-2xl font-bold mb-2 text-center">
        404 - Page Not Found
      </div>
      <p className="text-gray-700 mb-4">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage