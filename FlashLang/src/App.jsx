import { motion } from "framer-motion"

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen overflow-x-hidden">
      <section >
        <motion.button whileTap={{scale: 0.9}}
         whileHover={{scale: 1.1, backgroundColor: "white", color: "black"}}
         className="bg-green-400 aspect-rectangle w-40 h-20 rounded-lg text-2xl text-white-100 font-light tracking-wide">
          Welcome
        </motion.button>
      </section>
    </div>
  )

}

export default App