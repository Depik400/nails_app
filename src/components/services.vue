<template>
  <div class="services">
    <p style="margin: 10px auto; font-size:20px;font-weight:bold;">Услуги</p>
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
      <li v-for="(item,index) in servicesAd" :key="item.id" @click="selectServiceAd(index)">
        <p>{{ item.description }} - цена: {{ item.price }}р.</p>
        <input v-if="item.isNumerable" class="count" type="number" v-model="servicesAd[index].count" @change="selectServiceAd(index)"> 
        <img :style="[item.isSelected ? {'opacity':'1'}:{'opacity':'0'}]" src="../assets/img/green_success.png" alt="" srcset="" />
      </li>
    </ul>
<p style="margin: px auto; font-size:20px;font-weight:bold;">Дизайны</p>
        <ul style="max-height:none;">
      <li v-for="(item,index) in design" :key="item.id" @click="selectDesign(index)">
        <p>{{ item.description }} - Все ногти: {{ item.price }}р.</p>
        <input v-if="item.isNumerable" class="count" type="number" v-model="design[index].count" @change="selectServiceAd(index)"> 
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
      selectedDesign:[],
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
      design:[
                {
          id: 1,
          description: "Френч",
          price: 300,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
              {
          id: 2,
          description: "Мрамор\\Текстуры | 2 ногтя - 50р",
          price: 200,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                      {
          id: 10,
          description: "Слайдеры | 2 ногтя - 50р",
          price: 200,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                      {
          id: 3,
          description: "Блестки | 2 ногтя - 50р",
          price: 200,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                      {
          id: 4,
          description: "Фольга | 2 ногтя - 50р",
          price: 200,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                      {
          id: 5,
          description: "Поталь | 2 ногтя - 50р",
          price: 200,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                              {
          id: 6,
          description: "Стемпинг | 2 ногтя - 100р",
          price: 400,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                      {
          id: 7,
          description: "Рисунки | 2 ногтя - 100р",
          price: 400,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                      {
          id: 8,
          description: "Градиент | 2 ногтя - 100р",
          price: 400,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
                      {
          id: 9,
          description: "Объемные фигуры | 2 ногтя - 100р",
          price: 400,
          isSelected: false,
          count:0,
          isNumerable:false,
        },
      ]
    };
  },
  methods: {
    selectService: function (id) {
        console.log(this.services[id]);
      if (this.selectedService == id) {
        this.services[this.selectedService].isSelected = false;
        this.selectedService = -1;
        this.$emit('sendService',this.selectedService);
        return;
      }
      if (this.selectedService != -1) this.services[this.selectedService].isSelected = false;
      this.selectedService = id;
      this.services[id].isSelected = true;
      this.$emit('sendService',this.selectedService);
    },

    selectServiceAd:function(index) {
      console.log(index + this.servicesAd[index].count);

      if(!this.servicesAd[index].isNumerable){
        if(this.servicesAd[index].isSelected){
          this.selectedAdService = this.selectedAdService.filter(e => e != this.servicesAd[index].id);
        this.servicesAd[index].isSelected = false;
        this.$emit('sendServiceAd',this.selectedAdService);
        return;
        } else{
             this.selectedAdService.push(this.servicesAd[index].id);
        this.servicesAd[index].isSelected = true;
        this.$emit('sendServiceAd',this.selectedAdService);
        return
        }
      }

      if(this.servicesAd[index].count < 0) this.servicesAd[index].count = 0
      if(this.servicesAd[index].count > 10) this.servicesAd[index].count = 10
      if(this.servicesAd[index].count >= 1){
        this.selectedAdService.push(this.servicesAd[index].id);
        this.servicesAd[index].isSelected = true;
        this.$emit('sendServiceAd',this.selectedAdService);
        return
      }
      else {
        this.selectedAdService = this.selectedAdService.filter(e => e != this.servicesAd[index].id);
        this.servicesAd[index].isSelected = false;
        this.$emit('sendServiceAd',this.selectedAdService);
        }
    },

    selectDesign: function (index) {
      let id = this.design[index].id;
      if(this.selectedDesign.includes(id)){
        this.design[index].isSelected = false;
        this.selectedDesign = this.selectedDesign.filter(item => item != id);
        this.$emit('sendDesign',this.selectedDesign);
        return;
      }
      else{
        this.design[index].isSelected  = true;
        this.selectedDesign.push(id);
        this.$emit('sendDesign',this.selectedDesign);
        return;
      }
  },
} 
}
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