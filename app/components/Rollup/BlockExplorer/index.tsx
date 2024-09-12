import { Telescope } from "lucide-react";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { useState } from "react";
import { useRollupContext } from "@/app/context/useRollupContext";

export const BlockExplorer = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { rollup } = useRollupContext();

  const handleSearchClick = () => {
    if (!searchInput) {
      window.open(`${rollup?.urls?.l2?.explorer}`, "_blank");
    } else {
      window.open(
        `${rollup?.urls?.l2?.explorer}/search-results?q=${searchInput}`,
        "_blank"
      );
    }
  };

  return (
    <Card className="mt-4 p-4">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-10 h-10 mr-3 flex items-center justify-center bg-[#1c1c1c] rounded-md">
            <Telescope size={20} color="#807872" />
          </div>
          <span className="text-[#FFEFE3] text-sm font-medium">Explorer</span>
        </div>

        <div className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center justify-end">
          <input
            type="text"
            placeholder="Search by address / tx hash / block"
            className="w-full sm:w-[calc(100%-180px)] h-10 bg-[#1c1c1c] rounded-md border border-[#272727] px-3 py-2 text-[#FFEFE3] text-sm font-medium mb-2 sm:mb-0 sm:mr-3 placeholder:text-[#CCBFB6] outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button onClick={handleSearchClick} className="w-full sm:w-[100px]">
            Search
          </Button>
        </div>
      </div>
    </Card>
  );
};
