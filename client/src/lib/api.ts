import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, addDoc, setDoc, query, orderBy, Timestamp } from "firebase/firestore";
import type { InsertMessage, Project } from "./types";

// Map Firestore document to Project type
const mapDocToProject = (doc: any): Project => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to Date/string as needed by frontend
        createdAt: data.createdAt?.toDate() || new Date(),
    } as unknown as Project;
};

export async function getProjects(): Promise<Project[]> {
    try {
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(mapDocToProject);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
}

export async function getProject(id: string): Promise<Project | null> {
    try {
        // Assuming ID is the document ID string in Firebase
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return mapDocToProject(docSnap);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching project:", error);
        return null;
    }
}

export async function createMessage(message: InsertMessage) {
    try {
        const messagesRef = collection(db, "messages");
        const docRef = await addDoc(messagesRef, {
            ...message,
            createdAt: Timestamp.now(),
        });
        return { id: docRef.id, ...message };
    } catch (error) {
        console.error("Error creating message:", error);
        throw error;
    }
}
export async function getLandingPageConfig() {
    try {
        const docRef = doc(db, "content", "landing");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Found landing config:", docSnap.data());
            return docSnap.data() as { videoUrl?: string; showVideo?: boolean };
        } else {
            console.log("Landing config missing, creating default...");
            // Auto-heal: Create the document if it's missing
            const defaultData = {
                videoUrl: "https://firebasestorage.googleapis.com/v0/b/abhinavmahata-b2af7.firebasestorage.app/o/178065-858860117.mp4?alt=media&token=51bc8644-a3f8-4985-9f95-259561201f73",
                showVideo: true
            };
            await setDoc(docRef, defaultData);
            return defaultData;
        }
    } catch (error) {
        console.error("Error fetching/creating landing config:", error);
        return null;
    }
}
