<template>
  <v-app >
   <Navbar />
    <v-main class="success">
      <router-view class="mx-10 mt-4">
        
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
