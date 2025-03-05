import { useState } from "react";
import { 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe, 
  FileText,
  MapPin,
  School,
  Clock,
  Eye,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Check,
  Info
} from "lucide-react";
import * as d3 from 'd3';

export default function CodingProfile() {
  const [name, setName] = useState("Aditya Singh");
  const [username, setUsername] = useState("@6snE10zc");
  const [bio, setBio] = useState(
    "I am a second-year Computer Science undergraduate at SRM University, Chennai, specializing in both frontend and backend web development.",
  );
  const [location, setLocation] = useState("India");
  const [university, setUniversity] = useState("SRM University");
  const [lastRefresh, setLastRefresh] = useState("05 Mar 2025");
  const [profileViews, setProfileViews] = useState("1");
  const [isStatsOpen, setIsStatsOpen] = useState(true);

  const toggleStats = () => {
    setIsStatsOpen(!isStatsOpen);
  };

  const CircularProgressBar = ({ value, maxValue = 100, color }) => {
    const percentage = (value / maxValue) * 100;
    return (
      <div className="relative w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#eee"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
          {value}
        </div>
      </div>
    );
  };

  const RatingGraph = () => {
    // Placeholder for rating graph
    return (
      <div className="w-full h-24 bg-gray-800">
        {/* Placeholder for D3 or Chart.js graph */}
      </div>
    );
  };

  const ActivityHeatmap = () => {
    // Placeholder for activity heatmap
    return (
      <div className="w-full h-24 bg-gray-700 grid grid-cols-6 gap-1">
        {[...Array(24)].map((_, i) => (
          <div 
            key={i} 
            className={`h-full ${i % 4 === 0 ? 'bg-green-500' : 'bg-green-200'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Profile Card - Left Side */}
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
              <button className="text-gray-400 hover:text-white"><Mail size={20} /></button>
              <button className="text-gray-400 hover:text-white"><Linkedin size={20} /></button>
              <button className="text-gray-400 hover:text-white"><Twitter size={20} /></button>
              <button className="text-gray-400 hover:text-white"><Globe size={20} /></button>
              <button className="text-gray-400 hover:text-white"><FileText size={20} /></button>
            </div>

            <div className="border-t border-gray-800 my-2"></div>

            <div className="p-4 space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <MapPin size={16} className="mr-2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent border-none outline-none"
                />
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <School size={16} className="mr-2" />
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
                <Clock size={16} className="mr-2" />
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
                <Eye size={16} className="mr-2" />
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
              {isStatsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
                      {platform.status && <Check size={16} className="text-green-500" />}
                      <ExternalLink size={16} className="text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Middle and Right Content */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Total Questions and Total Active Days */}
          <div className="bg-[#111] border-0 text-white relative rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm font-normal">Total Questions</div>
                <div className="text-6xl font-bold">239</div>
              </div>
              <Info size={16} className="text-gray-600" />
            </div>
          </div>

          <div className="bg-[#111] border-0 text-white relative rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm font-normal">Total Active Days</div>
                <div className="text-6xl font-bold">94</div>
              </div>
              <Info size={16} className="text-gray-600" />
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="bg-[#111] border-0 text-white rounded-lg p-4 md:col-span-2 xl:col-span-1">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-400">204 submissions in past 6 months</div>
              <div className="flex space-x-4">
                <div className="text-sm">
                  <span className="text-gray-400">Max.Streak</span> <span className="text-white">31</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Current.Streak</span> <span className="text-white">4</span>
                </div>
              </div>
            </div>
            <ActivityHeatmap />
          </div>

          {/* Total Contests */}
          <div className="bg-[#111] border-0 text-white rounded-lg p-4 md:col-span-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm font-normal">Total Contests</div>
                <div className="text-7xl font-bold">3</div>
              </div>
              <div className="bg-[#222] rounded-md p-2 flex items-center space-x-2">
                <div className="w-6 h-6 flex items-center justify-center">
                  <span className="text-yellow-500 font-bold">λ</span>
                </div>
                <span className="text-gray-300">LeetCode</span>
                <span className="text-white font-bold">3</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-[#111] border-0 text-white rounded-lg p-4 md:col-span-2">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-gray-400 text-sm">Rating</div>
                <div className="text-2xl font-bold">1474</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-400 text-sm">23 Feb 2025</div>
                <div className="text-md">Weekly Contest 438</div>
                <div className="text-sm text-gray-400">Rank:17218</div>
              </div>
            </div>
            <RatingGraph />
          </div>

          {/* Problems Solved */}
          <div className="bg-[#111] border-0 text-white rounded-lg p-4 md:col-span-2 xl:col-span-1">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm">Fundamentals</span>
                    <Info size={14} className="ml-1 text-gray-600" />
                  </div>
                </div>
                <div className="flex items-center">
                  <CircularProgressBar value={73} color="#FFD700" />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-green-500">GFG</div>
                      <div className="text-white">7</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-yellow-500">HackerRank</div>
                      <div className="text-white">66</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-400 text-sm">DSA</div>
                </div>
                <div className="flex items-center">
                  <CircularProgressBar value={123} maxValue={200} color="#FFD700" />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-green-500">Easy</div>
                      <div className="text-white">65</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-yellow-500">Medium</div>
                      <div className="text-white">50</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-red-500">Hard</div>
                      <div className="text-white">8</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-gray-400 text-sm">Competitive Programming</div>
                </div>
                <div className="flex items-center">
                  <CircularProgressBar value={43} color="#22c55e" />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-green-500">Codechef</div>
                      <div className="text-white">43</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contest Rankings */}
          <div className="bg-[#111] border-0 text-white rounded-lg p-4 md:col-span-2 xl:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400 text-sm font-normal">Contest Rankings</div>
            </div>
            <div className="flex items-center justify-center h-64">
              <img 
                src="/api/placeholder/300/250" 
                alt="Contest Rankings Placeholder" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* DSA Topic Analysis */}
          <div className="bg-[#111] border-0 text-white rounded-lg p-4 md:col-span-2 xl:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400 text-sm font-normal">DSA Topic Analysis</div>
              <button className="text-sm text-gray-400 hover:text-white">show more</button>
            </div>
            <div className="space-y-2">
              {[
                { topic: 'Array', value: 72 },
                { topic: 'Two Pointers', value: 21 },
                { topic: 'Sorting', value: 20 },
                { topic: 'HashMap and Set', value: 18 },
                { topic: 'String', value: 17 },
                { topic: 'Binary Search', value: 17 },
                { topic: 'Dynamic Programming', value: 15 },
                { topic: 'Math', value: 12 },
                { topic: 'Algorithms', value: 11 },
                { topic: 'Simulation', value: 10 }
              ].map((item) => (
                <div key={item.topic} className="flex items-center">
                  <div className="w-24 text-gray-400 text-sm">{item.topic}</div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${(item.value / 72) * 100}%`}}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-400">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="bg-[#111] border-0 text-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400 text-sm font-normal">Awards</div>
              <div className="text-2xl font-bold">5</div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { type: 'Date', text: '12', subtext: 'DEC', bgClass: 'from-purple-700 to-purple-900' },
                { type: 'Achievement', text: 'Problem Solving', bgClass: 'bg-yellow-500' },
                { type: 'Language', text: 'C++', bgClass: 'bg-yellow-500' },
                { type: 'Language', text: 'Java', bgClass: 'bg-orange-500' }
              ].map((award, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full md:rounded-md flex items-center justify-center 
                    ${award.type === 'Date' 
                      ? `bg-gradient-to-b ${award.bgClass}` 
                      : `${award.bgClass}`} 
                    text-white`}>
                    <div className="text-center">
                      {award.type === 'Date' ? (
                        <>
                          <div className="text-xl font-bold">{award.text}</div>
                          <div className="text-xs">{award.subtext}</div>
                        </>
                      ) : (
                        <div className={`
                          ${award.type === 'Achievement' ? 'text-xs' : 'text-lg font-bold'}
                          ${award.type === 'Language' ? 'text-black' : ''}`}>
                          {award.text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}