import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
function Home() {
  const [info, setInfo] = useState('');
  useEffect(() => {
    async function fetchimage(){
        try {
          const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=IkM2M7So0tQvjLDCP8u5UZPLy8pOE3kSFrwiyewM`)
          const data = res.data
          const infoHome = {
            'img': data.url,
            'title': res.data.title
          }
          setInfo(infoHome)
          // console.log('esto es res', res.data.url)
        } catch (error) {
          console.log('error', error)
      }
    }
    fetchimage();
  },[])
  return (
    <section className='home'>
      <img src={info.img} alt="picoftheday" className='img' />
      <h1 className='title'>{info.title}</h1>
      <p>Observa los meteoritos</p>
    </section>
  )
}
export default Home
