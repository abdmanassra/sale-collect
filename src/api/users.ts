import firebase from '../firebase';

export function getCurrentUser() {
  return firebase.auth.currentUser;
}

export function getCurrentUserId() {
  return firebase.auth.currentUser?.uid;
}

export async function signUp(values) {
  await firebase.auth.createUserWithEmailAndPassword(
    values.email,
    values.password
  );
}

export async function signIn(values) {
  await firebase.auth.signInWithEmailAndPassword(values.email, values.password);
}

export default {
  getCurrentUser,
  getCurrentUserId,
  signUp,
  signIn,
};
