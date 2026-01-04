import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser, logout } from '@/lib/firebase/auth';
import { User } from 'firebase/auth';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/admin/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">CMS Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/projects"
            className="p-6 bg-gray-900 rounded-lg border-2 border-purple-800 hover:border-purple-600 transition-all hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2">Projects</h2>
            <p className="text-gray-400">Manage portfolio projects</p>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">
            💡 <strong>Note:</strong> Hero, About, dan Contact section menggunakan hardcode. 
            Hanya Projects yang bisa di-manage via CMS.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

