export default function CanvasScript({ url }) {
  return (
    <iframe
      loading="lazy"
      id="iframe"
      className="relative w-54 lg:w-96 lg:h-96"
      sandbox="allow-scripts allow-same-origin"
      src={url}
    />
  );
}
