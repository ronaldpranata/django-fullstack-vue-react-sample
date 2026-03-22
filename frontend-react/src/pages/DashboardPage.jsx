import { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { MainLayout } from '../layouts/MainLayout';
import { EmployeeList } from '../components/features/employees/EmployeeList';
import { EmployeeForm } from '../components/features/employees/EmployeeForm';
import { Chat } from '../components/features/notifications/Chat';

export const DashboardPage = ({ onLogout }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({id: null, employee_id: '', first_name: '', last_name: '', email: '', department_id: 1});

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await ApiService.getEmployees();
      setEmployees(data);
    } catch (e) { console.error(e); } 
    finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) await ApiService.updateEmployee(formData.id, formData);
      else await ApiService.createEmployee(formData);
      setShowForm(false);
      loadData();
    } catch (e) { alert(e.message); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this record?")) return;
    try {
      await ApiService.deleteEmployee(id);
      loadData();
    } catch (e) { alert(e.message); }
  };

  const openNewForm = () => {
    setIsEditing(false);
    setFormData({id: null, employee_id: '', first_name: '', last_name: '', email: '', department_id: 1});
    setShowForm(true);
  };

  const openEditForm = (emp) => {
    setIsEditing(true);
    setFormData({id: emp.id, employee_id: emp.employee_id, first_name: emp.first_name, last_name: emp.last_name, email: emp.email, department_id: emp.department_id || 1});
    setShowForm(true);
  };

  return (
    <MainLayout onLogout={onLogout}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-300">Employee Directory</h2>
        <button className="bg-primary text-gray-900 px-5 py-2 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-cyan-500/20" onClick={openNewForm}>
          + Register New
        </button>
      </div>

      {showForm && (
        <EmployeeForm 
          isEditing={isEditing} formData={formData} setFormData={setFormData}
          onSubmit={handleFormSubmit} onClose={() => setShowForm(false)}
        />
      )}

      {loading ? <div className="text-center my-16 text-primary animate-pulse">Synchronizing directory...</div> : (
        <EmployeeList employees={employees} onEdit={openEditForm} onDelete={handleDelete} />
      )}
      
      <Chat />
    </MainLayout>
  );
};
