import { BrowserRouter, Route, Switch } from "react-router-dom";
import Videos from "./components/Videos";
import Upload from "./components/Upload";
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/videos" render={() => <Videos key={Math.random()} />} />
        <Route exact path="/video/:videoId" component={VideoPage} />
        <Route exact path="/upload" component={Upload} />
        <Route render={() => <h2 style={{ textAlign: "center" }}>Not Found</h2>} />
      </Switch>
    </BrowserRouter>
  );
}