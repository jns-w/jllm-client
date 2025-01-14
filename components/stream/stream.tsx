"use client"
import { streamAtom } from "@/jotai/app-atoms"
import { useAtom } from "jotai"
import { AnimatePresence, motion } from "motion/react"

import style from "./stream.module.scss"

export function Stream() {
  const [stream] = useAtom(streamAtom)
  return (
    <div className={style.streamWrapDiv}>
      <AnimatePresence>
        {stream && <motion.div className={style.streamDiv}>
          {stream}
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}