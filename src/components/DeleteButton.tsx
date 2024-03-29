import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa"
import { motion, AnimatePresence } from 'framer-motion'
import DeleteConfirmation from './DeleteConfirmation';

const deleteVariant = {
    hidden: {
        scale:0
    },
    visible: {
        scale:1,
        transition: {duration: 0.7}
    },
    exit: {
        scale:0,
        transition: {duration: 0.7}
    }
}

type Props = {
    onClick: () => void
    admin: boolean
    info: string
    alignRight?: boolean
    noAnimation?: boolean
}

const DeleteButton = ({onClick, admin, info, alignRight, noAnimation}: Props) => {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

    return (
        <>
            <AnimatePresence>
                {admin && 
                    <motion.button 
                    className={`transform duration-300 ease-in-out bg-red-500 hover:bg-white text-white hover:text-red-500 rounded-full w-10 h-10 flex items-center justify-center relative top-2 focus:outline-none ${alignRight ? "right-2" : "left-2"}`}
                    onClick={() => setShowDeleteConfirmation(true)}
                    variants={deleteVariant}
                    initial={noAnimation ? "" : "hidden"}
                    animate={noAnimation ? "" : "visible"}
                    exit="exit">
                    <FaTrashAlt />
                </motion.button>}
            </AnimatePresence>
            <AnimatePresence>
                { showDeleteConfirmation && (
                    <DeleteConfirmation setShowDeleteConfirmation={setShowDeleteConfirmation} handleDelete={onClick} info={info}/>
                )}
            </AnimatePresence>
        </>
    );
}

export default DeleteButton;