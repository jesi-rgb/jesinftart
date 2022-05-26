// Will only import `react-p5` on client-side
import Iframe from "react-iframe";

export default function CanvasScript({ url }) {
  return (
    <iframe
      loading="lazy"
      width={500}
      height={500}
      sandbox="allow-scripts allow-same-origin"
      src={url}
      seamless
    />
  );
}
