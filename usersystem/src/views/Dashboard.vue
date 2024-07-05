<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Welcome, {{ currentUser && currentUser.name }} {{ currentUser && currentUser.lastname }} to your Dashboard!
              <v-btn icon @click="toggleInfo">
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
              <v-btn color="primary" @click="showAddUserDialog">Add User</v-btn>

            <div v-if="showUserInfo">
              <h3>User Information</h3>
              <p><strong>Name:</strong> {{ currentUser.name }}</p>
              <p><strong>Last Name:</strong> {{ currentUser.lastname }}</p>
              <p><strong>Email:</strong> {{ currentUser.email }}</p>
              
            </div>
            <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
            </v-card-title>
            
            <v-card-text>
            <v-alert v-if="loading" type="info">
                    Loading users...
                  </v-alert>
              <v-data-table
                :headers="headers"
                :items="users"
                 class="elevation-1"
                 :loading="loading"
                 :search="search"
                 loading-text="Loading..."
                item-key="id"
                no-data-text="No users available"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="showEditUserDialog(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteUser(item.id)" v-if="!isProfile || item.id !== currentUser.id">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
              
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="logout">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- Add User Dialog -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="user.name" label="Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="user.lastname" label="Last Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="user.email" label="Email"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="user.password" label="Password"></v-text-field>
                  </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
    import auth from '../auth/auth';
  export default {
    data() {
      return {
        dialog: false,
        dialogTitle: '',
        user: {
          id: null,
          name: '',
          lastname: '',
          email: '',
            password: ''
        },
        users: [],
        loading: false,
        currentUser: null,
        showUserInfo: false,
        isProfile: false,
        search: '',
        headers: [
          { text: 'Name', align: 'start', value: 'name' },
          { text: 'Last Name', value: 'lastname' },
          { text: 'Email', value: 'email' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      };
    },
    async created() {
    this.me();
    await this.getUsers();
      
    },
    methods: {
     async me(){
            const response =await auth.me();
            this.currentUser = response.data;
            console.log('Current User:', this.currentUser);
            this.isProfile = true;
        },
        async getUsers() {
        this.loading = true;
        try {
          const response = await auth.getusers();
          this.users = response.data;
          console.log('users', this.users);
        } catch (error) {
          console.error('Error fetching users:', error);
        } finally {
          this.loading = false;
       
        }
    },
      logout() {
        auth.logout();
        this.$router.push('/');
      },
      showAddUserDialog() {
        this.dialogTitle = 'Add User';
        this.user = { id: null, name: '', lastname: '', email: '' , password: ''};
        this.dialog = true;
      },
      showEditUserDialog(user) {
        this.dialogTitle = 'Edit User';
        this.user = Object.assign({}, user);
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
      },
      saveUser() {
        if (this.user.id) {
          console.log('user', this.user);
          auth.edituser(this.user.id, this.user.name, this.user.lastname, this.user.email);
          const index = this.users.findIndex(u => u.id === this.user.id);
          if (index !== -1) {
            this.users.splice(index, 1, this.user);
          }
        } else {
          auth.register(this.user.id, this.user.name, this.user.lastname, this.user.email, this.user.password);
          this.user.id = this.users.length + 1;
        }
        this.closeDialog();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User saved successfully!',
        });
      },
      deleteUser(id) {
        auth.deleteuser(id);
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
      },
      toggleInfo() {
        this.showUserInfo = !this.showUserInfo;
    },
    }, 
    
   
  };
  </script>
  
  <style scoped>
  
  </style>
  