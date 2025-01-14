export const tooltipMotionProps = {
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 5 },
  initial: { opacity: 0, scale: 0.98, y: 5 },
  transition: {
    duration: 0.1,
    scale: { duration: 0.1, type: "easeOut" },
    type: "linear",
  },
}
