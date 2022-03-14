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
            >
                {{ timer.name }}
            </li>
        </ul>
        <div class="pagination-wrapper">
          <p class="button pagination-arrow" @click="page--">-</p>
          <input v-model="page" type="number" class="pagination-page default-input">
          <p class="button pagination-arrow" @click="page++">+</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimersList',
  data(){
    return{
      timersCountOnPage: 10,
      page: 1,
      timers: [
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          },
          {
              name: 'Работа',
              id: '1'
          },
          {
              name: 'Учеба',
              id: '2'
          }
      ]
    }
  },
  methods:{
    logout(){
      this.$emit('get-userid', null);
      this.$emit('switch-card', 'OpenTimerCard');
    }
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
    }
  },
  watch: {
    page(){
      if (this.page < 1) this.page = 1;
      if (this.page > (Math.floor(this.timers.length / this.timersCountOnPage) + 1)) 
        this.page = Math.floor(this.timers.length / this.timersCountOnPage) + 1;
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