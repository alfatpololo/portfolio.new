import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentUser } from '@/lib/firebase/auth';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadFile,
} from '@/lib/firebase/services';
import { Project } from '@/types';
import Link from 'next/link';

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      loadProjects();
    };
    checkAuth();
  }, [router]);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
    
    setUploading(true);
    try {
      // Get current projects for order management
      const currentProjects = editing?.id ? [] : await getProjects();
      
      const projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        url: formData.get('url') as string,
        imgSrc: editing?.imgSrc || '',
        order: editing?.id 
          ? (parseInt(formData.get('order') as string) || editing.order || 0)
          : 0, // New project always gets order 0 (teratas)
      };

      // Upload file ke Firebase Storage
      if (fileInput?.files?.[0]) {
        // Upload new file
        const file = fileInput.files[0];
        const fileName = `projects/${Date.now()}_${file.name}`;
        projectData.imgSrc = await uploadFile(file, fileName);
      } else if (editing?.imgSrc) {
        // Keep existing if no new file uploaded (when editing)
        projectData.imgSrc = editing.imgSrc;
      } else {
        // New project must have file
        alert('Please select an image or video file!');
        setUploading(false);
        return;
      }

      if (editing?.id) {
        // Update existing project
        await updateProject(editing.id, projectData);
      } else {
        // New project - shift all existing projects down (increase order by 1)
        // So new project becomes order 0 (teratas)
        for (const p of currentProjects) {
          if (p.id) {
            await updateProject(p.id, { order: (p.order || 0) + 1 });
          }
        }
        // Create new project with order 0 (teratas)
        await createProject(projectData);
      }

      setShowForm(false);
      setEditing(null);
      loadProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error deleting project');
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/admin" className="text-purple-400 hover:text-purple-300 mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold">Manage Projects</h1>
          </div>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Add Project
          </button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-gray-900 rounded-lg border-2 border-purple-800">
            <h2 className="text-2xl font-semibold mb-4">
              {editing ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editing?.title || ''}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  defaultValue={editing?.subtitle || ''}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Image/Video</label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  id="fileInput"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
                  required={!editing?.imgSrc}
                />
                <p className="mt-2 text-xs text-gray-500">
                  📍 File akan di-upload ke Firebase Storage: <code className="bg-gray-900 px-1 rounded">projects/{'{timestamp}'}_{'{filename}'}</code>
                </p>
                {editing?.imgSrc && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-1">Current:</p>
                    {editing.imgSrc.includes('.mp4') || editing.imgSrc.includes('.webm') || editing.imgSrc.includes('video/') ? (
                      <video src={editing.imgSrc} className="max-w-xs h-32 object-cover rounded" controls />
                    ) : (
                      <img src={editing.imgSrc} alt="Current" className="max-w-xs h-32 object-cover rounded" />
                    )}
                    <p className="text-xs text-gray-500 mt-1 break-all">{editing.imgSrc.substring(0, 100)}...</p>
                    <p className="text-xs text-gray-400 mt-1">Kosongkan file input jika tidak ingin mengganti gambar/video</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">URL</label>
                <input
                  type="url"
                  name="url"
                  defaultValue={editing?.url || ''}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Order {editing ? '' : '(Otomatis 0 untuk project baru - akan jadi yang teratas)'}
                </label>
                <input
                  type="number"
                  name="order"
                  defaultValue={editing?.order ?? 0}
                  required
                  disabled={!editing} // Disable for new projects (always 0)
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {!editing && (
                  <p className="mt-1 text-xs text-gray-500">
                    💡 Project baru otomatis jadi yang teratas (order 0). Project lain akan otomatis bergeser ke bawah.
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-6 bg-gray-900 rounded-lg border-2 border-purple-800 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-gray-400">{project.subtitle}</p>
                <p className="text-sm text-gray-500 mt-2">Order: {project.order}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(project);
                    setShowForm(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => project.id && handleDelete(project.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;

