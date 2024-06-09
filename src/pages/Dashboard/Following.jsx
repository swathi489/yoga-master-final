import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdArticle, MdEventNote } from 'react-icons/md';
import Navbar from '../../components/headers/Navbar'; 
const Following = () => {
  const followingContent = [
    {
      title: 'Top Yoga Influencers to Follow',
      description: 'Discover the most inspiring yoga influencers on Instagram.',
      icon: <FaInstagram className="text-xl mr-2" />,
      url: 'https://www.instagram.com/explore/tags/yoga/',
    },
    {
      title: 'Latest Yoga Articles',
      description: 'Read the latest articles about yoga practices, benefits, and more.',
      icon: <MdArticle className="text-xl mr-2" />,
      url: 'https://www.yogajournal.com/',
    },
    {
      title: 'Popular Yoga Videos',
      description: 'Watch trending yoga videos on YouTube.',
      icon: <FaYoutube className="text-xl mr-2" />,
      url: 'https://www.youtube.com/results?search_query=yoga',
    },
    {
      title: 'Yoga Events and Workshops',
      description: 'Find out about upcoming yoga events and workshops.',
      icon: <MdEventNote className="text-xl mr-2" />,
      url: 'https://www.eventbrite.com/d/online/yoga/',
    },
    {
      title: 'Yoga Trends on Twitter',
      description: 'Follow the latest trends in the yoga community on Twitter.',
      icon: <FaTwitter className="text-xl mr-2" />,
      url: 'https://twitter.com/hashtag/yoga',
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/banner1.jpg')] bg-cover bg-center flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center flex-grow py-9 mt-7" >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-6">Following</h1>
          <div className="space-y-4">
            {followingContent.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-cyan-100 p-4 rounded-md shadow-md hover:bg-cyan-200 transition duration-300"
              >
                {item.icon}
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-700">{item.description}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Following;
