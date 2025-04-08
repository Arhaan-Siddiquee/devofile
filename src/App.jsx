import React, { useState, useEffect } from 'react';

const DeveloperDashboard = () => {
  // State for developer profile
  const [devProfile, setDevProfile] = useState({
    name: 'John Doe',
    image: '/api/placeholder/150/150',
    bio: 'Full Stack Developer with 3 years of experience in React and Node.js',
    socials: {
      github: 'https://github.com/johndoe',
      leetcode: 'https://leetcode.com/johndoe',
      resume: 'https://resume.com/johndoe',
      website: 'https://johndoe.dev',
      gmail: 'johndoe@gmail.com',
      twitter: 'https://twitter.com/johndoe'
    },
    education: 'B.Tech in Computer Science, XYZ University',
    location: 'San Francisco, CA',
    dsaQuestions: [
      { id: 1, title: 'Two Sum', platform: 'LeetCode', difficulty: 'Easy', date: '2023-05-10' },
      { id: 2, title: 'Valid Parentheses', platform: 'LeetCode', difficulty: 'Easy', date: '2023-05-12' },
      { id: 3, title: 'Merge Two Sorted Lists', platform: 'LeetCode', difficulty: 'Easy', date: '2023-05-15' }
    ],
    fundamentals: [
      { id: 1, topic: 'Arrays', status: 'Completed' },
      { id: 2, topic: 'Linked Lists', status: 'Completed' },
      { id: 3, topic: 'Trees', status: 'In Progress' },
      { id: 4, topic: 'Graphs', status: 'Not Started' }
    ],
    techStack: [
      { id: 1, name: 'React', proficiency: 'Advanced' },
      { id: 2, name: 'JavaScript', proficiency: 'Advanced' },
      { id: 3, name: 'TypeScript', proficiency: 'Intermediate' },
      { id: 4, name: 'Node.js', proficiency: 'Intermediate' },
      { id: 5, name: 'MongoDB', proficiency: 'Intermediate' },
      { id: 6, name: 'Tailwind CSS', proficiency: 'Advanced' }
    ],
    projects: [
      { id: 1, title: 'E-commerce Platform', description: 'Built a full-stack e-commerce site using MERN stack', github: 'https://github.com/johndoe/ecommerce', live: 'https://ecommerce-project.com', image: '/api/placeholder/300/200' },
      { id: 2, title: 'Task Manager', description: 'A React and Firebase based task management application', github: 'https://github.com/johndoe/taskmanager', live: 'https://task-manager-app.com', image: '/api/placeholder/300/200' }
    ],
    blogs: [
      { id: 1, title: 'Understanding React Hooks', link: 'https://blog.com/react-hooks', date: '2023-06-15' },
      { id: 2, title: 'Mastering Tailwind CSS', link: 'https://blog.com/tailwind', date: '2023-07-20' }
    ],
    achievements: [
      { id: 1, title: 'AWS Certified Developer', date: '2023-01', description: 'Earned AWS Developer Associate certification' },
      { id: 2, title: 'Hacktoberfest 2022', date: '2022-10', description: 'Contributed to 5 open source projects' }
    ],
    roadmap: [
      { id: 1, topic: 'GraphQL', status: 'In Progress', target: 'July 2023' },
      { id: 2, topic: 'Docker & Kubernetes', status: 'Planned', target: 'September 2023' }
    ]
  });

  // State for GitHub and LeetCode stats
  const [githubStats, setGithubStats] = useState({
    repos: 25,
    stars: 47,
    forks: 12,
    contributions: 843
  });

  const [leetcodeStats, setLeetcodeStats] = useState({
    solved: 125,
    easy: 45,
    medium: 65,
    hard: 15,
    ranking: 65432
  });

  const [geeksforgeeksStats, setGeeksforgeeksStats] = useState({
    solved: 78,
    score: 356,
    monthlyChallenges: 3
  });

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [tempData, setTempData] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  // Handle edit for specific section
  const handleEdit = (section, data = null) => {
    setEditSection(section);
    setTempData(data || devProfile[section]);
    setEditMode(true);
  };

  // Handle saving edited data
  const handleSave = () => {
    if (editSection) {
      setDevProfile({
        ...devProfile,
        [editSection]: tempData
      });
    }
    setEditMode(false);
    setEditSection(null);
  };

  // Handle input change for edited fields
  const handleInputChange = (field, value) => {
    setTempData({
      ...tempData,
      [field]: value
    });
  };

  // Handle social link changes
  const handleSocialChange = (platform, value) => {
    setTempData({
      ...tempData,
      [platform]: value
    });
  };

  // Mock function to fetch GitHub stats
  const fetchGitHubStats = (username) => {
    // In a real app, this would make an API call to GitHub
    console.log(`Fetching GitHub stats for ${username}`);
    // Mock data update
    setGithubStats({
      repos: Math.floor(Math.random() * 50) + 10,
      stars: Math.floor(Math.random() * 100) + 20,
      forks: Math.floor(Math.random() * 30) + 5,
      contributions: Math.floor(Math.random() * 1000) + 100
    });
  };

  // Mock function to fetch LeetCode stats
  const fetchLeetCodeStats = (username) => {
    // In a real app, this would make an API call to LeetCode
    console.log(`Fetching LeetCode stats for ${username}`);
    // Mock data update
    setLeetcodeStats({
      solved: Math.floor(Math.random() * 200) + 50,
      easy: Math.floor(Math.random() * 70) + 30,
      medium: Math.floor(Math.random() * 100) + 20,
      hard: Math.floor(Math.random() * 30) + 5,
      ranking: Math.floor(Math.random() * 100000) + 10000
    });
  };

  // Mock function to fetch GeeksforGeeks stats
  const fetchGeeksforGeeksStats = (username) => {
    // In a real app, this would make an API call to GeeksforGeeks
    console.log(`Fetching GeeksforGeeks stats for ${username}`);
    // Mock data update
    setGeeksforgeeksStats({
      solved: Math.floor(Math.random() * 100) + 50,
      score: Math.floor(Math.random() * 500) + 200,
      monthlyChallenges: Math.floor(Math.random() * 5) + 1
    });
  };

  // Handle adding new DSA question
  const handleAddDSAQuestion = () => {
    const newQuestion = {
      id: devProfile.dsaQuestions.length + 1,
      title: 'New Question',
      platform: 'LeetCode',
      difficulty: 'Medium',
      date: new Date().toISOString().split('T')[0]
    };
    
    setDevProfile({
      ...devProfile,
      dsaQuestions: [...devProfile.dsaQuestions, newQuestion]
    });
  };

  // Handle adding new project
  const handleAddProject = () => {
    const newProject = {
      id: devProfile.projects.length + 1,
      title: 'New Project',
      description: 'Project description',
      github: 'https://github.com/',
      live: 'https://project.com',
      image: '/api/placeholder/300/200'
    };
    
    setDevProfile({
      ...devProfile,
      projects: [...devProfile.projects, newProject]
    });
  };

  // Handle adding new blog
  const handleAddBlog = () => {
    const newBlog = {
      id: devProfile.blogs.length + 1,
      title: 'New Blog Post',
      link: 'https://blog.com/new-post',
      date: new Date().toISOString().split('T')[0]
    };
    
    setDevProfile({
      ...devProfile,
      blogs: [...devProfile.blogs, newBlog]
    });
  };

  // Handle adding new achievement
  const handleAddAchievement = () => {
    const newAchievement = {
      id: devProfile.achievements.length + 1,
      title: 'New Achievement',
      date: new Date().toISOString().split('T')[0].substring(0, 7),
      description: 'Achievement description'
    };
    
    setDevProfile({
      ...devProfile,
      achievements: [...devProfile.achievements, newAchievement]
    });
  };

  // Handle adding new roadmap item
  const handleAddRoadmapItem = () => {
    const newItem = {
      id: devProfile.roadmap.length + 1,
      topic: 'New Goal',
      status: 'Planned',
      target: 'December 2023'
    };
    
    setDevProfile({
      ...devProfile,
      roadmap: [...devProfile.roadmap, newItem]
    });
  };

  // Component for the Profile section
  const ProfileSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      {editMode && editSection === 'profile' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={tempData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={tempData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Education</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={tempData.education}
              onChange={(e) => handleInputChange('education', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={tempData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-start space-x-6">
          <img
            src={devProfile.image}
            alt={devProfile.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{devProfile.name}</h2>
                <p className="text-gray-600 mt-1">{devProfile.bio}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Education:</span> {devProfile.education}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> {devProfile.location}
                  </p>
                </div>
              </div>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEdit('profile', {
                  name: devProfile.name,
                  bio: devProfile.bio,
                  education: devProfile.education,
                  location: devProfile.location
                })}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Links */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-800">Social Links</h3>
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => handleEdit('socials', devProfile.socials)}
          >
            Edit
          </button>
        </div>
        
        {editMode && editSection === 'socials' ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={tempData.github}
                onChange={(e) => handleSocialChange('github', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LeetCode</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={tempData.leetcode}
                onChange={(e) => handleSocialChange('leetcode', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Resume</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={tempData.resume}
                onChange={(e) => handleSocialChange('resume', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={tempData.website}
                onChange={(e) => handleSocialChange('website', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gmail</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={tempData.gmail}
                onChange={(e) => handleSocialChange('gmail', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Twitter</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={tempData.twitter}
                onChange={(e) => handleSocialChange('twitter', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <a href={devProfile.socials.github} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
              <span>GitHub</span>
            </a>
            <a href={devProfile.socials.leetcode} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
              <span>LeetCode</span>
            </a>
            <a href={devProfile.socials.resume} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
              <span>Resume</span>
            </a>
            <a href={devProfile.socials.website} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
              <span>Website</span>
            </a>
            <a href={`mailto:${devProfile.socials.gmail}`} className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
              <span>Gmail</span>
            </a>
            <a href={devProfile.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">
              <span>Twitter</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );

  // Component for GitHub and Coding Platform Stats
  const StatsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {/* GitHub Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">GitHub Stats</h3>
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm"
            onClick={() => {
              const username = prompt("Enter your GitHub username:");
              if (username) fetchGitHubStats(username);
            }}
          >
            Update
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">Repositories</p>
            <p className="text-xl font-bold">{githubStats.repos}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">Stars</p>
            <p className="text-xl font-bold">{githubStats.stars}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">Forks</p>
            <p className="text-xl font-bold">{githubStats.forks}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-600">Contributions</p>
            <p className="text-xl font-bold">{githubStats.contributions}</p>
          </div>
        </div>
      </div>

      {/* LeetCode Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">LeetCode Stats</h3>
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm"
            onClick={() => {
              const username = prompt("Enter your LeetCode username:");
              if (username) fetchLeetCodeStats(username);
            }}
          >
            Update
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Problems Solved</span>
            <span className="font-bold">{leetcodeStats.solved}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-600">Easy</span>
            <span>{leetcodeStats.easy}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-600">Medium</span>
            <span>{leetcodeStats.medium}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-red-600">Hard</span>
            <span>{leetcodeStats.hard}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-gray-600">Ranking</span>
            <span className="font-bold">#{leetcodeStats.ranking}</span>
          </div>
        </div>
      </div>

      {/* GeeksforGeeks Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">GeeksforGeeks Stats</h3>
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm"
            onClick={() => {
              const username = prompt("Enter your GeeksforGeeks username:");
              if (username) fetchGeeksforGeeksStats(username);
            }}
          >
            Update
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Problems Solved</span>
            <span className="font-bold">{geeksforgeeksStats.solved}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Score</span>
            <span className="font-bold">{geeksforgeeksStats.score}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Monthly Challenges</span>
            <span className="font-bold">{geeksforgeeksStats.monthlyChallenges}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Component for DSA Questions section
  const DSAQuestionsSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">DSA Questions Solved</h3>
        <button 
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
          onClick={handleAddDSAQuestion}
        >
          Add Question
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devProfile.dsaQuestions.map((question) => (
              <tr key={question.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{question.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.platform}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                    question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'}`}>
                    {question.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{question.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Component for Fundamentals section
  const FundamentalsSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Fundamental Topics</h3>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
          Add Topic
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devProfile.fundamentals.map((topic) => (
          <div key={topic.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md">
            <span className="font-medium">{topic.topic}</span>
            <span className={`px-2 py-1 text-xs font-semibold rounded 
              ${topic.status === 'Completed' ? 'bg-green-100 text-green-800' : 
              topic.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'}`}>
              {topic.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Component for Tech Stack section
  const TechStackSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Tech Stack / Skills</h3>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
          Add Skill
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {devProfile.techStack.map((tech) => (
          <div key={tech.id} className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{tech.name}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded
                ${tech.proficiency === 'Advanced' ? 'bg-green-100 text-green-800' : 
                tech.proficiency === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'}`}>
                {tech.proficiency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Component for Projects section
  const ProjectsSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Projects</h3>
        <button 
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
          onClick={handleAddProject}
        >
          Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {devProfile.projects.map((project) => (
          <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-medium text-gray-800">{project.title}</h4>
              <p className="text-gray-600 mt-1">{project.description}</p>
              <div className="flex mt-3 space-x-3">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                  GitHub
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Component for Blogs/Articles section
  const BlogsSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Blogs / Articles</h3>
        <button 
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
          onClick={handleAddBlog}
        >
          Add Blog
        </button>
      </div>
      <div className="space-y-4">
        {devProfile.blogs.map((blog) => (
          <div key={blog.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">
              {blog.title}
            </a>
            <p className="text-sm text-gray-500 mt-1">Published: {blog.date}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Component for Achievements/Certifications section
  const AchievementsSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Achievements & Certifications</h3>
        <button 
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
          onClick={handleAddAchievement}
        >
          Add Achievement
        </button>
      </div>
      <div className="space-y-4">
        {devProfile.achievements.map((achievement) => (
          <div key={achievement.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800">{achievement.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{achievement.date}</p>
                <p className="text-gray-600 mt-2">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Component for Roadmaps section
  const RoadmapsSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Learning Roadmap</h3>
        <button 
          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
          onClick={handleAddRoadmapItem}
        >
          Add Goal
        </button>
      </div>
      <div className="space-y-4">
        {devProfile.roadmap.map((item) => (
          <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-800">{item.topic}</h4>
              <span className={`text-xs font-semibold px-2 py-1 rounded
                ${item.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                item.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'}`}>
                {item.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Target: {item.target}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Developer Dashboard</h1>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Overview
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'skills' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('skills')}
          >
            Tech Stack
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'coding' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('coding')}
          >
            Coding Progress
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <>
            <ProfileSection />
            <TechStackSection />
            <ProjectsSection />
            <BlogsSection />
            <AchievementsSection />
            <RoadmapsSection />
          </>
        )}

        {activeTab === 'skills' && (
          <>
            <TechStackSection />
            <ProjectsSection />
          </>
        )}

        {activeTab === 'coding' && (
          <>
            <StatsSection />
            <DSAQuestionsSection />
            <FundamentalsSection />
          </>
        )}
      </div>
    </div>
  );
};

export default DeveloperDashboard;