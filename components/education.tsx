export function Education() {
  const education = [
    {
      year: "2022-Present",
      degree: "BTech in Computer Science and Engineering",
      institute: "Dronacharya College of Engineering, Gurugram",
      grade: "CGPA: 6.5/10",
    },
    {
      year: "2022",
      degree: "Class XII CBSE-AISSCE",
      institute: "Dronacharya College of Engineering, Gurugram",
      grade: "86.4%",
    },
    {
      year: "2020",
      degree: "Class X CBSE-AISSE",
      institute: "New Shishu Kalyan Sr Sec School, Gurugram",
      grade: "82.8% (100% in Mathematics)",
    },
  ]

  const courses = [
    "Computer Networks",
    "Operating Systems",
    "Theory Of Computation",
    "Analysis and Design of Algorithms",
    "Programming Languages",
    "Computer Architecture",
    "Discrete Mathematical Structures",
    "Data Structures",
    "Graph Theory",
    "Statistics",
    "Probability Theory",
    "Differential Equations",
    "Linear Algebra",
    "Matrix Theory",
  ]

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Education & </span>
            <span className="text-blue-400">Courses</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-white">Academic Background</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-blue-400 font-semibold">{edu.year}</span>
                    <span className="text-green-400 font-semibold">{edu.grade}</span>
                  </div>
                  <h4 className="text-white font-semibold mb-2">{edu.degree}</h4>
                  <p className="text-gray-300">{edu.institute}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8 text-white">Relevant Courses</h3>
            <div className="bg-gray-900/50 p-6 rounded-lg">
              <div className="mb-6">
                <h4 className="text-blue-400 font-semibold mb-3">Computer Science</h4>
                <div className="flex flex-wrap gap-2">
                  {courses.slice(0, 8).map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-blue-500/20 hover:text-blue-300 transition-colors duration-200"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-purple-400 font-semibold mb-3">Mathematics</h4>
                <div className="flex flex-wrap gap-2">
                  {courses.slice(8).map((course) => (
                    <span
                      key={course}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-purple-500/20 hover:text-purple-300 transition-colors duration-200"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
