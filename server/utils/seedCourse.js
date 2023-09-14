import mongoose from "mongoose";
import Course from "../models/courseModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

const currentFileUrl = import.meta.url;
const currentDir = dirname(fileURLToPath(currentFileUrl));

// Import the 'path' module explicitly
import * as path from "path";

const parentFolder = path.resolve(currentDir, "../");
dotenv.config({ path: path.join(parentFolder, ".env") });
// console.log(process.env.MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

const starterCourses = [
  {
    title: "Web Basics",
    description: "Foundational web development concepts.",
    topics: [
      {
        title: "HTML",
        description:
          "HTML is the language for creating web content and pages, using tags to define elements and layout.",
        content: "Introduction and basics of HTML.",
        resources: [
          "https://developer.mozilla.org/en-US/docs/Web/HTML",
          "https://www.youtube.com/watch?v=UB1O30fR-EE",
        ],
      },
      {
        title: "CSS",
        description:
          "CSS (Cascading Style Sheets) is the language used to style and format HTML elements on web pages, controlling their appearance, layout, and design.",
        content: "Styling web pages using CSS.",
        resources: [
          "https://developer.mozilla.org/en-US/docs/Web/CSS",
          "https://www.youtube.com/watch?v=yfoY53QXEnI",
        ],
      },
      {
        title: "Responsive Web Design",
        description:
          "Learn how to create web designs that adapt to different screen sizes and devices.",
        content: "Designing for multiple devices and resolutions.",
        resources: [
          "https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/",
          "https://www.youtube.com/watch?v=bn-DQCifeQQ",
        ],
      },
    ],
  },
  {
    title: "JavaScript Basics",
    description: "Foundational concepts of JavaScript.",
    topics: [
      {
        title: "Variables and Data Types",
        description:
          "JavaScript utilizes variables to store and manage data. These variables can hold various data types, such as numbers, text, and booleans, enabling dynamic web applications.",
        content: "Understanding variables and data types in JS.",
        resources: [
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
          "https://www.youtube.com/watch?v=c-xiaCg6XeA",
        ],
      },
      {
        title: "Functions",
        description:
          "JavaScript functions are reusable code blocks that perform tasks, take inputs, and can provide outputs, helping organize and streamline web development.",
        content: "How to create and utilize functions.",
        resources: [
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          "https://www.youtube.com/watch?v=oB5rH_9bqAI",
        ],
      },

      {
        title: "Arrays and Loops",
        description:
          "Explore JavaScript arrays and loops for efficient data manipulation and repetition of tasks.",
        content: "Working with arrays and various loop constructs.",
        resources: [
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
          "https://www.youtube.com/watch?v=s9wW2PpJsmQ",
        ],
      },
    ],
  },
  {
    title: "Node.js",
    description: "Server-side JavaScript with Node.js.",
    topics: [
      {
        title: "Introduction to Node.js",
        description:
          "Node.js is a runtime environment for executing JavaScript on the server side. Learn how to build scalable and efficient web applications with Node.js.",
        content: "Getting started with Node.js and basic server-side concepts.",
        resources: [
          "https://nodejs.org/en/docs/",
          "https://www.youtube.com/watch?v=DXGmRiIr9j8",
        ],
      },
      {
        title: "Express.js",
        description:
          "Express.js is a popular web application framework for Node.js. Explore how to create RESTful APIs and web applications with Express.",
        content: "Building web applications with Express.js.",
        resources: [
          "https://expressjs.com/en/starter/hello-world.html",
          "https://www.youtube.com/watch?v=DXGmRiIr9j8",
        ],
      },
      {
        title: "Authentication and Authorization",
        description:
          "Learn about user authentication and authorization in Node.js applications, including strategies like JWT (JSON Web Tokens).",
        content:
          "Implementing secure authentication and authorization in Node.js.",
        resources: [
          "https://jwt.io/introduction/",
          "https://www.youtube.com/watch?v=DXGmRiIr9j8",
        ],
      },
    ],
  },
  {
    title: "Front-End Frameworks",
    description:
      "Master popular front-end frameworks for building interactive web applications.",
    topics: [
      {
        title: "React.js",
        description:
          "Learn React.js, a JavaScript library for building user interfaces, to create dynamic and efficient web applications.",
        content: "Getting started with React.js and its components.",
        resources: [
          "https://reactjs.org/docs/getting-started.html",
          "https://www.youtube.com/watch?v=DLX62G4lc44",
        ],
      },
      {
        title: "React State Management",
        description:
          "Explore state management techniques in React using libraries like Redux and Mobx for complex applications.",
        content: "Managing and sharing state in React applications.",
        resources: [
          "https://redux.js.org/introduction/getting-started",
          "https://mobx.js.org/README.html",
        ],
      },
      {
        title: "React Router",
        description:
          "Learn how to implement client-side routing in React applications using React Router for navigation.",
        content: "Creating dynamic routes in React applications.",
        resources: [
          "https://reactrouter.com/web/guides/quick-start",
          "https://www.youtube.com/watch?v=Law7wfdg_ls",
        ],
      },
    ],
  },
  {
    title: "Databases",
    description: "Explore databases and data storage solutions.",
    topics: [
      {
        title: "SQL",
        description:
          "Structured Query Language (SQL) is a domain-specific language used for managing and querying relational databases.",
        content: "Introduction to SQL and database querying.",
        resources: [
          "https://www.w3schools.com/sql/",
          "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        ],
      },
      {
        title: "MySQL",
        description:
          "MySQL is a popular open-source relational database management system (RDBMS) known for its speed and reliability.",
        content: "Getting started with MySQL and database operations.",
        resources: [
          "https://dev.mysql.com/doc/",
          "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        ],
      },
      {
        title: "MongoDB",
        description:
          "MongoDB is a NoSQL database that stores data in a flexible, JSON-like format, making it suitable for unstructured or semi-structured data.",
        content: "Introduction to MongoDB and NoSQL database concepts.",
        resources: [
          "https://docs.mongodb.com/",
          "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        ],
      },
    ],
  },
];

// Seed the database with starter data
async function seedData() {
  try {
    // First, clear the database of existing modules
    await Course.deleteMany({});

    // Insert starter modules
    await Course.insertMany(starterCourses);

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
