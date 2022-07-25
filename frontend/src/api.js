const axios = require("axios")
const url = "/api/workouts"

export default class API{
    //to get all the posts from the server
    static async getAllWorkouts(){
        const res=await axios.get(url)
        return res.data
    }

     //to get single post by ID from the server
     static async getWorkoutByID(id){
        const res=await axios.get(`${url}/${id}`)
        return res.data
    }

     //to delete post
     static async deleteWorkout(id){
        const res=await axios.delete(`${url}/${id}`)
        return res.data
    }

    //to insert post into database
    static async addWorkout(post){
        const res=await axios.post(url,post)
        return res.data
    }

     //to update post into database
     static async updateWorkout(id,post){
        const res=await axios.patch(`${url}/${id}`,post)
        return res.data
    }
}
    


