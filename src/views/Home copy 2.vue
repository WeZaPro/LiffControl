<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <!-- <div class="card" style="width: 18rem">
          <img src="../assets/student.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <imgCicle src="../assets/imgTest.png" class="card-img-buttom" alt="..." />
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div> -->
      </div>
      <div class="col">
        <div id="header">
          <div class="card" style="width: 18rem">
            <img src="../assets/student.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">ยินดีต้อนรับ สู่</h5>
              <h5 class="card-title">School Shop</h5>

              <!-- <img src="../assets/manicon.png" class="card-img-bottom" alt="..." /> -->

              <!-- <img
                src="../assets/imgTest.png"
                class="card-img-bottom"
                style="width: 14rem; border-radius: 800px; overflow: hidden"
              /> -->
              <img
                src="../assets/imgTest.png"
                class="card-img-bottom"
                style="width: 6rem; border-radius: 50%; overflow: hidden"
              />

              <p class="card-text">USER NAME</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <!-- <div class="card" style="width: 18rem">
          <img src="../assets/imgTest.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div> -->
      </div>
    </div>
  </div>

  <!-- <div class="card text-center">
    <div id="header">
      <div class="card" style="width: 24rem">
        <img src="../assets/student.png" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import liff from '@line/liff'

import axios from 'axios'
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fcfcfc;
  margin-top: 10px;
}
#header {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444242;
  margin-top: 10px;
}
/* #imgProfile {
  width: 65%;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
} */
#btnA {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 0.8em;
  font-weight: 100;
  color: #f7f8f8;
  background-color: rgb(34, 0, 255);
  margin-top: 60px;
  width: 300px; /* was 150, now 150px */
  height: 150px;
}

/* img {
  width: 65%;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
} */
#imgCicle {
  width: 65%;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
