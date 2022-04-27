<template>
  <div>
    <v-combobox
      :items="positionsDisplay"
      v-model="positionSelected"
    ></v-combobox>
    <br /><br /><br /><br />
    <v-combobox
      multiple
      small-chips
      :items="positionsDisplay"
      v-model="groupSelected"
    ></v-combobox>
    <input type="date" />
  </div>
</template>

<script>
//import BaseCombobox from "../components/base/BaseCombobox.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  components: {
    //BaseCombobox
  },
  name: "view-cash",
  data() {
    return {
      positionSelected: "",
      groupSelected: "",
      employee: {},
    };
  },
  computed: {
    ...mapGetters(["positions", "positionsDisplay"]),
  },
  watch: {
    positionSelected(value) {
      console.log(this.positions);
      let positionId = this.positions.find((position) => {
        return value == position.PositionName;
      }).PositionId;
      this.employee = { ...this.employee, positionId: positionId };
    },
  },
  filters: {},
  created() {},
  mounted() {
    this.getPositions();
  },
  methods: {
    ...mapActions(["getPositions"]),
    ...mapMutations(["SET_POSITION_SELECTED"]),
    setDataCbb(listGroup) {
      this.listGroup = listGroup;
    },
  },
};
</script>

<style></style>
