import React, { Dispatch, SetStateAction } from "react";
import { usePelmanism } from "../api/getPelmanism";
import { is_set } from "../../../utils/isType";
import { PelmanismItem, PelmanismResponse } from "../types";
import { shuffleArray } from "../../../utils/array";

export function Pelmanism() {
  const [pelmanismItems, setPelmanismItems] = React.useState<PelmanismItem[]>([]);
  const [openItems, setOpenItems] = React.useState<PelmanismItem[]>([]);
  const [isShows, setIsShows] = React.useState<boolean[]>([]);
  const [isResetting, setIsResetting] = React.useState<boolean>(false);
  const pelmanismQuery = usePelmanism();

  React.useEffect(() => {
    if (is_set<PelmanismResponse[]>(pelmanismQuery.data)) {
      const items = pelmanismQuery.data.map((item) => [{id: item.id, text: item.kansai}, {id: item.id, text: item.default}]);
      setPelmanismItems(shuffleArray(items.flat()));
      setIsShows(new Array(pelmanismQuery.data.length * 2).fill(false));
    }
  }, [pelmanismQuery.data]);

  // New function to handle button clicks
  const handleButtonClick = (item: PelmanismItem, index: number) => {
    if (isResetting) {
      return;
    }

    const newIsShows = [...isShows];
    newIsShows[index] = true;
    setIsShows(newIsShows);

    if (openItems.length === 0) {
      setOpenItems([item]);
      return;
    }

    if (openItems[0].id === item.id) {
      setOpenItems([]);
      return;
    }

    const resetIsShows = newIsShows.map((value, itemIndex) => pelmanismItems[itemIndex].id === openItems[0].id || pelmanismItems[itemIndex].id === item.id ? false : value);
    setIsResetting(true);

    setTimeout(() => {
      setIsShows(resetIsShows)
      setIsResetting(false);
    }, 1000);

    setOpenItems([]);
  };

  if (pelmanismQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!is_set<PelmanismItem[]>(pelmanismQuery.data)) {
    return <div>No pelmanism found</div>;
  }

  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {pelmanismItems.map((item, index) => (
        <button
          key={index}
          style={{width: "300px", margin: "0.5rem"}}
          onClick={() => handleButtonClick(item, index)}
        >
          {isShows[index] ? item.text : "-"}
        </button>
      ))}
    </div>
  );
}
