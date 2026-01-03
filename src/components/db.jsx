import { db } from "@/firebase"
import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export function useRealtimeCollection(colName, startTime) {
  const [data, setData] = useState([])

  useEffect(() => {
    if (!colName) {
      setData([])
      return
    }

    const q = startTime
  ? query(
      collection(db, colName),
      where("timestamp", ">=", startTime),
      orderBy("timestamp", "asc")
    )
  : query(
      collection(db, colName),
      orderBy("timestamp", "asc")
    )

    const unsub = onSnapshot(q, snapshot => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setData(items)
    })

    return () => unsub()
  }, [colName])

  return data
}
