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
      <div class="router-view-container">
        <keep-alive>
          <router-view> </router-view>
        </keep-alive>
      </div>
      <footer class="footer">hello</footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "main_page",
  data() {
    return {
      hoverOnWhatsapp: false,
      hoverOnPhone: false,
      isHeaderOpen: false,
    };
  },
  methods: {
    hoverOnWhatsapp_set() {
      this.hoverOnWhatsapp = !this.hoverOnWhatsapp;
    },

    hoverOnPhone_set() {
      console.log("here");
      this.hoverOnPhone = !this.hoverOnPhone;
    },
  },

  created() {
    if (localStorage.getItem("token") !== null) {
      console.log("stay here");
    } else {
      console.log("bad");
    }
  },

  computed: {
    ...mapActions([
      "setToken",
      "setDesign",
      "setCalendar",
      "setServices",
      "setServicesAd",
      "setJWT"
    ]),
  },
  mounted() {
    this.axios
      .get("/api/user", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((result) => {
        if(result.status != 200){
          localStorage.clear();
        }
      });

    this.setToken;
    this.setDesign;
    this.setCalendar;
    this.setServices;
    this.setServicesAd;
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
