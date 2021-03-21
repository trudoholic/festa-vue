
<template>
  <div>
    <canvas id="cvs1"  class="zone" width="600" height="400" style="float: left">[No canvas support]</canvas>
    <canvas id="cvs2"  class="zone" width="600" height="400" style="float: left; margin-left: 100px">[No canvas support]</canvas>
    <canvas id="zxc" class="off" width="600" height="400" style="position:absolute; left: 100px; top: 100px">[x]</canvas>
    <div id="buttons">
      <button id="btn_0">Сброс</button>
      <button id="btn_add">Добавить</button>
      <button id="btn_add_3">Добавить [3]</button>
      <button id="btn_rem">Удалить</button>
    </div>
    <textarea id="log"></textarea>
  </div>
</template>

<script>
  import Vue from "vue";
  import { mapGetters, mapActions } from "vuex";
  
  import { state } from "./js/state";
  
  import Card from "./js/Card";
  import Deck from "./js/Deck";
  import Zone from "./js/Zone";
  import ZoneX from "./js/ZoneX";

  export default Vue.extend({
    data: function() {
      return {}
    },
    /*
    watch: {
      getMode: function (newMode) {
        this.drawImage();
      }
    },
    */
    computed: {
      /*
      mode: {
        get() { return this.getMode; },
        set(value) { this.setMode(value); },
      },
      */
      ...mapGetters(["getMode"])
    },
    methods: {
      init() {
      //
        state.zones[0] = new Zone("cvs1");
        state.zones[1] = new Zone("cvs2");
        state.zoneX = new ZoneX("zxc");
        state.deck = new Deck(4);
        state.update();
    
        document.getElementById("btn_0").onclick = () => {
          state.deck.deselect();
        };
        document.getElementById("btn_add").onclick = () => {
          state.deck.addCard();
        };
        document.getElementById("btn_add_3").onclick = () => {
          state.deck.addGroup(3);
        };
        document.getElementById("btn_rem").onclick = () => {
          state.deck.removeSelected();
        };
        
        let textlog = document.getElementById("log");
        state.print = (t) => { textlog.append("> " + t + "\r\n") };
      //
      },
      ...mapActions(["setMode"])
    },
    mounted: function(){
      console.log("mounted()");
      this.init();
    },
  });
</script>


