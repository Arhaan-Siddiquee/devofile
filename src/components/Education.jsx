import { useState } from "react"

export default function CodingProfile() {
  const [name, setName] = useState("Aditya Singh")
  const [username, setUsername] = useState("@6snE10zc")
  const [bio, setBio] = useState(
    "I am a second-year Computer Science undergraduate at SRM University, Chennai, specializing in both frontend and backend web development.",
  )
  const [location, setLocation] = useState("India")
  const [university, setUniversity] = useState("SRM University")
  const [lastRefresh, setLastRefresh] = useState("05 Mar 2025")
  const [profileViews, setProfileViews] = useState("1")
  const [isStatsOpen, setIsStatsOpen] = useState(true)

  const toggleStats = () => {
    setIsStatsOpen(!isStatsOpen)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Profile Card */}
        <div className="bg-[#111] border-0 text-white rounded-lg shadow-md">
          <div className="p-0">
            <div className="flex flex-col items-center p-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-b from-purple-500 to-purple-700 flex items-center justify-center overflow-hidden mb-4">
                <img
                  src="/api/placeholder/128/128"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-2xl font-bold text-center bg-transparent border-none outline-none w-full"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-sm text-gray-400 text-center bg-transparent border-none outline-none w-full mb-4"
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="text-sm text-center bg-transparent border-none outline-none w-full resize-none"
                rows={5}
              />
            </div>

            <div className="flex justify-center space-x-4 p-4">
              {['mail', 'linkedin', 'twitter', 'globe', 'file-text'].map((icon) => (
                <button key={icon} className="text-gray-400 hover:text-white">
                  {/* Placeholder for icons, you'd replace with actual icon components */}
                  <span className="w-5 h-5">{icon}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-800 my-2"></div>

            <div className="p-4 space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-2">📍</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none outline-none"
                />
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <span className="mr-2">🏫</span>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="bg-transparent border-none outline-none"
                />
              </div>
            </div>

            <div className="border-t border-gray-800 my-2"></div>

            <div className="p-4 flex justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <span className="mr-2">⏰</span>
                Last Refresh:
              </div>
              <input
                type="text"
                value={lastRefresh}
                onChange={(e) => setLastRefresh(e.target.value)}
                className="bg-transparent border-none outline-none text-right"
              />
            </div>
            <div className="px-4 pb-4 flex justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <span className="mr-2">👁️</span>
                Profile Views:
              </div>
              <input
                type="text"
                value={profileViews}
                onChange={(e) => setProfileViews(e.target.value)}
                className="bg-transparent border-none outline-none text-right"
              />
            </div>

            <div className="border-t border-gray-800 my-2"></div>

            <button
              className="w-full p-4 flex items-center justify-between text-white bg-[#222] hover:bg-[#333]"
              onClick={toggleStats}
            >
              <span className="font-medium">Problem Solving Stats</span>
              {isStatsOpen ? '▲' : '▼'}
            </button>

            {isStatsOpen && (
              <div className="p-4 space-y-4">
                {[
                  { name: 'LeetCode', letter: 'λ', color: 'text-yellow-500', status: true },
                  { name: 'GeeksForGeeks', letter: 'G', color: 'text-green-500', status: true },
                  { name: 'InterviewBit', letter: 'I', color: 'text-blue-500', status: false },
                  { name: 'CodeChef', letter: 'C', color: 'text-white', status: true },
                  { name: 'HackerRank', letter: 'H', color: 'text-green-500', status: true }
                ].map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-2 flex items-center justify-center">
                        <span className={`${platform.color} font-bold`}>{platform.letter}</span>
                      </div>
                      <span className="text-gray-300">{platform.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {platform.status && <span className="text-green-500">✓</span>}
                      <span className="text-gray-500">↗</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rest of the content (simplified) */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Simplified cards */}
          {[
            { title: 'Total Questions', value: '239' },
            { title: 'Total Active Days', value: '94' }
          ].map((card) => (
            <div key={card.title} className="bg-[#111] border-0 text-white relative rounded-lg p-4">
              <div className="text-gray-400 text-sm font-normal">{card.title}</div>
              <div className="text-6xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}