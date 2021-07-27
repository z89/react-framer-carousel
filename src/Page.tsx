import { motion, MotionStyle, MotionValue, PanInfo } from "framer-motion";
import React, { FunctionComponent } from "react";

interface PageProps {
  x: MotionValue;
  onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
  index: number;
  active: boolean;
  renderPage: (props: { index: number }) => JSX.Element;
}

const pageStyle: MotionStyle = {
  position: "absolute",
  width: "70vw",
  height: "60vh",
  backgroundColor: "white",
  boxShadow: "0px 12px 15px #cccccc",
  border: "4px solid white",
  borderRadius: "50px",
  overflow: "hidden",
};

export const Page: FunctionComponent<PageProps> = ({ x, onDragEnd, index, active, renderPage }) => {
  const child = React.useMemo(() => renderPage({ index }), [index, renderPage]);
  const variants = {
    center: (active: number) => {
      return {
        scale: active ? 1.05 : 0.95,
        opacity: active ? 1 : 0.5,
      };
    },
  };
  return (
    <motion.div
      style={{
        ...pageStyle,
        x,
        left: `${index * 100}%`,
        right: `${index * 100}%`,
      }}
      draggable
      drag="x"
      dragElastic={0.2}
      onDragEnd={onDragEnd}
      variants={variants}
      custom={active}
      animate={"center"}
      transition={{
        type: "spring",
        duration: 0.4,
      }}
    >
      {child}
    </motion.div>
  );
};

Page.displayName = "page";
