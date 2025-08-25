import React, { useState } from "react";
import { supabase } from "../client";
import "../App.css"

const AddCreator = () => {
  const [creator, setCreator] = useState({
    name: "", 
    url: "",
    description: "",
    imageURL: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreator((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const createCreator = async (event) => {
    event.preventDefault();

    // Check if URL already exists
    const { data: existingCreators } = await supabase
      .from("creator")
      .select("url")
      .eq("url", creator.url);

    if (existingCreators && existingCreators.length > 0) {
      alert("A creator with this URL already exists!");
      return;
    }

    await supabase
      .from("creator")
      .insert({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL
      })
      .select();

    window.location = "/";
  };

  return (
    <div className="half-page">
      <form onSubmit={createCreator}>
        <label htmlFor="name">Name: </label> 
        <input
          type="text"
          id="name"
          name="name"
          value={creator.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="url">URL: </label> 
        <input
          type="text"
          id="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          value={creator.description}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="imageURL">Image Url: </label> 
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={creator.imageURL}
          onChange={handleChange}
        />
        <br />
        <button type="submit" value="Submit">
          {" "}
          Create{" "}
        </button>
      </form>
    </div>
  );
};

export default AddCreator;
