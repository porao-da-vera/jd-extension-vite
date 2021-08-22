import React, {useEffect} from "react";
import { Wrapper, SectionWrapper, Tag } from "./FilterByTag.styled.jsx";
import { DIFFICULTIES, MODES } from "./constants";

export const filterTypes = ["difficulty", "mode"];

const Section = ({ tags, selected, onSelect }) => {
  
  return (
    <SectionWrapper>
      {tags.map((tag, idx) => (
        <Tag key={idx} selected={selected === idx} onClick={() => onSelect(idx)}>{tag ?? "X"}</Tag>
      ))}
    </SectionWrapper>
  );
};

const FilterByTag = ({ difficulty, mode, onSelect }) => {
  const handleSelection = (type, selection) => {
    onSelect(type, selection);
  };
  return (
    <Wrapper>
      <Section
        tags={[...DIFFICULTIES]}
        selected={difficulty}
        onSelect={(selection) => handleSelection(filterTypes[0], selection)}
      />
      <Section
        tags={MODES}
        selected={mode}
        onSelect={(selection) => handleSelection(filterTypes[1], selection)}
      />
    </Wrapper>
  );
};

export default FilterByTag;
