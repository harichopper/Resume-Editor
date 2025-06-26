import React, { useState, useRef } from "react";
import axios from "axios";

const dummyParsedResume = {
  name: "John Doe",
  summary: "Experienced developer skilled in building full-stack apps.",
  experience: ["Company A - Software Engineer"],
  education: ["B.Sc Computer Science"],
  skills: ["JavaScript", "React", "Node.js"]
};

function App() {
  const [resume, setResume] = useState(dummyParsedResume);
  const sectionRefs = useRef({});

  const enhanceSection = async (sectionKey) => {
    const content = Array.isArray(resume[sectionKey])
      ? resume[sectionKey].join("\n")
      : resume[sectionKey];

    const res = await axios.post("http://127.0.0.1:8000/ai-enhance", {
      section: sectionKey,
      content
    });

    const improved = res.data.improved_content;
    const updatedValue = Array.isArray(resume[sectionKey])
      ? improved.split("\n")
      : improved;

    setResume({ ...resume, [sectionKey]: updatedValue });

    // Scroll to updated section
    sectionRefs.current[sectionKey]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (key, index = null, value) => {
    if (index !== null) {
      const updatedArray = [...resume[key]];
      updatedArray[index] = value;
      setResume({ ...resume, [key]: updatedArray });
    } else {
      setResume({ ...resume, [key]: value });
    }
  };

  const addEntry = (key) => {
    setResume({ ...resume, [key]: [...resume[key], ""] });
  };

  const saveResume = async () => {
    await axios.post("http://127.0.0.1:8000/save-resume", resume);
    alert("✅ Resume saved successfully");
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-blue-200">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-10">
          📝 Smart Resume Editor
        </h1>

        <div className="space-y-8">
          {Object.keys(resume).map((key) => (
            <div
              key={key}
              ref={(el) => (sectionRefs.current[key] = el)}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <h2 className="text-xl font-semibold capitalize text-gray-800 text-center sm:text-left">
                  {getSectionEmoji(key)} {key}
                </h2>
                <button
                  className="text-sm text-blue-600 font-medium hover:text-blue-800 hover:underline"
                  onClick={() => enhanceSection(key)}
                >
                  ✨ Enhance with AI
                </button>
              </div>

              {Array.isArray(resume[key]) ? (
                <>
                  {resume[key].map((item, i) => (
                    <textarea
                      key={i}
                      value={item}
                      onChange={(e) => handleChange(key, i, e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                      rows="2"
                    />
                  ))}
                  <button
                    onClick={() => addEntry(key)}
                    className="text-sm text-green-600 hover:text-green-800 hover:underline"
                  >
                    + Add Entry
                  </button>
                </>
              ) : (
                <textarea
                  value={resume[key]}
                  onChange={(e) => handleChange(key, null, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                  rows={key === "summary" ? 4 : 2}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-10 justify-center items-center">
          <button
            onClick={saveResume}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            💾 Save Resume
          </button>
          <button
            onClick={downloadResume}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            ⬇️ Download JSON
          </button>
        </div>
      </div>
    </div>
  );
}

const getSectionEmoji = (key) => {
  const map = {
    name: "🧑",
    summary: "📄",
    experience: "💼",
    education: "🎓",
    skills: "🛠️"
  };
  return map[key] || "🔹";
};

export default App;
