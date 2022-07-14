<template>
    <nav>
        

        <v-app-bar flat app class="primary" clipped-right>
            
            <v-toolbar-title class="accent--text">
                <div class="mb-n2 font-weight-bold">Workout Planner</div>
                <div class="font-weight-light">Do You Even Lift?</div>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- <v-app-bar-nav-icon class="accent--text" @click="drawer=!drawer"></v-app-bar-nav-icon> -->
        </v-app-bar>

        <v-navigation-drawer width="350" clipped right v-model="drawer" app class="accent">
            <v-layout column align-center>
                <v-row class="my-10">
                    <v-avatar size="200">
                        <img src="/logo.png" alt="">
                    </v-avatar>
                </v-row>
            </v-layout>
            <v-list>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-icon>
                        <v-icon class="text-h4 success--text">{{link.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="text-h4 success--text">{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list> 
            <v-layout column align-center>
                <v-row class="button-row">
                    <v-btn x-large class="text-h5 mb-16 primary success--text" shaped>Log Out</v-btn>
                </v-row>   
            </v-layout>        
        </v-navigation-drawer>
    </nav>
</template>

<script>

export default {
    data(){
        return{
            drawer: true,
            links: [
                {icon: 'mdi-home-outline', text: 'My Workouts', route:'/'},
                {icon: 'mdi-eye-outline', text: 'Show Workout', route:'/Show-Workout'},
                {icon: 'mdi-information-outline', text: 'Exercises', route:'/Exercises'},
            ]
        } 
    } 
}
</script>

<style>
.button-row {
    position: absolute;
    bottom:0;
}
</style>