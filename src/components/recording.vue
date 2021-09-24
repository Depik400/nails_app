<template>
  <div class="recording">
      <p>Выберите подходящий для себя день</p>
      <ul>
        <li class="elements" v-for="item in calendar" :key="item.id">
          <p> {{item.month}},{{item.day}} - {{item.hour}}</p>
        </li>
      </ul>
    <div class="register_window"></div>
  </div>
</template>

<script>
export default {
    name:'recording',
    data(){
        return{
        login:'',
        password:'',
        email:'email',
        isSingUp:false,
        calendar:[
            {
                id:1,
                month: 'Январь',
                day: 1,
                hour:'15:00'
            },
              {
                id:2,
                month: 'Сентябрь',
                day: 5,
                hour:'10:00'
            },
              {
                id:3,
                month: 'Октябрь',
                day: 12,
                hour:'18:00'
            },
                        {
                id:1,
                month: 'Январь',
                day: 1,
                hour:'15:00'
            },
              {
                id:2,
                month: 'Сентябрь',
                day: 5,
                hour:'10:00'
            },
              {
                id:3,
                month: 'Октябрь',
                day: 12,
                hour:'18:00'
            }
        ]
    }
    }
}
</script>

<style>
 ul{
     list-style-type: none;
        margin: 0;
        padding:0;
        display: flex;
        max-width: 700px;
        width: 100%;
        flex-wrap: wrap;
 }
 li.elements{
    padding: 10px;
    margin: 5px;
    border:1px solid rgba(128, 128, 128, 0.3);
    border-radius: 15px;
    box-shadow: 0px 1px 5px 1px rgba(128, 128, 128, 0.3);
 }
</style>