import deleteFolderContents from './deleteFolderContents';
import { projectFirestore } from '../firebase/config';

const deleteDocument = ({docs, id, collection, next, nextParams}) => {
    const currentDoc = docs.find(doc => doc.id === id)
    deleteFolderContents(collection + "/" + currentDoc.storageId)
    const collectionRef = projectFirestore.collection(collection);      
    collectionRef.doc(id).delete().then(next && next(nextParams));
}

export default deleteDocument;