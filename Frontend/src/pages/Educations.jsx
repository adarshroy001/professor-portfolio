import React, { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext';
import EducationCard from '../components/EducationCard';
import API_BASE_URL from "../config";



function Educations() {
  const { isDark } = useTheme();
  const [educations, setEducations] = useState([]);

  useEffect(() => {
      fetch(`${API_BASE_URL}/api/education`)
          .then((res) => res.json())
          .then((data) => setEducations(data))
          .catch((err) => console.error("Error fetching education:", err));
  }, []);
  console.log(educations);
  
  return (
    <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>
      {
        educations.map((item,index)=>(
          <EducationCard key ={item.id} eduDetail ={ item}/>
        )

        )
      }
      

    </div>
  )
}

export default Educations