import { state } from "./state";
import Base from "./Base";

export default class ZoneX extends Base {
  constructor(id) {
    super(id);
  }
  
  redraw(id) {
    super.redraw();
    state.deck.zoneSelectedList(id)
    .forEach(it => this.draw(it));
  }
  
  hide() { this.canvas.classList.add("off"); }
  
  show() { this.canvas.classList.remove("off"); }
  
  move(x, y) {
    this.canvas.style.left = x + 'px';
    this.canvas.style.top  = y + 'px';
  }
  
}
