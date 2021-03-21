import { state } from "./state";
import Base from "./Base";

const onMouseMove = e => {
  state.zoneX.move(e.pageX - state.offset.x, e.pageY - state.offset.y);
  state.zoneX.show();
};

const onMouseUp = e => {
  state.drop = { x: e.pageX, y: e.pageY };
  
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  
  state.zoneX.hide();
  
  let delta = { x: (state.drop.x - state.offset.x), y: (state.drop.y - state.offset.y) };
  state.offset = null;
  
  let zone = null;
  let list = state.zones.filter(it => it.contains(state.drop.x, state.drop.y));
  if (list.length) zone = list[0];
  
  if (zone) {
    delta.x -= zone.rect.left;
    delta.y -= zone.rect.top;
    delta.zone = zone.id;
    
    if (Math.abs(delta.x) < 4) delta.x = 0;
    if (Math.abs(delta.y) < 4) delta.y = 0;
    
    state.deck.selectedList()
    .forEach(it => it.move(delta));
  }
  else {
    state.deck.allList().forEach(it => it.deselect());
  }
  state.update();
}

export default class Zone extends Base {
  constructor(id) {
    super(id);
    this.context.fillStyle = this.rgba("#336699", 0.5);
    this.rect = this.canvas.getBoundingClientRect();
    this.canvas.onclick = this.onClickHandler.bind(this);
    this.canvas.onmousedown = this.onMouseDownHandler.bind(this);
  }
  

  rgba(hex, alpha = 1) {
    return `rgba(${[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)).join(",")},${alpha})`;
  }
  
  contains(x, y) {
    const r = this.rect;
    return (r.left < x && x < r.left + r.width && r.top < y && y < r.top + r.height);
  }
  
  get hasSelected() {
    return state.deck.zoneSelectedList(this.id).length > 0;
  }
  
  redraw() {
    super.redraw();
    state.deck.zoneList(this.id).forEach(it => this.draw(it));
  }
  
  draw(it) {
    super.draw(it);
    if (it && it.img) {
      if (it.isSelected) this.context.fillRect(it.x, it.y, it.img.width, it.img.height);
    }
  }
  
  onClickHandler(e) {
    state.offset = null;
    clearTimeout(this.timerId);
    
    state.deck.notZoneList(this.id).forEach(it => it.deselect());
    state.update();
    
    let list = state.deck.zoneContainsList(this.id, e.offsetX, e.offsetY);
    if (list.length) {
      list[0].toggle();
      this.redraw();
    }
  }
  
  onMouseDownHandler(e) {
    if (e.ctrlKey || ! this.hasSelected) { return; }
    if (! state.offset) state.offset = { x: e.offsetX, y: e.offsetY };
    
    this.timerId = setTimeout(() => {
      state.zoneX.redraw(this.id);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }, 200);
  }
  
}
