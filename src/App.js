import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const result = {};
  useEffect(() => {
    axios.get("https://join.reckon.com/test1/rangeInfo").then((resp1) => {
      const lower = resp1.data.lower;
      const upper = resp1.data.upper;
      axios.get("https://join.reckon.com/test1/divisorInfo").then((resp2) => {
        for (let i = lower; i <= upper; i++) {
          let divarray = resp2.data.outputDetails;
          for (let n = 0; n < divarray.length; n++) {
            if ((i % divarray[n].divisor) === 0) {
              result[i] = divarray[n].output;
              break;
            } else {
              result[i] = "";
            }
          }
        }
        setData(result);
      });
    });
  }, []);

  return (
    <div className="App">
      <h1> My first react project </h1>
      <ul>
        {Object.keys(data).map((key, i) => {
          return <li key={i}>{`${key}: ${data[key]}`}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
