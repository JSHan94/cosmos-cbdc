import React from "react";
import "./App.css";
import SplitPane from "react-split-pane";
import BlockCard from "./components/BlockCard"
import Header from "./layout/Header";

function App() {
  return (
    <>
    <Header/>
      <SplitPane split="vertical" defaultSize="33%">
        <BlockCard name={"Cosmos"}></BlockCard>
          
          <SplitPane split="vertical" defaultSize="50%">
            <BlockCard name={"Klaytn"}></BlockCard>  
            <BlockCard name={"LINE"}></BlockCard>
          </SplitPane>
      </SplitPane>
    </>
  );
}

export default App;
