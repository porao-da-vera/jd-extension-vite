import React, { useEffect, useState } from "react";
import { Filter, SearchWrapper, Regular } from "./FilterSection.styled";
import { CloseIcon, CrossIcon } from "./icons";
import IconButton from "./IconButton";
import { COLORS } from "./constants";
import FilterByTag from "./FilterByTag";

const FilterSection = ({ filter, dispatch }) => {
  const { searchString, difficulty, mode } = filter;
  const clearFilter = () =>
    dispatch({
      type: "setFilter",
      payload: { searchString: "", difficulty: 0, mode: 0 },
    });
  const handleFilter = (type, value) => {
    dispatch({ type: "setFilter", payload: { ...filter, [type]: value } });
  };
 
  useEffect(() => {
    return () => {
      clearFilter();
    };
  }, []);
  return (
    <Filter>
      <Regular>
        <SearchWrapper>
          <input
            type="text"
            value={searchString}
            onChange={(e) => handleFilter("searchString", e.target.value)}
            placeholder="Search"
          />
          {searchString && (
            <button onClick={clearFilter}>
              <CloseIcon />
            </button>
          )}
        </SearchWrapper>
        <IconButton
          iconColor={COLORS.LIGHT_PURPLE}
          color="#000"
          size={24}
          onClick={clearFilter}
        >
          <CrossIcon />
        </IconButton>
      </Regular>
        <FilterByTag
          difficulty={difficulty}
          mode={mode}
          onSelect={handleFilter}
        />
    </Filter>
  );
};

export default FilterSection;
