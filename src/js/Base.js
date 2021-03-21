export default class Base {
  constructor(id) {
    this.id = id;
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
  }
  
  redraw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  draw(it) {
    if (it && it.img) {
      this.context.drawImage(it.img, it.x, it.y, it.img.width, it.img.height);
    }
  }
  
}
