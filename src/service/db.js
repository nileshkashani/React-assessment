import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase'

export async function add(imageId, emoji, userId, url) {
    const q = query(
        collection(db, "reactions"),
        where("userId", "==", userId),
        where("imageId", "==", imageId)
    )
    const existing = await getDocs(q)
    console.log("existing: ", existing)
    
    if (existing.docs.length === 0) {
        const resp = await addDoc(collection(db, "reactions"), {
            emoji,
            userId,
            imageId,
            url,
            timestamp: serverTimestamp()
        })
    }
    else {
        update(imageId, emoji, userId, url);
    }
}
export async function update(imageId, emoji, userId, url) {
    const q = query(
        collection(db, "reactions"),
        where("userId", "==", userId),
        where("imageId", "==", imageId)
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

    await updateDoc(docRef, {
        emoji,
        userId,
        imageId,
        url,
        timestamp: serverTimestamp()
    })

}

export async function fetchAllReactions(imageId) {
    console.log("fetch all reactions executed")
    const q = query(
        collection(db, "reactions"),
        where("imageId", "==", imageId)
    )   
    const resp = await getDocs(q)
    return resp.docs;
}