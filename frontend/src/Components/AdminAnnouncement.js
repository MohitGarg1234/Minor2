import React from 'react'
import AdminSidebar from './AdminSidebar'

const AdminAnnouncement = () => {
  return (
    <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 p-10 bg-gray-100">
            <div>
            <h3 className="text-2xl font-semibold mb-4">Announcements</h3>
            {/* Add your Announcement form/component here */}
            <form>
                {/* Example fields */}
                <input type="text" placeholder="Announcement Title" className="border p-2 mb-4 w-full" />
                <textarea placeholder="Announcement Details" className="border p-2 mb-4 w-full" />
                <button type="submit" className="bg-teal-500 text-white p-2">Post Announcement</button>
            </form>
            </div>
        </div>

    </div>
  )
}

export default AdminAnnouncement
