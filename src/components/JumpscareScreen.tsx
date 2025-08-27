import React, { useEffect } from 'react';

const JumpscareScreen: React.FC = () => {
  useEffect(() => {
    console.log('💀 JUMPSCARE: Component mounted, playing jumpscare audio...');
    
    const playJumpscareAudio = () => {
      const audio = new Audio('/audio/smile-dog-jumpscare-167171.mp3');
      audio.volume = 1.0; // FULL VOLUME
      
      audio.play().then(() => {
        console.log('✅ JUMPSCARE: Audio started successfully!');
      }).catch((error) => {
        console.error('❌ JUMPSCARE: Audio error:', error);
      });
      
      return audio;
    };

    const audio = playJumpscareAudio();
    
    // Cleanup: ses dosyasını durdur component unmount olduğunda
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        console.log('🔇 JUMPSCARE: Audio cleaned up');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <img 
        src="/images/jumpscare.png" 
        alt="Jumpscare" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default JumpscareScreen;




