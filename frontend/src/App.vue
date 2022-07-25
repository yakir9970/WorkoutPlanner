<template >
  <v-app >
   <Navbar />
    <v-main class="success">
      <router-view class="main">
        
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {Navbar},
  data: () => ({
    //
  }),
};
</script>

<style>
.main{
  background-color: #effeff;
  margin-top: -50px;
  margin-left: -200px;
  padding-left: 200px;
  min-width: 100%;
}
</style>