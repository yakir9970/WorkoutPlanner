import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
   iconfont: 'md',
   theme: {
      themes:{
         light:{
            primary: "#06283D",
            secondary: "#1363DF",
            accent: "#47B5FF",
            success: "#DFF6FF",
         }
      }
      
   }
});
