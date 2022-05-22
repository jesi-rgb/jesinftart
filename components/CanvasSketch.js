// Will only import `react-p5` on client-side
import dynamic from "next/dynamic";

// import { ReactP5Wrapper } from "react-p5-wrapper";

const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

// function sketch(p5) {
//   p5.setup = () => {
//     //   frameRate(4);
//     w = p5.min(p5.windowWidth, p5.windowHeight);
//     p5.createCanvas(w, w).parent(parentRef);
//     spc = 3;
//     spc *= 10;
//     off = 51 + spc;
//     p5.noLoop();
//     looping = false;
//     saving = false;
//     angle = 0;
//   };

//   p5.draw = () => {
//     p5.background(250, 245, 240);

//     gridSineBased(p5);

//     if (saving) p5.save("frame" + p5.frameCount + ".png");
//   };

//   let gridSineBased = (p5) => {
//     i = 0;
//     t = p5.frameCount / 20;
//     for (x = off; x < w - off; x += spc) {
//       for (y = off; y < w - off; y += spc) {
//         rate = x / 2 + y / 2 + t;

//         if (i % 2 == 0) {
//           val = p5.sin(rate);
//         } else {
//           val = p5.cos(rate);
//         }

//         str_w = p5.map(val, -1, 1, spc / 2, spc);
//         str_alpha = p5.map(val, -1, 1, 40, 255);
//         p5.strokeWeight(str_w);
//         p5.stroke(20, 20, 45, str_alpha);

//         p5.point(x, y);
//         i++;
//       }
//     }
//   };

//   let mousePressed = () => {
//     if (p5.mouseButton === p5.RIGHT) {
//       p5.save(`frame_${new Date().getMilliseconds()}`);
//     }

//     if (p5.mouseButton === p5.LEFT) {
//       p5.print(looping);
//       if (looping) {
//         p5.noLoop();
//         looping = false;
//       } else {
//         p5.loop();
//         looping = true;
//       }
//     }
//   };

//   let keyPressed = () => {
//     console.log(keyCode);
//     if (keyCode == 83) {
//       p5.frameRate(15);
//       // frameCount = 0;
//       saving = !saving;
//       looping = !looping;

//       if (looping) p5.loop();
//     }
//   };
// }

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
    p5.noLoop();
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

  let mousePressed = (event) => {
    console.log("Clicked on the canvas. Event:", event);
  };

  let draw = (p5) => {
    p5.background(250, 245, 240);

    gridSineBased(p5);

    if (saving) p5.save("frame" + p5.frameCount + ".png");
  };

  return (
    <div className="mx-auto">
      <Sketch setup={setup} draw={draw} className="ml-56" />
    </div>
  );
}
