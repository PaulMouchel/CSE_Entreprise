import React, { useRef, useState } from 'react';
import { faSpinner, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from 'react-router-dom' 
import { projectFirestore, projectStorage, timestamp } from '../firebase/config';

import Title from '../components/Title';
import UploadImageForm from '../components/UploadImageForm.jsx';

const CreateBenefit = ({collection}) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false)
  const titleRef = useRef()
  const textRef = useRef()
  const history = useHistory()

  const changeImageField = (parameter, value) => {
    const newImage = image;
    newImage[parameter] = value;
    setImage(newImage);
 };

 const uploadToDatabase = async (title, text) => {
    const collectionRef = projectFirestore.collection(collection);
    const createdAt = timestamp();
    const imageUrl = image.downloadURL
    await collectionRef.add({ imageUrl, title:title, text:text, createdAt });
    setLoading(false)
    history.push('/admin')
 }

const UploadImage = (title, text) => {
    changeImageField("storageRef", projectStorage.ref().child(collection + "/" + title + "/" + image.fileName));
    const uploadTask = image.storageRef.put(image.file);
    uploadTask.on(
        "state_changed",
        null,
        function error(err) {
          console.log("Error Image Upload:", err);
        },
        async function complete() {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          changeImageField("downloadURL", downloadURL);
          uploadToDatabase(title, text)

        }
    );
}

  const setBenefitImage = (images) => {
    if (images[0]) {
      setImage(images[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let title = titleRef.current.value
    let text = textRef.current.value

    if (image && title !== "" && text !== "") {
      setLoading(true)
      UploadImage(title, text)
    }
  }

  return (
    <>
      <Title>Créer {collection === "Benefits" ? "un nouvel avantage" : "une nouvelle mission CSSCT" }</Title>
      <article className="group max-w-6xl m-auto lg:border-2 lg:my-10 lg:pb-5">
        <Link to="/admin" className=" transform duration-300 ease-in-out bg-green-500 hover:bg-white text-white hover:text-green-500 rounded-full block w-10 h-10 flex items-center justify-center relative top-2 left-2">
            <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="flex flex-col justify-between h-full -mt-10">
          <div className="pt-8">
            <UploadImageForm file={[image]} setFile={setBenefitImage}/>
            {image && <div className="h-72 md:h-96 bg-cover bg-center" style={{backgroundImage: `url(${image.url})`}}></div>}
          </div> 
          <div className="p-4 pt-0">
            <h3 className="w-full relative lg:mt-6 bottom-3 text-xl text-blue-800 font-bold">
              <input type="text" name="title" className="block w-full border-2 focus:border-green-400 p-2 outline-none" autoComplete="off" placeholder="Titre" ref={titleRef} required/>
            </h3>
            <div className="w-full h-80 text-gray-600 mb-10">
              <textarea type="text" name="text" className="resize-none block h-80 w-full border-2 focus:border-green-400 p-2 outline-none" autoComplete="off" placeholder="Texte" ref={textRef} required/>
            </div>
          </div>
        </div>
        { !loading ?
          <button disabled={loading} className="transition duration-500 ease-in-out bg-green-400 hover:bg-green-500 text-white font-bold p-2 rounded w-80" id="login" type="submit" onClick={handleSubmit}><span>Publier</span></button>
          :
          <button disabled={loading} className="transition duration-500 ease-in-out bg-green-400 hover:bg-green-500 text-white font-bold p-2 rounded w-80" id="login" type="submit"><FontAwesomeIcon className="animate-spin" icon={faSpinner}/></button>
        }
      </article>     
    </>
  );
}

export default CreateBenefit;