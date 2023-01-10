import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/buildClient";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
        <Header currentUser={currentUser}/>
        <Component {...pageProps} />;
    </div>
  )
};

// In a custom appComponent, the context is available on appContext.ctx
AppComponent.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx).get("/api/users/currentuser");

  let pageProps = {}

  // Executing getInitialProps method for other pages
  // If a page does not have a getInitialProp method defined, an empty object is passed down to it, 
  // This is to avoid null errors i.e where by Component.getInitialProps could be null

  if(appContext.Component.getInitialProps){
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }


  return {
    pageProps,
    ...data
  };
};

export default AppComponent;


// Note
/**
 * When we add getInitialProps method to a custom AppComponent,
 * Other getInitialProps methods on other pages, are not invoked automatically anymore!
 * 
 * How to solve this?
 * 
 * Execute the getInitialProps for the custom AppComponent and execute the getInitialProps for the other pages at the same time.
 */
