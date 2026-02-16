import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { HUD } from './components/HUD';

function App() {
  return (
    <>
      <div className="bg-noise" />
      <HUD />
      <Layout>
        <Hero />
        <Gallery />
        <Contact />
      </Layout>
    </>
  );
}

export default App;
