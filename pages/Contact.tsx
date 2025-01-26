import Header from "@/components/Header";
import { FaFileAlt, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

const Contact: React.FC = () => {
  return (
    <>
      <Header />
      <section className="mx-auto px-4 py-16 bg-black h-screen w-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">

          {/* Dua kotak di atas berjejer horizontal */}
          <div className="flex justify-center gap-6 lg:gap-14 mb-14">
            {/* Kotak pertama */}
            <div className="group relative flex flex-col justify-center items-center bg-transparent p-4 lg:p-5 rounded-md shadow-md border-2 border-purple-800 w-[150px] h-[150px] lg:w-[180px] lg:h-[180px] transition-all duration-300 hover:bg-gray-950">
              {/* Kotak kecil di luar sudut */}
              <div className="absolute top-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <div className="absolute top-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <div className="absolute bottom-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <div className="absolute bottom-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <a
                href="/Muhammad Alfath Aditya.pdf"
                download="Muhammad Alfath Aditya.pdf"
              >
                <FaFileAlt className="text-gray-400 w-8 h-8 lg:w-10 lg:h-10 transition-all duration-300 group-hover:translate-y-[-5px]" />
              </a>
              <span className="absolute bottom-5 text-gray-400 text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-[-5px] transition-all duration-300">
                Download CV
              </span>
            </div>

            {/* Kotak kedua */}
            <div className="group relative flex flex-col justify-center items-center bg-transparent p-4 lg:p-5 rounded-md shadow-md border-2 border-purple-800 w-[150px] h-[150px] lg:w-[180px] lg:h-[180px] transition-all duration-300 hover:bg-gray-950">
              <div className="absolute top-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <div className="absolute top-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <div className="absolute bottom-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <div className="absolute bottom-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
              <a
                href="https://www.linkedin.com/in/muhammadalfathaditya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-gray-400 w-8 h-8 lg:w-10 lg:h-10 transition-all duration-300 group-hover:translate-y-[-5px]" />
              </a>
              <span className="absolute bottom-5 text-gray-400 text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-[-5px] transition-all duration-300">
                LinkedIn
              </span>
            </div>
          </div>

          {/* Kotak ketiga di bawah, ditengah */}
          <div className="group relative flex flex-col justify-center items-center bg-transparent p-4 lg:p-5 rounded-md shadow-md border-2 border-purple-800 w-[150px] h-[150px] lg:w-[180px] lg:h-[180px] transition-all duration-300 hover:bg-gray-950">
            <div className="absolute top-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
            <div className="absolute top-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
            <div className="absolute bottom-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
            <div className="absolute bottom-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800"></div>
            <a
              href="mailto:alfat.pololo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane className="text-gray-400 w-8 h-8 lg:w-10 lg:h-10 transition-all duration-300 group-hover:translate-y-[-5px]" />
            </a>
            <span className="absolute bottom-5 text-gray-400 text-sm font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-[-5px] transition-all duration-300">
              Send Email
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
