import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formulaire soumis");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      console.log(response.data);
    } catch (error) {
      console.log("Erreur Axios :", error);
    }
  };

  return token ? (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="picture-input">Ajouter une photo</label>
        <input
          id="picture-input"
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        {picture && <img src={URL.createObjectURL(picture)} alt="" />}
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        ></textarea>
        <input
          type="text"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          type="text"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          type="text"
          value={condition}
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          type="text"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <input
          type="number"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input type="submit" value="Ajouter" />
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
