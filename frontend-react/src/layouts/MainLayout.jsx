import { Button } from '../components/common/Button';

export const MainLayout = ({ children, onLogout }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Corporate Directory</h1>
          <p className="text-gray-500 text-sm mt-1">Dual-Stack React & Django Prototype</p>
        </div>
        {onLogout && (
          <Button variant="danger" onClick={onLogout}>Sign Out</Button>
        )}
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};
