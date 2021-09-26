<template>
  <div class="services">
    <p style="margin: 10px auto; font-size: 20px; font-weight: bold">Услуги</p>
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
      <li
        v-for="(item, index) in servicesAd"
        :key="item.id"
        @click="selectServiceAd(index)"
      >
        <p>{{ item.description }} - цена: {{ item.price }}р.</p>
        <input
          v-if="item.isNumerable"
          class="count"
          type="number"
          v-model="servicesAd[index].count"
          @change="selectServiceAd(index)"
        />
        <img
          :style="[item.isSelected ? { opacity: '1' } : { opacity: '0' }]"
          src="../assets/img/green_success.png"
          alt=""
          srcset=""
        />
      </li>
    </ul>
    <p style="margin: px auto; font-size: 20px; font-weight: bold">Дизайны</p>
    <ul style="max-height: none">
      <li
        v-for="(item, index) in design"
        :key="item.id"
        @click="selectDesign(index)"
      >
        <p>{{ item.description }} - Все ногти: {{ item.price }}р.</p>
        <input
          v-if="item.isNumerable"
          class="count"
          type="number"
          v-model="design[index].count"
          @change="selectServiceAd(index)"
        />
        <img
          :style="[item.isSelected ? { opacity: '1' } : { opacity: '0' }]"
          src="../assets/img/green_success.png"
          alt=""
          srcset=""
        />
      </li>
    </ul>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: "services",
  data() {
    return {
      selectedService: -1,
      selectedAdService: [],
      selectedDesign: [],
      price: 0,
    };
  },

  props: ["servicesProp", "servicesAdProp", "designProp"],
  computed:{
    ...mapGetters(['services','servicesAd','design'])
  },

  mounted() {
    this.$nextTick(() => {
      this.selectedService = this.servicesProp;
      this.selectedAdService = this.servicesAdProp;
      this.selectedDesign = this.designProp;
      if (this.selectedService != -1) {
        let index = this.services.findIndex(
          (index) => index.id == this.selectedService
        );
        console.log(index);
        this.selectedService = index;
        this.services[index].isSelected = true;
      }
      if (this.selectedAdService.length > 0)
        this.selectedAdService.forEach((element) => {
          let index = this.servicesAd.findIndex((item) => item.id == element);
          this.servicesAd[index].isSelected = true;
        });
      if (this.selectedDesign.length > 0)
        this.selectedDesign.forEach((element) => {
          let index = this.design.findIndex((item) => item.id == element);
          this.design[index].isSelected = true;
        });
    });
    console.log(this.selectedService);
  },

  methods: {
    selectService: function (id) {
      console.log(this.services[id]);
      if (this.selectedService == id) {
        this.services[this.selectedService].isSelected = false;
        this.selectedService = -1;
        this.$emit("sendService",  -1);
        return;
      }
      if (this.selectedService != -1)
        this.services[this.selectedService].isSelected = false;
      this.selectedService = id;
      this.services[id].isSelected = true;
      this.$emit("sendService", this.services[this.selectedService].id);
    },

    selectServiceAd: function (index) {
      console.log(index + this.servicesAd[index].count);

      if (!this.servicesAd[index].isNumerable) {
        if (this.servicesAd[index].isSelected) {
          this.selectedAdService = this.selectedAdService.filter(
            (e) => e != this.servicesAd[index].id
          );
          this.servicesAd[index].isSelected = false;
          this.$emit("sendServiceAd", this.selectedAdService);
          return;
        } else {
          this.selectedAdService.push(this.servicesAd[index].id);
          this.servicesAd[index].isSelected = true;
          this.$emit("sendServiceAd",this.selectedAdService);
          return;
        }
      }

      if (this.servicesAd[index].count < 0) this.servicesAd[index].count = 0;
      if (this.servicesAd[index].count > 10) this.servicesAd[index].count = 10;
      if (this.servicesAd[index].count >= 1) {
        this.selectedAdService.push(this.servicesAd[index].id);
        this.servicesAd[index].isSelected = true;
        this.$emit("sendServiceAd",this.selectedAdService);
        return;
      } else {
        this.selectedAdService = this.selectedAdService.filter(
          (e) => e != this.servicesAd[index].id
        );
        this.servicesAd[index].isSelected = false;
        this.$emit("sendServiceAd", this.selectedAdService);
      }
    },

    selectDesign: function (index) {
      let id = this.design[index].id;
      if (this.selectedDesign.includes(id)) {
        this.design[index].isSelected = false;
        this.selectedDesign = this.selectedDesign.filter((item) => item != id);
        this.$emit("sendDesign",  this.selectedDesign);
        return;
      } else {
        this.design[index].isSelected = true;
        this.selectedDesign.push(id);
        this.$emit("sendDesign", this.selectedDesign);
        return;
      }
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
.count {
  border: 1px solid rgba(128, 128, 128, 0.4);
  width: 30px;
  border-radius: 20px;
  -moz-appearance: textfield;
  text-align: center;
}

input.count::-webkit-outer-spin-button,
input.count::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>