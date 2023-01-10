import buildClient from '../api/buildClient'

export default function LandingPage({currentUser}) {

  console.log(currentUser)
 
  return currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>
}


LandingPage.getInitialProps = async (context) => {
  const {data} = await buildClient(context).get('/api/users/currentuser')
  return data
}
