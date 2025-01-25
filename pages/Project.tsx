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
    id: 1,
    title: "Onboarding Dashboard",
    subtitle: "Trainual-inspired onboarding dashboard.",
    imgSrc: "/Dashboard_.png",
    url: "https://example.com/project1", // Ganti dengan URL tujuan
  },
  {
    id: 2,
    title: "Jaket Boat",
    subtitle: "Boat ticket booking app by Dishub.",
    imgSrc: "/Jaket Boat.png",
    url: "https://example.com/project2", // Ganti dengan URL tujuan
  },
  {
    id: 3,
    title: "Legacy Of The Ancients : ELDORIA",
    subtitle: "Epic RPG adventure in a mythical realm.",
    imgSrc: "/Eldoria.png",
    url: "https://example.com/project3", // Ganti dengan URL tujuan
  },
  {
    id: 4,
    title: "iFortePay",
    subtitle: "Connected Payment Solutions for Your Business Success.",
    imgSrc: "/iforte.gif",
    url: "https://example.com/project3", // Ganti dengan URL tujuan
  },
  {
    id: 4,
    title: "Crypnative",
    subtitle: "Free Online Image Editor.",
    imgSrc: "/Crypnative.png",
    url: "https://example.com/project3", // Ganti dengan URL tujuan
  },
];

const Projects: React.FC = () => {
  return (
    <section id="work" className="max-w-6xl mx-auto px-4 h-full py-[72px] lg:py-[102px] bg-black flex flex-col gap-12">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col gap-6 group cursor-pointer"
          onClick={() => window.open(project.url, "_blank")}
        >
          <div className="flex flex-col md:flex-row justify-between lg:items-center gap-4">
            {/* Title */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-normal flex items-center gap-2 text-gray-400 group-hover:text-white transition-all duration-300">
              <span className="relative flex items-center gap-2">
                <span
                  className="absolute left-0 opacity-0 translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 49 49"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.7229 8.07568C20.4794 8.07568 16.4098 9.76139 13.4092 12.762C10.4086 15.7626 8.7229 19.8322 8.7229 24.0757C8.7229 28.3191 10.4086 32.3888 13.4092 35.3894C16.4098 38.39 20.4794 40.0757 24.7229 40.0757C28.9664 40.0757 33.036 38.39 36.0366 35.3894C39.0372 32.3888 40.7229 28.3191 40.7229 24.0757C40.7229 19.8322 39.0372 15.7626 36.0366 12.762C33.036 9.76139 28.9664 8.07568 24.7229 8.07568ZM4.7229 24.0757C4.7229 13.0297 13.6769 4.07568 24.7229 4.07568C35.7689 4.07568 44.7229 13.0297 44.7229 24.0757C44.7229 35.1217 35.7689 44.0757 24.7229 44.0757C13.6769 44.0757 4.7229 35.1217 4.7229 24.0757ZM25.3089 14.6617C25.684 14.2867 26.1926 14.0761 26.7229 14.0761C27.2532 14.0761 27.7618 14.2867 28.1369 14.6617L36.1369 22.6617C36.5118 23.0367 36.7225 23.5454 36.7225 24.0757C36.7225 24.606 36.5118 25.1146 36.1369 25.4897L28.1369 33.4897C27.7597 33.854 27.2545 34.0556 26.7301 34.051C26.2057 34.0465 25.7041 33.8361 25.3333 33.4653C24.9624 33.0945 24.7521 32.5929 24.7476 32.0685C24.743 31.5441 24.9446 31.0389 25.3089 30.6617L29.8949 26.0757H14.7229C14.1925 26.0757 13.6838 25.865 13.3087 25.4899C12.9336 25.1148 12.7229 24.6061 12.7229 24.0757C12.7229 23.5453 12.9336 23.0365 13.3087 22.6615C13.6838 22.2864 14.1925 22.0757 14.7229 22.0757H29.8949L25.3089 17.4897C24.934 17.1146 24.7233 16.606 24.7233 16.0757C24.7233 15.5454 24.934 15.0367 25.3089 14.6617Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="group-hover:translate-x-9 transition-all duration-300">
                  {project.title}
                </span>
              </span>
            </h2>
            {/* Subtitle */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white lg:text-center md:text-left">
              {project.subtitle}
            </h2>
          </div>
          {/* Image */}
          <div className="w-full bg-slate-950 shadow-md flex justify-center items-center p-4 md:p-10 rounded-[12px] overflow-hidden">
            <div className="relative lg:left-14 lg:top-5 left-10 top-2">
              <img
                src={project.imgSrc}
                alt={`${project.title} Preview`}
                className="rounded-md w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
