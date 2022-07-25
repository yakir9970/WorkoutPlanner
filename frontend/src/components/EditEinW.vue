<template>
    <v-dialog overlay-opacity="0.9" overlay-color="#dfe6ff" transition="dialog-bottom-transition" persistent no-click-animation width="700px" v-model="dialog">
        <template v-slot:activator="{ on, attrs}">
        <v-btn depressed absolute right class="secondary mr-7 mt-4" v-bind="attrs" v-on="on">
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
                    <v-text-field disabled v-model="exercise.name" prepend-icon="mdi-card-text"></v-text-field>
                    <v-text-field disabled v-model="exercise.primary" prepend-icon="mdi-numeric-1-box-multiple" ></v-text-field>
                    <v-text-field disabled v-model="exercise.secondary" prepend-icon="mdi-numeric-2-box-multiple"></v-text-field>
                    <v-text-field v-model="exercise.reps" prepend-icon="mdi-counter" :rules="inputRules"></v-text-field>
                    <v-text-field v-model="exercise.load" prepend-icon="mdi-counter" :rules="inputRules"></v-text-field>

                    <v-btn @click="submit" x-large class="submit" color="primary">Submit</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>              

<script>
import API from "../api"
export default {
    props: {
        exercise:{
            _id: String,
            name: String,
            primary: String,
            secondary: [String],
            reps: Number,
            load: Number,
    },
    workout:{},
    },
    data(){
        return{
            dialog:false,
            index:null,
            muscles: ["Upper Back","Biceps","Triceps","Upper Chest"],
            inputRules: [
                v=> !!v || "This Field Is Required!",
                v => Number.isInteger(Number(v)) || "The Input Must Be A Number",
                v=> v>0||"The Input Must Be A Positive Number"            ],
        }
    },
    methods: {
        async submit(){
            if(this.$refs.form.validate()){
                 const exerciseModel = {
                _id: this.exercise._id,
                name: this.exercise.name,
                primary: this.exercise.primary,
                secondary: this.exercise.secondary,
                reps:this.exercise.reps,
                load:this.exercise.load
            }
               this.index=this.workout.exercises.findIndex(({_id})=>_id==this.exercise._id);
                this.workout.exercises[this.index]=exerciseModel;
                const response = await API.updateWorkout(this.workout._id,this.workout);
                this.$router.push({ name: "Workout", params: {message: response.message} })
                this.close();
                window.location.reload();
            }
        },
        close(){
            this.$refs.form.resetValidation();
            this.dialog=false;
            window.location.reload();
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