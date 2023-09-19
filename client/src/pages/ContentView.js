import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ContentView() {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    useEffect(() => {
        const endpoint = "/topics/" + topicId;
        axios.get(endpoint)
            .then((response) => {
                setTopic(response.data);
            }).catch((error) => {
                console.error("Error fetching courses", error);
            });
    }, [topicId]);
    return (
        <>

            <h1>Content View!</h1>
            <p>Topic ID: ${topicId}</p>
        </>
    );
}

export default ContentView;

//to do; import axios /complete
//to do; make an api call to retrieve content from the database using the topic id
//to do; display the content on the page