import Header from '@/components/Header';
import Hero from '@/pages/Hero';
import About from '@/pages/About';
import Projects from '@/pages/Project';
import Contact from '@/pages/Contact';
import MainLayout from '@/components/MainLayout';

const Home: React.FC = () => {
  return (
    <>
      <MainLayout>
        <Hero />
        <Projects />
      </MainLayout>
    </>
  );
};

export default Home;
