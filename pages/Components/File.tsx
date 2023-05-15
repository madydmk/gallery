"use client";
import StorageFileApi from "./../api/storage-api";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mtzhbiqfgjtmcgotnmhs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emhiaXFmZ2p0bWNnb3RubWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwNzc2ODAsImV4cCI6MTk5OTY1MzY4MH0.KWgF3w8X9dChlEi_Bonc4dSYt7ZF4UTkcXCuiyRPWPg"
);
export default function addFile() {
  const [isInputVisible, setInputVisible] = useState(false);
  const inputToggle = () => {
    setInputVisible(!isInputVisible);
    console.log(isInputVisible);
  };

  //const StorageFileApi = new StorageFileApi("", "", "");
  return (
    <>
      <div>
        <button className="button" onClick={inputToggle}>
          Add a New Image
        </button>
      </div>
      {isInputVisible ? (
        <div>
          <input
            type="File"
            accept="image/*"
            multiple
            className="left"
            id="ajoutImg"
            placeholder="Chose an image.."
          />
          <button className="button" onClick={handleSelectedFile}>
            Ajouter
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="container"></div>
    </>
  );
}

function ajouterImg() {
  var files = document.getElementById("ajoutImg").files;

  console.log(files[0]);
}
const addImage = (img: any) => {
  debugger;
  var div = document.createElement("div");
  var img1 = new Image();
  img1.src = URL.createObjectURL(img);
  img1.className = "image";
  div.appendChild(img1);
  var container1 = document.getElementsByClassName("container")[0];
  handleSubmit(img1);
  container1.appendChild(img1);
};

const handleSelectedFile = () => {
  var files = document.getElementById("ajoutImg").files;

  Array.prototype.forEach.call(files, (file) => {
    if (file && file.size < 10000000) {
      console.log(file);
      addImage(file);
    } else {
      message.error("File size to large");
    }
  });
};
const handleSubmit = async (file: any) => {
  const filename = file.name;
  console.log("Name: " + file.name);
  const { data, error } = await supabase.storage
    .from("galley")
    .upload("public/test.jpg", file);
  //const filepath = data.path;
  console.log(data);
  // save filepath in database
};
async function uploadImage(file: any) {
  const { data, error } = await supabase.storage
    .from("galley")
    .upload("public/avatar1.png", file, {
      cacheControl: "3600",
      upsert: false,
    });
  /*const { data, error } = await supabase.storage
    .from("galley")
    .upload("uuidv4()", file);

  if (data) {
    console.log(data);
  }*/
}
