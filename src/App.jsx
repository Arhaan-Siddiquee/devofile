import { useState, useRef, useEffect } from 'react';
import { FileIcon, CodeIcon, BookOpenIcon, GraduationCapIcon, BriefcaseIcon, DownloadIcon, PrinterIcon, GithubIcon, MoonIcon, SunIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { usePDF } from 'react-to-pdf';

// Placeholder data - this would be editable in the actual app
const leetcodeData = [
  { month: 'Jan', problems: 15 },
  { month: 'Feb', problems: 22 },
  { month: 'Mar', problems: 30 },
  { month: 'Apr', problems: 42 },
  { month: 'May', problems: 55 },
  { month: 'Jun', problems: 63 },
];

export default function DeveloperProfile() {
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with a focus on creating efficient and scalable web applications. Experienced in modern JavaScript frameworks and cloud technologies.',
    email: 'alex.j@example.com',
    location: 'San Francisco, CA',
    website: 'alexj.dev',
    education: 'M.S. Computer Science, Stanford University',
    leetcodeStats: {
      solved: 310,
      easy: 95,
      medium: 165,
      hard: 50,
    },
    dsaTopics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Recursion', 'Sorting'],
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'React', level: 92 },
      { name: 'Node.js', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'AWS', level: 78 },
      { name: 'Docker', level: 70 },
    ],
    projects: [
      {
        title: 'DevCollab',
        description: 'A collaborative platform for developers to share and work on projects together in real-time.',
        tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        live: 'https://devcollab.io'
      },
      {
        title: 'CodeAnalyzer',
        description: 'Tool that analyzes code quality and provides suggestions for improvements based on best practices.',
        tech: ['TypeScript', 'Express', 'NLP', 'PostgreSQL'],
        live: 'https://codeanalyzer.tech'
      },
      {
        title: 'HealthTracker',
        description: 'Mobile application for tracking health metrics with visualization and AI-powered insights.',
        tech: ['React Native', 'Redux', 'Firebase', 'TensorFlow.js'],
        live: 'https://healthtracker.app'
      }
    ],
    githubStats: {
      repos: 48,
      stars: 285,
      followers: 156,
      contributions: 1267
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({...profile});
  const profileRef = useRef();
  const { toPDF, targetRef } = usePDF({filename: 'developer-profile.pdf'});
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle form changes
  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    
    if (section) {
      if (index !== undefined) {
        // For array fields like skills
        setEditableProfile(prev => {
          const newArray = [...prev[section]];
          newArray[index] = { ...newArray[index], [name]: value };
          return { ...prev, [section]: newArray };
        });
      } else {
        // For nested objects
        setEditableProfile(prev => ({
          ...prev,
          [section]: { ...prev[section], [name]: value }
        }));
      }
    } else {
      // For top-level fields
      setEditableProfile(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const saveChanges = () => {
    setProfile({...editableProfile});
    setIsEditing(false);
  };
  
  const cancelEdit = () => {
    setEditableProfile({...profile});
    setIsEditing(false);
  };
  
  const printProfile = () => {
    window.print();
  };
  
  const downloadAsPDF = async () => {
    toPDF();
  };
  
  const downloadAsDoc = async () => {
    const htmlContent = profileRef.current.innerHTML;
    
    // Use dynamic import
    const { default: htmlToDocx } = await import('html-to-docx');
    
    const docx = await htmlToDocx(htmlContent, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      page: {
        margin: {
          top: '1in',
          right: '1in',
          bottom: '1in',
          left: '1in',
        },
      },
    });
    
    // Rest of your download logic
    const blob = new Blob([docx], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'developer-profile.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 p-6 print:bg-white print:text-black">
      {/* Header with Action Buttons */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Developer Profile</h1>
          <div className="flex space-x-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm"
            >
              {darkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </button>
            {isEditing ? (
              <>
                <button 
                  onClick={saveChanges}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Save
                </button>
                <button 
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-sm"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={printProfile} 
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm flex items-center gap-2"
                >
                  <PrinterIcon size={16} /> Print
                </button>
                <button 
                  onClick={downloadAsPDF}
                  className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors shadow-sm flex items-center gap-2"
                >
                  <DownloadIcon size={16} /> PDF
                </button>
                <button 
                  onClick={downloadAsDoc}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
                >
                  <FileIcon size={16} /> DOC
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div ref={targetRef} className="max-w-6xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={profileRef}
        >
          {/* Left Column - Personal Info */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm mb-8">
              {isEditing ? (
                <>
                  <div className="mb-6">
                    <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Profile Image</label>
                    <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 mb-4 mx-auto flex items-center justify-center border border-gray-200 dark:border-gray-600">
                      <span className="text-gray-400 dark:text-gray-300 text-sm">Upload Image</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={editableProfile.name} 
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={editableProfile.title} 
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Bio</label>
                    <textarea 
                      name="bio" 
                      value={editableProfile.bio} 
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 h-32 dark:text-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <img src="/api/placeholder/128/128" alt={profile.name} className="rounded-full" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{profile.title}</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{profile.bio}</p>
                </>
              )}
              
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">GitHub Username</label>
                      <input 
                        type="text" 
                        name="github" 
                        value={editableProfile.github} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={editableProfile.email} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Location</label>
                      <input 
                        type="text" 
                        name="location" 
                        value={editableProfile.location} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Website</label>
                      <input 
                        type="text" 
                        name="website" 
                        value={editableProfile.website} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Education</label>
                      <input 
                        type="text" 
                        name="education" 
                        value={editableProfile.education} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <CodeIcon className="text-indigo-500 dark:text-indigo-400 mr-3" size={16} />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <BriefcaseIcon className="text-indigo-500 dark:text-indigo-400 mr-3" size={16} />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <FileIcon className="text-indigo-500 dark:text-indigo-400 mr-3" size={16} />
                      <span>{profile.website}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <GraduationCapIcon className="text-indigo-500 dark:text-indigo-400 mr-3" size={16} />
                      <span>{profile.education}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* DSA Topics */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
              <div className="flex items-center mb-4">
                <BookOpenIcon size={18} className="mr-2 text-indigo-500 dark:text-indigo-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">DSA Topics</h2>
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Enter topics separated by commas</p>
                  <textarea 
                    value={editableProfile.dsaTopics.join(', ')} 
                    onChange={(e) => {
                      const topics = e.target.value.split(',').map(topic => topic.trim());
                      setEditableProfile(prev => ({...prev, dsaTopics: topics}));
                    }}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 h-24 dark:text-white"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.dsaTopics.map((topic, idx) => (
                    <span 
                      key={idx} 
                      className="bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* GitHub Stats */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">GitHub Stats</h2>
              </div>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Repositories</label>
                    <input 
                      type="number" 
                      name="repos" 
                      value={editableProfile.githubStats.repos} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Stars</label>
                    <input 
                      type="number" 
                      name="stars" 
                      value={editableProfile.githubStats.stars} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Followers</label>
                    <input 
                      type="number" 
                      name="followers" 
                      value={editableProfile.githubStats.followers} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Contributions</label>
                    <input 
                      type="number" 
                      name="contributions" 
                      value={editableProfile.githubStats.contributions} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Repositories</span>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{profile.githubStats.repos}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Stars</span>
                    <p className="text-2xl font-bold text-amber-500 dark:text-amber-400">{profile.githubStats.stars}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Followers</span>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{profile.githubStats.followers}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Contributions</span>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{profile.githubStats.contributions}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Right Column - Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
            {/* Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Skills</h2>
              {isEditing ? (
                <div className="space-y-3">
                  {editableProfile.skills.map((skill, idx) => (
                    <div key={idx} className="grid grid-cols-8 gap-3 items-center">
                      <div className="col-span-2">
                        <input 
                          type="text" 
                          name="name" 
                          value={skill.name} 
                          onChange={(e) => handleChange(e, 'skills', idx)}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                      <div className="col-span-5">
                        <input 
                          type="range" 
                          name="level" 
                          min="0" 
                          max="100" 
                          value={skill.level} 
                          onChange={(e) => handleChange(e, 'skills', idx)}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        {skill.level}%
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      setEditableProfile(prev => ({
                        ...prev, 
                        skills: [...prev.skills, { name: 'New Skill', level: 50 }]
                      }));
                    }}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md mt-2 text-sm"
                  >
                    Add Skill
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* LeetCode Stats */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">LeetCode Progress</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Total Solved</label>
                        <input 
                          type="number" 
                          name="solved" 
                          value={editableProfile.leetcodeStats.solved} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Easy</label>
                        <input 
                          type="number" 
                          name="easy" 
                          value={editableProfile.leetcodeStats.easy} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Medium</label>
                        <input 
                          type="number" 
                          name="medium" 
                          value={editableProfile.leetcodeStats.medium} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Hard</label>
                        <input 
                          type="number" 
                          name="hard" 
                          value={editableProfile.leetcodeStats.hard} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center border-l-4 border-indigo-500">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Total Solved</span>
                        <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{profile.leetcodeStats.solved}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center border-l-4 border-green-500">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Easy</span>
                        <p className="text-xl font-semibold text-green-600 dark:text-green-400">{profile.leetcodeStats.easy}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center border-l-4 border-yellow-500">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Medium</span>
                        <p className="text-xl font-semibold text-yellow-600 dark:text-yellow-400">{profile.leetcodeStats.medium}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center border-l-4 border-red-500">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">Hard</span>
                        <p className="text-xl font-semibold text-red-600 dark:text-red-400">{profile.leetcodeStats.hard}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={leetcodeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#F9FAFB', 
                          borderRadius: '8px', 
                          border: '1px solid #E5E7EB',
                          color: '#111827'
                        }} 
                      />
                      <Line type="monotone" dataKey="problems" stroke="#6366F1" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
            
            {/* Projects */}
            <motion.div variants={containerVariants} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Projects</h2>
              {isEditing ? (
                <div className="space-y-6">
                  {editableProfile.projects.map((project, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <div className="mb-3">
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Project Title</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={project.title} 
                          onChange={(e) => handleChange(e, 'projects', idx)}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Description</label>
                        <textarea 
                          name="description" 
                          value={project.description} 
                          onChange={(e) => handleChange(e, 'projects', idx)}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-md px-3 py-2 h-20 dark:text-white"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Technologies (comma separated)</label>
                        <input 
                          type="text" 
                          value={project.tech.join(', ')} 
                          onChange={(e) => {
                            const techs = e.target.value.split(',').map(tech => tech.trim());
                            setEditableProfile(prev => {
                              const newProjects = [...prev.projects];
                              newProjects[idx] = { ...newProjects[idx], tech: techs };
                              return { ...prev, projects: newProjects };
                            });
                          }}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 dark:text-gray-400 mb-1 text-sm">Live Link</label>
                        <input 
                          type="text" 
                          name="live" 
                          value={project.live} 
                          onChange={(e) => handleChange(e, 'projects', idx)}
                          className="w-full bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-md px-3 py-2 dark:text-white"
                        />
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      setEditableProfile(prev => ({
                        ...prev, 
                        projects: [...prev.projects, { 
                          title: 'New Project', 
                          description: 'Project description', 
                          tech: ['Technology'], 
                          live: '#' 
                        }]
                      }));
                    }}
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md mt-2 text-sm"
                  >
                    Add Project
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.projects.map((project, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants}
                      className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border-l-4 border-indigo-500 hover:shadow-md transition-shadow group"
                    >
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map((tech, techIdx) => (
                          <span key={techIdx} className="bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-200 text-xs px-2 py-1 rounded-full border border-indigo-100 dark:border-gray-500">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 text-sm inline-flex items-center">
                        View Project <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}