import { useEffect, useState } from 'react';
import Box from './Box';

let wordList = [
  "blaze", "grape", "bride", "charm", "glove", "plant", "heart", "stone",
  "quick", "flame", "jumpy", "shiny", "brick", "climb", "piano", "scout",
  "latch", "whale", "crisp", "doubt", "spike", "mirth", "lemon", "grasp",
  "tramp", "flick", "plume", "laced", "minds", "blown", "knife", "waste",
  "slope", "flint", "quilt", "grove", "crane", "tiger", "viper", "ocean",
  "lapse", "jumpy", "stone", "clasp", "flock", "snare", "haste", "punch",
  "noble", "tacky", "daisy", "latch", "fancy", "plaza", "zebra", "jumps",
  "leapt", "minty", "curve", "lunar", "brisk", "swipe", "pouch", "tiger",
  "liver", "drive", "grind", "clash", "loose", "honey", "rider", "slime",
  "track", "spice", "lodge", "beach", "munch", "swank", "twist", "grasp"

];

function App() {
  let [board, setBoard] = useState(
    Array(7).fill().map(() => Array(5).fill({ letter: "", color: "" }))
  );
  let [currentRow, setcurrentRow] = useState(0);
  let [currentBox, setcurrentBox] = useState(0);
  let [targetWord] = useState(() => wordList[Math.floor(Math.random() * wordList.length)]);

  console.log(targetWord);


  useEffect(() => {
    let handleKeyPress = (event) => {
      if (currentRow >= 7) {
        return;
      }

      if (event.key === "Backspace" && currentBox > 0) {
        updateLetter(currentRow, currentBox - 1, "");
        setcurrentBox(currentBox - 1);
      }
      else if (event.key === "Enter" && currentBox === 5) {
        handleGuess();
      }
      else if (event.key > "A" && event.key > "Z" && currentBox < 5) {
        updateLetter(currentRow, currentBox, event.key.toUpperCase());
        setcurrentBox(currentBox + 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentRow, currentBox, board]);

  let updateLetter = (row, box, letter) => {
    let newBoard = board.map(row => [...row]);
    newBoard[row][box] = { letter, color: "" };
    setBoard(newBoard);
  };

  let handleGuess = () => {
    let guessedWord = board[currentRow].map(cell => cell.letter.toLowerCase()).join("");
    let updatedBoard = [...board];

    for (let i = 0; i < 5; i++) {
      let guessedLetter = guessedWord[i];
      let correctLetter = targetWord[i];

      if (guessedLetter === correctLetter) {
        updatedBoard[currentRow][i].color = "bg-green-500 text-white";
      }
      else if (targetWord.includes(guessedLetter)) {
        updatedBoard[currentRow][i].color = "bg-yellow-400 text-black";
      }
      else {
        updatedBoard[currentRow][i].color = "bg-gray-500 text-white";
      }
    }

    setBoard(updatedBoard);
    setcurrentRow(currentRow + 1);
    setcurrentBox(0);

    if (guessedWord === targetWord) {
      alert("Congratulations you win!");
      pageReload()
    }
    else if (currentRow === 6) {
      alert(`Game Over! The word was: ${targetWord}`);
      pageReload()
    }
  };


  let pageReload = () => {
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-2xl font-bold text-gray-700">Wordle Game</h1>

      <div className="flex flex-col gap-3">
        {board.map((row) => (

          <div className="flex gap-2">

            {
              row.map((cell) => (

                <Box letter={cell.letter} color={cell.color} />
                
              ))
            }
          </div>
        ))}
      </div>

      <button onClick={handleGuess} className="bg-green-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-green-700 transition duration-150">Guess</button>

    </div>
  );
}

export default App;
