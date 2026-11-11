import { getDb } from '../firebase';
import { doc, writeBatch, Timestamp } from 'firebase/firestore';
import { productsData } from '../data/productsData';
import { servicesData } from '../data/servicesData';
import { solutionsData } from '../data/solutionsData';

export const uploadDataIndex = async () => {
    const db = await getDb();
    const batch = writeBatch(db);

    // Deterministic document IDs make re-running the seed idempotent:
    // each data record always maps to the same Firestore document, so
    // clicking "Upload Initial Data" twice can never duplicate content.

    // Products
    productsData.forEach((product) => {
        const docRef = doc(db, 'products', String(product.id));
        batch.set(docRef, { ...product, createdAt: Timestamp.now() }, { merge: true });
    });

    // Services
    servicesData.forEach((service) => {
        const docRef = doc(db, 'services', String(service.id));
        batch.set(docRef, { ...service, createdAt: Timestamp.now() }, { merge: true });
    });

    // Solutions
    solutionsData.forEach((solution) => {
        const docRef = doc(db, 'solutions', String(solution.id));
        batch.set(docRef, { ...solution, createdAt: Timestamp.now() }, { merge: true });
    });

    try {
        await batch.commit();
        console.log("Data upload successful!");
    } catch (error) {
        console.error("Error uploading data: ", error);
        throw error;
    }
};
