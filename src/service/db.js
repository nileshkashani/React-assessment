import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where } from "firebase/firestore";
import { db } from '../firebase'

export async function add(imageId, emoji, userId) {
    const q = query(
        collection(db, "reactions"),
        where("userId", "==", userId),
        where("imageid", "==", imageId)
    )
    const existing = await getDocs(q)

    console.log("add executed")
    if (existing.docs.length === 0) {
        const resp = await addDoc(collection(db, "reactions"), {
            imageid: imageId,
            emoji: emoji,
            userId: userId
        })
    }
    else {
        console.log("update executed")
        update(imageId, emoji, userId);
    }
}
export async function update(imageId, emoji, userId) {
     const q = query(
        collection(db, "reactions"),
        where("userId", "==", userId),
        where("imageid", "==", imageId)
    )
    const resp = await getDocs(q);
    console.log(resp)
    const doc = resp.docs[0]
    const docRef = doc.ref
    const docDataEmoji = doc.data().emoji

    if (docDataEmoji === emoji) {
        await deleteDoc(docRef);
        return;
    }

    const respUpdate = await updateDoc(docRef, { emoji });
}

export async function fetchAllReactions(imageId){
    console.log("fetch all reactions executed")
    const q = query(
        collection(db, "reactions"),
        where("imageid", "==", imageId )
    )
    const resp = await getDocs(q)
    console.log("all reactions: ", resp);
    return resp.docs;
}