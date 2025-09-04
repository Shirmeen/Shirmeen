export default function Portfolio() {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 to-blue-200/30 animate-pulse"></div>
        
        {/* Header */}
        <header className="relative text-center py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block p-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full mb-6 animate-pulse">
              <span className="text-4xl animate-bounce">👋</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Hi, I'm Shirmeen Aamir
            </h1>
            <h2 className="text-xl md:text-2xl mt-3 text-gray-600 leading-relaxed max-w-3xl mx-auto">
              A passionate <span className="text-pink-500 font-semibold">Data Scientist</span> with a focus on 
              <span className="text-purple-500 font-semibold"> ML, AI</span>, and 
              <span className="text-blue-500 font-semibold"> impactful applications</span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Transforming data into insights • Building intelligent solutions • Creating real-world impact
            </p>
          </div>
        </header>
      </div>

      {/* Social Links */}
      <section className="flex justify-center gap-6 my-12 px-6">
        <a 
          href="https://github.com/shirmeenaamir" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group px-6 py-3 bg-gradient-to-r from-pink-200 to-pink-300 rounded-xl hover:from-pink-300 hover:to-pink-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-pink-300 hover:border-pink-400"
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">🐙</span>
            <span className="font-semibold text-gray-700">GitHub</span>
          </span>
        </a>
        <a 
          href="https://www.linkedin.com/in/shirmeen-amir-35ab81264" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group px-6 py-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl hover:from-blue-300 hover:to-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-300 hover:border-blue-400"
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">💼</span>
            <span className="font-semibold text-gray-700">LinkedIn</span>
          </span>
        </a>
        <a 
          href="mailto:l215653@lhr.nu.edu.pk" 
          className="group px-6 py-3 bg-gradient-to-r from-purple-200 to-purple-300 rounded-xl hover:from-purple-300 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-300 hover:border-purple-400"
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">📧</span>
            <span className="font-semibold text-gray-700">Email</span>
          </span>
        </a>
      </section>

      {/* Skills */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12 animate-slide-up">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent gradient-text-animate">
            🛠️ Languages & Tools
          </h3>
          <p className="text-gray-600 text-lg">Technologies I work with daily</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[
            { name: "Python", icon: "🐍", color: "from-pink-200 to-pink-300" },
            { name: "C++", icon: "⚡", color: "from-blue-200 to-blue-300" },
            { name: "Assembly", icon: "🔧", color: "from-gray-200 to-gray-300" },
            { name: "TensorFlow", icon: "🧠", color: "from-orange-200 to-orange-300" },
            { name: "PyTorch", icon: "🔥", color: "from-red-200 to-red-300" },
            { name: "OpenCV", icon: "👁️", color: "from-green-200 to-green-300" },
            { name: "Power BI", icon: "📊", color: "from-yellow-200 to-yellow-300" },
            { name: "SQL Server", icon: "🗄️", color: "from-blue-200 to-blue-300" },
            { name: "Django", icon: "🌿", color: "from-green-200 to-green-300" },
            { name: "Selenium", icon: "🤖", color: "from-green-200 to-green-300" },
            { name: "Pandas", icon: "🐼", color: "from-red-200 to-red-300" },
            { name: "Scikit-Learn", icon: "📈", color: "from-orange-200 to-orange-300" },
            { name: "Seaborn", icon: "📊", color: "from-blue-200 to-blue-300" },
            { name: "Jupyter", icon: "📓", color: "from-orange-200 to-orange-300" }
          ].map((tool) => (
            <div 
              key={tool.name} 
              className={`bg-gradient-to-br ${tool.color} p-4 rounded-xl hover:scale-105 transform transition-all duration-500 cursor-pointer group border border-white/50 hover:border-white/80 shadow-lg hover:shadow-xl hover-glow animate-scale-in`}
              style={{ animationDelay: `${Math.random() * 0.5}s` }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{tool.icon}</div>
                <div className="text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors">
                  {tool.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="text-center mb-12 animate-slide-up">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent gradient-text-animate">
            💼 Featured Projects
          </h3>
          <p className="text-gray-600 text-lg">Showcasing my technical expertise and problem-solving skills</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[ 
            { 
              name: "GANs, AEs & VAEs", 
              link: "https://github.com/Shirmeen/Generative-Adversarial-Networks-GANs-Autoencoders-AE-Variational-Autoencoders-VAEs-/blob/main/21L-5653_A1.docx", 
              desc: "Exploring GANs, Autoencoders & VAEs", 
              tech: ["Python", "TensorFlow", "ML"],
              icon: "🎨"
            },
            { 
              name: "Smart Gaming Picks", 
              link: "https://github.com/Shirmeen/smart-gaming-pick", 
              desc: "Web scraping & ML-based prediction", 
              tech: ["Python", "Selenium", "ML"],
              icon: "🎮"
            },
            { 
              name: "EmoNet", 
              link: "https://github.com/Shirmeen/EmoNet", 
              desc: "Emotion analysis using CNN, SVM, RF", 
              tech: ["Python", "CNN", "OpenCV"],
              icon: "😊"
            },
            { 
              name: "ADetectPro (FYP)", 
              link: "#", 
              desc: "Alzheimer's detection using Bayesian Graph Neural Networks", 
              tech: ["Python", "GNN", "Medical AI"],
              icon: "🏥"
            },
            { 
              name: "Weaver's Den", 
              link: "https://github.com/Shirmeen/Weaver-s-Den", 
              desc: "Web app connecting users with textile manufacturers", 
              tech: ["Django", "Python", "Web Dev"],
              icon: "🧵"
            },
            { 
              name: "Music Playlist Manager", 
              link: "https://github.com/Shirmeen/Music-Playlist-Manager", 
              desc: "C++ linked list project", 
              tech: ["C++", "Data Structures"],
              icon: "🎵"
            }
          ].map((p) => (
            <a 
              key={p.name} 
              href={p.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-xl hover:from-blue-200 hover:to-purple-200 transform hover:scale-105 transition-all duration-500 border border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl group hover-glow animate-scale-in"
              style={{ animationDelay: `${Math.random() * 0.8}s` }}
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{p.icon}</div>
              <h4 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-3">
                {p.name}
              </h4>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors mb-4 leading-relaxed">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full border border-pink-200">
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* GitHub Profile Section */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🐙 GitHub Profile
          </h3>
          <p className="text-gray-600 text-lg">Check out my repositories and contributions</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-200 shadow-lg">
          <div className="text-center mb-6">
            <div className="inline-block p-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-4 animate-pulse">
              <span className="text-4xl animate-bounce">👩‍💻</span>
            </div>
            <h4 className="text-2xl font-bold text-gray-800 mb-2">Shirmeen Aamir</h4>
            <p className="text-gray-600 mb-4">Data Scientist & ML Engineer</p>
            <a 
              href="https://github.com/Shirmeen/Shirmeen/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl hover:from-gray-800 hover:to-gray-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
            >
              <span className="text-xl">🐙</span>
              Visit My GitHub Profile
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">29</div>
              <div className="text-sm text-gray-600">Total Commits</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">1</div>
              <div className="text-sm text-gray-600">Repository Forks</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Jupyter Notebooks</div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h5 className="font-semibold text-gray-800 mb-3">Featured Repository</h5>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <div className="flex-1">
                <a 
                  href="https://github.com/Shirmeen/Shirmeen/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Shirmeen/Shirmeen
                </a>
                <p className="text-sm text-gray-600 mt-1">Personal portfolio repository with data science projects and assignments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Let's Build Something Amazing Together! 🚀
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            I'm always excited to collaborate on innovative projects, discuss new opportunities, or just chat about the latest in AI and data science.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:l215653@lhr.nu.edu.pk"
              className="px-8 py-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-xl hover:from-pink-400 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold border border-pink-300 hover:border-pink-400 text-white"
            >
              Get In Touch 📧
            </a>
            <a 
              href="https://github.com/Shirmeen/Shirmeen/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl hover:from-blue-300 hover:to-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold border border-blue-300 hover:border-blue-400 text-gray-700"
            >
              View My GitHub 🐙
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-12 text-gray-500 border-t border-pink-200">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-lg mb-4">
            © {new Date().getFullYear()} Shirmeen Aamir | Built with ❤️ and React
          </p>
          <p className="text-sm text-gray-600">
            Data Scientist • ML Engineer • AI Enthusiast • Problem Solver
          </p>
        </div>
      </footer>
    </div>
  );
}