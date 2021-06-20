import firebase from '../firebase';

export async function uploadUserFile(userId, file: File, onProgress): any {
  if (file == null) return;
  const filePath = `/files/${userId}/${Date.now()}-${file.name}`;
  await new Promise((resolve, reject) => {
    firebase.storage
      .ref(filePath)
      .put(file)
      .on(
        'state_changed',
        (snapshot) => {
          const { bytesTransferred, totalBytes } = snapshot;
          const progress = (bytesTransferred / totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          resolve(null);
        }
      );
  });

  const doc = await firebase.db.collection('user_files').add({
    fileName: file.name,
    path: filePath,
    size: file.size,
    uploadAt: new Date().toDateString(),
    userId: userId,
  });

  const docSnapshot = await doc.get();

  return { id: doc.id, ...docSnapshot.data() };
}

export async function getUserFiles(userId) {
  const querySnapshot = await firebase.db
    .collection('user_files')
    .where('userId', '==', userId)
    .get();

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function deleteUserFile(userId, file) {
  const ref = firebase.storage.ref(file.path);
  await ref.delete();
  await firebase.db.collection('user_files').doc(file.id).delete();
}

export default {
  getUserFiles,
  uploadUserFile,
  deleteUserFile,
};
