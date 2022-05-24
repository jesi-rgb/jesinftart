// Will only import `react-p5` on client-side
import dynamic from "next/dynamic";

// import { ReactP5Wrapper } from "react-p5-wrapper";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function CanvasSketch() {
  let looping = false;
  let saving = false;
  let angle = 0;
  let w = 500;
  var spc = 2;
  spc *= 10;
  let off = 51 + spc;

  let cnv;

  let setup = (p5, parentRef) => {
    //   frameRate(4);
    cnv = p5.createCanvas(w, w).parent(parentRef);
    // p5.noLoop();
    cnv.mousePressed((event) => {
      looping = !looping;
      if (looping) p5.loop();
      else p5.noLoop();
    });
  };

  let gridSineBased = (p5) => {
    let i = 0;
    let t = p5.frameCount / 20;
    for (let x = off; x < w - off; x += spc) {
      for (let y = off; y < w - off; y += spc) {
        let rate = x / 2 + y / 2 + t;
        let val;

        if (i % 2 == 0) {
          val = p5.sin(rate);
        } else {
          val = p5.cos(rate);
        }

        let str_w = p5.map(val, -1, 1, spc / 2, spc);
        let str_alpha = p5.map(val, -1, 1, 40, 255);
        p5.strokeWeight(str_w);
        p5.stroke(20, 20, 45, str_alpha);

        p5.point(x, y);
        i++;
      }
    }
  };

  let draw = (p5) => {
    p5.background(250, 245, 240);

    gridSineBased(p5);

    if (saving) p5.save("frame" + p5.frameCount + ".png");
  };

  return <Sketch setup={setup} draw={draw} />;
}
