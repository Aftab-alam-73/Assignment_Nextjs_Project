"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
const AddSchool = () => {

  const [image, setImage] = useState(null);
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");
  const [show,setShow]=useState(false);
  console.log(data)
  const uploadImage = async (e) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myfirstpost");
    data.append("cloud_name", process.env.cloud_name)
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/auto/upload`,
      data
    );
    // console.log("Image_url:",res.data.secure_url)
    setData({ ...data, imageUrl: res.data.secure_url });
  };
  console.log(process.env.password);
  console.log(process.env.cloud_name);
  const handleclick = async (e) => {
    e.preventDefault();
    if(data.name=="" || data.email=="" || data.address=="" || data.state=="" || data.city=="" || data.contact==""  ){
      setMessage("Please enter all the required information")
      setShow(true);
      setTimeout(()=>{
        setShow(false);
      },2000)
      return ;
    }
    if(data.imageUrl==""){
      setMessage("Please wait for image to be uploaded")
      setShow(true);
      setTimeout(()=>{
        setShow(false);
       },2000)
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/addinfo/", data);
      if (res.data && res.data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    image && uploadImage();
  }, [image]);
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Enter School Informations</h1>
      <form className={styles.form}>
        <div className={styles.section}>
          <input
            type="text"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className={styles.input}
            placeholder="Enter school name..."
          />
          <input
            type="email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className={styles.input}
            placeholder="Enter email..."
          />
        </div>
        <div className={styles.section}>
          <input
            type="text"
            onChange={(e) => setData({ ...data, address: e.target.value })}
            className={styles.input}
            placeholder="Enter address..."
          />
          <input
            type="text"
            onChange={(e) => setData({ ...data, city: e.target.value })}
            className={styles.input}
            placeholder="Enter city..."
          />
        </div>
        <div className={styles.section}>
          <input
            type="text"
            onChange={(e) => setData({ ...data, state: e.target.value })}
            className={styles.input}
            placeholder="Enter state..."
          />
          <input
            type="text"
            onChange={(e) => setData({ ...data, contact: e.target.value })}
            className={styles.input}
            placeholder="Enter contact number..."
          />
        </div>
        <div className={styles.section}>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button className={styles.btn} onClick={handleclick}>
            Submit
          </button>
        </div>
      </form>
     { show && <p>{message}</p>}
    </div>
  );
};

export default AddSchool;
