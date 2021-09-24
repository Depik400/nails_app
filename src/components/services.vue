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
      <li v-for="(item,index) in servicesAd" :key="item.id" @click="(!item.isNumerable)?servicesAd[index].isSelected = !servicesAd[index].isSelected:''">
        <p>{{ item.description }} - цена: {{ item.price }}р.</p>
        <input v-if="item.isNumerable" class="count" type="number" v-model="servicesAd[index].count" @change="selectServiceAd(index)"> 
        <img :style="[item.isSelected ? {'opacity':'1'}:{'opacity':'0'}]" src="../assets/img/green_success.png" alt="" srcset="" />
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
      selectedAdService: [],
      price:0,
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
          count:0,
          isNumerable:true,
        },
        {
          id: 5,
          description: "Наращивание 1 ногтя",
          price: 100,
          isSelected: false,
          count:0,
          isNumerable:true,
        },
        {
          id: 6,
          description: "Укрепление гелем/полигелем",
          price: 200,
          isSelected: false,
          count:0,
          isNumerable:false,
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

    selectServiceAd:function(index) {
      console.log(index + this.servicesAd[index].count);
      if(this.servicesAd[index].count < 0) this.servicesAd[index].count = 0
      if(this.servicesAd[index].count > 10) this.servicesAd[index].count = 10
      if(this.servicesAd[index].count >= 1){
        this.servicesAd[index].isSelected = true;
        return
      }
      else this.servicesAd[index].isSelected = false;
    }

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
.count{
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