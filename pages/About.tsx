import { useEffect, useState } from "react";
import Header from "@/components/Header";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Delay untuk memicu animasi
  }, []);

  return (
    <>
      <Header />
      <section
        className="mx-auto px-4 py-16 bg-black w-full pt-28"
        id="about"
      >
        <div
          className={`max-w-5xl mx-auto transition-all duration-700 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          {/* Konten Teks */}
          <h2 className="lg:text-[52px] text-[37px] font-medium text-white text-start">
            M Alfath Aditya
          </h2>
          <h3 className="lg:text-[52px] text-[37px] font-medium mb-6 text-gray-400 text-start">
            UI/UX Engineer
          </h3>
          <p className="text-white leading-relaxed lg:text-[36px] text-[24px] mb-6">
            Detail-oriented UI/UX Engineer and Designer with extensive experience in creating intuitive digital interfaces. Proven track record in developing wireframes, high-fidelity prototypes, and responsive websites using modern frameworks like React and Next.js. Skilled in bridging the gap between design and technology to enhance user satisfaction and business growth.
          </p>
          <ul className="text-gray-400 leading-relaxed lg:text-[28px] space-y-6 text-start">
            <li>
              <span className="font-bold text-white block">STT Nurul Fikri, Depok</span>
              <span className="text-gray-400 block">UI Craft 2026 Speaker</span>
              <span className="text-gray-500 block">2026</span>
            </li>
            <li>
              <span className="font-bold text-white block">Wistkey, Hongkong</span>
              <span className="text-gray-400 block">UI/UX Designer</span>
              <span className="text-gray-500 block">2026</span>
            </li>
            <li>
              <span className="font-bold text-white block">PT Technosoft Indo Prima</span>
              <span className="text-gray-400 block">Product Designer</span>
              <span className="text-gray-500 block">2025 - 2026</span>
            </li>
            <li>
              <span className="font-bold text-white block">Freelancer</span>
              <span className="text-gray-400 block">UI/UX Designer | Web Developer</span>
              <span className="text-gray-500 block">2021 - Present</span>
            </li>
            <li>
              <span className="font-bold text-white block">Clicknext. Co., Ltd</span>
              <span className="text-gray-400 block">Intern Web Designer</span>
              <span className="text-gray-500 block">2024</span>
            </li>
            <li>
              <span className="font-bold text-white block">Mayar</span>
              <span className="text-gray-400 block">Intern UI/UX Designer</span>
              <span className="text-gray-500 block">2023</span>
            </li>
            <li>
              <span className="font-bold text-white block">Mili</span>
              <span className="text-gray-400 block">Graphic Designer</span>
              <span className="text-gray-500 block">2021 - 2022</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default About;
