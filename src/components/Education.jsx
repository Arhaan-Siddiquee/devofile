import React, { useState, useEffect } from 'react';
import { 
  FaClock, FaLinkedin, FaTwitter, FaGlobe, FaGithub, FaEnvelope,
  FaAward, FaChevronRight, FaGraduationCap, FaBriefcase, FaQuoteLeft, FaCamera
} from 'react-icons/fa';

const ProfileDashboard = () => {
  // Initialize state from localStorage or use default values
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem('profileData');
    return savedProfile ? JSON.parse(savedProfile) : {
      profileImage: '/api/placeholder/120/120',
      name: 'Aditya Singh',
      title: 'Second-Year Computer Science undergraduate at SRM University',
      skills: 'Chennai, specializing in both frontend and backend web development',
      about: 'Passionate computer science student with a keen interest in web development and problem-solving. Constantly learning and exploring new technologies.',
      
      socialLinks: [
        {
          name: 'email',
          url: 'mailto:adityasingh@example.com',
          icon: FaEnvelope
        },
        {
          name: 'linkedin',
          url: 'https://www.linkedin.com/in/adityasingh',
          icon: FaLinkedin
        },
        {
          name: 'twitter',
          url: 'https://twitter.com/adityasingh',
          icon: FaTwitter
        },
        {
          name: 'website',
          url: 'https://adityasingh.com',
          icon: FaGlobe
        },
        {
          name: 'github',
          url: 'https://github.com/adityasingh',
          icon: FaGithub
        }
      ],
      
      education: [
        {
          institution: 'SRM University',
          degree: 'B.Tech Computer Science',
          duration: '2022 - Present'
        }
      ],
      experience: [
        {
          company: 'Freelance',
          role: 'Web Developer',
          duration: 'Jan 2024 - Present'
        }
      ],
      totalQuestions: 239,
      totalActiveDays: 94,
      totalContests: 3,
      rating: 1474,
      lastRefreshed: '05 Mar 2025',
    };
  });

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  // Function to update profile data
  const updateProfileData = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to update social links
  const updateSocialLink = (index, field, value) => {
    const newSocialLinks = [...profileData.socialLinks];
    newSocialLinks[index][field] = value;
    updateProfileData('socialLinks', newSocialLinks);
  };

  // Function to handle profile image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileData('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate a random graph data
  const generateRandomGraphData = () => {
    return Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  };

  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen p-6 font-sans">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Profile Section */}
        <div className="col-span-3 bg-[#242424] rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 flex items-center justify-center">
              <div className="w-28 h-28 bg-[#242424] rounded-full flex items-center justify-center">
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="rounded-full w-full h-full object-cover"
                />
                <label 
                  htmlFor="profile-image-upload" 
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <FaCamera className="text-white" size={24} />
                  <input 
                    type="file" 
                    id="profile-image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            
            {/* Rest of the profile section remains the same */}
            <input 
              type="text" 
              value={profileData.name}
              onChange={(e) => updateProfileData('name', e.target.value)}
              className="text-xl font-bold bg-transparent text-center w-full mb-2 focus:outline-none focus:border-b focus:border-white"
            />
            
            <input 
              type="text" 
              value={profileData.title}
              onChange={(e) => updateProfileData('title', e.target.value)}
              className="text-sm text-gray-400 text-center mt-2 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
            />
            
            <input 
              type="text" 
              value={profileData.skills}
              onChange={(e) => updateProfileData('skills', e.target.value)}
              className="text-xs text-gray-500 text-center mt-1 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
            />
          </div>
          
          {/* Social Media Links section remains the same */}
          <div className="flex justify-center space-x-4 mt-6 mb-6">
            {profileData.socialLinks.map((link, index) => (
              <div key={link.name} className="relative group">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <link.icon className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                </a>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-[#1A1A1A] p-2 rounded-lg shadow-lg z-10 hidden group-hover:block">
                  <input 
                    type="text"
                    value={link.url}
                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                    className="w-full bg-transparent border-b border-gray-600 focus:border-white text-sm text-gray-300 focus:outline-none"
                    placeholder={`Enter ${link.name} URL`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaQuoteLeft className="text-gray-400 mr-3" size={16} />
              <h3 className="text-lg font-semibold">About</h3>
            </div>
            <textarea 
              value={profileData.about}
              onChange={(e) => updateProfileData('about', e.target.value)}
              className="text-sm text-gray-300 bg-transparent w-full focus:outline-none focus:border focus:border-white resize-y"
              rows={3}
            />
          </div>

          {/* Rest of the left section remains the same */}
        </div>

        {/* Center Dashboard Section */}
        <div className="col-span-6 grid grid-cols-1 gap-6">
          {/* LeetCode Stats Graphs */}
          <div className="bg-[#242424] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">LeetCode Rating Progression</h3>
            </div>
            <div className="w-full h-48 bg-[#1A1A1A] rounded flex items-center justify-center">
              <div className="w-full h-full flex items-end justify-between p-4">
                {generateRandomGraphData().map((height, index) => (
                  <div 
                    key={index} 
                    className="bg-blue-500 hover:bg-blue-600 transition-colors" 
                    style={{ 
                      width: '8%', 
                      height: `${height}%`, 
                      minHeight: '10px' 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Contribution Placeholder */}
          <div className="bg-[#242424] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contributions</h3>
            </div>
            <div className="w-full h-64 bg-[#1A1A1A] rounded flex items-center justify-center text-gray-500">
              [Contributions Image Placeholder]
            </div>
          </div>
        </div>

        {/* Right Stats Section */}
        <div className="col-span-3 grid grid-cols-1 gap-6">
          {/* Stats Cards - Now read-only */}
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Questions</span>
              <FaClock className="text-gray-400" size={16} />
            </div>
            <div className="text-2xl font-bold mt-2">{profileData.totalQuestions}</div>
          </div>
          
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Active Days</span>
              <FaClock className="text-gray-400" size={16} />
            </div>
            <div className="text-2xl font-bold mt-2">{profileData.totalActiveDays}</div>
          </div>
          
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Contests</span>
              <FaAward className="text-gray-400" size={16} />
            </div>
            <div className="text-2xl font-bold mt-2">{profileData.totalContests}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;