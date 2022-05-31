export default function CanvasScript({ url }) {
  return (
    <iframe
      loading="lazy"
      id="iframe"
      className="relative w-[320px] h-[320px] lg:w-[512px] lg:h-[512px] xl:w-[600px] xl:h-[600px] border-2 border-slate-100 mx-auto xl:mx-0"
      sandbox="allow-scripts allow-same-origin"
      src={url}
    />
  );
}
