import { Button } from '../../common/Button';
import { Badge } from '../../common/Badge';

export const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return <div className="text-center text-gray-500 my-16 italic text-lg opacity-80">No employees found. Seed the Django database!</div>;
  }

  return (
    <div className="space-y-4">
      {employees.map(emp => (
        <div key={emp.id} className="bg-surface border border-gray-800/50 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-lg hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(97,218,251,0.1)] transition-all duration-300">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-xl font-bold text-gray-100 mb-1 tracking-tight">{emp.name}</h2>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
              {emp.email}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t border-gray-800 sm:border-none pt-4 sm:pt-0">
            <Badge>{emp.department}</Badge>
            <Button variant="secondary" className="px-3 py-1 text-sm bg-gray-700/50 hover:bg-gray-700" onClick={() => onEdit(emp)}>Edit</Button>
            <Button variant="danger" className="px-3 py-1 text-sm" onClick={() => onDelete(emp.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
