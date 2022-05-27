export default function CanvasScript({ url }) {
  return (
    <iframe
      loading="lazy"
      id="iframe"
      width={500}
      height={500}
      sandbox="allow-scripts allow-same-origin"
      src={url}
    />
  );
}
