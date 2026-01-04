import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/firebase/services";
import { Project } from "@/types";

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        // Log projects for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('📦 Projects loaded from Firebase:', data.length);
          data.forEach((project, index) => {
            console.log(`Project ${index + 1}: ${project.title}`);
            if (project.imgSrc) {
              const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(project.imgSrc);
              if (project.imgSrc.startsWith('https://firebasestorage.googleapis.com')) {
                console.log(`  📍 Source: Firebase Storage ${isVideo ? '(VIDEO)' : '(IMAGE)'}`);
                console.log(`  🔗 URL: ${project.imgSrc.substring(0, 100)}...`);
              } else if (project.imgSrc.startsWith('/')) {
                console.log(`  📁 Source: Public folder ${isVideo ? '(VIDEO)' : '(IMAGE)'} - ${project.imgSrc}`);
              } else if (project.imgSrc.startsWith('http')) {
                console.log(`  🌐 Source: External URL ${isVideo ? '(VIDEO)' : '(IMAGE)'}`);
              }
            }
          });
        }
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section
        id="work"
        className="max-w-6xl mx-auto px-4 h-full py-[72px] lg:py-[102px] bg-black flex flex-col gap-12"
      >
        <div className="text-white text-center">Loading projects...</div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section
        id="work"
        className="max-w-6xl mx-auto px-4 h-full py-[72px] lg:py-[102px] bg-black flex flex-col gap-12"
      >
        <div className="text-white text-center">No projects available. Please add projects via CMS.</div>
      </section>
    );
  }

  return (
    <section
      id="work"
      className="max-w-6xl mx-auto px-4 h-full py-[72px] lg:py-[102px] bg-black flex flex-col gap-12"
    >
      {projects.map((project) => (
        <div key={project.id || project.title} className="flex flex-col gap-6 group cursor-pointer">
          <div className="flex flex-col md:flex-row justify-between lg:items-center gap-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-normal flex items-center gap-2 text-gray-400 group-hover:text-white transition-all duration-300">
              <span className="relative flex items-center gap-2">
                <span className="group-hover:translate-x-9 transition-all duration-300">
                  {project.title}
                </span>
              </span>
            </h2>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white lg:text-center md:text-left">
              {project.subtitle}
            </h2>
          </div>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="w-full bg-slate-950 shadow-md flex justify-center items-center p-4 md:p-10 rounded-[12px] overflow-hidden">
            <div className="relative lg:left-14 lg:top-5 left-10 top-2">
              {project.imgSrc && (
                (() => {
                  // Check if it's a video file by extension or MIME type
                  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(project.imgSrc) || 
                                 project.imgSrc.includes('video/') ||
                                 project.imgSrc.includes('.mp4') ||
                                 project.imgSrc.includes('.webm');
                  
                  if (isVideo) {
                    return (
                      <video
                        src={project.imgSrc}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onError={(e) => {
                          console.error(`Error loading video for ${project.title}:`, e);
                          console.error(`Video URL: ${project.imgSrc}`);
                        }}
                        onLoadStart={() => {
                          console.log(`Loading video for ${project.title}: ${project.imgSrc}`);
                        }}
                        className="rounded-md w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      >
                        <source src={project.imgSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    );
                  } else {
                    return (
                      <img
                        src={project.imgSrc || '/placeholder.png'}
                        alt={`${project.title} Preview`}
                        onError={(e) => {
                          console.error(`Error loading image for ${project.title}:`, e);
                          console.error(`Image URL: ${project.imgSrc}`);
                        }}
                        className="rounded-md w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    );
                  }
                })()
              )}
            </div>
          </a>
        </div>
      ))}
    </section>
  );
};

export default Projects;
