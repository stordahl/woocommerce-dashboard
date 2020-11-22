const fetch = require('node-fetch')
const handler = async function () {
  try {
    const response = await fetch('https://jacobs30.sg-host.com/wp-json/wc/v3/system_status?consumer_key=ck_e3c17e4ae205eece10f6a42bfdeeddeb6ac1a825&consumer_secret=cs_432dd228577439ef4eca8e04cb098c5210953be6', {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
