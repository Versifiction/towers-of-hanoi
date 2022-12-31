import { useEffect, useState } from "react";
import classnames from "classnames";
import "./App.css";

const DISCS_NUMBER = 5;

const App = () => {
  const [towers, setTowers] = useState();
  const [firstTowerSelected, setFirstTowerSelected] = useState(-1);
  const [secondTowerSelected, setSecondTowerSelected] = useState(-1);
  const bothTowersSelected =
    firstTowerSelected !== -1 && secondTowerSelected !== -1;

  const handleClick = (index) => {
    if (firstTowerSelected === -1 && !bothTowersSelected) {
      setFirstTowerSelected(index);
    } else {
      setSecondTowerSelected(index);
    }
  };

  const generateTowers = () => {
    let towers = [];

    for (let i = 0; i < DISCS_NUMBER - 1; i++) {
      towers.push([]);
    }

    let j = 0;

    while (j < DISCS_NUMBER) {
      j++;
      setTowers([[...new Array(DISCS_NUMBER)].map(() => j++), ...towers]);
    }
  };

  useEffect(() => {
    console.log(towers);
  }, [towers]);

  useEffect(() => {
    generateTowers();
  }, []);

  useEffect(() => {
    if (
      bothTowersSelected &&
      towers[firstTowerSelected][0] <
        (towers[secondTowerSelected][0] || DISCS_NUMBER + 1)
    ) {
      towers[secondTowerSelected].unshift(towers[firstTowerSelected][0]);
      towers[firstTowerSelected].shift();

      setFirstTowerSelected(-1);
      setSecondTowerSelected(-1);

      if (towers[towers.length - 1].length === DISCS_NUMBER) {
        alert("GG");
      }
    }

    if (
      bothTowersSelected &&
      !towers[firstTowerSelected][0] <
        (towers[secondTowerSelected][0] || DISCS_NUMBER + 1)
    ) {
      setFirstTowerSelected(-1);
      setSecondTowerSelected(-1);
    }
  }, [firstTowerSelected, secondTowerSelected]);

  return (
    <div className="App flex justify-between items-center bg-[#808080] w-full h-full relative">
      {towers?.map((tower, index) => (
        <>
          <div className="flex flex-col cursor-pointer relative" key={index}>
            <span
              className={classnames(
                {
                  "bg-white":
                    firstTowerSelected === index && !bothTowersSelected,
                  "bg-green-900":
                    firstTowerSelected !== index || bothTowersSelected,
                },
                "w-5 absolute -translate-x-2/4 left-2/4 -top-2.5 -bottom-2.5 z-10"
              )}
              onClick={() => handleClick(index)}
            ></span>
            {tower?.map((t, idx) => (
              <span
                className="px-6 py-1 bg-black text-white border-2 z-20"
                key={idx}
              >
                {t}
              </span>
            ))}
          </div>{" "}
        </>
      ))}
      <button
        className="px-6 py-1 absolute -translate-x-2/4 left-2/4 bottom-1 bg-black text-white border-2"
        onClick={generateTowers}
      >
        Rejouer
      </button>
    </div>
  );
};

export default App;
