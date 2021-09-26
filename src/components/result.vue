<template>
  <div class="result">
    <p style="font-size: 25px; font-weight: bold">Давайте уточним:</p>
    <p style="font-size: 20px">
      Вы записались на {{ dateItem.month }}, {{ dateItem.day }} в
      {{ dateItem.hour }}
    </p>
    <p style="font-size: 20px; font-weight: bold">Выбранные вами услуги:</p>
    <ul class="list_of_all">
      <li style="margin-bottom: 15px">
        <span style="font-weight: bold; font-size: 18px">Услуга</span
        ><span style="font-weight: bold; font-size: 18px">Цена</span>
      </li>
      <li>
        <span>{{ selectedService.description }}</span
        ><span>{{ selectedService.price }} р.</span>
      </li>
    </ul>
    <ul>
      <li v-for="adService in selectedAdSerivce" :key="adService.key">
        <span>{{ adService.description }}</span
        ><span>{{ adService.price }} р.</span>
      </li>
    </ul>
    <ul>
      <li v-for="design in selectedDesign" :key="design.key">
        <span>{{ design.description }}</span
        ><span>{{ design.price }} р.</span>
      </li>
    </ul>
    <ul class="list_of_all" style="margin-top: 15px">
      <li>
        <span style="font-weight: bold; font-size: 18px">Итог: </span>
        <span style="font-weight: bold; font-size: 18px"
          >{{ totalSum }} р.</span
        >
      </li>
      <li style="border-bottom: none">Обращаем ваше внимание на то, что финальная сумма считается с учетом
      работы на все ногти, то есть фактическая сумма может быть меньше</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "result",
  data() {
    return {
      dateItem: {},
      selectedService: "",
      selectedAdSerivce: [],
      selectedDesign: [],
      totalSum: 0,
    };
  },
  props: ["aboutUser"],
  computed: {
    ...mapGetters(["calendar", "services", "servicesAd", "design"]),
  },
  mounted() {
    this.$nextTick(() => {
      this.dateItem = this.calendar.find(
        (item) => item.id == this.aboutUser.selectedDateId
      );
      console.log(
        this.calendar.find((item) => item.id == this.aboutUser.selectedDateId)
      );
      this.selectedService = this.services.find(
        (item) => item.id == this.aboutUser.service
      );
      this.aboutUser.serviceAd.forEach((item) => {
        let selectedObject = this.servicesAd.find((serAd) => serAd.id == item);
        this.selectedAdSerivce.push(selectedObject);
      });
      this.aboutUser.design.forEach((item) => {
        let selectedObject = this.design.find((serAd) => serAd.id == item);
        this.selectedDesign.push(selectedObject);
        this.total();
      });
    });
  },

  methods: {
    total: function () {
      let totalPrice = this.selectedService.price;
      this.selectedAdSerivce.forEach((item) => (totalPrice += item.price));
      this.selectedDesign.forEach((item) => (totalPrice += item.price));
      this.totalSum = totalPrice;
    },
  },
};
</script>

<style lang="css">
</style>