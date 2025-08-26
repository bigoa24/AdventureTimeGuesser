import React, { useState, useEffect, useRef } from 'react';
import type { GameState } from '../utils/gameUtils';
import { createNewGame, processGuess, nextRound, skipRound } from '../utils/gameUtils';
import { isGuessCorrect } from '../utils/textNormalization';
import { saveScore, isHighScore } from '../utils/localStorage';
import GameHeader from './GameHeader';
import ImageDisplay from './ImageDisplay';
import GuessInput from './GuessInput';
import FeedbackCard from './FeedbackCard';
import GameComplete from './GameComplete';
import PinkEndingScreen from './PinkEndingScreen';
import JumpscareScreen from './JumpscareScreen';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => createNewGame());
  const [guess, setGuess] = useState('');
  const [showNewHighScore, setShowNewHighScore] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [showFinalScaryScreen, setShowFinalScaryScreen] = useState(false);
  const [showSinisterMessage, setShowSinisterMessage] = useState(false);
  const [showPinkEnding, setShowPinkEnding] = useState(false);
  const [showJumpscare, setShowJumpscare] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const transitionAudioRef = useRef<HTMLAudioElement>(null);
  const laughAudioRef = useRef<HTMLAudioElement>(null);
  const sinisterAudioRef = useRef<HTMLAudioElement>(null);
  const clockTickingAudioRef = useRef<HTMLAudioElement>(null);
  const laughIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentRound = gameState.rounds[gameState.currentRoundIndex];
  
  // 6. karakterden sonra korkunç tema aktif olur
  const isDarkMode = gameState.currentRoundIndex >= 6;

  useEffect(() => {
    // Focus feedback area for screen readers when feedback changes
    if (gameState.hasAnswered && feedbackRef.current) {
      feedbackRef.current.focus();
    }
  }, [gameState.hasAnswered]);

  useEffect(() => {
    console.log(`🔍 useEffect: isDarkMode=${isDarkMode}, currentRound=${gameState.currentRoundIndex}`);
    
    // Korkunç tema aktif olduğunda audio çal ve siyah ekran göster
    if (isDarkMode && gameState.currentRoundIndex === 6) {
      console.log('🎵 Starting scary theme audio...');
      // İlk kez dark mode'a geçiyoruz - siyah ekran göster
      setShowBlackScreen(true);
      
      // Geçiş audiosu çal (3 saniye)
      if (transitionAudioRef.current) {
        transitionAudioRef.current.volume = 0.5;
        transitionAudioRef.current.play().catch(console.error);
      }
      
      // 3 saniye sonra siyah ekranı kaldır ve ana korkunç müziği çal
      setTimeout(() => {
        setShowBlackScreen(false);
        
        // Geçiş audiosu durdur
        if (transitionAudioRef.current) {
          transitionAudioRef.current.pause();
          transitionAudioRef.current.currentTime = 0;
        }
        
        // Ana korkunç müzik çal
        if (audioRef.current) {
          audioRef.current.volume = 0.3; // Ses seviyesi %30
          audioRef.current.loop = true; // Döngüde çal
          audioRef.current.play().catch(console.error);
        }

        // Saat tikleme sesi çal (korkunç tema için)
        if (clockTickingAudioRef.current) {
          clockTickingAudioRef.current.volume = 0.4; // Ses seviyesi %40
          clockTickingAudioRef.current.loop = true; // Döngüde çal
          clockTickingAudioRef.current.play().catch(console.error);
        }

        // Diabolic laugh interval'ini başlat (7-8 saniye arası) - sadece yoksa
        if (!laughIntervalRef.current) {
          console.log('⏰ Creating initial laugh interval...');
          laughIntervalRef.current = setInterval(() => {
            if (laughAudioRef.current) {
              laughAudioRef.current.volume = 0.8; // Ses seviyesi artırıldı
              laughAudioRef.current.currentTime = 0;
              laughAudioRef.current.play().catch(console.error);
            }
          }, 7500); // 7.5 saniye
        }
      }, 3000);
    } else if (isDarkMode && audioRef.current && !showBlackScreen) {
      console.log('🎵 Already in dark mode, continuing audio...');
      // Zaten dark mode'dayız, sadece ana audio çal
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      audioRef.current.play().catch(console.error);

      // Diabolic laugh interval'ini başlat (sadece yoksa)
      if (!laughIntervalRef.current) {
        console.log('⏰ Creating laugh interval...');
        laughIntervalRef.current = setInterval(() => {
          if (laughAudioRef.current) {
            laughAudioRef.current.volume = 0.8; // Ses seviyesi artırıldı
            laughAudioRef.current.currentTime = 0;
            laughAudioRef.current.play().catch(console.error);
          }
        }, 7500); // 7.5 saniye
      } else {
        console.log('⏰ Laugh interval already exists, skipping...');
      }
    } else if (!isDarkMode && audioRef.current) {
      audioRef.current.pause();
      // Dark mode değilse saat tikleme sesini de durdur
      if (clockTickingAudioRef.current) {
        clockTickingAudioRef.current.pause();
      }
    }

    // Cleanup function
    return () => {
      if (laughIntervalRef.current) {
        clearInterval(laughIntervalRef.current);
        laughIntervalRef.current = null;
      }
      if (clockTickingAudioRef.current) {
        clockTickingAudioRef.current.pause();
        clockTickingAudioRef.current.currentTime = 0;
      }
    };
  }, [isDarkMode, gameState.currentRoundIndex, showBlackScreen]);

  const handleSubmitGuess = () => {
    if (!guess.trim() || gameState.hasAnswered) return;

    const isCorrect = isGuessCorrect(
      guess,
      currentRound.character.name,
      currentRound.character.aliases
    );

    const newGameState = processGuess(gameState, isCorrect, isDarkMode);
    setGameState(newGameState);
    setGuess('');

    // Korkunç temada doğru cevap verince 2.5 saniye bekleyip sonraki karaktere geç
    if (isDarkMode && isCorrect) {
      setTimeout(() => {
        const nextGameState = nextRound(newGameState);
        setGameState(nextGameState);

        if (nextGameState.isGameComplete) {
          // Oyun bittiğinde final scary screen göster
          setShowFinalScaryScreen(true);
        }
      }, 2500); // 2.5 saniye bekle
    }
  };

  const handleNextRound = () => {
    const newGameState = nextRound(gameState);
    setGameState(newGameState);

    if (newGameState.isGameComplete) {
      // Oyun bittiğinde final scary screen göster
      setShowFinalScaryScreen(true);
    }
  };

  const handleSkipRound = () => {
    const newGameState = skipRound(gameState, isDarkMode);
    setGameState(newGameState);

    // Korkunç temada skip yaparken 2.5 saniye bekleyip sonraki karaktere geç
    if (isDarkMode) {
      setTimeout(() => {
        const nextGameState = nextRound(newGameState);
        setGameState(nextGameState);

        if (nextGameState.isGameComplete) {
          setShowFinalScaryScreen(true);
        }
      }, 2500); // 2.5 saniye bekle
    } else if (newGameState.isGameComplete) {
      // Normal temada oyun bittiğinde final scary screen göster
      setShowFinalScaryScreen(true);
    }
  };

  const handleFinalScaryClick = () => {
    setShowSinisterMessage(true);
    
    // Sinister müzik çal
    if (sinisterAudioRef.current) {
      sinisterAudioRef.current.volume = 0.4;
      sinisterAudioRef.current.play().catch(console.error);
    }
    
    // 3 saniye sonra pembe ending'e geç
    setTimeout(() => {
      // TÜM korkunç müzikleri ve interval'leri ZORLA durdur
      console.log('🛑 FORCING ALL SCARY AUDIO TO STOP...');
      
      // DOM'daki TÜM audio elementlerini bul ve durdur (cursed-audio içeren)
      const allAudioElements = document.querySelectorAll('audio');
      allAudioElements.forEach((audio, index) => {
        const src = audio.currentSrc || audio.src;
        if (src && src.includes('cursed-audio')) {
          console.log(`🔇 FOUND CURSED AUDIO ${index}: ${src}`);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0;
          audio.loop = false;
          console.log(`✅ STOPPED CURSED AUDIO ${index}`);
        }
      });
      
      // Ana cursed audio (audioRef)
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0;
        audioRef.current.loop = false;
        console.log('🔇 Main cursed audio stopped');
      }
      
      // Sinister audio (aynı dosya)
      if (sinisterAudioRef.current) {
        sinisterAudioRef.current.pause();
        sinisterAudioRef.current.currentTime = 0;
        sinisterAudioRef.current.volume = 0;
        sinisterAudioRef.current.loop = false;
        console.log('🔇 Sinister audio stopped');
      }
      
      // Laugh audio
      if (laughAudioRef.current) {
        laughAudioRef.current.pause();
        laughAudioRef.current.currentTime = 0;
        laughAudioRef.current.volume = 0;
        laughAudioRef.current.loop = false;
        console.log('🔇 Laugh audio stopped');
      }
      
      // Laugh interval'ini de durdur
      if (laughIntervalRef.current) {
        clearInterval(laughIntervalRef.current);
        laughIntervalRef.current = null;
        console.log('⏹️ Laugh interval cleared');
      }
      
      // Transition audio da durdur
      if (transitionAudioRef.current) {
        transitionAudioRef.current.pause();
        transitionAudioRef.current.currentTime = 0;
        transitionAudioRef.current.volume = 0;
        transitionAudioRef.current.loop = false;
        console.log('🔇 Transition audio stopped');
      }

      // Saat tikleme sesini de durdur
      if (clockTickingAudioRef.current) {
        clockTickingAudioRef.current.pause();
        clockTickingAudioRef.current.currentTime = 0;
        clockTickingAudioRef.current.volume = 0;
        clockTickingAudioRef.current.loop = false;
        console.log('🔇 Clock ticking audio stopped');
      }
      
      setShowFinalScaryScreen(false);
      setShowSinisterMessage(false);
      setShowPinkEnding(true);
      
      // Pembe sparkle müziği çal
      setTimeout(() => {
        console.log('🎵 Trying to play sparkle audio...');
        // Sparkle audio artık PinkEndingScreen component'inde çalıyor
        console.log('✨ Pink screen will handle its own audio');
      }, 100); // Kısa gecikme ile çal
    }, 3000);
  };

  const handlePinkEndingClick = () => {
    console.log('💖 PINK ENDING: Heart clicked, going to jumpscare...');
    
    setShowPinkEnding(false);
    setShowJumpscare(true);
    
    // 2 saniye sonra gerçek bitiş ekranına geç
    setTimeout(() => {
      console.log('⏰ JUMPSCARE: Time up, going to final screen...');
      setShowJumpscare(false);
      
      // Yüksek skor kontrolü
      if (isHighScore(gameState.score)) {
        setShowNewHighScore(true);
        saveScore(gameState.score, gameState.rounds.length);
      }
    }, 2000);
  };

  const handlePlayAgain = () => {
    console.log('🔄 PLAY AGAIN: Cleaning up all audio and intervals...');
    
    // TÜM interval'leri agresif bir şekilde temizle
    if (laughIntervalRef.current) {
      console.log('⏹️ Clearing laugh interval...');
      clearInterval(laughIntervalRef.current);
      laughIntervalRef.current = null;
    }
    
    // Güvenlik için - tüm çalışan interval'leri durdur
    const highestTimeoutId = setTimeout(() => {}, 0) as unknown as number;
    for (let i = highestTimeoutId; i >= 0; i--) {
      clearInterval(i);
      clearTimeout(i);
    }

    setGameState(createNewGame());
    setShowNewHighScore(false);
    setGuess('');
    setShowBlackScreen(false);
    setShowFinalScaryScreen(false);
    setShowSinisterMessage(false);
    setShowPinkEnding(false);
    setShowJumpscare(false);
    
    // Tüm audio'ları durdur
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (transitionAudioRef.current) {
      transitionAudioRef.current.pause();
      transitionAudioRef.current.currentTime = 0;
    }
    if (laughAudioRef.current) {
      laughAudioRef.current.pause();
      laughAudioRef.current.currentTime = 0;
    }
    if (clockTickingAudioRef.current) {
      clockTickingAudioRef.current.pause();
      clockTickingAudioRef.current.currentTime = 0;
    }
    if (sinisterAudioRef.current) {
      sinisterAudioRef.current.pause();
      sinisterAudioRef.current.currentTime = 0;
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !gameState.hasAnswered) {
      handleSubmitGuess();
    }
  };

  // YENİ JUMPSCARE EKRAN - TEMİZ VERSİYON
  if (showJumpscare) {
    return <JumpscareScreen />;
  }

  // YENİ PEMBE EKRAN - TEMİZ VERSİYON
  if (showPinkEnding) {
    return <PinkEndingScreen onHeartClick={handlePinkEndingClick} />;
  }

  // Final scary screen göster
  if (showFinalScaryScreen) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        {/* Sinister müzik */}
        <audio ref={sinisterAudioRef} preload="auto">
          <source src="/audio/cursed-audio.mp3" type="audio/mpeg" />
        </audio>
        
        {/* Korkunç gif gözler - aynı pozisyonlarda */}
        <div className="w-full h-full relative">
          {/* Sol üst köşe */}
          <div className="absolute top-8 left-8 w-16 h-16">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-90" />
          </div>
          
          {/* Sağ üst köşe */}
          <div className="absolute top-12 right-12 w-20 h-20">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-80" />
          </div>
          
          {/* Sol orta */}
          <div className="absolute top-1/3 left-4 w-14 h-14">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-85" />
          </div>
          
          {/* Sağ orta */}
          <div className="absolute top-2/3 right-8 w-18 h-18">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-90" />
          </div>
          
          {/* Merkez üst */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-75" />
          </div>
          
          {/* Sol alt */}
          <div className="absolute bottom-20 left-16 w-16 h-16">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-85" />
          </div>
          
          {/* Sağ alt */}
          <div className="absolute bottom-24 right-20 w-14 h-14">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-80" />
          </div>
          
          {/* Merkez alt */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-20">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-90" />
          </div>
          
          {/* TAM MERKEZ - En büyük göz */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
            <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-95" />
          </div>
        </div>

        {/* Merkez kutu ve mesaj */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {showSinisterMessage ? (
            // Sinister mesaj göster
            <h1 className="text-red-500 text-3xl md:text-5xl font-bold text-center animate-pulse drop-shadow-2xl px-4">
              Attığım link sence güvenli miydi?
            </h1>
          ) : (
            // Yanıp sönen kutu
            <div 
              onClick={handleFinalScaryClick}
              className="bg-black border-4 border-red-600 rounded-lg p-8 cursor-pointer hover:bg-red-900 transition-all duration-300 hover:scale-105 animate-pulse"
            >
              <div className="text-red-500 text-8xl text-center animate-bounce">
                ?
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState.isGameComplete) {
    return (
      <GameComplete
        score={gameState.score}
        totalRounds={gameState.rounds.length}
        showNewHighScore={showNewHighScore}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col p-4 transition-all duration-1000 ${
      isDarkMode 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-sky-400 to-emerald-400'
    }`}>
      {/* Korkunç tema için ana audio */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/cursed-audio.mp3" type="audio/mpeg" />
      </audio>
      
      {/* 3 saniyelik geçiş audiosu */}
      <audio ref={transitionAudioRef} preload="auto">
        <source src="/audio/censor-beep-1-372459.mp3" type="audio/mpeg" />
      </audio>

      {/* Diabolic laugh audio (7-8 saniyede bir) */}
      <audio ref={laughAudioRef} preload="auto">
        <source src="/audio/diabolic-laugh-202978.mp3" type="audio/mpeg" />
      </audio>

      {/* Saat tikleme sesi (korkunç tema için) */}
      <audio ref={clockTickingAudioRef} preload="auto">
        <source src="/audio/slow-cinematic-clock-ticking-357979.mp3" type="audio/mpeg" />
      </audio>
      
      {/* 3 saniyelik siyah ekran overlay - korkunç gif gözler için */}
      {showBlackScreen && (
        <div className="fixed inset-0 bg-black z-50 overflow-hidden">
          {/* Korkunç gif gözler - sık sık ekranda */}
          <div className="w-full h-full relative">
            {/* Sol üst köşe */}
            <div className="absolute top-8 left-8 w-16 h-16">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-90" />
            </div>
            
            {/* Sağ üst köşe */}
            <div className="absolute top-12 right-12 w-20 h-20">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-80" />
            </div>
            
            {/* Sol orta */}
            <div className="absolute top-1/3 left-4 w-14 h-14">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-85" />
            </div>
            
            {/* Sağ orta */}
            <div className="absolute top-2/3 right-8 w-18 h-18">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-90" />
            </div>
            
            {/* Merkez üst */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-75" />
            </div>
            
            {/* Sol alt */}
            <div className="absolute bottom-20 left-16 w-16 h-16">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-85" />
            </div>
            
            {/* Sağ alt */}
            <div className="absolute bottom-24 right-20 w-14 h-14">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-80" />
            </div>
            
            {/* Merkez alt */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-20">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-90" />
            </div>
            
            {/* TAM MERKEZ - En büyük göz */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
              <img src="/images/i-can-see-you-dark.gif" alt="" className="w-full h-full object-contain opacity-95" />
            </div>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto w-full flex flex-col flex-grow">
        {/* Normal temada header göster */}
        {!isDarkMode && (
          <GameHeader
            score={gameState.score}
            currentRound={gameState.currentRoundIndex + 1}
            totalRounds={gameState.rounds.length}
            isDarkMode={isDarkMode}
          />
        )}

        <div className="flex-grow flex flex-col justify-center">
          {/* Resmi her zaman göster */}
          <ImageDisplay
            character={currentRound.character}
            revealed={gameState.hasAnswered}
            isDarkMode={isDarkMode}
          />

          <div className={isDarkMode ? "flex items-center justify-center mt-8" : "mt-6"}>
            {gameState.hasAnswered && !isDarkMode ? (
              // Normal temada feedback göster
              <div ref={feedbackRef} tabIndex={-1}>
                <FeedbackCard
                  isCorrect={gameState.lastGuessCorrect || false}
                  characterName={currentRound.character.name}
                  onNext={handleNextRound}
                />
              </div>
            ) : (
              // Korkunç temada feedback yok, sadece input
              <GuessInput
                value={guess}
                onChange={setGuess}
                onSubmit={handleSubmitGuess}
                onSkip={handleSkipRound}
                onKeyPress={handleKeyPress}
                disabled={gameState.hasAnswered && isDarkMode} // Korkunç temada doğru cevap verince disabled
                isDarkMode={isDarkMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
