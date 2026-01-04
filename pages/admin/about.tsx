import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/lib/firebase/auth';
import { getAbout, updateAbout } from '@/lib/firebase/services';
import { AboutData, Experience } from '@/types';
import Link from 'next/link';

const AdminAbout: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
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
      loadAbout();
    };
    checkAuth();
  }, [router]);

  const loadAbout = async () => {
    try {
      const data = await getAbout();
      if (data) {
        setAboutData(data);
      } else {
        setAboutData({
          name: '',
          role: '',
          description: '',
          experiences: [],
        });
      }
    } catch (error) {
      console.error('Error loading about:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      const experiences: Experience[] = [];
      let i = 0;
      while (formData.get(`exp_company_${i}`)) {
        experiences.push({
          company: formData.get(`exp_company_${i}`) as string,
          position: formData.get(`exp_position_${i}`) as string,
          period: formData.get(`exp_period_${i}`) as string,
          order: parseInt(formData.get(`exp_order_${i}`) as string) || i,
        });
        i++;
      }

      const data: Omit<AboutData, 'id' | 'updatedAt'> = {
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        description: formData.get('description') as string,
        experiences,
      };

      await updateAbout(data);
      alert('About section updated successfully!');
      loadAbout();
    } catch (error) {
      console.error('Error saving about:', error);
      alert('Error saving about section');
    } finally {
      setSaving(false);
    }
  };

  const addExperience = () => {
    if (aboutData) {
      setAboutData({
        ...aboutData,
        experiences: [
          ...aboutData.experiences,
          { company: '', position: '', period: '', order: aboutData.experiences.length },
        ],
      });
    }
  };

  const removeExperience = (index: number) => {
    if (aboutData) {
      setAboutData({
        ...aboutData,
        experiences: aboutData.experiences.filter((_, i) => i !== index),
      });
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
          <h1 className="text-4xl font-bold">Edit About Section</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-900 rounded-lg border-2 border-purple-800">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={aboutData?.name || ''}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Role</label>
            <input
              type="text"
              name="role"
              defaultValue={aboutData?.role || ''}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={aboutData?.description || ''}
              required
              rows={6}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Experiences</label>
              <button
                type="button"
                onClick={addExperience}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
              >
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {aboutData?.experiences.map((exp, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-400">Experience {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-xs text-gray-400">Company</label>
                      <input
                        type="text"
                        name={`exp_company_${index}`}
                        defaultValue={exp.company}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs text-gray-400">Position</label>
                      <input
                        type="text"
                        name={`exp_position_${index}`}
                        defaultValue={exp.position}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs text-gray-400">Period</label>
                      <input
                        type="text"
                        name={`exp_period_${index}`}
                        defaultValue={exp.period}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs text-gray-400">Order</label>
                      <input
                        type="number"
                        name={`exp_order_${index}`}
                        defaultValue={exp.order}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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

export default AdminAbout;

