<template>
  <div id="app">
    <Map :places="places" />
  </div>
</template>

<script>
import Map from "./components/Map.vue";

const data = [
  {
    region: "",
    name: "197101, пр. Кронверкский, 49",
    location: { latitude: 59.9574001, longitude: 30.3061542 },
  },
  {
    region: "",
    name: "443086, Московское шоссе, д. 34",
    location: { latitude: 53.2120118, longitude: 50.1753568 },
  },
  {
    region: "",
    name: "195251, Политехническая, 29",
    location: { latitude: 56.5291265, longitude: 35.793191 },
  },
  {
    region: "",
    name: "Россия, 634050, г. Томск, проспект Ленина, дом 30",
    location: { latitude: 57.9219608, longitude: 48.7215412 },
  },
  {
    region: "",
    name: "ул. Ленина 23",
    location: { latitude: 57.1590108, longitude: 65.5279635 },
  },
  {
    region: "",
    name: "ул. Мира, 19",
    location: { latitude: 56.8403246, longitude: 60.6138365 },
  },
  {
    region: "",
    name: "101000, Мясницкая ул., д. 20",
    location: { latitude: 55.7614635, longitude: 37.6309452 },
  },
  {
    region: "",
    name: "194100, ул. Кантемировская дом 3, корп.1, лит. А, ком. 239",
    location: { latitude: 59.9800492, longitude: 30.3250261 },
  },
  {
    region: "",
    name: "ул. Большая Печерская, д.25/12, к.217а",
    location: { latitude: 56.3299584, longitude: 43.9201353 },
  },
  {
    region: "",
    name: "ул. Студенческая, д. 38",
    location: { latitude: 58.010727, longitude: 56.2798073 },
  },
  {
    region: "",
    name: "603950, проспект Гагарина, 23",
    location: { latitude: 56.2985946, longitude: 43.9790292 },
  },
  {
    region: "",
    name: "пр. В.И. Ленина, д. 76",
    location: { latitude: 55.1604494, longitude: 61.3679071 },
  },
  {
    region: "",
    name: "г. Долгопрудный, Институтский пер., д. 9",
    location: { latitude: 55.9296723, longitude: 37.5167821 },
  },
  {
    region: "",
    name: "197376, ул. Профессора Попова, д. 5",
    location: { latitude: 59.9718081, longitude: 30.2989611 },
  },
  {
    region: "",
    name: "630090, ул. Пирогова, 1",
    location: { latitude: 54.8453476, longitude: 83.0904755 },
  },
  {
    region: "",
    name: "236016, ул. А.Невского, 14",
    location: { latitude: 54.7242934, longitude: 20.5252919 },
  },
  {
    region: "",
    name: "354348, Адлерский район, ул. Куйбышева, д. 32",
    location: { latitude: 43.4335161, longitude: 39.9156999 },
  },
  {
    region: "",
    name: "117198, ул. Миклухо-Маклая, д.6",
    location: { latitude: 55.6505192, longitude: 37.4997957 },
  },
  {
    region: "",
    name: "119049, Ленинский пр., 4",
    location: { latitude: 55.7273655, longitude: 37.5925208 },
  },
  {
    region: "",
    name: "119991, ул. Трубецкая, д. 8, стр. 2",
    location: { latitude: 55.731551, longitude: 37.5695283 },
  },
  {
    region: "",
    name: "Каширское шоссе, 31",
    location: { latitude: 55.6512482, longitude: 37.6570191 },
  },
  {
    region: "",
    name: "420008, Кремлевская, 18.",
    location: { latitude: 55.790447, longitude: 49.1192462 },
  },
  {
    region: "",
    name: "630007, ул. Советская, дом 7",
    location: { latitude: 55.0080181, longitude: 82.867719 },
  },
  {
    region: "",
    name: "634050, пр. Ленина, д. 36",
    location: { latitude: 56.4695, longitude: 84.9453243 },
  },
  {
    region: "",
    name: "Приморский край, о. Русский, н.п. Аякс, 10, кампус ДВФУ",
    location: { latitude: 43.0244636, longitude: 131.8916229 },
  },
  {
    region: "",
    name: "630007, Sovetskaya ul, 7",
    location: { latitude: 55.022545, longitude: 82.9158592 },
  },
  {
    region: "",
    name: "660041, пр. Свободный, 79",
    location: { latitude: 56.0099917, longitude: 92.7690147 },
  },
  {
    region: "",
    name: "456209, г. Златоуст, Челябинская область, ул. Тургенева, 16",
    location: { latitude: 55.1367954, longitude: 60.2646142 },
  },
  {
    region: "",
    name: "456318, Челябинская область, г. Миасс, пр. Октября, 16",
    location: { latitude: 55.143134, longitude: 60.1484693 },
  },
  {
    region: "",
    name:
      "628616, Тюменская область, Ханты-Мансийский АО-Югра, г. Нижневартовск, ул. Мира, д. 9",
    location: { latitude: 60.945878, longitude: 76.5543872 },
  },
];

export default {
  name: "App",
  components: {
    Map,
  },
  data() {
    return {
      places: data,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
