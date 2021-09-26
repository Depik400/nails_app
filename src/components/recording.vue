<template>
  <div class="recording">
    <p>Выберите подходящий для себя день</p>
    <ul class="recording_ul">
      <li
        class="elements"
        :style="[item.isSelected ? { background: '#f59182' } : '']"
        v-for="(item, index) in calendar"
        :key="item.id"
        @click="selectDate(index)"
      >
        <p>{{ item.month }},{{ item.day }} - {{ item.hour }}</p>
      </li>
    </ul>
    <div class="register_window"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "recording",
  props: ["dateIndex"],
  data() {
    return {
      login: "",
      password: "",
      email: "email",
      isSingUp: false,
      selectedDateIndex: -1,
    };
  },

  computed:{
    ...mapGetters(['calendar'])
  },

  mounted() {
    this.$nextTick(() => {
      if (this.dateIndex != -1) {
        let index = this.calendar.findIndex(
          (item) => item.id == this.dateIndex
        );
        if (index == -1) return;
        this.calendar[index].isSelected = true;
        this.selectedDateIndex = index;
        return;
      }
    });
  },

  methods: {
    selectDate: function (index) {
      if (
        this.selectedDateIndex == index &&
        this.calendar[this.selectedDateIndex].isSelected
      ) {
        this.selectedDateIndex = -1;

        this.calendar[index].isSelected = !this.calendar[index].isSelected;
        this.$emit("selectDateEvent", -1);
        return;
      }
      this.calendar[index].isSelected = !this.calendar[index].isSelected;
      if (this.selectedDateIndex != -1)
        this.calendar[this.selectedDateIndex].isSelected = false;
      this.selectedDateIndex = index;
      this.$emit("selectDateEvent", this.calendar[this.selectedDateIndex].id);
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  max-width: 700px;
  width: 100%;
  max-height: 400px;
}

.recording_ul {
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  overflow-y: scroll;
  flex-basis: 10%;
}

.recording_ul::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
.recording_ul::-webkit-scrollbar-thumb {
  background: #f59282;
}

@media screen and (max-width: 400px) {
  ul {
    flex-wrap: nowrap;
  }
}

li.elements {
  flex-basis: 40%;
  padding: 10px;
  box-sizing: border-box;
  width: 50%;
  margin: 5px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 15px;
  box-shadow: 0px 1px 5px 1px rgba(128, 128, 128, 0.3);
}
</style>