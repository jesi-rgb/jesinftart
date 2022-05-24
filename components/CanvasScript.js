// Will only import `react-p5` on client-side
import Script from "next/script";
import { useState, useEffect } from "react";

export default function CanvasScript({ url }) {
  const [content, setContent] = useState();
  // Get the token Ids

  useEffect(() => {
    const fetchUrl = async (url) => {
      const response = await fetch(`/api/fetchHtmlSketch?url=${url}`);
      const html_content = await response.json();
      setContent(html_content);
    };
    fetchUrl(url);
  });

  {
    /* <div dangerouslySetInnerHTML={{ __html: content }} /> */
  }
  console.log("canvasscript", content);
  return (
    <>
      <div>hola</div>
    </>
  );
}
