import React from "react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  imgSrc: string;
  url: string;
}

const projects: Project[] = [
  {
    "id": 1,
    "title": "NexiSphere POS Dashboard",
    "subtitle": "NexiSphere POS Dashboard",
    "imgSrc": "/Nexisphere.mp4",
    "url": "https://example.com/project3"
  },
  {
    "id": 2,
    "title": "Kanaka Dashboard",
    "subtitle": "ERP HR Dashboard Management App",
    "imgSrc": "/Kanakadashboard.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 3,
    "title": "Onboarding Dashboard",
    "subtitle": "Trainual-inspired onboarding dashboard.",
    "imgSrc": "/Dashboard_.png",
    "url": "https://example.com/project1"
  },
  {
    "id": 4,
    "title": "Jaket Boat",
    "subtitle": "Boat ticket booking app by Dishub.",
    "imgSrc": "/Jaket Boat.png",
    "url": "https://example.com/project2"
  },
  {
    "id": 5,
    "title": "Legacy Of The Ancients : ELDORIA",
    "subtitle": "Epic RPG adventure in a mythical realm.",
    "imgSrc": "/Eldoria.gif",
    "url": "https://example.com/project3"
  },
  {
    "id": 6,
    "title": "iFortePay",
    "subtitle": "Connected Payment Solutions for Your Business Success.",
    "imgSrc": "/iforte.gif",
    "url": "https://example.com/project3"
  },
  {
    "id": 7,
    "title": "Crypnative",
    "subtitle": "Free Online Image Editor.",
    "imgSrc": "/Crypnative.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 8,
    "title": "Glyph AI",
    "subtitle": "Blockchain Landing Page.",
    "imgSrc": "/Glyph AI.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 9,
    "title": "Bitreon",
    "subtitle": "Code Generator AI.",
    "imgSrc": "/Bitreon.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 10,
    "title": "Denode",
    "subtitle": "Cloud Computing Landing Page.",
    "imgSrc": "/Denode.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 11,
    "title": "Injection Protocol",
    "subtitle": "The World's AI Platform.",
    "imgSrc": "/Injection Protocol.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 12,
    "title": "Mingle",
    "subtitle": "Free Chat Bot AI.",
    "imgSrc": "/Mingle.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 13,
    "title": "Podsphere",
    "subtitle": "Podcast Stream Landing Page.",
    "imgSrc": "/Podsphere.png",
    "url": "https://example.com/project3"
  },
  {
    "id": 14,
    "title": "PowerLink",
    "subtitle": "Cloud Computing Security.",
    "imgSrc": "/PowerLink.gif",
    "url": "https://example.com/project3"
  }
]

const Projects: React.FC = () => {
  return (
    <section
      id="work"
      className="max-w-6xl mx-auto px-4 h-full py-[72px] lg:py-[102px] bg-black flex flex-col gap-12"
    >
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col gap-6 group cursor-pointer">
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
          <div className="w-full bg-slate-950 shadow-md flex justify-center items-center p-4 md:p-10 rounded-[12px] overflow-hidden">
            <div className="relative lg:left-14 lg:top-5 left-10 top-2">
              {/\.(mp4|webm|ogg)$/i.test(project.imgSrc) ? (
                <video
                  src={project.imgSrc}
                  controls
                  autoPlay
                  loop
                  muted
                  className="rounded-md w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <img
                  src={project.imgSrc}
                  alt={`${project.title} Preview`}
                  className="rounded-md w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
