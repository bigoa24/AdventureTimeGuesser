import React, { useEffect } from 'react';

interface PinkEndingScreenProps {
  onHeartClick: () => void;
}

const PinkEndingScreen: React.FC<PinkEndingScreenProps> = ({ onHeartClick }) => {
  useEffect(() => {
    console.log('🎵 PINK SCREEN: Component mounted, playing sparkle audio...');
    
    const playSparkleAudio = () => {
      const audio = new Audio('/audio/sound-effect-twinklesparkle-115095.mp3');
      audio.volume = 1.0; // FULL VOLUME
      
      audio.play().then(() => {
        console.log('✅ PINK SCREEN: Sparkle audio started successfully!');
      }).catch((error) => {
        console.error('❌ PINK SCREEN: Sparkle audio error:', error);
      });
      
      return audio;
    };

    const audio = playSparkleAudio();
    
    // Cleanup: ses dosyasını durdur component unmount olduğunda
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        console.log('🔇 PINK SCREEN: Audio cleaned up');
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Kalpler animasyon */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">💖</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">💕</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce">💝</div>
        <div className="absolute top-1/3 left-1/4 text-3xl animate-pulse">💗</div>
        <div className="absolute bottom-1/3 right-1/4 text-4xl animate-bounce">💓</div>
        <div className="absolute top-1/2 right-10 text-5xl animate-pulse">💖</div>
        <div className="absolute bottom-10 left-1/2 text-3xl animate-bounce">💕</div>
        <div className="absolute top-10 left-1/2 text-4xl animate-pulse">💝</div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center max-w-lg w-full relative z-10">
        <div className="text-6xl mb-6">😄✨</div>
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Şaka! 😄✨</h1>
        <p className="text-2xl text-pink-500 mb-8">Sadece eğlenceli bir oyundu! 🎮💕</p>
        
        {/* Tıklanabilir kalp */}
        <button
          onClick={onHeartClick}
          className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-6xl hover:scale-110 transition-transform shadow-lg border-4 border-pink-300 mx-auto"
          aria-label="Devam et"
        >
          💖
        </button>
        <p className="text-pink-400 mt-4 text-lg text-center">Kalbe tıkla! 💕</p>
      </div>
    </div>
  );
};

export default PinkEndingScreen;
