<template>
  <div class="container text-center">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div id="header">
          <div class="card" style="width: 18rem">
            <img src="../assets/student.png" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">ยินดีต้อนรับ</h5>

              <!-- <img
                src="../assets/imgTest.png"
                class="card-img-bottom"
                style="width: 6rem; border-radius: 50%; overflow: hidden"
              /> -->

              <img
                :src="
                  profile.pictureUrl ? profile.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/4042/4042356.png'
                "
                class="card-img-bottom"
                style="width: 6rem; border-radius: 50%; overflow: hidden"
              />

              <p>คุณ {{ profile.displayName }} สู่</p>
              <h5 class="card-title">School Shop</h5>

              <!-- <p class="card-text">USER NAME</p>
              <p>{{ profile.displayName }}</p> -->
              <a href="https://line.me/ti/p/@675cfnyo" class="btn btn-primary">GOTO Line Chat</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import liff from '@line/liff'
//import SetDataService from '../../services/SetDataService'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      imageProfile: '',
      os: '',
      loggedIn: false,
      profile: {},
      displayName: '',
      userId: '',
      alert: '',
      getParam: '',
      //queryString
      client_id: '',
      userId: '',
      userAgent: '',
      //ipAddress_queryString: '',
      userId_queryString: '',
      ipAddress: '',
      _getIpAddress: '',
      //new_IPADDRESS: '',
      uniqueEventId: '',
      _sessionId: '',
      botUserId: '',
      qryStringBotUid: '',

      //test
      changeUserAgent: '',
      //test: '',
      //line uid
      lineUid: '',
      lineDisplayName: '',
      //data
      data: '',

      // ติดตาม Ads
      _ads_utm_source: '',
      _ads_utm_medium: '',
      _ads_utm_term: '',
      _IP: '',
    }
  },
  mounted() {
    //run liff
    this.qryStringBotUid = this.$route.query.botUserId
    this.liffAdd()
    this.getIpAddress()
  },
  methods: {
    async getIpAddress() {
      this._getIpAddress = await axios.get('https://api.ipify.org?format=text').then(function (response) {
        //console.log('response IP data -->', response.data)
        return response.data
      })
      //console.log('this._getIpAddress ', this._getIpAddress)
    },
    async liffAdd() {
      await liff
        .init({ liffId: '1656824759-eK2GDxqA' })
        // .init({ liffId: process.env.VUE_APP_LIFF_APP_ID }) //******* */
        .then(() => {
          if (!liff.isLoggedIn()) {
            liff.login()
          } else {
            this.loggedIn = liff.isLoggedIn()
            this.os = liff.getOS()
            //

            //this.getProfile()
            this.getFriendship()
            liff.getProfile().then(profile => {
              this.sendMsg() // ใช้ตอนอยู่บน มือถือ ส่วนบน web ไม่ใช้
              this.profile = profile

              //Todo -> function-->
              if ((this.os = 'web')) {
                var gtm_data_onWeb = {
                  botUserId: '', //use
                  lineUid: this.profile.userId, //use
                  lineDisplayName: this.profile.displayName, //use,
                  ipAddress: this._getIpAddress,
                  os: this.os,
                }

                console.log('this os is web')
                console.log('gtm_data_onWeb --> ', gtm_data_onWeb)

                this.findLineUidAndSendGA(this.profile.userId)
              } else {
                var gtm_data_onMobile = {
                  botUserId: this.$route.query.botUserId, //use รับค่าจาก api
                  lineUid: this.profile.userId, //use
                  lineDisplayName: this.profile.displayName, //use,
                  ipAddress: this._getIpAddress,
                  os: this.os,
                }
                console.log('this os is not web')
              }
            })
          }
        })
        .catch(err => {
          this.occoredError = 'error:' + err
        })
    },

    async findLineUidAndSendGA(getLineUid) {
      const setData = {
        lineUid: getLineUid,
        botUserId: this.qryStringBotUid,
      }
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://schoolshopapi-production.up.railway.app/api/audience/findLineUidSendToGA',
        headers: {
          'Content-Type': 'application/json',
        },
        data: setData,
      }

      await axios
        .request(config)
        .then(response => {
          // console.log(JSON.stringify(response.data))
          console.log('response--> ', response)
          console.log('Send event to GA4 OK')
        })
        .catch(error => {
          console.log(error)
        })
    },

    async getFriendship() {
      await liff.getFriendship().then(data => {
        console.log('getFriendship--> ', data)
        if (data.friendFlag) {
          console.log('getFriendship--> = true')
          this.alert = data.friendFlag
        }
      })
    },
    async getAccessToken() {
      console.log('token--> ')
      await liff.getAccessToken().then(token => {
        console.log('token--> ', token)
      })
    },

    async sendMsg() {
      const profile = await liff.getProfile()
      console.log('userId---> ' + profile.userId)

      if (!liff.isInClient()) {
        window.alert('This button is unavailable as LIFF is currently being opened in an external browser.')
      } else {
        await liff
          .sendMessages([
            {
              type: 'text',
              text: 'START',
            },
          ])
          .then(() => {
            console.log('Send message')
          })
          .catch(error => {
            window.alert('Error sending message: ' + error)
          })
      }
    },
  },
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
</style>
