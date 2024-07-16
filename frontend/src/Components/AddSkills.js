import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const AddSkills = ({ isOpen, onRequestClose, userId }) => {
  const [skillName, setSkillName] = useState('');
  const handleAddSkill = async (e) => {
    e.preventDefault();
    const newSkill = { skillName};
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/${userId}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });

      if (response.ok) {
        console.log('User updated');
        onRequestClose();
        window.location.reload();
      } else {
        console.error('Failed to add skill');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Skill"
      className="modal bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto my-8"
      overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
      <form onSubmit={handleAddSkill} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Skill :</label>
          <input
            type="text"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSkills;
