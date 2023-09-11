import * as React from "react";
import useLocalUserCheck from "./hooks/useLocalUserCheck";
import useGoogleSignIn from "./hooks/useGoogleSignIn";
import Loading from "./components/Loading";
import AppProviders from "./AppProviders";
import UserHandler from "./UserHandler";

function App() {
  const [userInfo, loading, syncUserInfo] = useLocalUserCheck();
  const { promptAsync, signOutUser, subscribeAuthChange } = useGoogleSignIn();

  React.useEffect(() => {
    const unsubscribe = subscribeAuthChange(syncUserInfo);
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <AppProviders
      userInfo={userInfo}
      signOutUser={signOutUser}
      promptAsync={promptAsync}
    >
      {userInfo && <UserHandler userInfo={userInfo} />}
    </AppProviders>
  );
}
export default App;
