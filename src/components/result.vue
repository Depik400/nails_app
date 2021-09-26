<template>
  <div class="result">
    <p>meme</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "result",
  data() {
    return {
      dateItem: {},
    };
  },
  props: ["aboutUser"],
  computed: {
    ...mapGetters(['calendar', "services", "servicesAd", "design"]),
  },
 mounted() {
    this.$nextTick(() => {
      this.dataItem = this.calendar.find(
        (item) => item.id == this.aboutUser.selectedDateId
      );
      console.log(this.dataItem);
    });
  },
};
</script>

<style lang="css">
</style>