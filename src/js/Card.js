import { state } from "./state";

export default class Card {
  constructor(i) {
    this.alt = `item_${i}`;
    this.src = `https://www.random.org/playing-cards/${i + 1}.png`;
    this.isSelected = false;
    this.x = 0;
    this.y = 0;
    // this.zone = state.zones[(i%2)? 0: 1].id;
    this.zone = state.zones[0].id;
    
    this.load(i);
  }
  
  load(i) {
    let img = this.img = new Image();
    img.onload = () => {
      this.x = (i%4) * img.width + i * 8;
      this.y = (i%4) * img.height;
      state.print("Добавлена карта id = " + this.alt);
      state.update();
    };
    img.src = this.src;
  }
  
  deselect() { this.isSelected = false; }
  toggle() { this.isSelected = ! this.isSelected; }
  
  move(delta) {
    this.isSelected = false;
    this.zone = delta.zone;
    this.x += delta.x;
    this.y += delta.y;
  }
  
}
