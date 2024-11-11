import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../store.js";

const GalleryForm = () => {
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData(); 

    if (imageFile) {
      formDataObj.append("image", imageFile);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/gallery/post`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Gallery post submitted successfully");
    } catch (error) {
      console.error("Error submitting gallery post:", error);
      alert("Error submitting gallery post");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>
      <button type="submit">Submit Image</button>
    </form>
  );
};

export default GalleryForm;
