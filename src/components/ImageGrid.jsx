import React from 'react';
import { motion } from 'framer-motion';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageGrid = ({ galleryUrl, setSelectedImg, imagesDeletable, gallery, setGallery }) => {

    const handleDelete = (e, index) => {
        e.stopPropagation()
        let newGallery = gallery
        newGallery.splice(index,1)
        setGallery([...newGallery])
    }
    
    return (
        <div className="max-w-screen-lg m-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 ">
                {galleryUrl && galleryUrl.map((doc, index) => (
                    <motion.div 
                        className="relative overflow-hidden opacity-80 bg-cover bg-center" 
                        style={{
                            padding: "50% 0", 
                            backgroundImage: `url(${doc})`
                        }} 
                        key={index} 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ delay: 0 }}
                        whileHover={{ opacity: 1 }}
                        onClick={() => setSelectedImg(doc)}
                    >
                        { imagesDeletable &&
                            <div className="h-6 w-6 absolute flex items-center justify-center top-2 right-2 bg-red-500 rounded-full"
                            onClick={e => {handleDelete(e, index)}}>
                                <FontAwesomeIcon icon={faTimes} className="text-white text-md"/>
                            </div>
                        }
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ImageGrid;