<template>
 <div class="Exercises">
  <!-- <h1 class="text-h3 primary--text">My Exercises</h1> -->
  <v-container fluid class="my-5 pt-10">
    <div class="test">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
        <v-btn icon :disabled="disable" :to="{name: 'ShowWorkout', params: {currentWorkout: currentWorkout, workoutObj}}" v-bind="attrs" v-on="on" class="transparent mr-5" depressed>
          <v-icon size="50" class="primary--text">mdi-archive-eye-outline</v-icon>
          <h1 :class="changeColor(disable)">({{currentWorkout.length}})</h1>
        </v-btn>
        </template>
        <span>View Current Workout</span>
      </v-tooltip>
        <Popup />
    </div>
    <div class="sort">
      <!-- NOT WORKING, CHANGING ORDER AFFECTS + SIGNS -->
      <!-- <v-menu offset-y rounded="lg" transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
        <v-btn color="transparent primary--text font-weight-bold" depressed v-bind="attrs" v-on="on">
          <v-icon left>
            mdi-sort-ascending
          </v-icon>
        Sort By</v-btn>
      </template>
        <v-list>
          <v-list-item @click="sortBy('name')" class="primary--text font-weight-bold">Exercise Name</v-list-item>
          <v-list-item @click="sortBy('primary')" class="primary--text font-weight-bold">Primary Muscle</v-list-item>
        </v-list>
      </v-menu> -->
      
      <!-- <div  v-for="muscle in filters" :key="muscle">
        <v-chip v-if="chip" small color="primary font-weight-bold" outlined  close @click:close="filterBy(muscle)">{{muscle}}</v-chip>
      </div> -->
      
    </div>
    
     <v-list disabled color="success" class="filter">
      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="primary--text">[PROBLEM!]Filter By Muscle</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item :filter="filterExercises" class="ml-n10" v-for="child in muscles" :key="child">
           <template v-slot:default="{ active }">
            <v-list-item-action @click="filterBy(child)">
              <v-checkbox  :input-value="active"></v-checkbox>
            </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="primary--text" v-text="child"></v-list-item-title>
          </v-list-item-content>
           </template>
        </v-list-item>
      </v-list-group>
    </v-list>
   
    <v-card elevation="10" max-width="1600" class="secondary pa-7 mb-12 mt-16 ml-15" v-for="(exercise,index) in exercises" :key="exercise._id" ref="input">
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
               <v-btn @click="addExercise(exercise,index)" v-bind="attrs" v-on="on" class="secondary" depressed>
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
        currentWorkout: [],
        event: "",
        temp: [],
        filters: [],
        workoutObj: {},
        //primaryFilter:"",
        //chip:false,
        muscles:["Biceps","Triceps","Upper Back","Upper Chest"],
      }
    },
    methods: {   
      changeColor(disable){
        if(disable){
          return "mr-7 ml-2";
        }
        else{
          return "primary--text mr-7 ml-2";
        }
      }, 
      sortBy(prop){
          this.exercises.sort((a,b)=> a[prop].toLowerCase() < b[prop].toLowerCase() ? -1:1);
          console.log(this.$refs.input);
      },
      filterBy(event){
        if(this.filters.length==0&&this.event!=""){
          this.event="";
          //this.chip=false;
          //this.filters=this.filters.filter(e=>e!==event);
        }
        else{
          this.event=event;
          //this.chip=true;
           if(!this.filters.includes(event))
             this.filters.push(this.event);
             else{
              this.filters.filter(e=>e!==this.event);
             }
        }
        this.primaryFilter=this.event;
      },
      async deleteExercise(id){
            const response = await API.deleteExercise(id)
            this.$router.push({name: 'Exercises', params: {message: response.message}})
            window.location.reload();
        },
        addExercise(exercise,index){
          if(this.$refs.input[index].$el.childNodes[0].childNodes[3].childNodes[0].childNodes[0].childNodes[0].classList[4]=="mdi-plus-thick"){
            this.currentWorkout.push(exercise);
            this.$refs.input[index].$el.childNodes[0].childNodes[3].childNodes[0].childNodes[0].childNodes[0].classList.replace("mdi-plus-thick","mdi-minus-thick");
          }
          else{
            this.currentWorkout=this.currentWorkout.filter(function(obj){
              return obj._id!==exercise._id;
            });
            this.$refs.input[index].$el.childNodes[0].childNodes[3].childNodes[0].childNodes[0].childNodes[0].classList.replace("mdi-minus-thick","mdi-plus-thick");
          }
          

        },
            },
    computed: {
      disable : ({ currentWorkout }) => currentWorkout.length === 0,
      filterExercises(){
        this.exercises=this.temp;
        if(this.event!=""&&this.event.toLowerCase()!='all'){
          this.exercises= this.exercises.filter(r=>r.secondary.includes(this.event)||r.primary==this.event);
        }
        else{
          this.exercises=this.temp;
        }
      },
    },
  async created(){
    if(this.$route.params.currentWorkout!=null){
      this.currentWorkout=this.$route.params.currentWorkout;
      this.workoutObj=this.$route.params.workoutObj;
    }
    this.exercises=await API.getAllExercises();
    if(this.temp.length==0){
      this.temp=this.exercises;
    }
  },
    mounted() {
    const interval = setInterval(() => {
      if (this.$refs.input) {
        clearInterval(interval);
      }
    }, 50)
  }
  
  }
</script>

<style scoped>
.workout{
  border-left: 4px solid #47B5FF;
}
.test {
  position: fixed;
  right: 400px;
}
.sort {
  position: fixed;
  margin-top: 30px;
  margin-bottom: -45px;
  left: 100px;
}
.menu-primary {
  text-transform: capitalize;
}
.filter {
  position: fixed;
  left: 20px;
  top: 200px;
  width: 230px;
}
.Exercises{
  margin-top: -20px;
  margin-left: 0px;
}


</style>