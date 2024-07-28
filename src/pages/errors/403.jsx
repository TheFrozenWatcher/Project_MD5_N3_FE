import React from 'react'

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-6xl font-bold text-red-600">403</h1>
    <p className="text-xl text-gray-800 mt-4">Unauthorized Access</p>
    <p className="text-lg text-gray-600 mt-2">You do not have permission to view this page.</p>
    <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Go Back Home
    </Link>
  </div>
  )
}
