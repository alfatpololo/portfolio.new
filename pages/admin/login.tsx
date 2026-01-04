import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { login, register } from '@/lib/firebase/auth';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(email, password);
        alert('User berhasil dibuat! Silakan login.');
        setIsRegister(false);
      } else {
        await login(email, password);
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err.message || (isRegister ? 'Failed to register' : 'Failed to login'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg border-2 border-purple-800">
        <h1 className="text-3xl font-bold mb-2 text-center">
          {isRegister ? 'Register Admin' : 'Admin Login'}
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          {isRegister 
            ? 'Buat user admin baru untuk pertama kali' 
            : 'Login untuk mengakses CMS'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900 border border-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading 
              ? (isRegister ? 'Registering...' : 'Logging in...') 
              : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-sm text-purple-400 hover:text-purple-300 underline"
          >
            {isRegister 
              ? 'Sudah punya akun? Login' 
              : 'Belum punya akun? Register'}
          </button>
        </div>

        <div className="mt-4 p-3 bg-blue-900 border border-blue-700 rounded-lg text-xs text-blue-200">
          <p className="font-semibold mb-1">💡 Tips:</p>
          <p>Jika pertama kali setup, klik "Register" untuk membuat user admin baru.</p>
          <p className="mt-1">Atau buat user manual di Firebase Console &gt; Authentication.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

