import { useState } from 'react';
import { ApiService } from '../../../services/api';
import { Button } from '../../common/Button';

export const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ApiService.login(username, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-20 bg-surface p-8 rounded-xl shadow-2xl text-center">
      <h2 className="text-2xl font-bold text-primary mb-6">Authentication Required</h2>
      <form onSubmit={handleSubmit} className="text-left space-y-4">
        <div>
          <label className="block text-gray-400 mb-1 text-sm">Username</label>
          <input 
            type="text" required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:border-primary focus:outline-none text-white transition-colors"
            value={username} onChange={e => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1 text-sm">Password</label>
          <input 
            type="password" required
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:border-primary focus:outline-none text-white transition-colors"
            value={password} onChange={e => setPassword(e.target.value)} 
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Logging in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};
