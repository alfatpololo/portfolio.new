import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';
import { Project, AboutData, HeroData, ContactData, Experience, ContactLink } from '@/types';

// ============ PROJECTS ============
export const getProjects = async (): Promise<Project[]> => {
  if (!db) {
    console.error('Firebase not initialized');
    return [];
  }
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProject = async (id: string): Promise<Project | null> => {
  if (!db) {
    console.error('Firebase not initialized');
    return null;
  }
  try {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      } as Project;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(collection(db, 'projects'));
    await setDoc(docRef, {
      ...project,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, project: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<void> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, {
      ...project,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(db, 'projects', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// ============ ABOUT ============
export const getAbout = async (): Promise<AboutData | null> => {
  if (!db) {
    console.error('Firebase not initialized');
    return null;
  }
  try {
    const docRef = doc(db, 'about', 'data');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        experiences: (data.experiences || []).sort((a: Experience, b: Experience) => a.order - b.order),
        updatedAt: data.updatedAt?.toDate(),
      } as AboutData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching about:', error);
    return null;
  }
};

export const updateAbout = async (aboutData: Omit<AboutData, 'id' | 'updatedAt'>): Promise<void> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(db, 'about', 'data');
    await setDoc(docRef, {
      ...aboutData,
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating about:', error);
    throw error;
  }
};

// ============ HERO ============
export const getHero = async (): Promise<HeroData | null> => {
  if (!db) {
    console.error('Firebase not initialized');
    return null;
  }
  try {
    const docRef = doc(db, 'hero', 'data');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      } as HeroData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching hero:', error);
    return null;
  }
};

export const updateHero = async (heroData: Omit<HeroData, 'id' | 'updatedAt'>): Promise<void> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(db, 'hero', 'data');
    await setDoc(docRef, {
      ...heroData,
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating hero:', error);
    throw error;
  }
};

// ============ CONTACT ============
export const getContact = async (): Promise<ContactData | null> => {
  if (!db) {
    console.error('Firebase not initialized');
    return null;
  }
  try {
    const docRef = doc(db, 'contact', 'data');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        links: (data.links || []).sort((a: ContactLink, b: ContactLink) => a.order - b.order),
        updatedAt: data.updatedAt?.toDate(),
      } as ContactData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
};

export const updateContact = async (contactData: Omit<ContactData, 'id' | 'updatedAt'>): Promise<void> => {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const docRef = doc(db, 'contact', 'data');
    await setDoc(docRef, {
      ...contactData,
      updatedAt: Timestamp.now(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

// ============ STORAGE (File Upload) ============
export const uploadFile = async (file: File, path: string): Promise<string> => {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (path: string): Promise<void> => {
  if (!storage) {
    throw new Error('Firebase Storage not initialized');
  }
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

