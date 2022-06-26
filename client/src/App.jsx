import Routes from "./Routes";
import { Suspense } from "react";

export default function App() {
  return (
    <Suspense fallback={"Loading..."}>
      <Routes />
    </Suspense>
  );
}