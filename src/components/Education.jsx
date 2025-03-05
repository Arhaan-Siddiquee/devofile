import React, { useState } from 'react';
import { 
  FaClock, FaLinkedin, FaTwitter, FaGlobe, FaGithub, FaEnvelope,
  FaAward, FaChevronRight, FaGraduationCap, FaBriefcase, FaQuoteLeft
} from 'react-icons/fa';

const ProfileDashboard = () => {
  // State for profile data that can be easily modified
  const [profileData, setProfileData] = useState({
    name: 'Aditya Singh',
    title: 'Second-Year Computer Science undergraduate at SRM University',
    skills: 'Chennai, specializing in both frontend and backend web development',
    about: 'Passionate computer science student with a keen interest in web development and problem-solving. Constantly learning and exploring new technologies.',
    
    // Social media links
    socialLinks: {
      email: 'mailto:adityasingh@example.com',
      linkedin: 'https://www.linkedin.com/in/adityasingh',
      twitter: 'https://twitter.com/adityasingh',
      website: 'https://adityasingh.com',
      github: 'https://github.com/adityasingh'
    },
    
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
  });

  // Function to update profile data
  const updateProfileData = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to update nested objects like socialLinks
  const updateNestedProfileData = (section, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen p-6 font-sans">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Profile Section */}
        <div className="col-span-3 bg-[#242424] rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 flex items-center justify-center">
              <div className="w-28 h-28 bg-[#242424] rounded-full flex items-center justify-center">
                <img 
                  src="/api/placeholder/120/120" 
                  alt="Profile" 
                  className="rounded-full"
                />
              </div>
            </div>
            
            {/* Editable Name */}
            <input 
              type="text" 
              value={profileData.name}
              onChange={(e) => updateProfileData('name', e.target.value)}
              className="text-xl font-bold bg-transparent text-center w-full mb-2 focus:outline-none focus:border-b focus:border-white"
            />
            
            {/* Editable Title */}
            <input 
              type="text" 
              value={profileData.title}
              onChange={(e) => updateProfileData('title', e.target.value)}
              className="text-sm text-gray-400 text-center mt-2 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
            />
            
            {/* Editable Skills */}
            <input 
              type="text" 
              value={profileData.skills}
              onChange={(e) => updateProfileData('skills', e.target.value)}
              className="text-xs text-gray-500 text-center mt-1 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
            />
          </div>
          
          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mt-6 mb-6">
            <a href={profileData.socialLinks.email} target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            </a>
            <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            </a>
            <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            </a>
            <a href={profileData.socialLinks.website} target="_blank" rel="noopener noreferrer">
              <FaGlobe className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            </a>
            <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            </a>
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

          {/* Education Section */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaGraduationCap className="text-gray-400 mr-3" size={20} />
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            {profileData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <input 
                  type="text" 
                  value={edu.institution}
                  onChange={(e) => {
                    const newEducation = [...profileData.education];
                    newEducation[index].institution = e.target.value;
                    updateProfileData('education', newEducation);
                  }}
                  className="text-sm font-medium bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
                />
                <input 
                  type="text" 
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...profileData.education];
                    newEducation[index].degree = e.target.value;
                    updateProfileData('education', newEducation);
                  }}
                  className="text-xs text-gray-400 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
                />
                <input 
                  type="text" 
                  value={edu.duration}
                  onChange={(e) => {
                    const newEducation = [...profileData.education];
                    newEducation[index].duration = e.target.value;
                    updateProfileData('education', newEducation);
                  }}
                  className="text-xs text-gray-500 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
                />
              </div>
            ))}
          </div>

          {/* Experience Section */}
          <div>
            <div className="flex items-center mb-3">
              <FaBriefcase className="text-gray-400 mr-3" size={16} />
              <h3 className="text-lg font-semibold">Experience</h3>
            </div>
            {profileData.experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <input 
                  type="text" 
                  value={exp.company}
                  onChange={(e) => {
                    const newExperience = [...profileData.experience];
                    newExperience[index].company = e.target.value;
                    updateProfileData('experience', newExperience);
                  }}
                  className="text-sm font-medium bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
                />
                <input 
                  type="text" 
                  value={exp.role}
                  onChange={(e) => {
                    const newExperience = [...profileData.experience];
                    newExperience[index].role = e.target.value;
                    updateProfileData('experience', newExperience);
                  }}
                  className="text-xs text-gray-400 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
                />
                <input 
                  type="text" 
                  value={exp.duration}
                  onChange={(e) => {
                    const newExperience = [...profileData.experience];
                    newExperience[index].duration = e.target.value;
                    updateProfileData('experience', newExperience);
                  }}
                  className="text-xs text-gray-500 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center Dashboard Section */}
        <div className="col-span-6 grid grid-cols-1 gap-6">
          {/* LeetCode Stats Graphs */}
          <div className="bg-[#242424] rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">LeetCode Rating Progression</h3>
            </div>
            <div className="w-full h-48 bg-[#1A1A1A] rounded flex items-center justify-center text-gray-500">
              [LeetCode Rating Graph Placeholder]
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
          {/* Stats Cards */}
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Questions</span>
              <FaClock className="text-gray-400" size={16} />
            </div>
            <input 
              type="number"
              value={profileData.totalQuestions}
              onChange={(e) => updateProfileData('totalQuestions', parseInt(e.target.value))}
              className="text-2xl font-bold mt-2 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
            />
          </div>
          
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Active Days</span>
              <FaClock className="text-gray-400" size={16} />
            </div>
            <input 
              type="number"
              value={profileData.totalActiveDays}
              onChange={(e) => updateProfileData('totalActiveDays', parseInt(e.target.value))}
              className="text-2xl font-bold mt-2 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
            />
          </div>
          
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Contests</span>
              <FaAward className="text-gray-400" size={16} />
            </div>
            <input 
              type="number"
              value={profileData.totalContests}
              onChange={(e) => updateProfileData('totalContests', parseInt(e.target.value))}
              className="text-2xl font-bold mt-2 bg-transparent w-full focus:outline-none focus:border-b focus:border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;