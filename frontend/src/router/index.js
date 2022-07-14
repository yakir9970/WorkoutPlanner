import Vue from 'vue'
import VueRouter from 'vue-router'
import MyWorkouts from '../views/MyWorkouts.vue'
import Exercises from '../views/Exercises.vue'
import ShowWorkout from '../views/ShowWorkout.vue'
import Workout from '../views/Workout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MyWorkouts',
    component: MyWorkouts
  },
  {
    path: '/Exercises',
    name: 'Exercises',
    component: Exercises
  },
  {
    path: '/workout/:id',
    name: 'Workout',
    component: Workout
  },
  {
    path: '/Show-Workout',
    name: 'ShowWorkout',
    component: ShowWorkout
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
