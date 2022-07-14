<template>
  <v-app >
   <Navbar />
    <v-content class="success">
      <router-view class="mx-10 mt-4">
        
      </router-view>
    </v-content>
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
