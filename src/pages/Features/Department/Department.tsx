import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateDepartment from "./CreateDepartment";
import EditDepartment from "./EditDepartment";

interface Manager {
  firstName: string;
  lastName: string;
}

interface Department {
  _id: string;
  name: string;
  managerId: Manager;
}

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [departmentToEdit, setDepartmentToEdit] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/departments");
        setDepartments(response.data);
      } catch (error) {
        setError("Failed to fetch departments.");
        console.error("Error fetching departments data", error);
      }
    };

    fetchDepartments();

    // Cleanup on unmount
    return () => {
      setDepartments([]);
    };
  }, []);

  // Handle delete department
  const handleDelete = async () => {
    if (!departmentToDelete) return;

    try {
      await axios.delete(`http://localhost:3000/departments/${departmentToDelete}`);
      // Directly update the departments list after deletion
      setDepartments((prevDepartments) =>
        prevDepartments.filter((dep) => dep._id !== departmentToDelete)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting department", error);
      setError("An error occurred while deleting the department.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDepartmentToDelete(null);
  };

  const handleOpenDeleteModal = (id: string) => {
    setDepartmentToDelete(id);
    setShowDeleteModal(true);
  };

  const handleOpenEditModal = (id: string) => {
    setDepartmentToEdit(id);
    setShowEditModal(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Title and Add New Department Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-semibold text-black">Departments</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-indigo-700 hover:to-blue-600 transition duration-300 transform hover:scale-105"
        >
          +
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Conditionally render "No records found" if no departments */}
      {departments.length === 0 ? (
        <div className="bg-white text-center p-8 rounded-lg shadow-xl border border-gray-300 mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Departments Found
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            It looks like there are no departments in the system yet. Click the button above to create a new department.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-indigo-700 hover:to-blue-600 transition duration-300 transform hover:scale-105"
          >
            Create Department
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-xl mt-8">
          <table className="min-w-full text-gray-700">
            <thead>
              <tr className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
                <th className="px-6 py-3 text-sm font-semibold text-left">Department Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-left">Department Manager</th>
                <th className="px-6 py-3 text-sm font-semibold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr
                  key={department._id}
                  className="border-b hover:bg-gray-50 transition duration-300"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 text-left">
                    {department.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 text-left">
                    {department.managerId.firstName} {department.managerId.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-left">
                    <div className="flex gap-4 items-center">
                      {/* Edit Button */}
                      <button
                        onClick={() => handleOpenEditModal(department._id)}
                        className="text-blue-600 hover:text-blue-800 transition duration-300 transform hover:scale-105"
                        aria-label={`Edit ${department.name}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m0 0L9 18H5v-4l9.768-9.768z"
                          />
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleOpenDeleteModal(department._id)}
                        className="text-red-600 hover:text-red-800 transition duration-300 transform hover:scale-105"
                        aria-label={`Delete ${department.name}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Department Modal */}
      <CreateDepartment
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        setDepartments={setDepartments}
      />

      {/* Edit Department Modal */}
      <EditDepartment
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        departmentId={departmentToEdit || ""}
        setDepartments={setDepartments}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this department?</h2>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
