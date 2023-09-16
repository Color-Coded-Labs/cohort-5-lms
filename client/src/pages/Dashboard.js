import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Dashboard() {
  useEffect(() => {
    const endpoint = "/courses";
    axios.get(endpoint)
      .then((response) => {
        setModules(response.data);
      }).catch((error) => {
        console.error("Error fetching courses", error);
      });
  }, []);

  const [modules, setModules] = useState([]);
  // const [modules, setModules] = useState([
  //   {
  //     _id: "64ed16233b4b18cd5289ea5b",
  //     name: "JavaScript Basics",
  //     description: "Foundational concepts of JavaScript.",
  //     topics: [
  //       {
  //         title: "Variables and Data Types",
  //         content: "Understanding variables and data types in JS.",
  //         links: [
  //           "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
  //         ],
  //         videos: ["https://www.youtube.com/watch?v=c-xiaCg6XeA"],
  //         _id: "64ed16233b4b18cd5289ea5c",
  //       },
  //       {
  //         title: "Functions",
  //         content: "How to create and utilize functions.",
  //         links: [
  //           "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
  //         ],
  //         videos: ["https://www.youtube.com/watch?v=oB5rH_9bqAI"],
  //         _id: "64ed16233b4b18cd5289ea5d",
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "64ed16233b4b18cd5289ea58",
  //     name: "Web Basics",
  //     description: "Foundational web development concepts.",
  //     topics: [
  //       {
  //         title: "HTML",
  //         content: "Introduction and basics of HTML.",
  //         links: ["https://developer.mozilla.org/en-US/docs/Web/HTML"],
  //         videos: ["https://www.youtube.com/watch?v=UB1O30fR-EE"],
  //         _id: "64ed16233b4b18cd5289ea59",
  //       },
  //       {
  //         title: "CSS",
  //         content: "Styling web pages using CSS.",
  //         links: ["https://developer.mozilla.org/en-US/docs/Web/CSS"],
  //         videos: ["https://www.youtube.com/watch?v=yfoY53QXEnI"],
  //         _id: "64ed16233b4b18cd5289ea5a",
  //       },
  //     ],
  //     __v: 0,
  //   },
  // ]);

  return (
    <div className="dashboard">
      {modules.map((module) => (
        <div className="module" key={module._id}>
          <h2>{module.name}</h2>
          <p>{module.description}</p>
          <ul>
            {module.topics.map((topic) => (
              <li key={topic._id}>
                <Link to={`/dashboard/${topic._id}`}>{topic.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;