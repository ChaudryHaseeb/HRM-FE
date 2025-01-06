import React, { useState, useEffect } from "react";
import axios from "axios";

interface EditDepartmentProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  departmentId: string;
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

interface Department {
  _id: string;
  name: string;
  description: string;
  managerId: Manager;
}

interface Manager {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

const EditDepartment: React.FC<EditDepartmentProps> = ({
  showModal,
  setShowModal,
  departmentId,
  setDepartments,
}) => {
  const [departmentData, setDepartmentData] = useState<Department | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [selectedManager, setSelectedManager] = useState<string>("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/departments/${departmentId}`);
        setDepartmentData(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setSelectedManager(response.data.managerId._id);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };

    if (departmentId) {
      fetchDepartmentData();
      fetchEmployees();
    }
  }, [departmentId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !selectedManager) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setLoading(true);
      const updatedData = { name, description, managerId: selectedManager };
      await axios.put(`http://localhost:3000/departments/${departmentId}`, updatedData);
      const updatedDepartments = await axios.get("http://localhost:3000/departments");
      setDepartments(updatedDepartments.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating department:", error);
      setError("An error occurred while updating the department.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setName("");
    setDescription("");
    setSelectedManager("");
    setError("");
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg transform transition-transform duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Edit Department
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Update the details below to modify the department.
            </p>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Department Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter department name"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter department description (optional)"
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>

              {/* Manager Selection */}
              <div>
                <label
                  htmlFor="manager"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Select Manager <span className="text-red-500">*</span>
                </label>
                <select
                  id="manager"
                  value={selectedManager}
                  onChange={(e) => setSelectedManager(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Choose a manager</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Buttons */}
              <div className="flex justify-end items-center gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-white ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } transition duration-200`}
                >
                  {loading ? "Updating..." : "Update Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
