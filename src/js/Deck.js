import { state } from "./state";
import Card from "./Card";

export default class Deck {
  constructor(n) {
    this.items = [...Array(n)].map( (_, i) => new Card(i) );
    this.count = this.items.length;
    console.log(this.items);
  }
  
  addCard() {
    this.items.push( new Card(this.count ++) );
  }
  
  addGroup(n) {
    [...Array(n)].forEach(it => this.addCard());
  }
  
  deselect() {
    this.items.forEach(it => it.deselect());
    state.update();
  }
  
  removeSelected() {
    this.selectedList().forEach(it => state.print("Удалена карта id = " + it.alt));
    this.items = this.notSelectedList();
    state.update();
  }
  
  allList() {
    return this.items;
  }
  
  selectedList() {
    return this.items.filter(it => it.isSelected);
  }
  
  notSelectedList() {
    return this.items.filter(it => ! it.isSelected);
  }
  
  zoneList(zone) {
    return this.items.filter(it => it.zone === zone);
  }
  
  zoneSelectedList(zone) {
    return this.items.filter(it => it.isSelected && it.zone === zone);
  }
  
  notZoneList(zone) {
    return this.items.filter(it => it.zone !== zone);
  }
  
  notZoneSelectedList(zone) {
    return this.items.filter(it => it.isSelected && it.zone !== zone);
  }
  
  zoneContainsList(zone, x, y) {
    return this.items.filter(it => it.zone === zone && this.contains(it, x, y));
  }
  
  contains(it, x, y) {
    return (it.x < x && x < it.x + it.img.width && it.y < y && y < it.y + it.img.height);
  }
  
}
