// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/*import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync, writeFileSync } from "fs";

type Data = {
  name: string;
};

export async function saveFile(req: NextApiRequest, res: NextApiResponse) {
  const { path = null } = req.query;
  if (!path) {
    res.status(400).json({ name: "no path provided" });
  } else {
    // your file content here
    const content = Date.now().toString();
    writeFileSync("/tmp/${path}.txt", content);
    res.json({
      path,
      content,
    });
  }
}

export async function readFile(req: NextApiRequest, res: NextApiResponse) {
  const { path = "" } = req.query;
  if (!path) {
    res.status(400).json({ name: "wrong" });
  } else {
    res.send(readFileSync("/tmp/${path}"));
  }
}*/

import { Button, Card, Input, List, message, Image, Progress } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
//import { storage } from "../firebaseConfig";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });
const UploadImageToStorage = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleSelectedFile = (files: any) => {
    Array.prototype.forEach.call(files, (file) => {
      if (file && file.size < 10000000) {
        setImageFile(file);

        console.log(file);
      } else {
        message.error("File size to large");
      }
    });
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
          });
        }
      );
    } else {
      message.error("File not found");
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);
  return (
    <>
      <div className={styles.btnContainer}>
        <button className={styles.button}>Add a New Note</button>
      </div>

      <div className={styles.inputContainer}>
        <input placeholder="Enter the Title.." />
      </div>
    </>
  );
  /*return (
    <div className="container mt-5">
      <div className="col-lg-8 offset-lg-2">
        <Input
          type="file"
          multiple
          placeholder="Select file to upload"
          accept="image/*"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        <div className="mt-5">
          <Card>
            {imageFile && (
              <>
                <List.Item
                  extra={[
                    <Button
                      key="btnRemoveFile"
                      onClick={handleRemoveFile}
                      type="text"
                      icon={<i className="fas fa-times"></i>}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={imageFile.name}
                    description={`Size: ${imageFile.size}`}
                  />
                </List.Item>

                <div className="text-right mt-3">
                  <Button
                    loading={isUploading}
                    type="primary"
                    onClick={handleUploadFile}
                  >
                    Upload
                  </Button>

                  <Progress percent={progressUpload} />
                </div>
              </>
            )}

            {downloadURL && (
              <>
                <Image
                  src={downloadURL}
                  alt={downloadURL}
                  style={{ width: 200, height: 200, objectFit: "cover" }}
                />
                <p>{downloadURL}</p>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );*/
  //export default function UploadFile()
  return (
    <>
      <div className={styles.btnContainer}>
        <button className={styles.button}>Add a New Note</button>
      </div>

      <div className={styles.inputContainer}>
        <input placeholder="Enter the Title.." />
      </div>
    </>
  );
};
export default UploadImageToStorage;
