        <template>
        <div class="MyWorkouts">
        <h1 class="text-h3 primary--text font-weight-bold">Workout No. {{this.$route.params.index+1}}</h1>
        <div class="test">  
            <v-btn  class="primary">Reset Workout|not working</v-btn>   
            <v-btn class="transparent" depressed >
                <v-icon x-large class="primary--text">mdi-pencil</v-icon>
            </v-btn>
        </div>
        
        <v-container class="my-5">
            <v-row >
                <v-card width="700" class="success mt-10">
                    <v-col cols="12" v-for="(exercise,index) in workout.exercises" :key="exercise._id">
                        <v-divider v-if="index>0" class="primary mt-n5 mb-3"></v-divider>
                        <v-card-title class="primary--text text-h4 font-weight-bold">
                            {{exercise.name}}
                        </v-card-title>                        
                        <v-checkbox  class="checkBox"></v-checkbox>                 
                        <v-card-text>
                            <p class="primary--text text-h6 font-weight-bold">Primary Muscles: {{exercise.primary}}</p>
                            <p class="primary--text text-h6 font-weight-bold">Secondary Muscles: {{exercise.secondary}}</p>
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