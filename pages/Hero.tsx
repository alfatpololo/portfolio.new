import { useState, useEffect } from "react";

const Hero = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle Mouse Down (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle Mouse Move (Desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y,
    });
  };

  // Handle Mouse Up (Desktop)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle Touch Start (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]; // Get the first touch point
    setIsDragging(true);
    setStartPosition({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  // Handle Touch Move (Mobile)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0]; // Get the first touch point
    setPosition({
      x: touch.clientX - startPosition.x,
      y: touch.clientY - startPosition.y,
    });
  };

  // Handle Touch End (Mobile)
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Start animation when component is loaded
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="bg-black text-white h-[500px] z-30 lg:h-[700px] flex flex-col justify-center items-center px-4"
    >
      <div
        className="max-w-4xl text-center absolute cursor-grab mx-auto"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Ensure drag stops when the mouse leaves the element
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd} // Ensure drag stops when touch is canceled
      >
        {/* Nama */}
        <div className="flex justify-start items-center gap-2 mb-4 px-[20px] lg:px-0">
          <span className="text-sm bg-slate-950 text-gray-300 py-1 px-3 lg:text-[18px] rounded-[8px]">
            M Alfath Aditya
          </span>
          <span className="flex items-center gap-4 text-sm bg-slate-950 text-gray-300 lg:text-[18px] py-1 px-3 rounded-[8px]">
            {/* Lingkaran Hijau */}
            <span className="relative flex items-center justify-center">
              {/* Lingkaran Hijau Tetap */}
              <span className="w-3 h-3 bg-green-500 rounded-full absolute"></span>
              {/* Lingkaran Hijau Berkelip */}
              <span className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></span>
            </span>
            Available for roles
          </span>
        </div>
        {/* Role */}
        <div className="px-[20px] lg:p-x0">
          <div className="relative inline-block">
            <h1 className="relative text-4xl lg:text-7xl font-medium bg-gradient-to-r from-white to-gray-400 text-left bg-clip-text text-transparent border-2 lg:p-[42px] p-[18px] rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              UI/UX Engineer. Skilled in transforming designs into responsive and accessible code.
            </h1>
            {/* Animasi Border */}
            <span className="absolute inset-0 border-2 border-purple-800 rounded-md animate-draw"></span>
            {/* Kotak di setiap sudut */}
            <span
              className={`absolute top-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800 transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "0ms" }}
            ></span>
            <span
              className={`absolute top-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800 transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            ></span>
            <span
              className={`absolute bottom-[-8px] left-[-8px] w-4 h-4 bg-white border-2 border-purple-800 transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            ></span>
            <span
              className={`absolute bottom-[-8px] right-[-8px] w-4 h-4 bg-white border-2 border-purple-800 transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            ></span>
          </div>
        </div>
        <p className="text-xl sm:text-2xl mt-2 text-gray-400"></p>
      </div>
    </section>
  );
};

export default Hero;
