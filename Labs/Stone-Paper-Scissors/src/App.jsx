import { useState } from "react"
const Choices = ['Stone', 'Paper', 'Scissor']
const App = () => {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0, draws: 0 });

  const playGame = (choice) =>{
    setPlayerChoice(choice);

    const randomIdx = Math.floor(Math.random() * Choices.length);
    const compChoice = Choices[randomIdx];
    setComputerChoice(compChoice);
    if (choice === compChoice) {
      setResult("It's a Draw! 🤝");
      setScore(prev => ({ ...prev, draws: prev.draws + 1 }));
    } else if (
      (choice === 'Stone' && compChoice === 'Scissor') ||
      (choice === 'Paper' && compChoice === 'Stone') ||
      (choice === 'Scissor' && compChoice === 'Paper')
    ) {
      setResult('You Win!');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('Computer Wins!');
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  }

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setScore({ player: 0, computer: 0, draws: 0 });
  };

  return (
    <div>
      <h1>Stone-paper-Scissor Game</h1> 
      <div>
        <h4>You : {score.player}</h4>
        <h4>Computer : {score.computer}</h4>
      </div>
      <div>
        <button onClick={() => playGame('Paper')}>Paper</button>
        <button onClick={() => playGame('Stone')}>Stone</button>
        <button onClick={() => playGame('Scissor')}>Scissor</button>
      </div>
      <div>
        <h3>Result Card</h3>
        {playerChoice ? (
          <div>
            <p>You chose: {playerChoice}</p>
            <p>Computer chose: {computerChoice}</p>
            <h4>{result}</h4>
            <button onClick={() => { setPlayerChoice(''); setComputerChoice(''); setResult(''); }}>
              Play Again
            </button>
          </div>
        ) : (
          <p>Make your move above!</p>
        )}
      </div>
      <div>
        <button onClick={resetGame}>Reset the Game</button>
      </div>
    </div>
  )
}

export default App
