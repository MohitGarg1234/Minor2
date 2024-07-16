import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const UpdateExperience = ({ isOpen, onRequestClose, userId, experienceId }) => {
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [years, setYears] = useState('');

  useEffect(() => {
    // Fetch the experience data if the modal is opened
    if (isOpen && experienceId) {
      const fetchExperience = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/api/${userId}/experience/${experienceId}`);
          const data = await response.json();
          setCompanyName(data.companyName);
          setRole(data.role);
          setYears(data.years);
        } catch (error) {
          console.error('Error fetching experience:', error);
        }
      };

      fetchExperience();
    }
  }, [isOpen, userId, experienceId]);

  const handleUpdateExperience = async (e) => {
    e.preventDefault();
    const updatedExperience = { companyName, role, years };
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/${userId}/experience/${experienceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExperience),
      });
      if (response.ok) {
        console.log('Experience updated');
        onRequestClose();
        window.location.reload();
      } else {
        console.error('Failed to update experience');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Experience"
      className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-10"
      overlayClassName="modal-overlay bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Update Experience</h2>
      <form onSubmit={handleUpdateExperience}>
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-700">Company Name:</label>
          <input
            type="text"
            id="companyName"
            className="w-full p-2 border border-gray-300 rounded"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700">Role:</label>
          <input
            type="text"
            id="role"
            className="w-full p-2 border border-gray-300 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="years" className="block text-gray-700">Years:</label>
          <input
            type="text"
            id="years"
            className="w-full p-2 border border-gray-300 rounded"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-4 py-2 px-4 bg-gray-500 text-white rounded"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateExperience;
