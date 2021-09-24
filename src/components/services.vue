<template>
  <div class="services">
    <ul>
      <li
        v-for="(item, index) in services"
        :key="item.id"
        @click="selectService(index)"
      >
        <p>{{ item.description }} - цена: {{ item.price }}р.</p>
        <img
          src="../assets/img/green_success.png"
          :style="[
            item.isSelected
              ? {
                  display: 'block',
                }
              : { display: 'none' },
          ]"
          alt=""
          srcset=""
        />
      </li>
    </ul>
    <ul>
      <li v-for="item in servicesAd" :key="item.id">
        <p>{{ item.description }} - цена: {{ item.price }}р.</p>
        <img src="../assets/img/green_success.png" alt="" srcset="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "services",
  data() {
    return {
      selectedService: -1,
      selectedAdService: -1,
      services: [
        {
          id: 1,
          description: "Маникюр",
          alternativeDescription: "",
          price: 500,
          isSelected: false,
        },
        {
          id: 2,
          description: "Маникюр + Покрытие гель-лак",
          alternativeDescription:
            "(Ремонт/наращивание 1-2 ногтя входят в стоимость)",
          price: 800,
          isSelected: false,
        },
        {
          id: 3,
          description: "Снятие без покрытия и маникюра",
          price: 200,
          isSelected: false,
        },
      ],
      servicesAd: [
        {
          id: 4,
          description: "Ремонт 1 ногтя",
          price: 50,
          isSelected: false,
        },
        {
          id: 5,
          description: "Наращивание 1 ногтя",
          price: 100,
          isSelected: false,
        },
        {
          id: 6,
          description: "Укрепление гелем/полигелем",
          price: 200,
          isSelected: false,
        },
      ],
    };
  },
  methods: {
    selectService: function (id) {
        console.log(this.services[id]);
      if (this.selectedService == id) {
        this.services[this.selectedService].isSelected = false;
        this.selectedService = -1;
        return;
      }
      if (this.selectedService != -1) this.services[this.selectedService].isSelected = false;
      this.selectedService = id;
      this.services[id].isSelected = true;
    },
  },
};
</script>

<style>
.services {
  width: 500px;
}

@media screen and (max-width: 500px) {
  .services {
    width: auto;
  }
}

ul {
  display: flex;
  flex-direction: column;
}
li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dotted rgba(128, 128, 128, 0.4);
}
</style>