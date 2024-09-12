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
    <Card className="mt-[16px]">
      <div className="w-full flex items-center">
        <div className="w-[40px] h-[40px] mr-[12px] flex items-center justify-center bg-[#1c1c1c] rounded-[6px]">
          <Telescope size={20} color="#807872" />
        </div>
        <span className="block text-[#FFEFE3] text-sm font-medium">
          Explorer
        </span>
      </div>

      <div className="w-full flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by address / tx hash / block"
          className="w-[calc(100%-100px)] h-[40px] bg-[#1c1c1c] rounded-[6px] border border-[#272727] px-[12px] py-[6px] text-[#FFEFE3] text-sm font-medium mr-[12px] placeholder:text-[#807872] outline-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={handleSearchClick} className="w-[100px]">
          Search
        </Button>
      </div>
    </Card>
  );
};
