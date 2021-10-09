<template>
  <div id="app">
    <div class="container">
      <header :class="['header', isHeaderOpen ? 'header_active' : '']">
        <div class="header_wrapper">
          <div class="open_header_btn" @click="isHeaderOpen = !isHeaderOpen">
            <img
              src="./assets/img/arrow.svg"
              :style="[isHeaderOpen ? { transform: 'rotateZ(-90deg)' } : {}]"
              height="30px"
              width="30px"
              alt=""
              srcset=""
            />
          </div>
          <nav class="button_wrapper">
            <router-link class="header_router_link logo" to="/">
              <img
                src="./assets/img/logo.jpeg"
                width="50"
                height="50"
                style="border-radius: 50%"
                alt=""
                srcset=""
            /></router-link>
            <a
              class="header_router_link links"
              href="https://www.instagram.com/pinknails_krsk/"
              >Мои работы</a
            >
            <router-link class="header_router_link links" to="/services"
              >Услуги</router-link
            >
          <router-link to="/profile" class="header_router_link links" :style="[!getAuthState?{'display':'none'}:{'display':'block'}]" >Профиль</router-link>
          <p  class="header_router_link links" :style="[!getAuthState?{'display':'none'}:{'display':'block'}]"  @click="logout" style="cursor: pointer;">Выйти</p>
          <p  class="header_router_link links" :style="[getAuthState?{'display':'none'}:{'display':'block'}]"  @click=" loginWindowState =  !loginWindowState" style="cursor: pointer;">Войти</p>
          <div class="login_window" v-if="loginWindowState">
            <div class="close_login_window" @click=" loginWindowState = ! loginWindowState">
              <label></label>
            </div>
            <p>{{error}}</p>
            <input type="text" v-model="login" placeholder="login">
            <input type="password" v-model="password" placeholder="password">
            <input type="button" value="Войти" @click="loginTo">
          </div>
          </nav>
          <div class="contacts_wrapper">
            <a
              class="whatsapp_link"
              href="https://wa.me/+79610944144?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82,%20%D0%BC%D0%BE%D0%B3%D1%83%20%D0%BB%D0%B8%20%D1%8F%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F?"
              ><img
                src="./assets/img/whatsapp.svg"
                alt=""
                class="whatsapp_img"
                srcset=""
                width="30"
                height="30"
                style="transform: translate(-10px, 10px)"
              />
              <span class="link_hover">+7 (961) 094-41-44</span></a
            >
            <a class="tel_link" href="https://vk.com/pn_takeshy" target="_blank"
              ><img
                src="./assets/img/VK.com-logo.svg"
                alt=""
                class="whatsapp_img"
                srcset=""
                width="30"
                height="30"
                style="transform: translate(-10px, 10px)"
              /><span class="link_hover">Вконтакте</span></a
            >
          </div>
        </div>
      </header>
      <div class="router-view-container" :style="[loginWindowState?{ filter: 'blur(15px)' } : { filter: 'none' }]">
        <keep-alive>
          <router-view> </router-view>
        </keep-alive>
      </div>
      <footer class="footer">hello</footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "main_page",
  data() {
    return {
      hoverOnWhatsapp: false,
      hoverOnPhone: false,
      isHeaderOpen: false,
      loginWindowState:false,
      login:'',
      password:'',
      error:''
    };
  },
  methods: {

    ...mapActions([
      "setToken",
      "setDesign",
      "setCalendar",
      "setServices",
      "setServicesAd",
      "setJWT",
      "setAuthState"
    ]),

    hoverOnWhatsapp_set() {
      this.hoverOnWhatsapp = !this.hoverOnWhatsapp;
    },

    hoverOnPhone_set() {
      console.log("here");
      this.hoverOnPhone = !this.hoverOnPhone;
    },

    logout: function(){
      localStorage.removeItem('token');
      this.$router.go('/');
    }
,
    loginTo:function(){
this.error = ''

      if(this.login == '' || this.password == ''){
        this.error = 'Заполните логин и пароль'
        ;
        return;
      }
      let sender = (try_count) => {
        this.axios
          .post("/api/singup", {
            user: {login: this.login, pass:this.password},
          })
          .then((result) => {
            console.log(result);
            if(result.status == 200){
              localStorage.setItem('token',result.data.token);
              this.$router.go('/');
            }
            else{
              this.error = 'Неверный логин или пароль';
            }
          })
          .catch((err) => {
            if(err){
              this.error = 'Неверный логин или пароль';
            }
            if (try_count == 2) {
              return;
            }
            this.setToken();
            setTimeout(() => {
              sender(try_count + 1);
            }, 500);
          });
      };
      sender(0);
    }
  },

  created() {
    if (localStorage.getItem("token") !== null) {
      console.log("stay here");
    } else {
      console.log("bad");
    }
  },

  computed: {
    ...mapGetters(['getAuthState'])
  },
  mounted() {


   this.setToken();
    this.setDesign();
    this.setCalendar();
    this.setServices();
    this.setServicesAd();

    this.axios
      .get("/api/user", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if(result.status != 200){
          localStorage.removeItem('token');
        }
        else{
          this.$nextTick(() => this.setAuthState(true))
        }
      }).catch(err => {
        console.log(err);
      });
  },
};
</script>

<style>
html,
body {
  min-height: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}

.login_window{
  position: absolute;
  top:50%;
  left:50%;
  padding: 30px;
  transform: translate(-50%,-50%);
  width: 300px;
  height: 200px;
background: white;
border-radius: 20px;
box-shadow: 0px 0px 3px 4px rgba(128, 128, 128, 0.247);
z-index: 1000;
}

.login_window>input[type=text],.login_window>input[type=password]{
  font-size: 18px;
  padding: 5px;
  margin:10px 0;
  border-radius: 10px;
  border:1px solid  #f59182;
  padding: 5px;
  text-indent: 10px;

}

.login_window>input[type=button]{
  font-size: 20px;
  font-weight: normal;
}

.close_login_window{
  position: absolute;
  right: 15px;
  top: 15px;
  border-radius: 5px;
  height: 25px;
  width: 25px;
  border: 3px solid #f59182;
}

.close_login_window>label{
  position: absolute;
  content: '';
  width: 3px;
  height: 25px;
  transform: translateX(-1.5px) rotateZ(45deg);
  background: #f59182;
}

.close_login_window>label::after{
  position: absolute;
  content: '';
  width: 3px;
  transform: rotateZ(-270deg) translateY(0.1em);
  height: 25px;
  background: #f59182;
}

.container {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.router-view-container {
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  justify-content: center;
}

header,
footer {
  margin: 0;
  padding: 0;
}

header {
  border-bottom: 1px solid rgba(126, 126, 126, 0.4);
  border-left: 1px solid rgba(126, 126, 126, 0.4);
  border-right: 1px solid rgba(126, 126, 126, 0.4);
  border-radius: 0px 0px 30px 30px;
  box-shadow: 1px 0px 10px 1px rgb(126, 126, 126);
  width: 100%;
  height: 100px;
  min-height: 80px;
}

.header_wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 85%;
  margin: 0 auto;
}

.open_header_btn {
  display: none;
}

@media screen and (max-width: 910px) {
  .header_wrapper {
    flex-direction: column;
    justify-content: space-evenly;
  }

  header {
    height: 130px;
  }
}

@media screen and (max-width: 510px) {
  .contacts_wrapper {
    display: flex;
    flex-direction: column;
  }

  .open_header_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 17px;
    left: 20px;
    border-radius: 10px;
    min-height: 40px;
    min-width: 40px;
    content: "";
    height: 40px;
    width: 40px;
    border: 2px solid #f5918256;
  }

  .open_header_btn > img {
    transition: all ease 0.3s;
    transition-delay: 0.3s;
    transform: rotateZ(90deg);
  }

  .header {
    height: 80px;
    overflow: hidden;
    transition: all ease 0.3s;
  }

  .header_active {
    height: 250px;
  }

  .header_wrapper {
    height: 250px;
  }

  .button_wrapper > .logo {
    margin-bottom: 20px;
  }

  .button_wrapper {
    display: flex;
    flex-direction: column;
  }
}

.header_router_link {
  margin: 0 25px;
}

.contacts_wrapper a {
  margin: 0 20px;
  font-weight: bold;
  text-decoration: none;
  color: black;
}

.button_wrapper {
  display: flex;
  align-items: center;
}

.links {
  text-decoration: none;
  color: black;
}

.link_hover,
.links {
  border-bottom: none;
  transition: all ease 0.1s;
}

.link_hover:hover,
.links:hover {
  border-bottom: 2px solid black;
}
</style>
