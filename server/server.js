const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const calendarModel = require("./models/calendar");
const serviceModel = require("./models/service");
const serviceAdModel = require("./models/serviceAd");
const designModel = require("./models/design");
const db = require("./models/db");

const apiRouter = require("./routers/index");

mongoose.connect(db.connectionString);

const calendar = [
  {
    id: 1,
    month: "Январь",
    day: 1,
    hour: "15:00",
    isSelected: false,
  },
  {
    id: 2,
    month: "Сентябрь",
    day: 5,
    hour: "10:00",
    isSelected: false,
  },
  {
    id: 3,
    month: "Октябрь",
    day: 12,
    hour: "18:00",
    isSelected: false,
  },
  {
    id: 4,
    month: "Январь",
    day: 1,
    hour: "15:00",
    isSelected: false,
  },
  {
    id: 5,
    month: "Сентябрь",
    day: 5,
    hour: "10:00",
    isSelected: false,
  },
  {
    id: 6,
    month: "Октябрь",
    day: 12,
    hour: "18:00",
    isSelected: false,
  },
  {
    id: 7,
    month: "Январь",
    day: 1,
    hour: "15:00",
    isSelected: false,
  },
  {
    id: 8,
    month: "Сентябрь",
    day: 5,
    hour: "10:00",
    isSelected: false,
  },
  {
    id: 9,
    month: "Октябрь",
    day: 12,
    hour: "18:00",
    isSelected: false,
  },
];
const services = [
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
    alternativeDescription: "(Ремонт/наращивание 1-2 ногтя входят в стоимость)",
    price: 800,
    isSelected: false,
  },
  {
    id: 3,
    description: "Снятие без покрытия и маникюра",
    price: 200,
    isSelected: false,
  },
];
const servicesAd = [
  {
    id: 4,
    description: "Ремонт 1 ногтя",
    price: 50,
    isSelected: false,
    count: 0,
    isNumerable: true,
  },
  {
    id: 5,
    description: "Наращивание 1 ногтя",
    price: 100,
    isSelected: false,
    count: 0,
    isNumerable: true,
  },
  {
    id: 6,
    description: "Укрепление гелем/полигелем",
    price: 200,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
];
const design = [
  {
    id: 1,
    description: "Френч",
    price: 300,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 2,
    description: "Мрамор\\Текстуры | 2 ногтя - 50р",
    price: 200,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 10,
    description: "Слайдеры | 2 ногтя - 50р",
    price: 200,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 3,
    description: "Блестки | 2 ногтя - 50р",
    price: 200,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 4,
    description: "Фольга | 2 ногтя - 50р",
    price: 200,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 5,
    description: "Поталь | 2 ногтя - 50р",
    price: 200,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 6,
    description: "Стемпинг | 2 ногтя - 100р",
    price: 400,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 7,
    description: "Рисунки | 2 ногтя - 100р",
    price: 400,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 8,
    description: "Градиент | 2 ногтя - 100р",
    price: 400,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
  {
    id: 9,
    description: "Объемные фигуры | 2 ногтя - 100р",
    price: 400,
    isSelected: false,
    count: 0,
    isNumerable: false,
  },
];

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extends: false }));
app.use(express.json());

app.use(apiRouter);


app.listen(3000, () => {
  console.log("server on");
});
