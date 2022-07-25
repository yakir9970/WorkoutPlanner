        <template>
        <div class="MyWorkouts">
        <h1 class="text-h3 primary--text font-weight-bold">Workout No. {{this.$route.params.index+1}}</h1>
        <div class="test">  
            <v-btn  class="primary" :to="{name:'Exercises', params:{currentWorkout:workout.exercises, workoutObj:workout}}">Add Exercises</v-btn>   
            <v-btn class="transparent" depressed >
                <v-icon x-large class="primary--text">mdi-pencil</v-icon>
            </v-btn>
        </div>
        
        <v-container class="my-5">
            <v-row >
                <v-card width="700" class="secondary mt-10" elevation="10" >
                    <v-col cols="12" v-for="(exercise,index) in workout.exercises" :key="exercise._id">
                        <v-btn absolute right depressed class="transparent white--text" :to="{name: 'Workout', params: {id:workout._id, index:index}}">
                            <v-icon x-large class="mt-8 mr-10 primary--text">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn absolute right depressed class="transparent white--text" @click="deleteExerciseFromWorkout(exercise)">
                            <v-icon x-large class="mt-8 mr-n7 primary--text">mdi-delete</v-icon>
                        </v-btn>
                        <v-divider v-if="index>0" class="primary mt-n5 mb-3"></v-divider>
                        <v-card-title class="primary--text text-h4 font-weight-bold">
                            {{exercise.name}}
                        </v-card-title>                        
                        <v-card-text>
                            <p class="primary--text text-h6 font-weight-bold">Primary Muscles: {{exercise.primary}}</p>
                            <p class="primary--text text-h6 font-weight-bold">Secondary Muscles: {{exercise.secondary.join(",")}}</p>
                            <p class="primary--text text-h6 font-weight-bold">Reps: {{exercise.reps}}</p>
                            <p class="primary--text text-h6 font-weight-bold">Load(kg): {{exercise.load}}</p>

                        </v-card-text>
                    </v-col>
                </v-card>        
            </v-row>  
        </v-container>
        </div>
        </template>

        <script>
        import API from "../api"

        export default {
            data(){
            return {
                workout: {},
            }
            },
             methods:{
                deleteExerciseFromWorkout(exercise){
                    this.workout.exercises=this.workout.exercises.filter(e=>e!=exercise);
                    if(this.workout.exercises.length>0)
                        this.updateWorkout();
                    else
                        this.deleteWorkout();
                },
                async updateWorkout(){
                    const response = await API.updateWorkout(this.workout._id,this.workout);
                    this.$router.push({ name: "Workout", params: {message: response.message} });
                },
                async deleteWorkout(){
                    const response = await API.deleteWorkout(this.workout._id);
                    this.$router.push({name: 'MyWorkouts', params: {message: response.message}});
                }
            },
            async created(){
            this.workout = await API.getWorkoutByID(this.$route.params.id)
            }
        }
        </script>

        <style>
        .v-card {
            margin: 0 auto;
        }
        .checkBox {
            position: absolute;
            left: 650px;
            transform: scale(1.5);
         }
         .test {
            position: fixed;
            right: 400px;
        }
        </style>