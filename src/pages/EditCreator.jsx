import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client.js";
import "../App.css"

const EditCreator = () => {
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  let { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      let { data, error } = await supabase
        .from("creator")
        .select("*")
        .eq("id", id);

      setCreator(data[0]);
    };
    fetchPost().catch(console.error);
  }, [id]);

  const updateDatabase = async (event) => {
    event.preventDefault();

    // Check if URL already exists (excluding current record)
    const { data: existingCreators } = await supabase
      .from("creator")
      .select("url, id")
      .eq("url", creator.url)
      .neq("id", id);

    if (existingCreators && existingCreators.length > 0) {
      alert("A creator with this URL already exists!");
      return;
    }

    const { data, error } = await supabase
      .from("creator")
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL,
      })
      .eq("id", id)
      .select();

    window.location = "/";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const deletePost = async () => {
    const { error } = await supabase.from("creator").delete().eq("id", id);

    window.location = "/";
  };

  return (
    <div className="half-page">
      <form onSubmit={updateDatabase}>
        <label htmlFor="name">Name</label> <br />
        <input
          type="text"
          id="name"
          name="name"
          value={creator.name}
          onChange={handleChange}
        />

        <br />
        <label htmlFor="url">URL</label> <br />
        <input
          type="text"
          id="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
        />

        <br />
        <label htmlFor="description">Description</label> <br />
        <input
          type="text"
          id="description"
          name="description"
          value={creator.description}
          onChange={handleChange}
        />

        <br />
        <label htmlFor="imageURL">Image Url: </label> <br />
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={creator.imageURL}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Update Post</button>
        <button type="button" onClick={deletePost}>Delete Post</button>
      </form>
    </div>
  );
};

export default EditCreator;
