  <template>
    <v-container class="ml-10">
      <v-row no-gutters class="mr-14" >
        <v-col cols="12" md="6" class="pa-3" v-for="(workout,index) in workouts" :key="workout._id">
          <v-card flat class="accent">
            <v-card-title class="white--text text-h2">Workout No. {{index+1}}</v-card-title>
            <v-row>
              <v-col cols="12" md="6" v-for="exercise in workout.exercises" :key="exercise._id">
                <v-card flat class="accent">
                  <v-btn absolute right depressed class="accent" :to="{name: 'Workout', params: {id:workout._id}}">
                    <v-icon>mdi-open-in-new</v-icon>
                  </v-btn>
                <v-card-title class="white--text text-h4">
                  {{exercise.name}}
                </v-card-title>
                <v-card-text>
                  <p class="white--text text-body-1">Primary Muscles: {{exercise.primary}}</p>
                  <p class="white--text text-body-1">Secondary Muscles: {{exercise.secondary}}</p>
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
          workout: {}
        }
      },              
        async created(){
          this.workouts = await API.getWorkoutByID(this.$route.params.id);
        }      
      
    }
  </script>
