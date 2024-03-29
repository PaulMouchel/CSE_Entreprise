import { Dispatch, SetStateAction, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconType } from 'react-icons';

const buttonsVariant = {
    hidden: {
        x:100
    },
    visible: {
        x:0,
    },
    exit : {
        x:100
    }
}

const textVariant = {
    hidden: {
        opacity:0,
        x:50
    },
    visible: {
        opacity:1,
        x:0,
        transition: {duration: 0.3}
    },
    exit: {
        opacity:0,
        x:50,
        transition: {duration: 0.3}
    }
}

type Props = {
    admin: boolean
    setAdmin: Dispatch<SetStateAction<boolean>>
    icon: IconType
    text: string
}

const ToggleAdminButton = ({admin, setAdmin, icon, text}: Props) => {
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
        setIsHovering(true);
    }

    const handleMouseLeave = () => {
        setIsHovering(false);
    }

    const toggleAdmin = () => {
        setAdmin(!admin)
    }

    const Icon = icon

    return (
        <motion.li className="group flex flex-row-reverse items-center"
            variants={buttonsVariant}
            initial="hidden"
            animate="visible"
            exit="exit">          
            <div className="z-10 transform group-hover:translate-x-1 group-hover:scale-125 text-gray-50 flex justify-center w-10 h-10 rounded my-2 place-content-center bg-blue-900 transition duration-300 ease-in-out"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="flex justify-center items-center" onClick={toggleAdmin}>
                    <Icon className="box-content  p-1.5 m-0"/>
                </div>
            </div>
            <AnimatePresence>
                { isHovering &&
                    <motion.div className="mr-2 h-10 hidden md:inline-flex justify-center items-center py-1 px-2 text-blue-900 bg-gray-50 font-bold bg-opacity-50 rounded"
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit">     
                        {text}
                    </motion.div>
                }
            </AnimatePresence>
        </motion.li>   
    );
}

export default ToggleAdminButton;