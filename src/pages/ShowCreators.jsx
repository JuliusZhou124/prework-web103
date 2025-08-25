import React, { useState, useEffect } from "react";
import { supabase } from "../client.js";
import "../App.css"
import Card from "../components/Card.jsx";

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  useEffect(() => {
    const fetchAllPosts = async () => {
      let { data, error } = await supabase
        .from("creator")
        .select("*")
        .order("created_at", { ascending: false });

      setCreators(data);
    };
    fetchAllPosts().catch(console.error);
  }, []);

  return (
    <div className="feed">
      {creators && creators.length > 0 ? (
        [...creators]
          .sort((a, b) => b.upvotes - a.upvotes)
          .map((post, index) => (
            <Card
              id={post.id}
              key={post.id}
              name={post.name}
              url={post.url}
              description={post.description}
              imageURL={post.imageURL}
            />
          ))
      ) : (
        <h2>{"No Posts Yet 😞"}</h2>
      )}
    </div>
  );
};

export default ShowCreators;
