import { bgFilterMotionProps, modalMotionProps } from "@/components/modal/modal.motion"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { Dispatch, ReactNode, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { FloatingPortal } from "@floating-ui/react"
import { clsx } from "clsx"

import style from "./modal.module.scss"

type ModalProps = {
  children: ReactNode | ReactNode[]
  className?: string
  showFn: Dispatch<boolean>
}

export function Modal(props: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(modalRef, () => props.showFn(false))

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      props.showFn(false)
    }
  })

  return (
    <FloatingPortal>
      <motion.div {...bgFilterMotionProps} className={style.bgFilter}>
        <motion.div {...modalMotionProps} ref={modalRef} className={clsx(style.modalDiv, props.className)}>
          {props.children}
        </motion.div>
      </motion.div>
    </FloatingPortal>
  )
}

function ModalTrigger(props: { children: ReactNode; content: ReactNode | ReactNode[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="w-fit h-fit"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        {props.children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <Modal showFn={setIsOpen}>
            {props.content}
            <ModalButton onClick={() => setIsOpen(false)}>Okay</ModalButton>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

function ModalContent(props: { children: ReactNode }) {
  return <div className={style.modalContentDiv}>{props.children}</div>
}

function ModalHeader(props: { children: ReactNode; className?: string }) {
  return (
    <div className={style.modalHeaderDiv}>
      <h3 className={clsx(style.modalHeader, props.className)}>{props.children}</h3>
    </div>
  )
}

function ModalButton(props: { children: ReactNode; onClick: () => void }) {
  return (
    <button onClick={props.onClick} className={style.modalBtn}>
      {props.children}
    </button>
  )
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent
Modal.Header = ModalHeader
Modal.Button = ModalButton
