<template>
  <div class="container text-center">
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <div id="header">
          <div class="card" style="width: 18rem">
            <!-- <img src="../assets/student.png" class="card-img-top" alt="..." /> -->
            <div class="card-body">
              <h5 class="card-title">ขอขอบคุณสำหรับการติดต่อมา</h5>

              <img
                :src="
                  profile.pictureUrl ? profile.pictureUrl : 'https://cdn-icons-png.flaticon.com/512/4042/4042356.png'
                "
                class="card-img-bottom"
                style="width: 6rem; border-radius: 50%; overflow: hidden"
              />

              <p>คุณ {{ profile.displayName }}</p>
              <!-- <h5 class="card-title">School Shop</h5> -->

              <!-- <p class="card-text">USER NAME</p>
              <p>{{ profile.displayName }}</p> -->
            </div>
            <img src="../assets/student.png" class="card-img-top" alt="..." />
            <a href="https://line.me/ti/p/@798hmctv" class="btn btn-primary">Line Chat</a>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import imgUrl from '@/assets/student.png'
import liff from '@line/liff'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      bannerImg: '',
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

      //link
      // gotoLineChat: 'https://line.me/ti/p/@798hmctv',
      //gotoLineChat: 'https://line.me/ti/p/@675cfnyo', // schoolShop =https://lin.ee/ouiG0Oe
      //gotoLineChat: 'https://line.me/R/ti/p/@675cfnyo',
    }
  },
  created() {
    console.log('created--->')
    this.bannerImg = imgUrl
  },
  mounted() {
    console.log('mounted--->')
    this.qryStringBotUid = this.$route.query.botUserId
    this.liffAdd()
    this.getIpAddress()
  },
  methods: {
    openLineChat() {
      console.log('open line oa--->')
      window.open('https://line.me/ti/p/@798hmctv', '_blank') //******* */
      //link line SchoolShop = https://lin.ee/ouiG0Oe
      // window.open('https://lin.ee/ouiG0Oe', '_blank') //******* */
    },

    async getIpAddress() {
      this._getIpAddress = await axios.get('https://api.ipify.org?format=text').then(function (response) {
        return response.data
      })
    },
    async liffAdd() {
      await liff
        .init({ liffId: '1656824759-8Qbgk0wJ' })
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
              this.profile = profile

              //Todo -> function-->
              // if ((this.os = 'web')) {
              if (this.profile.userId) {
                var gtm_data_onWeb = {
                  botUserId: '', //use
                  lineUid: this.profile.userId, //use
                  lineDisplayName: this.profile.displayName, //use,
                  ipAddress: this._getIpAddress,
                  os: this.os,
                }

                // redirect to line OA

                console.log('this os is web')
                console.log('gtm_data_onWeb --> ', gtm_data_onWeb)

                //REDIRECT *******
                this.openLineChat()
                this.findIpAndUpdateLineUid(this.profile.userId)
              } else {
                // var gtm_data_onMobile = {
                //   botUserId: this.$route.query.botUserId, //use รับค่าจาก api
                //   lineUid: this.profile.userId, //use
                //   lineDisplayName: this.profile.displayName, //use,
                //   ipAddress: this._getIpAddress,
                //   os: this.os,
                // }
                console.log('Not get userId')
              }
            })
          }
        })
        .catch(err => {
          this.occoredError = 'error:' + err
        })
    },
    async findIpAndUpdateLineUid(getLineUid) {
      const setData = {
        ipAddress: this._getIpAddress,
        lineUid: getLineUid,
      }
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://schoolshopapi-production.up.railway.app/api/audience/findIpAndUpdate',
        headers: {
          'Content-Type': 'application/json',
        },
        data: setData,
      }

      await axios
        .request(config)
        .then(response => {
          console.log('update lineUid OK')
          //REDIRECT *******
          //this.openLineChat()
        })
        .catch(error => {
          console.log(error)
        })
    },
    async saveAudience() {
      let data = JSON.stringify({
        userId: 'botUserId123',
        client_id: 'client_id123',
        userAgent: 'userAgent123',
        ipAddress: '223.204.232.69',
        uniqueEventId: 'uniqueEventId123',
        sessionId: 'sessionId123',
        utm_medium: 'FACKBOOK ADS AUDIENCE',
        utm_source: 'FACKBOOK',
      })

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://schoolshopapi-production.up.railway.app/api/audience',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios
        .request(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
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

#img {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444242;
  margin-top: 10px;
}

#subject {
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
