export const state = {
  zones: [],
  update() {
      this.zones.forEach(it => it.redraw());
  }
};