<template>
    <v-dialog persistent no-click-animation width="700px" v-model="dialog">
        <template v-slot:activator="{ on, attrs}">
        <v-btn depressed class="success" v-bind="attrs" v-on="on">
            <v-icon size="35" class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        </template>
        <v-card>
            <v-card-title class="pt-1">
                <h2 class="primary--text mt-4">Edit Exercise</h2>
                <v-spacer></v-spacer>
                <v-icon @click="close" class="ma-n4" x-large color="primary">mdi-close-circle-outline</v-icon>
            </v-card-title>
            <v-card-text>
                <v-form class="pa-3" ref="form">
                    <v-text-field v-model="exercise.name" prepend-icon="mdi-card-text" :rules="inputRules"></v-text-field>
                    <v-select v-model="exercise.primary" prepend-icon="mdi-numeric-1-box-multiple" :rules="inputRules" :items="muscles"></v-select>
                    <v-select v-model="exercise.secondary" prepend-icon="mdi-numeric-2-box-multiple" multiple :rules="inputRules" :items="muscles"></v-select>
                    <v-btn @click="submit" x-large class="submit" color="primary">Submit</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>              

<script>
import API from "../exerciseAPI"
export default {
    props: {
        exercise:{
            _id: String,
            name: String,
            primary: String,
            secondary: [String]
    }
    },
    data(){
        return{
            dialog:false,
            muscles: ["Upper Back","Biceps","Triceps","Upper Chest"],
            inputRules: [
                v=> v.length>0 || 'This Field Is Required!'
            ],
        }
    },
    methods: {
        async submit(){
            if(this.$refs.form.validate()){
                 const exerciseModel = {
                name: this.exercise.name,
                primary: this.exercise.primary,
                secondary: this.exercise.secondary
            }
               
                const response = await API.updateExercise(this.exercise._id,exerciseModel);
                this.$router.push({ name: "Exercises", params: {message: response.message} })
                this.close();
                window.location.reload();
            }
        },
        close(){
            this.$refs.form.resetValidation();
            this.dialog=false;
        },
    },
}
</script>

<style>
.submit {
    margin-top: 16px;
    position: relative;
    left: 250px;
}
</style>