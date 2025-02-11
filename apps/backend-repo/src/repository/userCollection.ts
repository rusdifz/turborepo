// import { db } from "../config/firebaseConfig";
// import { User } from "../entities/user";

// export interface FirestoreUser extends User {
//   createdAt: Date;
//   updatedAt: Date;
// }

// export const getUserById = async (
//   id: string
// ): Promise<FirestoreUser | null> => {
//   const userRef = db.collection("users").doc(id);
//   const doc = await userRef.get();
//   return doc.exists ? (doc.data() as FirestoreUser) : null;
// };

// export const updateUser = async (
//   id: string,
//   data: Partial<User>
// ): Promise<void> => {
//   const userRef = db.collection("users").doc(id);
//   await userRef.set({ ...data, updatedAt: new Date() }, { merge: true });
// };
