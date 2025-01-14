"use client"
import { WandSparkles } from "lucide-react"
import { useRouter } from "next/navigation"

import style from "./topbar.module.scss"


export function Topbar() {
  const router = useRouter()

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.logo} onClick={() => router.push("/")}>
          <WandSparkles strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}