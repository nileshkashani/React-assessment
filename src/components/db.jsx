import { db } from "@/firebase"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"

export function useRealtimeCollection(colName) {
  const [data, setData] = useState([])

  useEffect(() => {
    if (!colName) {
      setData([])
      return
    }

    const q = query(
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
