import "./styles.css";
import { VirtualizedPage } from "./VirtualizedPage";

const images = ["https://cdn.chec.io/merchants/28103/assets/dNerYBJ92nLShy8J|pexels-ben-7864977.jpg", "https://cdn.chec.io/merchants/28103/assets/ke6yJaTpVE206rSG|pexels-ben-7864982.jpg", "https://cdn.chec.io/merchants/28103/assets/QLfW4yFwLUlNRl5n|pexels-ben-7865076.jpg"];
export default function App() {
  return (
    <div
      className="app"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100vw", height: "60vh" }}>
        <VirtualizedPage>
          {({ index }) => {
            const modulo = index % images.length;
            const imageIndex = modulo < 0 ? images.length + modulo : modulo;
            return <img draggable={false} alt="Mountain" style={{ width: "100%" }} src={images[imageIndex]} />;
          }}
        </VirtualizedPage>
      </div>
    </div>
  );
}