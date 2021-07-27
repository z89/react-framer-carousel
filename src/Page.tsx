import { motion, MotionStyle, MotionValue, PanInfo } from "framer-motion";
import React, { FunctionComponent } from "react";

interface PageProps {
  index: number;
  renderPage: (props: { index: number }) => JSX.Element;
  x: MotionValue;
  onDragEnd(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void;
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

export const Page: FunctionComponent<PageProps> = ({ index, renderPage, x, onDragEnd }) => {
  const child = React.useMemo(() => renderPage({ index }), [index, renderPage]);

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
    >
      {child}
    </motion.div>
  );
};

Page.displayName = "page";
