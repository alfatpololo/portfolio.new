import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/lib/firebase/auth';
import { getContact, updateContact } from '@/lib/firebase/services';
import { ContactData, ContactLink } from '@/types';
import Link from 'next/link';

const AdminContact: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
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
      loadContact();
    };
    checkAuth();
  }, [router]);

  const loadContact = async () => {
    try {
      const data = await getContact();
      if (data) {
        setContactData(data);
      } else {
        setContactData({
          links: [
            { type: 'cv', label: 'Download CV', url: '', order: 0 },
            { type: 'linkedin', label: 'LinkedIn', url: '', order: 1 },
            { type: 'email', label: 'Send Email', url: '', order: 2 },
          ],
        });
      }
    } catch (error) {
      console.error('Error loading contact:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);

    try {
      const links: ContactLink[] = [];
      let i = 0;
      while (formData.get(`link_type_${i}`)) {
        links.push({
          type: formData.get(`link_type_${i}`) as 'cv' | 'linkedin' | 'email',
          label: formData.get(`link_label_${i}`) as string,
          url: formData.get(`link_url_${i}`) as string,
          order: parseInt(formData.get(`link_order_${i}`) as string) || i,
        });
        i++;
      }

      const data: Omit<ContactData, 'id' | 'updatedAt'> = {
        links,
      };

      await updateContact(data);
      alert('Contact section updated successfully!');
      loadContact();
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Error saving contact section');
    } finally {
      setSaving(false);
    }
  };

  const addLink = () => {
    if (contactData) {
      setContactData({
        ...contactData,
        links: [
          ...contactData.links,
          { type: 'email', label: '', url: '', order: contactData.links.length },
        ],
      });
    }
  };

  const removeLink = (index: number) => {
    if (contactData) {
      setContactData({
        ...contactData,
        links: contactData.links.filter((_, i) => i !== index),
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
          <h1 className="text-4xl font-bold">Edit Contact Section</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-900 rounded-lg border-2 border-purple-800">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium">Contact Links</label>
              <button
                type="button"
                onClick={addLink}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm"
              >
                Add Link
              </button>
            </div>
            <div className="space-y-4">
              {contactData?.links.map((link, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-400">Link {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-xs text-gray-400">Type</label>
                      <select
                        name={`link_type_${index}`}
                        defaultValue={link.type}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
                      >
                        <option value="cv">CV</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 text-xs text-gray-400">Label</label>
                      <input
                        type="text"
                        name={`link_label_${index}`}
                        defaultValue={link.label}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block mb-1 text-xs text-gray-400">URL</label>
                      <input
                        type="text"
                        name={`link_url_${index}`}
                        defaultValue={link.url}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-purple-600 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-xs text-gray-400">Order</label>
                      <input
                        type="number"
                        name={`link_order_${index}`}
                        defaultValue={link.order}
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

export default AdminContact;

