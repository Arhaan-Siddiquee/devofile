import React, { useState } from 'react';
import { 
  FaClock, FaLinkedin, FaTwitter, FaGlobe, FaGithub, FaEnvelope,
  FaAward, FaChevronRight, FaGraduationCap, FaBriefcase, FaQuoteLeft
} from 'react-icons/fa';

const ProfileDashboard = () => {
  const [activeSection, setActiveSection] = useState('Problem Solving Stats');

  const profileData = {
    name: 'Aditya Singh',
    title: 'Second-Year Computer Science undergraduate at SRM University',
    skills: 'Chennai, specializing in both frontend and backend web development',
    about: 'Passionate computer science student with a keen interest in web development and problem-solving. Constantly learning and exploring new technologies.',
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
            <h2 className="text-xl font-bold">{profileData.name}</h2>
            <p className="text-sm text-gray-400 text-center mt-2">
              {profileData.title}
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              {profileData.skills}
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mt-6 mb-6">
            <FaEnvelope className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            <FaLinkedin className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            <FaTwitter className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            <FaGlobe className="text-gray-400 hover:text-white cursor-pointer" size={20} />
            <FaGithub className="text-gray-400 hover:text-white cursor-pointer" size={20} />
          </div>

          {/* About Section */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaQuoteLeft className="text-gray-400 mr-3" size={16} />
              <h3 className="text-lg font-semibold">About</h3>
            </div>
            <p className="text-sm text-gray-300">{profileData.about}</p>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaGraduationCap className="text-gray-400 mr-3" size={20} />
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            {profileData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm font-medium">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.degree}</p>
                <p className="text-xs text-gray-500">{edu.duration}</p>
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
                <p className="text-sm font-medium">{exp.company}</p>
                <p className="text-xs text-gray-400">{exp.role}</p>
                <p className="text-xs text-gray-500">{exp.duration}</p>
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
            <h3 className="text-2xl font-bold mt-2">{profileData.totalQuestions}</h3>
          </div>
          
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Active Days</span>
              <FaClock className="text-gray-400" size={16} />
            </div>
            <h3 className="text-2xl font-bold mt-2">{profileData.totalActiveDays}</h3>
          </div>
          
          <div className="bg-[#242424] rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Contests</span>
              <FaAward className="text-gray-400" size={16} />
            </div>
            <h3 className="text-2xl font-bold mt-2">{profileData.totalContests}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;