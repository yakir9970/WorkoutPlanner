  <template>
    <v-container class="container">
      <v-card elevation="10" max-width="1600" class="secondary pa-7 my-12 ml-15" v-for="(workout,index) in workouts" :key="workout._id" ref="input">
        
      <v-row no-gutters class="mr-14 mt-n5 mb-3" >
        <!-- <v-btn absolute left depressed class="transparent white--text" >
          <v-icon x-large class="mt-7 ml-n5 primary--text" @click="minimize(index)">mdi-minus-thick</v-icon>
        </v-btn> -->
        <v-btn absolute right depressed class="transparent white--text" :to="{name: 'Workout', params: {id:workout._id, index:index}}">
          <v-icon x-large class="mt-8 mr-10 primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn absolute right depressed class="transparent white--text" @click="deleteWorkout(workout._id)">
          <v-icon x-large class="mt-8 mr-n7 primary--text">mdi-delete</v-icon>
        </v-btn>
        <v-card-title class="<!--ml-15--> primary--text text-h3 font-weight-bold">Workout No. {{index+1}}</v-card-title>
      </v-row>
      <v-card flat color="transparent" class="exCard">
        <v-row v-for="exercise in workout.exercises" :key="exercise._id">
            <v-card-title class="primary--text text-h4 font-weight-bold">
              {{exercise.name}}
            </v-card-title>
            <v-card-text>
              <v-row class="workout">
              <v-col cols="12" md="3">
                <div class="primary--text ">Primary Muscle:</div>
                <div class="primary--text text-h5 mt-3">{{exercise.primary}}</div>
              </v-col>
              <v-col cols="12" md="5">
                <div class="primary--text ">Secondary Muscles:</div>
                <div class="primary--text text-h5 mt-3">{{exercise.secondary.join(",")}}</div>
              </v-col>
              <v-col cols="12" md="2">
                <div class="primary--text ">Reps:</div>
                <div class="primary--text text-h5 mt-3">{{exercise.reps}}</div>
              </v-col>
              <v-col cols="12" md="2">
                <div class="primary--text ">Load(kg):</div>
                <div class="primary--text text-h5 mt-3">{{exercise.load}}</div>
              </v-col>   
              </v-row>               
            </v-card-text>
        </v-row>  
      </v-card>                                  
      </v-card>

    </v-container>
  </template>

  <script>
  import API from "../api"

    export default {
      name: "ShowWorkout",
      data(){
        return{
          workouts: [],
        }
      }, 
      async created(){
          this.workouts = await API.getAllWorkouts();
        },
      methods:{
        async deleteWorkout(id){
            const response = await API.deleteWorkout(id)
            this.$router.push({name: 'MyWorkout', params: {message: response.message}})
            window.location.reload();
        },
        minimize(index){
          if(this.$refs.input[index].$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].classList[7]=="mdi-minus-thick"){
            this.$refs.input[index].$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].classList.replace("mdi-minus-thick","mdi-plus-thick");

          }
          else{
            this.$refs.input[index].$el.childNodes[0].childNodes[0].childNodes[0].childNodes[0].classList.replace("mdi-plus-thick","mdi-minus-thick");
          }
          console.log( this.$refs.input[index].$el);
        } 
      }     
    }
  </script>

<style scoped>
.workout{
  border-left: 4px solid #47B5FF;
}
.container {
  position: absolute;
  left: 200px;
  top: 20px;
}
.exCard{
  margin-left: 100px;
}

</style>