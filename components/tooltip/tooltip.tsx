import { arrow, FloatingArrow, FloatingPortal, offset, shift, useFloating } from "@floating-ui/react"
import { tooltipMotionProps } from "@/components/tooltip/tooltip.motion"
import { AnimatePresence, motion } from "motion/react"
import { ReactNode, useRef, useState } from "react"
import { clsx } from "clsx"

import style from "./tooltip.module.scss"

type TooltipTriggerProps = {
  children: ReactNode
  className?: string
  content: ReactNode | string
}

function TooltipTrigger(props: TooltipTriggerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const arrowRef = useRef(null)

  const { context, floatingStyles, refs } = useFloating({
    middleware: [offset(12), shift(), arrow({ element: arrowRef })],
    onOpenChange: setIsHovered,
    open: isHovered,
    placement: "top",
  })

  return (
    <>
      <div
        ref={refs.setReference}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={clsx("h-fit w-fit", props.className)}
      >
        {props.children}
      </div>
      <AnimatePresence>
        {isHovered && (
          <FloatingPortal>
            <div className="absolute" ref={refs.setFloating} style={floatingStyles}>
              <Tooltip>
                <FloatingArrow
                  height={6}
                  ref={arrowRef}
                  strokeWidth={1}
                  context={context}
                  fill="var(--card)"
                  stroke="var(--card-outline)"
                />
                {props.content}
              </Tooltip>
            </div>
          </FloatingPortal>
        )}
      </AnimatePresence>
    </>
  )
}

type TooltipProps = {
  children: ReactNode
}

export function Tooltip(props: TooltipProps) {
  return (
    <motion.div {...tooltipMotionProps} className={style.tooltipDiv}>
      {props.children}
    </motion.div>
  )
}

Tooltip.Trigger = TooltipTrigger
