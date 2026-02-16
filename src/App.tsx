import { useState } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { HUD } from './components/HUD';


function App() {
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);

  return (
    <>
      <div className="bg-noise" />
      <HUD />
      <Layout
        isChallengeOpen={isChallengeOpen}
        setIsChallengeOpen={setIsChallengeOpen}
        onOpenChallenge={() => setIsChallengeOpen(true)}
      >
        <Hero />
        <Gallery />
        <Contact onOpenChallenge={() => setIsChallengeOpen(true)} />
      </Layout>
    </>
  );
}

export default App;
