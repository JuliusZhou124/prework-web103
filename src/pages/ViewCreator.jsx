import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../client.js";
import "../App.css"
import editP from "../assets/84380.png";

const ViewCreator = () => {
  let { id } = useParams();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const formatUrl = (url) => {
    return url.startsWith('http') ? url : `https://${url}`;
  };

  useEffect(() => {
    const fetchPostInfo = async () => {
      const { data, error } = await supabase
        .from("creator")
        .select("*")
        .eq("id", id)
        .single();
      setCreator(data);
    };

    fetchPostInfo().catch(console.error);
  }, [id]);

  return (
    <div className="full-page">
      <div className="post-title-box">
        <a href={formatUrl(creator.url)} target="_blank"> URL and Name: {creator.name} </a>
      </div>

      <div className="post-content-box">
        <h3>Description: {creator.description}</h3>
      </div>

      {creator.imageURL && (
        <div className="post-image-box">
          <img src={creator.imageURL} alt="Linked Image" />
        </div>
      )}

      <Link to={"/update/" + id}>
        <img className="post-edit" src={editP} alt="edit-button" />
      </Link>

    </div>
  );
};

export default ViewCreator;
