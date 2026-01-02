import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc, query, where, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase'

export async function add(imageId, emoji, userId, url, colName) {
    if(colName === 'reactions'){
        const q = query(
            collection(db, colName),
            where("userId", "==", userId),
            where("imageId", "==", imageId)
        )
        const existing = await getDocs(q)
        if (existing.docs.length === 0) {
            const resp = await addDoc(collection(db, colName), {
                emoji,
                userId,
                imageId,
                url,
                timestamp: serverTimestamp()
            })
        }
        else {
            update(imageId, emoji, userId, url, colName);
        }
    }
    else{
        const resp = await addDoc(collection(db, colName), {
                emoji,
                userId,
                imageId,
                url,
                timestamp: serverTimestamp()
            })
    }
    
}
export async function update(imageId, emoji, userId, url, colName) {
    const q = query(
        collection(db, colName),
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

export async function fetchAllReactions(imageId, colName) {
    const q = query(
        collection(db, colName),
        where("imageId", "==", imageId)
    )   
    const resp = await getDocs(q)
    return resp.docs;
}