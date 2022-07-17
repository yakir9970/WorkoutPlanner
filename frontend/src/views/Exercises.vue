<template>
 <div class="Exercises">
  <h1 class="text-h3 primary--text">My Exercises</h1>
  <v-container fluid class="my-5">
    <div class="test">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="transparent" depressed>
          <v-icon size="50" class="primary--text">mdi-archive-eye-outline</v-icon>
        </v-btn>
        </template>
        <span>View Current Workout</span>
      </v-tooltip>
        <Popup />
    </div>
    <v-card elevation="10" max-width="1600" class="secondary pa-7 my-12 ml-15" v-for="exercise in exercises" :key="exercise._id">
      <v-row :class="`pb-3 mr-n10 workout`">
          <v-col cols="12" md="3">
            <div class="primary--text ">Exercise Name</div>
            <div class="primary--text text-h5 mt-3">{{exercise.name}}</div>
          </v-col>   
          <v-col cols="12" md="3">
            <div class="primary--text ">Primary Muscle</div>
            <div class="primary--text text-h5 mt-3">{{exercise.primary}}</div>
          </v-col>  
          <v-col cols="12" md="3">
            <div class="primary--text ">Secondary Muscles</div>
            <div class="primary--text text-h5 mt-3">{{exercise.secondary.join(",")}}</div>
          </v-col>   
          <v-col class="mt-n4" align="right" cols="12" md="3">
            <v-tooltip top>
             <template v-slot:activator="{ on, attrs }">
               <v-btn v-bind="attrs" v-on="on" class="secondary" depressed>
                <v-icon size="35" class="primary--text">mdi-plus-thick</v-icon>
               </v-btn>
             </template>
              <span>Add Exercise To Current Workout</span>
            </v-tooltip>
            <v-tooltip top>
             <template v-slot:activator="{ on, attrs }">
               <v-btn @click="deleteExercise(exercise._id)" v-bind="attrs" v-on="on" class="secondary" depressed>
                <v-icon size="35" class="primary--text">mdi-delete</v-icon>
               </v-btn>
             </template>
              <span>Delete Exercise</span>
            </v-tooltip>
            <EditPopup :exercise="exercise"/>  
          </v-col>   
      </v-row>
    </v-card>

  </v-container>
  
 </div>
</template>

<script>
 import API from "../exerciseAPI"
 import Popup from "../components/Popup.vue"
  import EditPopup from "../components/EditPopup.vue"
  export default {
    components: {Popup,EditPopup},
    data(){
      return {
        exercises: [],
      }
    },
    methods: {
      async deleteExercise(id){
            const response = await API.deleteExercise(id)
            this.$router.push({name: 'Exercises', params: {message: response.message}})
            window.location.reload();
        } 
    },
  async created(){
    this.exercises=await API.getAllExercises();
  }
  }
</script>

<style>
.workout{
  border-left: 4px solid #47B5FF;
}
.test {
  position: fixed;
  right: 400px;
}
</style>