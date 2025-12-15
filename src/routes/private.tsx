import { onAuthStateChanged } from "firebase/auth"
import { ReactNode, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { auth } from "../services/firebaseConnectio" // ajuste o caminho

interface PrivateProps {
  children: ReactNode
}

export function Private({ children }: PrivateProps) {
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true)
      } else {
        setSigned(false)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return <div className="text-white mt-10">Carregando...</div>
  }

  if (!signed) {
    return <Navigate to="/loguin" replace />
  }

  return children
}
