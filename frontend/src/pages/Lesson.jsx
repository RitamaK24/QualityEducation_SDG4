/*import { useEffect, useState } from "react";

export default function Lesson() {
  const [lesson, setLesson] = useState("");

  useEffect(() => {
    // For now lesson comes from backend response / mock
    setLesson("Intermediate lesson on Mathematics: Fractions and Decimals");
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-3">Today's Lesson</h1>
      <p className="text-gray-700">{lesson}</p>
    </div>
  );
}*/


/*import { useState } from "react";

export default function Lesson() {
  const [lesson] = useState(
    "Intermediate lesson on Mathematics: Fractions and Decimals"
  );

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-3">Today's Lesson</h1>
      <p className="text-gray-700">{lesson}</p>
    </div>
  );
}*/


/*import { useEffect, useState } from "react";
import api from "../api/api";

export default function Lesson() {
  const [lesson, setLesson] = useState("");

  useEffect(() => {
    async function fetchLesson() {
      const res = await api.get("/lesson");
      setLesson(res.data.lesson);
    }

    fetchLesson();
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-3">Today's Lesson</h1>
      <p className="text-gray-700">{lesson}</p>
    </div>
  );
}*/


import { useNavigate } from "react-router-dom";
import "../styles/Lesson.css";

export default function Lesson() {
  const navigate = useNavigate();

  const subject = "Mathematics";
  const topic = "Fractions and Decimals";
  const classLevel = 8;

  const startQuiz = () => {
    navigate("/quiz", {
      state: { subject, topic, classLevel }
    });
  };

  return (
    <div className="lesson-container">
      {/* Header */}
      <header className="lesson-header">
        <h1>AI Tutor</h1>
        <p>{subject} • Class {classLevel}</p>
      </header>

      {/* Content */}
      <main className="lesson-content">
        {/* Main lesson */}
        <section className="lesson-card">
          <h2>📘 {topic}</h2>
          <p>
            Fractions represent parts of a whole. A fraction has a numerator
            (top number) and a denominator (bottom number).
          </p>
          <p>
            Decimals are another way to represent fractions. For example,
            1/2 = 0.5 and 3/4 = 0.75.
          </p>
          <p>
            Understanding fractions and decimals is essential for daily life,
            such as measuring ingredients, money calculations, and data reading.
          </p>
        </section>

        {/* AI Recommendation */}
        <section className="lesson-card highlight">
          <h3>🤖 AI Tutor Insight</h3>
          <p>
            Based on your recent quiz score, you are at an
            <strong> Intermediate </strong> level.
          </p>
          <p>
            Focus more on decimal-to-fraction conversions to improve accuracy.
          </p>
        </section>

        {/* Resources */}
        <section className="lesson-card">
          <h3>🎥 Learn More</h3>
          <ul>
            <li>
              <a
                href="https://www.youtube.com/watch?v=VdM8l0J1rJ8"
                target="_blank"
                rel="noreferrer"
              >
                Fractions for Beginners – YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.khanacademy.org/math/arithmetic/fraction-arithmetic"
                target="_blank"
                rel="noreferrer"
              >
                Khan Academy – Fractions
              </a>
            </li>
          </ul>
        </section>

        {/* Quiz CTA */}
        <section className="quiz-section">
          <button onClick={startQuiz} className="start-quiz-btn">
            Start AI Powered Quiz
          </button>
        </section>
      </main>
    </div>
  );
}


/*import "../styles/Lesson.css";

export default function Lesson() {
  return (
    <div className="lesson-container">
      
      <header className="lesson-header">
        <h1>AI Tutor Dashboard</h1>
        <p>Your personalized learning space</p>
      </header>

      <main className="lesson-content">
        <div className="lesson-card">
          <h2>📘 Today's Lesson</h2>
          <p>
            This lesson covers the basics of fractions and decimals with
            examples tailored to your learning progress.
          </p>
        </div>

        <div className="lesson-card">
          <h2>📊 Progress</h2>
          <p>Completion: 65%</p>
          <p>Recommended Level: Intermediate</p>
        </div>
      </main>

    </div>
  );
}*/