import { useState, useEffect, useRef } from 'react';
import { FileIcon, CodeIcon, BookOpenIcon, GraduationCapIcon, BriefcaseIcon, DownloadIcon, PrinterIcon } from 'lucide-react';
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
    <div className="bg-gray-900 min-h-screen text-gray-100 p-6 print:bg-white print:text-black">
      {/* Header Action Buttons */}
      <div className="flex justify-end mb-4 space-x-3 print:hidden">
        {isEditing ? (
          <>
            <button 
              onClick={saveChanges}
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
            <button 
              onClick={cancelEdit}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
            <button 
              onClick={printProfile} 
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <PrinterIcon size={16} /> Print
            </button>
            <button 
              onClick={downloadAsPDF}
              className="px-4 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
            >
              <DownloadIcon size={16} /> PDF
            </button>
            <button 
              onClick={downloadAsDoc}
              className="px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
            >
              <FileIcon size={16} /> DOC
            </button>
          </>
        )}
      </div>
      
      <div ref={targetRef}>
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={profileRef}
          style={{ pageBreakInside: 'avoid' }}
        >
          {/* Left Column - Personal Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6 border border-gray-700">
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Profile Image</label>
                    <div className="w-32 h-32 rounded-full bg-gray-700 mb-4 mx-auto flex items-center justify-center">
                      <span className="text-gray-500">Upload Image</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={editableProfile.name} 
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={editableProfile.title} 
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Bio</label>
                    <textarea 
                      name="bio" 
                      value={editableProfile.bio} 
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 h-32"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                      <img src="/api/placeholder/128/128" alt={profile.name} className="rounded-full" />
                    </div>
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-blue-400">{profile.title}</p>
                  </div>
                  <p className="text-gray-300 mb-6">{profile.bio}</p>
                </>
              )}
              
              <div className="space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-gray-400 mb-2">GitHub Username</label>
                      <input 
                        type="text" 
                        name="github" 
                        value={editableProfile.github} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={editableProfile.email} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Location</label>
                      <input 
                        type="text" 
                        name="location" 
                        value={editableProfile.location} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Website</label>
                      <input 
                        type="text" 
                        name="website" 
                        value={editableProfile.website} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">Education</label>
                      <input 
                        type="text" 
                        name="education" 
                        value={editableProfile.education} 
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <span>{profile.github}</span>
                    </div>
                    <div className="flex items-center">
                      <CodeIcon className="text-gray-400 mr-2" size={16} />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center">
                      <BriefcaseIcon className="text-gray-400 mr-2" size={16} />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FileIcon className="text-gray-400 mr-2" size={16} />
                      <span>{profile.website}</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCapIcon className="text-gray-400 mr-2" size={16} />
                      <span>{profile.education}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* GitHub Stats */}
            <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 shadow-lg mb-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold">GitHub Stats</h2>
              </div>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 mb-1">Repositories</label>
                    <input 
                      type="number" 
                      name="repos" 
                      value={editableProfile.githubStats.repos} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Stars</label>
                    <input 
                      type="number" 
                      name="stars" 
                      value={editableProfile.githubStats.stars} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Followers</label>
                    <input 
                      type="number" 
                      name="followers" 
                      value={editableProfile.githubStats.followers} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Contributions</label>
                    <input 
                      type="number" 
                      name="contributions" 
                      value={editableProfile.githubStats.contributions} 
                      onChange={(e) => handleChange(e, 'githubStats')}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <span className="text-gray-400 text-sm">Repositories</span>
                    <p className="text-2xl font-bold text-blue-400">{profile.githubStats.repos}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <span className="text-gray-400 text-sm">Stars</span>
                    <p className="text-2xl font-bold text-yellow-400">{profile.githubStats.stars}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <span className="text-gray-400 text-sm">Followers</span>
                    <p className="text-2xl font-bold text-purple-400">{profile.githubStats.followers}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <span className="text-gray-400 text-sm">Contributions</span>
                    <p className="text-2xl font-bold text-green-400">{profile.githubStats.contributions}</p>
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* DSA Topics */}
            <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <BookOpenIcon size={20} className="mr-2 text-gray-300" />
                <h2 className="text-xl font-bold">DSA Topics Mastered</h2>
              </div>
              {isEditing ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 mb-2">Enter topics separated by commas</p>
                  <textarea 
                    value={editableProfile.dsaTopics.join(', ')} 
                    onChange={(e) => {
                      const topics = e.target.value.split(',').map(topic => topic.trim());
                      setEditableProfile(prev => ({...prev, dsaTopics: topics}));
                    }}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 h-24"
                  />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.dsaTopics.map((topic, idx) => (
                    <span 
                      key={idx} 
                      className="bg-gray-700 text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Middle and Right Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              {isEditing ? (
                <div className="space-y-3">
                  {editableProfile.skills.map((skill, idx) => (
                    <div key={idx} className="grid grid-cols-6 gap-2 items-center">
                      <div className="col-span-2">
                        <input 
                          type="text" 
                          name="name" 
                          value={skill.name} 
                          onChange={(e) => handleChange(e, 'skills', idx)}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                        />
                      </div>
                      <div className="col-span-3">
                        <input 
                          type="range" 
                          name="level" 
                          min="0" 
                          max="100" 
                          value={skill.level} 
                          onChange={(e) => handleChange(e, 'skills', idx)}
                          className="w-full"
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
                    className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                  >
                    Add Skill
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
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
            <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4">LeetCode Progress</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Total Solved</label>
                        <input 
                          type="number" 
                          name="solved" 
                          value={editableProfile.leetcodeStats.solved} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Easy</label>
                        <input 
                          type="number" 
                          name="easy" 
                          value={editableProfile.leetcodeStats.easy} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Medium</label>
                        <input 
                          type="number" 
                          name="medium" 
                          value={editableProfile.leetcodeStats.medium} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Hard</label>
                        <input 
                          type="number" 
                          name="hard" 
                          value={editableProfile.leetcodeStats.hard} 
                          onChange={(e) => handleChange(e, 'leetcodeStats')}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <span className="text-gray-400">Total Solved</span>
                        <p className="text-3xl font-bold text-green-400">{profile.leetcodeStats.solved}</p>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <span className="text-gray-400">Easy</span>
                        <p className="text-xl font-semibold text-green-300">{profile.leetcodeStats.easy}</p>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <span className="text-gray-400">Medium</span>
                        <p className="text-xl font-semibold text-yellow-300">{profile.leetcodeStats.medium}</p>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg text-center">
                        <span className="text-gray-400">Hard</span>
                        <p className="text-xl font-semibold text-red-400">{profile.leetcodeStats.hard}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={leetcodeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                      <Line type="monotone" dataKey="problems" stroke="#8B5CF6" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
            
            {/* Projects */}
            <motion.div variants={containerVariants} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Projects</h2>
              {isEditing ? (
                <div className="space-y-6">
                  {editableProfile.projects.map((project, idx) => (
                    <div key={idx} className="border border-gray-700 p-4 rounded-lg">
                      <div className="mb-3">
                        <label className="block text-gray-400 mb-1">Project Title</label>
                        <input 
                          type="text" 
                          name="title" 
                          value={project.title} 
                          onChange={(e) => handleChange(e, 'projects', idx)}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-gray-400 mb-1">Description</label>
                        <textarea 
                          name="description" 
                          value={project.description} 
                          onChange={(e) => handleChange(e, 'projects', idx)}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 h-20"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-gray-400 mb-1">Technologies (comma separated)</label>
                        <input 
                          type="text" 
                          value={project.tech.join(', ')} 
                          onChange={(e) => {
                            const tech = e.target.value.split(',').map(t => t.trim());
                            setEditableProfile(prev => {
                              const newProjects = [...prev.projects];
                              newProjects[idx] = {...newProjects[idx], tech};
                              return {...prev, projects: newProjects};
                            });
                          }}
                          className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-gray-400 mb-1">GitHub URL</label>
                          <input 
                            type="text" 
                            name="github" 
                            value={project.github} 
                            onChange={(e) => handleChange(e, 'projects', idx)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1">Live URL</label>
                          <input 
                            type="text" 
                            name="live" 
                            value={project.live} 
                            onChange={(e) => handleChange(e, 'projects', idx)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                          />
                        </div>
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
                          tech: ['Tech Stack'],
                          github: 'https://github.com/',
                          live: 'https://example.com/'
                        }]
                      }));
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded mt-2"
                  >
                    Add Project
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {profile.projects.map((project, idx) => (
                    <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="bg-gray-700 p-5 rounded-lg border border-gray-600 hover:border-purple-500 transition-all"
                  >
                    <h3 className="text-lg font-bold text-blue-300">{project.title}</h3>
                    <p className="text-gray-300 my-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 my-3">
                      {project.tech.map((tech, techIdx) => (
                        <span key={techIdx} className="bg-gray-800 text-blue-300 px-2 py-1 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-4">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-blue-400 transition-colors text-sm"
                      >
                      </a>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-green-400 transition-colors text-sm"
                      >
                        <FileIcon size={16} className="mr-1" /> Live Demo
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    
    {/* Footer */}
    <div className="mt-8 text-center text-gray-500 text-sm print:hidden">
      <p>© {new Date().getFullYear()} Developer Profile - Created with React and Tailwind CSS</p>
    </div>
  </div>
);
}