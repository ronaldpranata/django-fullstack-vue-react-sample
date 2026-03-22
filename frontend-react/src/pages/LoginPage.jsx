import { LoginForm } from '../components/features/auth/LoginForm';

export const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="z-10 text-center mb-8">
        <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">Corporate <span className="text-primary">Directory</span></h1>
        <p className="text-gray-400 text-lg">Component-Driven React Architecture</p>
      </div>
      
      <div className="z-10 w-full">
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};
