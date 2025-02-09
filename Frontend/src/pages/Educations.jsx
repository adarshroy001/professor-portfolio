import React from 'react'
import { useTheme } from '../ThemeContext';
import EducationCard from '../components/EducationCard';


function Educations() {
  const { isDark } = useTheme();
  const educationDetail = [
    {
      id: '1',
      'DegreeName': 'Doctor of Philosophy (PhD)',
      'CollegeName': ' Indian Institute of Technology (IIT) Bombay, Maharashtra, India',
      'Department': 'Metallurgical Engineering and Materials Science',
      'Title': 'Analysis of deformation behavior of glassy polymers during nanoindentation',
      'Supervisor': 'Prof. Prita Pant',
      'year': '2015-2024',
      'collegeImg': 'https://www.iitb.ac.in/sites/www.iitb.ac.in/files/styles/slick_media/public/2023-12/P1120458_0.jpg?itok=OpEalU1f'
    },
    {
      id: '2',
      'DegreeName': 'Master of Engineering (ME)',
      'CollegeName': 'Indian Institute of Science (IISc) Bangalore, Karnataka, India',
      'Department': 'Materials Engineering',
      'Title': 'Preparation and mechanical properties of nanoparticles embedded polymer films',
      'Supervisor': 'Prof. Ashok M. Raichur',
      'year': '2010-2012',
      'collegeImg': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs56GWUUnvsQtGrT60mOajwpebdJ_J3AAw9w&s'

    },
    {
      id: '3',
      'DegreeName': 'Bachelor of Engineering (BE)',
      'CollegeName': ' Jadavpur University (JU) Kolkata, West Bengal, India',
      'Department': 'Metallurgical and Material Engineering',
      'Title': 'Development of aluminum alloys',
      'Supervisor': 'Prof. Akshay K. Pramanick',
      'year': '2006-2010',
      'collegeImg': 'https://jadavpuruniversity.in/storage/2021/03/JadavpurVarsity-gigapixel-standard-scale-2_00x.jpg'

    },
    
  ]
  return (
    <div className={`min-h-[88vh] ${isDark ? 'bg-[#1a1b1e] text-white' : 'bg-white text-gray-900'} transition-colors duration-200 `}>
      {
        educationDetail.map((item,index)=>(
          <EducationCard key ={item.id} eduDetail ={ item}/>
        )

        )
      }
      

    </div>
  )
}

export default Educations