import Section from "../components/Section";
import SectionList from "../components/SectionList";
import Image from "../components/Image";
import "../App.css";

// context & MUI components
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { TextField, Button, Box } from "@mui/material"; 

function Home() {

  // MUI components constants here
  const { setInputValue } = useContext(AppContext); // Get setInputValue from context
  let tempValue = ""; // Temporary variable to store user input

  const handleSubmit = () => {
    setInputValue(tempValue); // Update context state with entered name

  };  
  return (
    <>

      {/* HEADER SECTION ------------------------------------------------------ */}
      <Section title="Highlights">
        <SectionList
          heading="Remember to live out our values"
          type="ol"
          list={[
            { text: "Relentless Learning and Growth" },
            { text: "Creative Problem Solving" },
            { text: "Curiosity-Driven Exploration" },
          ]}
        />

        <SectionList
          heading="Upcoming Events"
          type="ul"
          list={[
            { date: "Feb 7", text: "Employee Hack-a-thon" },
            { date: "Mar 7", text: "Food Bank Volunteering" },
            { date: "Apr 4", text: "Company Retreat" },
          ]}
        />
      </Section>

      {/* LATEST EVENT SECTION ------------------------------------------------ */}
      <Section title="Latest Event">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis animi
          laudantium eos atque sed debitis eum deleniti cumque saepe aut
          voluptatibus, dolores commodi corporis quibusdam numquam perferendis,
          molestias tenetur suscipit!
        </p>

        {/* IMAGE COMPONENTS ------------------------------------------------ */}
        <div>
          <Image
            src="https://plus.unsplash.com/premium_photo-1709247069711-068d383b8497?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Kickball outing"
          />
          <Image
            src="https://plus.unsplash.com/premium_photo-1661429511577-b165fc04718f?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Happy Hour"
          />
        </div>
      </Section>

      <Section>
        {/* ADDITIONAL MUI COMPONENTS & CONTEXT  */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
        {/* Flex container for aligning input and button horizontally */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {/* MUI TextField */}
            <TextField
              label="Enter Your Name"
              variant="outlined"
              onChange={(e) => (tempValue = e.target.value)}
              sx={{ width: "250px" }} // Adjust the width as needed
            />

          {/* MUI Button */}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          </Box>
        </Box>



      </Section>
      <br></br>
      <br></br>
      <hr></hr>
    </>
  );
}

export default Home;
