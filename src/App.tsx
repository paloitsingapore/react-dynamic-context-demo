import "./App.css";
import DynamicScreenProvider from "~/providers/DynamicScreenProvider";
import { DCard } from "~/components/DCard";
import mockData from "~/testPageData.json";

function App() {
  return (
    <div className="App">
      <DynamicScreenProvider screenState={mockData.screens[0]}>
        <DCard id={"counter1"} contextId={"alpha"} />
        <DCard id={"counter2"} contextId={"alpha"} />
        <DCard id={"counter3"} contextId={"counter3"} />
        <DCard id={"counter4"} contextId={"counter4"} />
        <DCard id={"counter5"} contextId={"counter5"} />
        <DCard id={"counter6"} contextId={"bravo"} />
        <DCard id={"counter7"} contextId={"bravo"} />
        <DCard id={"counter8"} contextId={"alpha"} />
      </DynamicScreenProvider>
    </div>
  );
}

export default App;
