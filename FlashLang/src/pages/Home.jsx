import Header from "../components/header";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { useLocation } from 'react-router-dom';
import Confetti from "react-confetti";
import Logo from '/src/Logo.jpg';
import { createWorker } from 'tesseract.js';
import Tesseract from 'tesseract.js';


export default function Home(){

    const [selectedImage, setSelectedImage] = useState(null);

    const handleChangeImage = e => {
        setSelectedImage(e.target.files[0]);
    }

    const worker = createWorker();

    const convertImageToText = async () => {
        const worker = await createWorker("eng")
        const { data } = await worker.recognize(selectedImage);
        setInputText(data.text);
    }

    useEffect(() => {
        convertImageToText();
    }, [selectedImage])

    const navigate = useNavigate()

    const location = useLocation();
    console.log(location)
    const languages = [
        { code: "fr", name: "French" },
        { code: "de", name: "German" },
        { code: "es", name: "Spanish" },
        { code: "ar", name: "Arabic" },
        { code: "it", name: "Italian" },
        { code: "ja", name: "Japanese" },
        { code: "ko", name: "Korean" },
        { code: "pt", name: "Portuguese" },
        { code: "ru", name: "Russian" },
        { code: "zh-CN", name: "Chinese (Simplified)" },
      ];

      const [inputText, setInputText] = useState("");
      const [flashcards, setFlashcards] = useState([]);
      const [listening, setListening] = useState(false);
      const [targetLanguage, setTargetLanguage] = useState("fr"); // Default target language is French
      const [showConfetti, setShowConfetti] = useState(false);

      useEffect(() => {
        if (listening) {
          const recognition = new window.webkitSpeechRecognition();
          recognition.lang = "en-US";
          recognition.start();
    
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputText(transcript);
            setListening(false);
          };
    
          recognition.onend = () => {
            setListening(false);
          };
    
          return () => {
            recognition.stop();
          };
        }
      }, [listening]);
    

  const handleClick = (clickedButton) => {
    buttons.sort((a, b) => (a === clickedButton ? -1 : b === clickedButton ? 1 : 0));
  };

  const translateWord = async (word) => {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=AIzaSyBEmlEi92IGVhn4OriwUaL4r1O--VYEg5g`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: word,
          source: 'en',
          target: targetLanguage,
        }),
      }
    );
    const data = await response.json();
    return data.data.translations[0].translatedText;
  };



   const handleGenerateFlashcards = async () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    const words = inputText.split(" ");
    const newFlashcards = [];
    for (let i = 0; i < words.length; i++) {
      const translation = await translateWord(words[i]);
      newFlashcards.push({
        id: i,
        front: words[i],
        back: `${translation}`,
        isFlipped: false,
      });
    }
    setFlashcards(newFlashcards);
  };

  const handleFlip = (id) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) =>
        flashcard.id === id ? { ...flashcard, isFlipped: !flashcard.isFlipped } : flashcard
      )
    );
  };

  const toggleListening = () => {
    setListening((prevState) => !prevState);
  };

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div className ="overflow-x-hidden">
        <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
         className ="bg-gradient-to-r from-white-400 to-white-600 border border-3 rounded-full border-sky-600 py-11 px-2 flex justify-center items-center gap-4">
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
          whileHover={{ scale: 1.1}}
              className = "absolute items-center mb-2 mr-20 gap-4 text-sky-600 text-5xl">
                Your Flashcards
              </motion.button>
         </motion.div>
      <section>
      <div className="overflow-y-auto flex flex-col min-h-screen justify-start items-start p-4">
          {showConfetti && (
            <Confetti
              numberOfPieces={300}
              recycle={false}
              gravity={0.5}
              initialVelocityX={7}
              initialVelocityY={7}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
          <div className= "flex justify-center items-center mt-2 absolute top-2 left-4 gap-4" >
          <motion.img 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
      whileHover={{ scale: 1.1}}
      src={Logo} alt="Profile" style={{ maxWidth: '52px', maxHeight: '52px' }}
      className = "flex justify-center items-center mb-11 rounded-full"
      />
          <motion.h1
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            whileHover={{ scale: 1.1 }}
            
            className="flex justify-center h-20 px-3 text-5xl text-sky-600 font-bold tracking-tight rounded-md mb-4"
          >
            FlashLang
          </motion.h1>
          </div>
          <div className ="flex justify-center items-center mt-2 absolute top-2 right-4 gap-4">
        <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        whileHover={{ scale: 1.1 }}
         className ="bg-blue-900 py-1 px-2 flex justify-center items-center gap-4 rounded-full">
        <motion.h1 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        whileHover={{ scale: 1.1 }}
        className = "text-4xl text-sky-600 pb-2">
        {location.state.userName}
        </motion.h1>
        <motion.img 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
      whileHover={{ scale: 1.1}}
      src={location.state.profilePicture} alt="Profile" style={{ maxWidth: '50px', maxHeight: '50px' }}
      className = "rounded-full"
      />
      </motion.div>
        <motion.button initial={{ scale: 0 }}
            animate={{ scale: 1 }} 
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            whileHover={{ scale: 1.1}} onClick={() => navigate('/signin')} className = "bg-slate-950 border border-sky-600 w-50 h-12 px-3 py-0 pb-1 rounded-lg text-4xl text-sky-600 font-normal tracking-tight">
          Log Out
        </motion.button>
        </div>
        <div className="ml-40 w-full flex justify-center items-center items-center gap-10">
          <motion.button
            onClick={toggleListening}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            className={`bg-blue-500 hover:bg-blue-600 flex verify-center items-center mt-20 active:bg-blue-400 text-white font-bold py-2 px-4 rounded ${listening ? 'bg-red-500' : ''}`}
          >
            Speech To Text
          </motion.button>
          <div className="flex justify-center items-center input-wrapper">
          <label htmlFor="upload"
            whileHover={{ scale: 1.1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            className={`flex justify-center items-center bg-blue-500 hover:bg-blue-600 mt-20 active:bg-blue-400 text-white font-bold py-2 px-4 rounded`}
          >
            Image To Text
          </label>
          <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} style={{ opacity: 0 }}/>
          </div>
          </div>
          {/* Language select */}
          <div className="w-full flex justify-center items-center mt-4 gap-10">
          <motion.select
            value={targetLanguage}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            onChange={handleLanguageChange}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 "
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </motion.select>
          {/* Flashcard Generator */}
          <div className="flex items-center mt-4 gap-7">
            <motion.input
              type="text"
              value={inputText}
              initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter words separated by space"
              className="border border-gray-300 rounded-md p-2 mr-2"
            />
            <motion.button
              onClick={handleGenerateFlashcards}
              initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Generate Flashcards
            </motion.button>
          </div>
          </div>
          {/* Flashcards */}
          <div className="flex flex-wrap mt-4">
            {flashcards.map((flashcard) => (
              <div
                key={flashcard.id}
                className="bg-white border h-12 border-gray-300 rounded-md p-4 mr-4 mb-4 shadow-md relative"
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
  );

}
