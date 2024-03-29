import { useState } from 'react';
import { Link } from 'react-router-dom' 
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
    icon: IconType
    external: boolean
    href: string
    text: string
}

const AdminButton = (item: Props) => {
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = () => {
        setIsHovering(true);
    }

    const handleMouseLeave = () => {
        setIsHovering(false);
    }

    const Icon = item.icon

    return (
        <motion.li className="group flex flex-row-reverse items-center"
            variants={buttonsVariant}
            initial="hidden"
            animate="visible"
            exit="exit">          
            <div className={`z-10 transform group-hover:translate-x-1 group-hover:scale-125 text-gray-50 flex justify-center w-10 h-10 rounded my-2 place-content-center bg-blue-900 ${item.external && "bg-yellow-300 text-yellow-900"} transition duration-300 ease-in-out`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                    { !item.external ?
                <Link className="flex justify-center items-center" to={item.href}>
                    <Icon className="box-content  p-1.5 m-0"/>
                </Link>
                :
                <a className="flex justify-center items-center" href={item.href} target='_blank'>
                    <Icon className="box-content  p-1.5 m-0"/>
                </a> 
                }
            </div>
            <AnimatePresence>
                { isHovering &&
                    <motion.div className="mr-2 h-10 inline-flex justify-center items-center py-1 px-2 text-blue-900 bg-gray-50 font-bold bg-opacity-50 rounded"
                        variants={textVariant}
                        initial="hidden"
                        animate="visible"
                        exit="exit">
                        {item.text}
                    </motion.div>
                }
            </AnimatePresence>
        </motion.li>   
    );
}

export default AdminButton;