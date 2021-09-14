import React, { useState } from 'react';
import deleteDocument from '../hooks/deleteDocument';
import DeleteButton from './DeleteButton.jsx'
import { motion, AnimatePresence } from 'framer-motion'

const CssctMission = ({title, text, imageUrl, admin, id, docs}) => {
  
  const [size, setSize] = useState(1)
  const [showText, setShowText] = useState(false)

  const handleDelete = () => {
    deleteDocument({docs, id, collection:'Cssct'})
  }

  const handleMouseEnter = () => {
    let elements = docs.length
    setSize(elements+1) 
    setShowText(true)
  }

  const handleMouseLeave = () => {
    setSize(1)
    setShowText(false)
  }

  const missionVariant = {
    hidden: {
      opacity:0
    },
    visible: {
      opacity:1,
        transition: {delay: 0.4, duration: 0.7}
    },
    exit: {
      opacity:0
    }
}

  return (
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
        className="relative flex-auto hover:flex-5 bg-cover bg-center transition-all duration-500 ease-in-out hover:flex-grow" 
        style={{backgroundImage:`url(${imageUrl})`, flex: size}}>
        <AnimatePresence>
          { showText && 
            <motion.div className="relative bg-gradient-to-t from-gray-900 h-full text-start flex flex-col justify-between items-start"
            variants={missionVariant}
            initial="hidden"
            animate="visible"
            exit="exit">
              <DeleteButton admin={admin} onClick={handleDelete}/>
              {!admin && <div/>}
              <div className="absolute box-border px-4 bottom-4 w-full">
                <p className={`text-gray-50 text-2xl font-bold mt-8 pb-2`}>{title}</p>
                <p className={`text-gray-50 text-lg`}>{text}</p>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
  );
}

export default CssctMission;