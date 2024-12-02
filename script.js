window.onload = function () {
  const canvas = document.querySelector("#canvas");
  const input_a = document.querySelector("#input_a");
  const input_b = document.querySelector("#input_b");
  const input_A = document.querySelector("#input_A");
  const input_B = document.querySelector("#input_B");
  const input_p = document.querySelector("#input_p");
  const input_T = document.querySelector("#input_T");

  const ctx = canvas.getContext("2d");

  var a, b, A, B, p, T;

  let t = 0;
  let last;

  const dotsPerPi = 400;

  function getInputs() {
    a = +input_a.value;
    b = +input_b.value;
    A = +input_A.value;
    B = +input_B.value;
    p = +input_p.value;
    T = +input_T.value;

    ctx.fillStyle = "#2e3440";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    t = 0;
    last = undefined;
    console.log(a, b, A, B, p, T);
  }
  const inputs = document.querySelectorAll("input");
  inputs.forEach((element) => {
    element.onchange = getInputs;
  });

  pointsDrawn = 0;
  function drawPoint(x, y) {
    pointsDrawn++;
    const newx = ((x + 1) / 3 + 1 / 6) * canvas.width;
    const newy = ((-y + 1) / 3 + 1 / 6) * canvas.height;
    ctx.fillStyle = "white";
    ctx.fillRect(newx + 0.5, newy + 0.5, 1, 1);
    if (pointsDrawn % 400 == 0) {
      ctx.fillStyle = "#2e344038";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function loop(timestamp) {
    if (last === undefined) {
      last = timestamp;
      requestAnimationFrame(loop);
      return;
    }
    const elapsed = timestamp - last;

    const timeToDraw = (elapsed / T) * 2 * Math.PI;
    const dotsToDraw = timeToDraw * dotsPerPi;

    for (let i = 1; i <= dotsToDraw; i++) {
      const newT = t + timeToDraw * (i / dotsToDraw);

      const x = A * Math.sin(a * newT + p * Math.PI);
      const y = B * Math.sin(b * newT);

      drawPoint(x, y);
    }

    t += timeToDraw;

    last = timestamp;
    requestAnimationFrame(loop);
  }
  getInputs();

  requestAnimationFrame(loop);
};
