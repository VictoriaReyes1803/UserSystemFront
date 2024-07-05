<template>
    <div>
      <v-img class="mx-auto my-6" max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-dark.svg"></v-img>
  
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Create an Account</div>
  
        <v-text-field v-model="name" density="compact" placeholder="Full Name" prepend-inner-icon="mdi-account-outline"
          variant="outlined"></v-text-field>
        <v-text-field v-model="lastName" density="compact" placeholder="Last Name" prepend-inner-icon="mdi-account-outline"
          variant="outlined"></v-text-field>
  
        <v-text-field v-model="email" density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
          variant="outlined"></v-text-field>
  
        <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible"></v-text-field>
  
        <v-text-field v-model="confirmPassword" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          density="compact" placeholder="Confirm your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible"></v-text-field>
  
        <v-btn @click="register" block class="mb-8" color="blue" size="large" variant="tonal">
          Sign Up
        </v-btn>
  
        <v-card-text class="text-center">
            <router-link to="/" class="text-blue text-decoration-none">
            Already have an account? Log In <v-icon icon="mdi-chevron-right"></v-icon>
            </router-link>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useRouter } from 'vue-router';
  import auth from '../auth/auth'
  
  export default {
    data: () => ({
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      visible: false,
    }),
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        try {
        await auth.register(this.name,this.lastName,this.email, this.password);

            Swal.fire({
            icon: 'success',
            title: 'Registration successful!',
            showConfirmButton: false,
            timer: 1500
            }).then(() => {
          const router = useRouter();
          this.$router.push({ path: '/' });
            //router.push({ path: '/' });
          });
        } catch (error) {
          console.error(error);
          }
      },
    },
  };
  </script>
  