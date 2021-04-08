export async function getAccessToken(clientID, clientSecret) {
  const authBaseURL = 'https://id.twitch.tv/oauth2/token'
  const grandType = 'client_credentials'

  const url = `${authBaseURL}?client_id=${clientID}&client_secret=${clientSecret}&grant_type=${grandType}`
  const init = {
    method: 'POST'
  }

  const resp = await fetch(url, init)
  const tokenObj = await resp.json()

  return tokenObj['access_token']
}


export async function getUserID(login, accessToken, clientID) {
  const url = `https://api.twitch.tv/helix/users?login=${login}`
  const init = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-ID': clientID
    }
  }

  const resp = await fetch(url, init)
  const users = await resp.json()

  if (!users.data.length) {
    return -1
  }

  return users.data[0].id
}


export async function getVideosByUserID(userID, accessToken, clientID) {
  const url = `https://api.twitch.tv/helix/videos?user_id=${userID}`
  const init = {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-ID': clientID
    }
  }

  const resp = await fetch(url, init)
  const videosObj = await resp.json()

  return videosObj.data
}


export async function getVideos(login) {
  const clientID = process.env.NEXT_PUBLIC_CLIENT_ID
  const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

  const accessToken = await getAccessToken(clientID, clientSecret)

  const userID = await getUserID(login, accessToken, clientID)
  if (userID === -1) return ['no-channel']

  return await getVideosByUserID(userID, accessToken, clientID)
}
