import Header from "../components/header";
import { motion } from "framer-motion"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'


export default function Signin(){

        const navigate = useNavigate()

        const login = useGoogleLogin({
            onSuccess: (tokenResponse) => {
                console.log(tokenResponse);
                navigate('home');
            }
        });

    return(
        <>
            <div className="flex justify-center mt-20 h-screen overflow-x-hidden">
        <section >

        <div className="text-center mb-20">
        <motion.h1 
        initial={{scale: 0 }}
        animate={{scale: 1}}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{scale: 1.1}} 
        onHoverEnd={{scale: 1}}
        className="text-6xl text-green-600">
          Welcome to FlashLang!
        </motion.h1>
        </div>

        <div className="text-center">
        <motion.button 
        onClick={() => login()}
        whileTap={{scale: 0.9}}
        initial={{ scale: 0 }}
        animate={{scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{scale: 1.1}}
         className="bg-green-600 w-45 h-20 px-3 rounded-full text-4xl text-white-100 font-bold tracking-tight">
          Sign In With Google
        </motion.button>

        <h1> </h1>

        <motion.button whileTap={{scale: 0.9}}
        initial={{scale: 0 }}
        animate={{scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
         whileHover={{scale: 1.1}}
         className="bg-slate-950 w-30 h-10 px-3 mt-10 rounded-full text-xl text-green-600 font-bold tracking-tight">
          New User?
        </motion.button>
        </div>

      </section>
    </div>
        </>
    )
}