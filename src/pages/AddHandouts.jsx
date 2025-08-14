import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddHandouts() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  const handleUpload = async () => {
    if (!file || !name) return;

    const fileRef = ref(storage, `handouts/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);

    const docRef = doc(db, 'modules', id);
    await updateDoc(docRef, {
      handouts: [{ name, url }],
    });

    setFile(null);
    setName('');
    alert('Handout uploaded!');
  };

  return (
    <div className="add-handout">
      <h2>📄 Upload Handout</h2>
      <input type="text" placeholder="Handout Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}