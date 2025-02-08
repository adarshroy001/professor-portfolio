import React, { useState } from 'react'
import { useTheme } from '../ThemeContext';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { Link } from 'react-router-dom';


function Home() {
  const { isDark } = useTheme();
  const [name, setName] = useState('Adarsh Roy')
  const [about, setAbout] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, harum vel! Voluptatibus, laudantium. Quibusdam iusto possimus facilis minima omnis magni expedita ad excepturi, doloremque ab eum dicta nostrum eos molestias reprehenderit minus quos consequatur voluptatibus, debitis deleniti rerum optio est! Nostrum facilis ducimus dolore officiis perferendis accusamus, blanditiis dolores aut!')
  const workPlace = 'NIT Jamshedpur'
  const img = 'https://avatars.githubusercontent.com/u/12345678?v=4'

  return (
<>
</>
  )
}

export default Home