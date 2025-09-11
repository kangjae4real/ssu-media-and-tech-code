import p5 from 'p5';

const main = (p5: p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(600, 600);
    canvas.parent('app');
  };
  p5.draw = () => {};
};

new p5(main);
