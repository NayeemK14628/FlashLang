import Header from "../components/header";
import { motion } from "framer-motion"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Signin(){

        const navigate = useNavigate()

        const login = useGoogleLogin({
            onSuccess: async (response) => {
                try {
                    const res = await axios.get(
                        "https://www.googleapis.com/oauth2/v3/userinfo",
                        {
                            headers: {
                                Authorization: `Bearer ${response.access_token}`,
                            },
                        }
                    );
                    console.log(res);
                    navigate('/home', { state: { profilePicture: res.data.picture, userName: res.data.given_name} }); 
                }   catch (err) {
                    console.log(err);
                }
            },
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
        className="text-6xl text-sky-600">
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
         className="bg-sky-600 w-45 h-20 px-3 rounded-full text-4xl text-white-100 font-bold tracking-tight">
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
         className="bg-slate-950 w-30 h-10 px-3 mt-10 rounded-full text-xl text-sky-600 font-bold tracking-tight">
          New User?
        </motion.button>
        </div>

      </section>
    </div>
        </>
    )
}
