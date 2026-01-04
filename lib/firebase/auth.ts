import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './config';

export const login = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error signing in:', error);
    // Provide more user-friendly error messages
    let errorMessage = 'Failed to login';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Email atau password salah. Pastikan user sudah dibuat di Firebase Console.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Format email tidak valid.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Terlalu banyak percobaan login. Coba lagi nanti.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const register = async (email: string, password: string) => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Error registering:', error);
    let errorMessage = 'Failed to register';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email sudah terdaftar. Gunakan email lain atau login.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password terlalu lemah. Minimal 6 karakter.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Format email tidak valid.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const logout = async () => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  if (!auth) {
    return Promise.resolve(null);
  }
  const authInstance = auth; // TypeScript type narrowing
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

