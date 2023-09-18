import React from "react";
import { useParams } from "react-router-dom";

function ContentView() {
    const { topicId } = useParams();

    return (
        <>
            <h1>Content View!</h1>
            <p>Topic ID: ${topicId}</p>
        </>
    );
}

export default ContentView;