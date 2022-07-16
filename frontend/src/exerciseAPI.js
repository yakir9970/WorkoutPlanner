const axios = require("axios")
const url = "/api/exercises"

export default class API{
    //to get all the posts from the server
    static async getAllExercises(){
        const res=await axios.get(url)
        return res.data
    }

     //to get single post by ID from the server
     static async getExerciseByID(id){
        const res=await axios.get(`${url}/${id}`)
        return res.data
    }

     //to delete post
     static async deleteExercise(id){
        const res=await axios.delete(`${url}/${id}`)
        return res.data
    }

    //to insert post into database
    static async addExercise(post){
        const res=await axios.post(url,post)
        return res.data
    }
}
    


