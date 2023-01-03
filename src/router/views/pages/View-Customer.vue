<script>
import axios from 'axios'
  
export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      fname : '',
      lname : '',
      email : '',
      pnum  : '',
      record: [],
      loading: true,
      error: false
    }
  },
  methods: {
    regcust() {
      axios
      .post('http://localhost:3000/customer/RegisterCustomer', {
        params: {
          userFname: this.fname,
          userLname: this.lname,
          userPhone: this.pnum,
          userEmail: this.email,
        },
      })
      .then((response) => {
        alert(response.data.message)
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(() => {
        this.getcust()
      })
    },
    getcust() {
      axios.get('http://localhost:3000/customer/ViewCustomer')
      .then(response => {
        this.record = response.data.data
      })
      .catch(error => {
        console.log(error)
        this.error = true
      })
      .finally(() => {
        this.loading = false
      })
    },
    updatecust(id) {
        this.$router.push({ name: 'updatecustomer', params: { id:id } })
    },
    deletecust(id) {
      axios
      .post('http://localhost:3000/customer/DeleteCustomer', {
        params: {
          id:id,
        },
      })
      .then((response) => {
        alert(response.data.message)
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(() => {
        this.getcust()
      })
    },
    modal(items){
      console.log(items)
      this.fname = items.first_name,
      this.lname = items.last_name,
      this.email = items.email,
      this.pnum  = items.phone
    }
  },
  mounted() {
    this.getcust()
  }
}
</script>

<template>
  <div>
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/insertcustomer">Register</router-link></li>
    </ul>

    <h1>List Customer</h1>
    <div v-if="error">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </div>

    <div v-else>
      <div v-if="loading">Loading...</div>
      
      <table>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="items in record" :key="items.index">
          <td>{{ items.id }}</td>
          <td>{{ items.first_name }}</td>
          <td>{{ items.last_name }}</td>
          <td>{{ items.email }}</td>
          <td>{{ items.phone }}</td>
          <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" @click="modal(items)">View</button></td>
          <td><button class="btn btn-primary" @click="updatecust(items.id)">Update</button></td>
          <td><button class="btn btn-primary" @click="deletecust(items.id)">Delete</button></td>
        </tr>
      </table>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Customer Details</h5>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{{ this.fname }} {{ this.lname }}</th>
                  <th scope="row">{{ this.email }}</th>
                  <th scope="row">{{ this.pnum }}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

table {
  font-family: arial, sans-serif;
  width: 70%;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
}

th {
  border: 1px solid #000000;
  text-align: center;
}

td {
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #111;
}
</style>
