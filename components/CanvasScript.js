export default function CanvasScript({ url }) {
  return (
    <iframe
      loading="lazy"
      id="iframe"
      className="relative w-80 h-80 xl:w-96 xl:h-96 border-2 border-slate-400 mx-auto xl:mx-0"
      sandbox="allow-scripts allow-same-origin"
      src={url}
    />
  );
}
