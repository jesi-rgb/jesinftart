// Will only import `react-p5` on client-side
import { HtmlContext } from "next/dist/shared/lib/html-context";
import Script from "next/script";
import { useState, useEffect } from "react";

export default function CanvasScript({ url }) {
  const [content, setContent] = useState();
  // Get the token Ids

  useEffect(() => {
    const fetchUrl = async (url) => {
      const response = await fetch(url);
      console.log(response);

      setContent(response);
    };

    fetchUrl(url);
  }, [url]);

  {
    /* <div dangerouslySetInnerHTML={{ __html: content }} /> */
  }
  console.log("canvasscript", content);
  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `
      <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

        <link rel="stylesheet" type="text/css" href="style.css" />
        <meta charset="utf-8" />
      </head>
      <body>
        <script src="${url}"></script>
      </body>
    </html>

      `,
        }}
      />
    </>
  );
}
