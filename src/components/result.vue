<template>
  <div class="result">
    <div :style="[orderStatus||authState ? { filter: 'blur(15px)' } : { filter: 'none' }]">
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
        <li style="border-bottom: none">
          Обращаем ваше внимание на то, что финальная сумма считается с учетом
          работы на все ногти, то есть фактическая сумма может быть меньше
        </li>
      </ul>

      <input
        style="margin-top: 30px"
        type="button"
        value="Оставить заявку"
        @click="setAuth()"
      />
    </div>
    <div class="orderStatus" v-if="orderStatus">
      <p style="font-weight: bold; font-size: 18px">Ваша заявка принята</p>
      <p>Вы можете отменить заказ не позднее, чем за день</p>
      <router-link to="/profile"><input type="button" style="font-weight:400; font-size:14px" value="Перейти в профиль"></router-link>
      <input type="button" style="font-weight:400; font-size:14px; margin-top:10px" value="На главную" @click="reloadPage">
    </div>
    <div
      v-if="authState"
      :class="[
        'auth_input_wrapper',
        authStateTimer ? 'auth_input_wrapper_open' : 'auth_input_wrapper_hide',
      ]"
    >
      <input
        v-if="!authMode"
        type="email"
        name=""
        v-model="user.email"
        placeholder="email"
      />
      <label
        v-if="!authMode"
        for=""
        :class="['input_line_email']"
        :style="emailWidthLabel"
      ></label>
      <input
        type="text"
        name=""
        id=""
        v-model="user.login"
        placeholder="login"
      />
      <label for="" class="input_line_login" :style="loginWidthLabel"></label>
      <input
        type="password"
        name=""
        id=""
        v-model="user.pass"
        placeholder="password"
      />
      <label
        for=""
        class="input_line_password"
        :style="[passWidthLabel, { direction: 'rtl' }]"
      ></label>
      <input
        type="button"
        :value="[!authMode ? 'Зарегистрироваться' : 'Войти']"
        @click="sendUserInfo"
      />
      <p style="cursor: pointer" @click="authMode = !authMode">
        {{ authMode ? "Зарегистрироваться" : "Войти" }}?
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "result",
  data() {
    return {
      dateItem: {},
      selectedService: "",
      selectedAdSerivce: [],
      selectedDesign: [],
      totalSum: 0,
      authState: false,
      authStateTimer: false,
      authMode: false,
      orderStatus: false,
      user: {
        email: "",
        login: "",
        pass: "",
      },
    };
  },

  props: ["aboutUser"],
  computed: {
    ...mapGetters(["calendar", "services", "servicesAd", "design", "token"]),
    ...mapActions(["setToken"]),
    emailWidthLabel: function () {
      let width = this.user.email.length * 7 + "px";
      return { width: width };
    },
    loginWidthLabel: function () {
      let width = this.user.login.length * 7 + "px";
      return { width: width };
    },
    passWidthLabel: function () {
      let width = this.user.pass.length * 7 + "px";
      return { width: width };
    },
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
      });
      this.total();
      //this.setToken;
    });
  },

  methods: {

    reloadPage: function (){
      this.$router.go('/');
    },

    total: function () {
      let totalPrice = this.selectedService.price;
      this.selectedAdSerivce.forEach((item) => (totalPrice += item.price));
      this.selectedDesign.forEach((item) => (totalPrice += item.price));
      this.totalSum = totalPrice;
    },
    setAuth: function () {

      if(localStorage.getItem('token') !== null){
        this.sendServiceInfo();
        return;
      }

      if (!this.authState) {
        this.authState = !this.authState;
        this.authStateTimer = !this.authStateTimer;
      } else {
        this.authStateTimer = !this.authStateTimer;
        setTimeout(() => {
          this.authState = !this.authState;
        }, 400);
      }
    },

    sendServiceInfo: function () {
      let sender = (tr) => {
        this.axios
          .post("/api/userService", {
            token: localStorage.getItem('token'),
            date: this.dateItem,
            service: this.selectedService,
            serviceAd: this.selectedAdSerivce,
            design: this.selectedDesign,
          })
          .then((result) => {
            //console.log(result);
            if(result.status == 200){
                this.orderStatus = true;
            }
          })
          .catch(() => {
            if(tr == 2){
              return;
            }


            this.setToken;
            setTimeout(() => {
              sender(tr+1);
            }, 500);

          });
      };


      sender(0);
    },

    sendUserInfo: function () {
      let url = this.authMode ? "singup" : "singin";
      console.log(url);
      let sender = (try_count) => {
        this.axios
          .post("/api/" + url, {
            user: this.user,
          })
          .then((result) => {
            console.log(result);
            if(result.status == 200){
              localStorage.setItem('token',result.data.token);
              this.sendServiceInfo();
            }
          })
          .catch(() => {
            if (try_count == 2) {
              return;
            }
            this.setToken;
            setTimeout(() => {
              sender(try_count + 1);
            }, 500);
          });
      };
      sender(0);
    },
  },
};
</script>

<style lang="css">
.auth_input_wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  border: 3px solid #f59182;
  padding: 30px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  z-index: 15000;
}

.auth_input_wrapper > p {
  margin: 0;
}

.orderStatus{
  position: absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  background: white;
  padding: 15px;
  box-shadow:0px 0px 5px 10px rgba(145, 145, 145, 0.096);
  border-radius: 10px;
}

.auth_input_wrapper > input {
  padding: 10px;
  text-indent: 10px;
  border-radius: 10px;
  border: 1px solid black;

}

.auth_input_wrapper > label {
  position: relative;
  transform: translate(30px, -18px);
  content: "";
  width: 0;
  height: 1px;
  background: #f59182;
  max-width: 85%;
}

.auth_input_wrapper > label.active {
  animation: focusIn 0.5s forwards;
}

.auth_input_wrapper > label.not_active {
  animation: focusOut 0.5s forwards;
}

.auth_input_wrapper_open {
  opacity: 0;
  animation: open_auth 0.4s ease forwards;
}

.auth_input_wrapper_hide {
  opacity: 0;
  animation: hide_auth 0.4s ease forwards;
}

@keyframes open_auth {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hide_auth {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes focusIn {
  0% {
    width: 0;
  }
  100% {
    width: 80%;
  }
}

@keyframes focusOut {
  0% {
    width: 80%;
  }
  100% {
    width: 0;
  }
}

.auth_input_wrapper > p,
.auth_input_wrapper > input {
  margin: 10px;
}
</style>