import { Button } from '../../common/Button';

export const EmployeeForm = ({ isEditing, formData, setFormData, onSubmit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-surface p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-800">
        <h2 className="text-2xl font-bold text-primary mb-6">{isEditing ? 'Modify' : 'Enroll'} Employee</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-1.5">First Name</label>
            <input 
              required className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-1.5">Last Name</label>
            <input 
              required className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-1.5">Corporate Email</label>
            <input 
              type="email" required className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-800 mt-2">
            <Button type="button" variant="outline" onClick={onClose}>Discard</Button>
            <Button type="submit">Publish</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
