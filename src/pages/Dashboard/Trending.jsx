import React from 'react';
import { FaJournalWhills, FaGlobe, FaYoutube, FaLeaf } from 'react-icons/fa';
import { IoIosFitness } from 'react-icons/io';
import Navbar from '../../components/headers/Navbar'; 

const Trending = () => {
  const trendingLinks = [
    { name: 'Yoga Journal', url: 'https://www.yogajournal.com/', icon: <FaJournalWhills className="text-xl mr-2" /> },
    { name: 'Yoga International', url: 'https://yogainternational.com/', icon: <FaGlobe className="text-xl mr-2" /> },
    { name: 'DoYouYoga', url: 'https://www.doyouyoga.com/', icon: <IoIosFitness className="text-xl mr-2" /> },
    { name: 'Yoga with Adriene', url: 'https://www.youtube.com/user/yogawithadriene', icon: <FaYoutube className="text-xl mr-2" /> },
    { name: 'Gaiam', url: 'https://www.gaiam.com/', icon: <FaLeaf className="text-xl mr-2" /> }
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(/yoga-background.jpg)' }}
    >
      <Navbar/>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Trending Yoga Resources</h1>
        <ul className="list-disc space-y-4">
          {trendingLinks.map((link, index) => (
            <li key={index} className="text-lg flex items-center">
              {link.icon}
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trending;
