import vuex from "vuex";
import vue from "vue";

vue.use(vuex);

let vStore = new vuex.Store({
  state: {
    calendar:[],
    services: [],
    servicesAd: [],
    design: [],
    JWT:'',
    token: "",
  },
  mutations: {
    updateCalendar(state, tempCalendar) {
      state.calendar = tempCalendar;
    },

    updateToken(state, token) {
      state.token = token;
    },

    updateJWT(state,tempJWT){
      state.JWT = tempJWT;
    },

    updateservices(state, tempservices) {
      state.services = tempservices;
    },
    updateservicesAd(state, tempservicesAd) {
      state.servicesAd = tempservicesAd;
    },
    updateDesign(state, tempDesign) {
      state.design = tempDesign;
    },
  },
  actions: {
    setCalendar({ commit }) {
      vue.axios.get('/api/calendar').then(req => {
        commit("updateCalendar",req.data);
      })
    },

    setJWT({commit},token){
      commit('updateJWT',token);
    },

    setServices({ commit }) {
      vue.axios.get('/api/service').then(req => {
        commit("updateservices",req.data);
      })
    },
    setServicesAd({ commit }) {
      vue.axios.get('/api/serviceAd').then(req => {
        commit("updateservicesAd", req.data);
      })
    },
    setDesign({ commit }) {
      vue.axios.get('/api/design').then((result) => {
        commit("updateDesign", result.data);
      })
    },

    setToken({ commit }) {
      vue.axios.get("/api/token").then((result) => {
        vue.axios.defaults.headers.common['X-CSRF-Token'] = result.data.csrfToken;
        commit("updateToken", result.data.csrfToken);
      });
    },
  },
  getters: {
    calendar(state) {
      return state.calendar;
    },
    services(state) {
      return state.services;
    },
    servicesAd(state) {
      return state.servicesAd;
    },
    design(state) {
      return state.design;
    },
    token(state){
      return state.token;
    },

    JWT(state){
      return state.JWT;
    }
  },
});

export default vStore;
