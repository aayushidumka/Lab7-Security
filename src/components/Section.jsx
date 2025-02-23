import React from 'react'
import '../App.css' 
// import SectionList from './SectionList.jsx'

const Section = ({ title, children }) => { // title, subtitle, and lists are PROPS based to the section from App.jsx
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;