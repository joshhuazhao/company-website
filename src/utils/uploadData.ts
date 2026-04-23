import { db } from '../firebase';
import { collection, doc, writeBatch, Timestamp } from 'firebase/firestore';
import { productsData } from '../data/productsData';
import { servicesData } from '../data/servicesData';
import { solutionsData } from '../data/solutionsData';

export const uploadDataIndex = async () => {
    const batch = writeBatch(db);

    // Products
    productsData.forEach((product) => {
        const docRef = doc(collection(db, 'products'));
        batch.set(docRef, { ...product, createdAt: Timestamp.now() });
    });

    // Services
    servicesData.forEach((service) => {
        const docRef = doc(collection(db, 'services'));
        batch.set(docRef, { ...service, createdAt: Timestamp.now() });
    });

    // Solutions
    solutionsData.forEach((solution) => {
        const docRef = doc(collection(db, 'solutions'));
        batch.set(docRef, { ...solution, createdAt: Timestamp.now() });
    });

    try {
        await batch.commit();
        console.log("Data upload successful!");
    } catch (error) {
        console.error("Error uploading data: ", error);
        throw error;
    }
};
