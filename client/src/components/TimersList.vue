<template>
  <div class="card timers-list-card">
    <div class="content-wrapper">
        <div class="title-wrapper">
          <p class="input-description">Мои таймеры</p>
          <p class="logout" @click="logout">Выйти</p>
        </div>
        <ul class="timers-list">
            <li 
                v-for="(timer, index) in paginatedTimers" :key="index"
                class="timers-item"
                @click="openTimer(timer.id)"
            >
                {{ timer.timer_name }}
            </li>
        </ul>
        <div class="pagination-wrapper">
          <p 
            :class=" page == 1 ? 'pagination-arrow__inactive button pagination-arrow' : 'button pagination-arrow'" 
            @click="page--"
          >
            -
          </p>
          <input v-model="page" type="number" class="pagination-page default-input">
          <p 
            :class=" page == maxPage ? 'pagination-arrow__inactive button pagination-arrow' : 'button pagination-arrow'" 
            @click="page++"
          >
            +
          </p>
        </div>
    </div>
  </div>
</template>

<script>
import { getSubscriptions } from '../api/user.api'
export default {
  name: 'TimersList',
  props: {
    userID : Number,
    timerID: Number
  },
  data(){
    return{
      timersCountOnPage: 10,
      page: 1,
      timers: []
    }
  },
  methods:{
    logout(){
      this.$emit('get-userid', null);
      this.$emit('switch-card', 'OpenTimerCard');
    },
    async getTimers(){
      this.timers = await getSubscriptions(this.userID);
    },
    openTimer(id){
      this.$emit('switch-card', 'TimerCard');
      this.$emit('get-timerid', id);
    }
  },
  async mounted(){
    this.getTimers();
  },
  computed: {
    startIndex(){
      return (this.page - 1) * this.timersCountOnPage;
    },
    endIndex(){
      return this.page * this.timersCountOnPage;
    },
    paginatedTimers(){
      return this.timers.slice(this.startIndex, this.endIndex);      
    },
    maxPage(){
      return Math.floor((this.timers.length - 1) / this.timersCountOnPage) + 1
    }
  },
  watch: {
    page(){
      if (this.page < 1) this.page = 1;
      if (this.page > this.maxPage) 
        this.page = this.maxPage;
    },
    timerID(){
      this.getTimers();
    }
  }
}
</script>


<style scoped>
.timers-list{
  min-height: 350px;
  padding: 0;
  margin: 0;
}
.timers-item{
  height: 30px;

  margin: 0 0 5px;
  padding: 5px 10px;
  box-sizing: border-box;
  
  font-size: 18px;
  cursor: pointer;
  list-style-type: none;

  border: 1px solid #ccc;
  border-radius: 4px;
}

.timers-item:hover{
  border-color: #4ca8af;
}

.pagination-wrapper{
  display: flex;
  flex-direction: row;
  margin: 10px 0;
}

.pagination-arrow, .pagination-page{
  font-size: 18px;
}

.pagination-arrow{
  cursor: pointer;
  padding: 4px 8px;
  max-width: 30px;
  margin-top: 0;
  margin-bottom: 0;
  border-radius: 2px;
  text-align: center;
}

.pagination-arrow__inactive{
  cursor: default;
  background-color: rgba(129, 166, 168, 0.4);
}

.pagination-arrow__inactive:hover{
  cursor: default;
  background-color: rgba(129, 166, 168, 0.4);
}

.pagination-page{
  padding: 4px 8px;
  width: 50px;
  text-align: center;
  margin: 0 5px;
}

.timers-list-card{
  height: fit-content;
}
</style>