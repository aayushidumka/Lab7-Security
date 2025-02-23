import React from "react";
import '../App.css' 

const SectionList = ({ heading, list, type = "ul" }) => {
  if (!list || list.length === 0) return null;

  const ListTag = type === "ol" ? "ol" : "ul"; // Choose <ul> or <ol> based on type

  return (
    <>
    <h3>{heading}</h3>
    <ListTag>
      {list.map((item, index) => (
        <li key={index}>
          <b>{item.date ? `${item.date}: ` : ""}</b> {item.text} 
          {/* the prop LIST is passed an object with an optional date and required text*/}
        </li>
      ))}
    </ListTag>
    </>

  );
};

export default SectionList;
