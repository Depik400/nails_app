<template>
  <div class="home">
    <div class="input_wrapper">
      <input
        :class="[isRecordReleased ? 'hidden' : 'opened']"
        :style="[
          isButtonTimerLeft ? { display: 'none' } : { display: 'block' },
        ]"
        type="button"
        value="Записаться"
        @click="
          numberOfList++;
          recordRelease(numberOfList);
        "
      />
    </div>
    <calendar
      :class="[isRecordVisible ? 'calendar_open' : 'calendar_hide']"
      v-if="isRecordTimerLeft"
      :dateIndex="aboutClient.selectedDateId"
      @selectDateEvent="getDateFromComponent"
    />
    <services
      v-if="isServicesTimerLeft"
      :class="[isServicesReleased ? 'services_open' : 'services_hide']"
    />
    <div class="button_prev_next_wrapper" v-if="isPrevNextButtonVisible">
      <input
        type="button"
        style="margin: 10px 10px; width: 100%"
        value="Назад"
        @click="
          numberOfList--;
          recordRelease(numberOfList);
        "
      />
      <input
        type="button"
        style="margin: 10px 10px; width: 100%"
        value="Вперед"
        @click="
          numberOfList++;
          recordRelease(numberOfList);
        "
      />
    </div>
    <p
      :class="
        error != ''
          ? { display: 'block', fontSize: '20px', color: 'red' }
          : { display: 'none' }
      "
    >
      {{ errorHandler }}
    </p>
  </div>
</template>

<script>
import record from "../components/recording.vue";
import services from "../components/services.vue";

export default {
  name: "home",
  data() {
    return {
      isRecordReleased: false,
      isRecordVisible: false,
      isRecordTimerLeft: false,
      isButtonTimerLeft: false,
      isPrevNextButtonVisible: false,
      isServicesReleased: false,
      isServicesTimerLeft: false,
      error: "",
      numberOfList: 0,
      aboutClient: {
        selectedDateId: -1,
        selectedServicesId: -1,
        selectedServicesAdId: -1,
      },
    };
  },
  components: {
    calendar: record,
    services,
  },
  computed: {
    errorHandler: function () {
      if (this.error == "calendar_error") {
        return "Вы не выбрали дату";
      }
      if (this.error == "services_error") {
        return "Вы не выбрали услуги";
      }
      return "";
    },
  },
  methods: {
    recordRelease: function (list) {
      console.log("here");
      switch (list) {
        case 0: {
          this.isRecordReleased = false;
          this.isRecordVisible = false;
          this.isServicesReleased = false;
          setTimeout(() => {
            this.isButtonTimerLeft = false;
            this.isRecordTimerLeft = false;
            this.isPrevNextButtonVisible = false;
          }, 400);
          break;
        }
        case 1: {
          this.isRecordReleased = true;
          this.isRecordVisible = true;
          this.isServicesReleased = false;
          setTimeout(() => {
            this.isServicesTimerLeft = false;
            this.isButtonTimerLeft = true;
            this.isRecordTimerLeft = true;
            this.isPrevNextButtonVisible = true;
          }, 400);
          break;
        }
        case 2: {
          if (this.aboutClient.selectedDateId == -1) {
            this.numberOfList--;
            this.error = "calendar_error";
            setTimeout(() => (this.error = ""), 3000);
            return;
          } else {
            this.error = "";
          }
          this.isRecordReleased = false;
          this.isRecordVisible = false;
          setTimeout(() => {
            this.isServicesTimerLeft = true;
            this.isRecordTimerLeft = false;
            this.isServicesReleased = true;
          }, 400);
        }
      }
    },
    servicesRelease: function () {
      this.isRecordVisible = !this.isRecordVisible;
      this.isServicesReleased = !this.isServicesReleased;
    },
    getDateFromComponent: function (date) {
      this.aboutClient.selectedDateId = date;
    },
  },
};
</script>

<style>
input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.services_open {
  opacity: 0;
  animation: open_calendar 0.4s linear 0.3s forwards;
}

.services_hide {
  opacity: 1;
  animation: hide_calendar 0.4s linear 0.3s forwards;
}
.calendar_open {
  opacity: 0;
  animation: open_calendar 0.4s linear 0.3s forwards;
}

.calendar_hide {
  opacity: 1;
  animation: hide_calendar 0.4s linear 0.3s forwards;
}

@keyframes hide_calendar {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(500px) scale(0.4);
    opacity: 0;
  }
}

@keyframes open_calendar {
  0% {
    transform: translateY(500px) scale(0.4);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

input[type="button"] {
  padding: 15px 40px;
  background: none;
  border: 3px solid #f59182;
  border-radius: 30px;
  font-size: 20px;
  color: #f59282;
  font-weight: bold;
  transition: all ease 0.2s;
}

input[type="button"].hidden {
  animation: hide linear 0.5s forwards;
}

input[type="button"].opened {
  animation: open_record_button linear 0.5s forwards;
}

@keyframes open_record_button {
  0% {
    transform: translateY(-500px) scale(0.4);
    opacity: 0;
  }
  100% {
    transform: translateZ(0) scale(1);
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    transform: translateZ(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-500px) scale(0.4);
    opacity: 0;
  }
}

.button_prev_next_wrapper {
  display: flex;
  margin: 20px;
  opacity: 0;
  animation: buttons_opacity 0.6s linear forwards;
  animation-delay: 1.1s;
}

@media screen and (max-width: 400px) {
  .button_prev_next_wrapper {
    flex-direction: column;
  }
}

@keyframes buttons_opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

input[type="button"]:hover {
  background: #f59282;
  color: white;
}
</style>