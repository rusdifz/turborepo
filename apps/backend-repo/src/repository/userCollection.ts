import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";
import { ReqGetUserListDTO } from "../dto/user.dto";

const usersCollection = db.collection("users");

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const doc = await usersCollection.doc(userId).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as User) : null;
  } catch (error: any) {
    throw new Error(error.stack);
  }
}

export async function getUsers(
  props: ReqGetUserListDTO
): Promise<{ data: User[]; count: number }> {
  try {
    console.log("props", props);

    const query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
      usersCollection;

    const [data, count] = await Promise.all([
      query
        .offset((props.page - 1) * props.limit)
        .limit(props.limit)
        .get(),
      query.count().get(),
    ]);

    //map data res
    const respData = data.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    return {
      data: respData,
      count: count.data().count,
    };
  } catch (error: any) {
    throw new Error(error.stack);
  }
}

export async function updateUser(
  userId: string,
  data: Partial<User>
): Promise<Partial<User>> {
  try {
    const updateData = await usersCollection
      .doc(userId)
      .update({ ...data, update_at: new Date() });

    console.log("update data", updateData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
