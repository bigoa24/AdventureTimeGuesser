import React from 'react';

interface FeedbackCardProps {
  isCorrect: boolean;
  characterName: string;
  onNext: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  isCorrect,
  characterName,
  onNext
}) => {
  // Rastgele komik mesajlar
  const correctMessages = [
    "Harika! Sen bir dahi misin? ",
    "Wooow! iyi bildin ",
    "Bravo! ",
    "Süper! ",
    "Mükemmel! aferin len ",
    "Tebrikler! Çok iyisin! ",
    "Harikasın! Bu çok kolaydı değil mi? "
  ];

  const wrongMessages = [
    "Oops! Bu sefer olmadı! ",
    "Yanlış! olsun be canım ",
    "Hata! Bir dahaki sefere! ",
    "Olmadı! Ama çok yakındın! ",
    "Yanlış! Gözlük lazım mı? ",
    "Hmmm... Bu zormuş olur öyle! ",
    "Olamaz! Bilgehan niye böyle bişey koymuş ki! "
  ];

  const getRandomMessage = () => {
    const messages = isCorrect ? correctMessages : wrongMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  };
  return (
    <div 
      className={`rounded-lg p-6 shadow-lg border-2 ${
        isCorrect ? 'feedback-correct' : 'feedback-incorrect'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center">
        <div className="text-4xl mb-2">
          {isCorrect ? '🎉' : '😅'}
        </div>
        
        <h2 className="text-xl font-bold mb-2">
          {isCorrect ? 'Doğru! 🎉' : 'Yanlış! 😅'}
        </h2>
        
        <p className="text-lg mb-2 font-bold text-purple-600">
          {getRandomMessage()}
        </p>
        
        <p className="text-md mb-4">
          {isCorrect 
            ? `Doğru cevap: ${characterName}` 
            : `Doğru cevap: ${characterName}`
          }
        </p>
        
        <button
          onClick={onNext}
          className="game-button text-lg px-8 py-3"
          autoFocus
          aria-label="Continue to next round"
        >
          Next Round ➡️
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
