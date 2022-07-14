<template>
 <div class="Exercises">
  <h1 class="text-h3 primary--text">Exercises</h1>
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
      <v-btn class="mr-5 primary text-subtitle-1" height="40" width="135">Add Exercise</v-btn>
    </div>
    <v-card flat class="success pa-7 my-12 ml-15" v-for="exercise in exercises" :key="exercise.name">
      <v-row :class="`pa-3 workout`">
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
            <div class="primary--text text-h5 mt-3">{{exercise.secondary}}</div>
          </v-col>   
          <v-col cols="12" md="3">
            <v-tooltip top>
             <template v-slot:activator="{ on, attrs }">
               <v-btn v-bind="attrs" v-on="on" class="success" depressed>
                <v-icon size="35" class="primary--text">mdi-plus-thick</v-icon>
               </v-btn>
             </template>
              <span>Add Exercise To Current Workout</span>
            </v-tooltip>
          </v-col>      
      </v-row>
    </v-card>
  </v-container>
  
 </div>
</template>

<script>
 import API from "../exerciseAPI"
  export default {
    data(){
      return {
        exercises: []
          
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