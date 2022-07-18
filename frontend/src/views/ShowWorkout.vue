        <template>
        <div class="ShowWorkouts">
        <div class="test">  
          <v-btn @click="addWorkout()" :disabled="disable" x-large class="mt-6 primary">Add Current Workout</v-btn>   
        </div>
        <v-container class="my-5">
            <v-row >
                <v-card width="700" elevation="10" max-width="1600" class="secondary mt-10">
                    <v-col cols="12" v-for="(exercise,index) in workout" :key="exercise._id">
                        <v-divider v-if="index>0" class="primary mt-n5 mb-3"></v-divider>
                        <v-card-title class="primary--text text-h4 font-weight-bold">
                            {{exercise.name}}
                        </v-card-title>                        
                        <v-card-text>
                            <p class="primary--text text-h6 font-weight-bold">Primary Muscles: {{exercise.primary}}</p>
                            <p class="primary--text text-h6 font-weight-bold">Secondary Muscles: {{exercise.secondary.join(",")}}</p>
                        </v-card-text>
                    </v-col>
                </v-card>        
            </v-row>  
        </v-container>
        </div>
        </template>

        <script>
          import API from '../api'

        export default {
            data(){
            return {
                workout: [],
            }
            },
             methods:{
                async addWorkout(){
                const response = await API.addWorkout(this.workout);
                console.log(response);
                this.$router.push({ name: "MyWorkouts", params: {message: response.message} })
              },
            },
            computed: {
              disable : ({ workout }) => workout.length === 0
            },
            
            async created(){
            this.workout = this.$route.params.currentWorkout;
            }
        }
        </script>

        <style>
        .v-card {
            margin: 0 auto;
        }
         .test {
            position: fixed;
            right: 400px;
        }
        .v-divider {
          border-width: 2px;
        }
        </style>