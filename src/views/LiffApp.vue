<template>
  <div id="header">
    <h3>HI CONGRATULATIONS LIFF IN CHAT-Use</h3>
    <p>{{ profile.displayName }}</p>
    <h3>lineUserId</h3>
    <p>{{ profile.userId }}</p>
    <h3>botUserId:</h3>
    <p>{{ this.qryStringBotUid }}</p>
    <h3>ipAddress</h3>
    <p>{{ this._getIpAddress }}</p>
    <h3>os</h3>
    <p>{{ this.os }}</p>

    <!-- <h3>userId</h3>
    <p>{{ this.userId_queryString }}</p> -->
  </div>

  <div id="app">
    <!-- <img :src="profile.pictureUrl" width="150" height="150" /> -->
    <img
      :src="profile.pictureUrl ? profile.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/4042/4042356.png'"
      width="150"
      height="150"
    />

    <p id="displayName">{{ profile.displayName }}</p>
    <p id="userId">{{ profile.userId }}</p>
    <p id="os">{{ os }}</p>
    <p id="botUserId">{{ this.botUserId }}</p>
    <!-- <p id="ipAddress">{{ this.ipAddress }}</p>
    <p id="userAgent">{{ this.userAgent }}</p>
    <p id="sessionId">{{ this._sessionId }}</p> -->

    <!-- <p>param : {{ this.getParam }}</p> -->
  </div>
  <!-- <div id="btnA">
    <button @click="openLineChat">Line@</button>
  </div> -->

  <!-- <a href="https://line.me/ti/p/@798hmctv">
    <button id="btn">LINE @</button>
  </a> -->
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
  // Url Dev = https://liff.line.me/1656824759-PrZzVE5w/?botUserId=Uad26c3928a8f42fb5eb677bf560bf07f
  mounted() {
    //run liff
    this.qryStringBotUid = this.$route.query.botUserId
    this.liffAdd()
    this.getIpAddress()
  },
  methods: {
    openLineChat() {
      window.open('https://line.me/ti/p/@798hmctv', '_blank')
    },
    async getIpAddress() {
      this._getIpAddress = await axios.get('https://api.ipify.org?format=text').then(function (response) {
        //console.log('response IP data -->', response.data)
        return response.data
      })
      //console.log('this._getIpAddress ', this._getIpAddress)
    },
    async liffAdd() {
      await liff
        .init({ liffId: '1656824759-PrZzVE5w' })
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

                //alert('this os -->', liff.getOS())
                // todo on web
                // qry_ipAddress from Mongo *******
                // findAndUpdate
                // update gtm_data_onWeb to Mongo

                //next after save db
                // redirect to line app with qrcode

                //https://line.me/ti/p/@798hmctv
                //line://app/
                //window.location.href = 'https://line.me/ti/p/@798hmctv'
              } else {
                var gtm_data_onMobile = {
                  botUserId: this.$route.query.botUserId, //use รับค่าจาก api
                  lineUid: this.profile.userId, //use
                  lineDisplayName: this.profile.displayName, //use,
                  ipAddress: this._getIpAddress,
                  os: this.os,
                }
                //alert('this os ==>', this.os)
                console.log('this os is not web')
                // todo on mobile
                // get line bot id from queryString
                // query lineUserId or ipAddress from db ******************************
                // findAndUpdate

                // update gtm_data_onMobile to Mongo

                //next after save db
                //redirect to chat room
              }
            })
          }
        })
        .catch(err => {
          this.occoredError = 'error:' + err
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

    openLineChat_old() {
      console.log('openLineChat--> ')
      window.open('https://line.me/ti/p/@889mtekm', '_blank')
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
