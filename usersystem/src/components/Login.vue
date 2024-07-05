<template>
  <div>
    <v-img class="mx-auto my-6" max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-dark.svg"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field v-model="email" density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          Forgot login password?</a> -->
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>

      <v-btn @click="login" block class="mb-8" color="blue" size="large" variant="tonal">
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <router-link to="/register" class="text-blue text-decoration-none">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import auth from '../auth/auth'
export default {
  data: () => ({
    email: '',
    password: '',
    visible: false,
  }),
  methods: {
    async login() {
      try {
        const response = await auth.login(this.email, this.password);
        const user = {
          email: this.email
        }
        auth.setUserLogged(user);

        if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.$router.push('/home');});}
           else {
            console.error('Unexpected response:', response);
            alert('Login failed. Please check your credentials.');};

      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) 
        {
        // Mostrar mensaje solo si es un error 404
        alert('User not found. Please check your credentials.');}
         else {
        // Otros errores, muestra mensaje genérico de fallo de inicio de sesión
        alert('Login failed. Please check your credentials.');
      }
      }
    },
  },
};
</script>