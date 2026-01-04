import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/lib/firebase/auth';
import { getHero, updateHero } from '@/lib/firebase/services';
import { HeroData } from '@/types';
import Link from 'next/link';

const AdminHero: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      loadHero();
    };
    checkAuth();
  }, [router]);

  const loadHero = async () => {
    try {
      const data = await getHero();
      if (data) {
        setHeroData(data);
      } else {
        // Initialize with empty data
        setHeroData({
          name: '',
          role: '',
          description: '',
          availableStatus: true,
        });
      }
    } catch (error) {
      console.error('Error loading hero:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      const data: Omit<HeroData, 'id' | 'updatedAt'> = {
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        description: formData.get('description') as string,
        availableStatus: formData.get('availableStatus') === 'true',
      };

      await updateHero(data);
      alert('Hero section updated successfully!');
      loadHero();
    } catch (error) {
      console.error('Error saving hero:', error);
      alert('Error saving hero section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-purple-400 hover:text-purple-300 mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">Edit Hero Section</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-900 rounded-lg border-2 border-purple-800">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={heroData?.name || ''}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Role</label>
            <input
              type="text"
              name="role"
              defaultValue={heroData?.role || ''}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={heroData?.description || ''}
              required
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Available Status</label>
            <select
              name="availableStatus"
              defaultValue={heroData?.availableStatus ? 'true' : 'false'}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHero;

