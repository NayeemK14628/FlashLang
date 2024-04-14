import Header from "../components/header";
import { useState } from "react";
import { motion } from "framer-motion"

export default function Home(){
    
    const buttons = ["image-input", "speech-input", "text-input"];

  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  const handleClick = (clickedButton) => {
    buttons.sort((a, b) => (a === clickedButton ? -1 : b === clickedButton ? 1 : 0));
  };

  const handleGenerateFlashcards = () => {
    const words = inputText.split(" ");
    const newFlashcards = words.map((word, index) => ({
      id: index,
      front: word,
      back: `Definition ${index + 1}`, // Example definition for the back side
      isFlipped: false,
    }));
    setFlashcards(newFlashcards);
  };

  const handleFlip = (id) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) =>
        flashcard.id === id ? { ...flashcard, isFlipped: !flashcard.isFlipped } : flashcard
      )
    );
  };

    return(
        <>
     <div>
      <section>
        <div className="overflow-y-hidden flex flex-col h-screen justify-start items-start p-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "bounce",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.1 }}
            className="bg-slate-950 w-full max-w-md h-20 px-3 text-4xl text-white font-bold tracking-tight border border-white rounded-md mb-4"
          >
            All my cards
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "bounce",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.1 }}
            className="bg-slate-950 w-full max-w-md h-20 px-3 text-4xl text-white font-bold tracking-tight border border-white rounded-md mb-4"
          >
            Incomplete
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "bounce",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.1 }}
            className="bg-slate-950 w-full max-w-md h-20 px-3 text-4xl text-white font-bold tracking-tight border border-white rounded-md mb-4"
          >
            Complete
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "bounce",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.1 }}
            className="bg-slate-950 w-full max-w-md h-24 px-3 text-4xl text-white font-bold tracking-tight border border-white rounded-md mb-4"
          >
            + Add cards
          </motion.button>
         
          {buttons.map((button) => (
            <motion.button
              key={button}
              onClick={() => handleClick(button)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 1 }}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            >
              {button}
            </motion.button>
          ))}

          {/* Flashcard Generator */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter words separated by space"
              className="border border-gray-300 rounded-md p-2 mr-2"
            />
            <button
              onClick={handleGenerateFlashcards}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Generate Flashcards
            </button>
          </div>
          <div className="flex flex-wrap mt-4">
            {flashcards.map((flashcard) => (
              <div
                key={flashcard.id}
                className="bg-white border border-gray-300 rounded-md p-4 mr-4 mb-4 shadow-md relative"
                style={{ minWidth: "200px", flex: "0 0 auto" }}
                onClick={() => handleFlip(flashcard.id)}
              >
                {/* Front side */}
                <div className={`absolute w-full h-full front ${flashcard.isFlipped ? "hidden" : ""}`}>
                  <p className="text-lg font-bold">{flashcard.front}</p>
                </div>
                {/* Back side */}
                <div className={`absolute w-full h-full back ${!flashcard.isFlipped ? "hidden" : ""}`}>
                  <p>{flashcard.back}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
    )
}