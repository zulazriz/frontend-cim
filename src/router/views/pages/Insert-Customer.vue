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
          userEmail: this.email,
          userPhone: this.pnum
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
    }
  },
  mounted() {
    this.getcust()
  }
}
</script>

<template>
  <div id="app">
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/insertcustomer">Register</router-link></li>
    </ul>

    <h1>Register</h1>
    <form @submit.prevent="regcust">
      <label for="fname">First name:</label><br>
      <input type="text" id="fname" v-model="fname" value="John"><br>
      <label for="lname">Last name:</label><br>
      <input type="text" id="lname" v-model="lname" value="Doe"><br><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" v-model="email" value=""><br><br>
      <label for="pnum">Phone:</label><br>
      <input type="tel" id="pnum" v-model="pnum" value=""><br><br>
      <input type="submit" value="Submit">
    </form> 

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
        </tr>
        <tr v-for="items in record" :key="items.index">
          <td>{{ items.id }}</td>
          <td>{{ items.first_name }}</td>
          <td>{{ items.last_name }}</td>
          <td>{{ items.email }}</td>
          <td>{{ items.phone }}</td>
        </tr>
      </table>
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
  border-collapse: collapse;
  width: 70%;
  margin-top: 50px;
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
