  <template>
    <v-container class="container">
      <v-row no-gutters class="mr-14" >
        <v-col cols="12" md="6" class="pa-3" v-for="(workout,index) in workouts" :key="workout._id">
          <v-card color="secondary">
            <v-btn absolute right depressed class="transparent white--text" :to="{name: 'Workout', params: {id:workout._id, index:index}}">
              <v-icon x-large class="mt-8 mr-10 primary--text">mdi-pencil</v-icon>
            </v-btn>
            <v-btn absolute right depressed class="transparent white--text" @click="deleteWorkout(workout._id)">
              <v-icon x-large class="mt-8 mr-n7 primary--text">mdi-delete</v-icon>
            </v-btn>
            <v-card-title class="primary--text text-h3 font-weight-bold">Workout No. {{index+1}}</v-card-title>
            <v-row>
              <v-col cols="12" md="6" v-for="exercise in workout.exercises" :key="exercise._id">
                <v-card flat class="transparent">
                <v-card-title class="primary--text text-h4 font-weight-bold">
                  {{exercise.name}}
                </v-card-title>
                <v-card-text>
                  <p class="primary--text text-body-1 font-weight-bold">Primary Muscles: {{exercise.primary}}</p>
                  <p class="primary--text text-body-1 font-weight-bold">Secondary Muscles: {{exercise.secondary.join(",")}}</p>
                </v-card-text>
                </v-card>        
              </v-col>
            </v-row>                            
          </v-card>
        </v-col>
      </v-row>
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
        } 
      }     
    }
  </script>

<style>
.container {
  position: absolute;
  left: 200px;
  top: 20px;
}

</style>