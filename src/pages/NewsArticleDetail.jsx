import React, { useState } from 'react';
import { faClock, faArrowLeft, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';
import { Link, useLocation, useHistory } from 'react-router-dom' 
import { projectFirestore, projectStorage } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';

import ImageGrid from '../components/ImageGrid.jsx'
import Modal from '../components/Modal.jsx'


const NewsArticleDetail = ({admin}) => {
    const { state } = useLocation();
    const [selectedImg, setSelectedImg] = useState(null);
    const history = useHistory()
    const { docs } = useFirestore('News');

    const deleteFolderContents = (path) => {
        const ref = projectStorage.ref(path);
        ref.listAll()
          .then(dir => {
            dir.items.forEach(fileRef => {
              deleteFile(ref.fullPath, fileRef.name);
            });
            dir.prefixes.forEach(folderRef => {
              deleteFolderContents(folderRef.fullPath);
            })
          })
          .catch(error => {
            console.log(error);
          });
      }

      const deleteFile = (pathToFile, fileName) => {
        const ref = projectStorage.ref(pathToFile);
        const childRef = ref.child(fileName);
        childRef.delete()
      }




    const handleDelete = () => {
        let id = state.articles.id;
        const currentDoc = docs.find(doc => doc.id === id)
        // const currentGallery = currentDoc.galleryUrl
        deleteFolderContents("News/" + currentDoc.title)
        
        // console.log(currentGallery)

        const collectionRef = projectFirestore.collection('News');
        // const images = collectionRef.doc(id)
        // const gal = images.title
        // console.log(gal)
        // const photoRef = mFirebaseStorage.getReferenceFromUrl(mImageUrl);
        

        collectionRef.doc(id).delete();
        history.push('/admin')
    }

  return (
      
    <article className="group max-w-6xl m-auto lg:border-2 lg:my-10 lg:pb-5">
        <div className="flex justify-between">
        
        <Link to="/" className=" transform duration-300 ease-in-out bg-green-500 hover:bg-white text-white hover:text-green-500 rounded-full block w-10 h-10 flex items-center justify-center relative top-2 left-2">
            <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        {admin && 
            <button className=" transform duration-300 ease-in-out bg-red-500 hover:bg-white text-white hover:text-red-500 rounded-full block w-10 h-10 flex items-center justify-center relative top-2 right-2"
            onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        }
        </div>
        <div className="flex flex-col justify-between h-full -mt-10">
            <div>
                {state.articles.galleryUrl && <div className="h-72 md:h-96 bg-cover bg-center" style={{backgroundImage: `url(${state.articles.galleryUrl[0]})`}}></div>}
                <div className="p-4 pb-0">
                    <div className="relative bottom-9 left-3 bg-green-500 p-2 text-gray-50 rounded-full px-3 inline-block">
                        <FontAwesomeIcon icon={faClock} />
                        <span className="ml-1">{state.articles.date}</span>                   
                    </div>
                </div>
            </div>
            <div className="p-4 pt-0">
                <h3 className="max-w-4xl m-auto relative lg:mt-6 bottom-3 text-xl text-blue-800 font-bold">
                    {state.articles.title}
                </h3>
                <div className="max-w-4xl m-auto text-justify text-gray-600 mb-5">
                    {state.articles.subTitle}
                </div>
                <div className="max-w-4xl m-auto text-justify text-gray-600 mb-10">
                    {state.articles.text}
                </div>
                {state.articles.galleryUrl && <>
                <h3 className="max-w-4xl m-auto relative bottom-3 text-xl text-blue-800 font-bold">
                    Galerie
                </h3>
                <ImageGrid gallery={state.articles.galleryUrl} setSelectedImg={setSelectedImg} /></>}
            </div>
        </div>
        { selectedImg && (
            <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
    </article>     
  );
}

export default NewsArticleDetail;