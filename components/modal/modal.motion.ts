export const bgFilterMotionProps = {
  animate: "visible",
  exit: "hidden",
  initial: "hidden",
  transition: {
    duration: .2,
  },
  variants: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },
}

export const modalMotionProps = {
  transition: {
    opacity: {
      duration: .2,
      type: "linear",
    },
    scale: {
      damping: 20,
      stiffness: 350,
      type: "spring",
    },
  },
  variants: {
    hidden: {
      opacity: 0,
      scale: .90,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },
}
