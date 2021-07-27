import * as React from "react";
import { animate, AnimationOptions, motion, MotionStyle, PanInfo, useMotionValue } from "framer-motion";
import { Page } from "./Page";

const range = [-2, -1, 0, 1, 2];

interface VirtualizedPageProps {
  children: (props: { index: number }) => JSX.Element;
}

const containerStyle: MotionStyle = {
  position: "relative",
  width: "80%",
  left: "50%",
  translateX: "-45%",

  backgroundColor: "red",
  marginTop: "1rem",
};

const transition: AnimationOptions<any> = {
  type: "spring",
  bounce: 0,
};

export const VirtualizedPage: React.FunctionComponent<VirtualizedPageProps> = ({ children }) => {
  const x = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(0);

  const calculateNewX = () => -index * (containerRef.current?.clientWidth || 0);
  const clientWidth = containerRef.current?.clientWidth || 0;

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    const { offset, velocity } = dragProps;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition);
      return;
    }

    if (offset.x > clientWidth / 4) {
      setIndex(index - 1);
    } else if (offset.x < -clientWidth / 4) {
      setIndex(index + 1);
    } else {
      animate(x, calculateNewX(), transition);
    }
  };

  React.useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    console.log("--");
    return controls.stop;
  }, [index]);

  return (
    <motion.div ref={containerRef} style={containerStyle}>
      {range.map((rangeValue) => {
        console.log(rangeValue + index);

        return <Page key={rangeValue + index} x={x} onDragEnd={handleEndDrag} index={rangeValue + index} active={index + rangeValue == index ? true : false} renderPage={children} />;
      })}
    </motion.div>
  );
};

VirtualizedPage.displayName = "VirtualizedPage";
