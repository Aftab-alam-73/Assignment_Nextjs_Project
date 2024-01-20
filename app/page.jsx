"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Box from '@/components/box/Box'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [data,setData] =useState([]);
  useEffect(()=>{
    const fetchData=async()=>{
     const res= await axios.get("http://localhost:3000/api/addinfo")
      if(res.data.success){
        setData(res.data.data)
      }
    }
    fetchData();
  },[])
  console.log(data)
  return (
    <main className={styles.main}>
     
     {
       data && data.map((school)=>{
         return <Box data={school} key={school.id}/>
       })
     }
    </main>
  )
}
