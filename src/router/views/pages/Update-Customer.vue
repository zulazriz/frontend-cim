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
      id : '',
      record: [],
      loading: true,
      error: false
    }
  },
  methods: {
    getspecificcust() {
      axios
      .get('http://localhost:3000/customer/ViewSpecificCustomer', {
        params: {
          id: this.$route.params.id,
        },
      })
      .then((response) => {
        this.id = response.data.data[0].id
        this.fname = response.data.data[0].first_name
        this.lname = response.data.data[0].last_name
        this.email = response.data.data[0].email
        this.pnum = response.data.data[0].phone
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    updatecust() {
      axios
      .post('http://localhost:3000/customer/UpdateCustomer', {
        params: {
          id: this.$route.params.id,
          userFname: this.fname,
          userLname: this.lname,
          userEmail: this.email,
          userPhone: this.pnum
        },
      })
      .then((response) => {
        console.log(response.data.status)
        if (response.data.status == 'berjaya') {
          alert("Successfully updated");
          this.getspecificcust()
        }else {
          alert("Error updating!");
        }
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(() => {
        this.$router.push({ name: 'viewcustomer'})
      })
    },
    deletecust() {
      axios
      .post('http://localhost:3000/customer/DeleteCustomer', {
        params: {
          id: this.$route.params.id,
          userFname: this.fname,
          userLname: this.lname,
          userEmail: this.email,
          userPhone: this.pnum
        },
      })
      .then((response) => {
        console.log(response.data.status)
        if (response.data.status == 'berjaya') {
          alert("Successfully deleted");
          this.getspecificcust()
        }else {
          alert("Error deleting!");
        }
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getspecificcust()
  }
}
</script>

<template>
  <div>
    <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/insertcustomer">Register</router-link></li>
    </ul>

    <h1>Update Customer</h1>
    
    <form @submit.prevent="updatecust">
      <label for="fname">First name:</label><br>
      <input type="text" id="fname" v-model="fname"><br>
      <label for="lname">Last name:</label><br>
      <input type="text" id="lname" v-model="lname"><br><br>
      <label for="email">Email:</label><br>
      <input type="email" id="email" v-model="email"><br><br>
      <label for="pnum">Phone:</label><br>
      <input type="tel" id="pnum" v-model="pnum"><br><br>
      <input type="submit" value="Submit">
    </form> 
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
