/*export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Student Dashboard</h1>
      <p>Personalized AI learning for students</p>
    </div>
  );
}*/






import { useState } from "react";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState(["Mathematics", "Science"]);
  const studentName = "Rimi"; // later from Supabase auth

  const addSubject = () => {
    if (!subject.trim()) return;

    // basic feasibility check (AI can replace later)
    const allowed = ["math", "science", "english", "history", "geography"];
    if (!allowed.some((s) => subject.toLowerCase().includes(s))) {
      alert("Subject not feasible for curriculum");
      return;
    }

    setSubjects([...subjects, subject]);
    setSubject("");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">AI Tutor</h2>
        <nav>
          <a>👤 Profile</a>
          <a>📚 Subjects</a>
          <a>⚙️ Settings</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Top bar */}
        <header className="topbar">
          <div className="menu">☰</div>
          <div className="user-info">
            <span>Hi, {studentName}</span>
            <img
              //src="https://i.pravatar.cc/40"
              alt="profile"
              className="profile-pic"
            />
            <span className="dots">⋮</span>
          </div>
        </header>

        {/* Add Subject */}
        <section className="card">
          <h3>Add Subject</h3>
          <div className="row">
            <input
              placeholder="Enter subject name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <button onClick={addSubject}>Add</button>
          </div>
        </section>

        {/* Subjects */}
        <section className="card">
          <h3>Your Subjects</h3>
          <div className="subject-row">
            {subjects.map((s, i) => (
              <div key={i} className="subject-chip">{s}</div>
            ))}
          </div>
        </section>

        {/* Analytics */}
        <section className="card">
          <h3>Learning Analytics</h3>
          <p>📈 Progress graph (AI-based)</p>
          <p>🧠 Learning capacity: Improving</p>
          <p>🏆 Average Score: 68%</p>
        </section>
      </main>
    </div>
  );
}






/*import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        ☰
        <ul>
          <li>Profile</li>
          <li>Subjects</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <span>Hi, Student 👋</span>
          <img src="/avatar.png" className="avatar" />
        </header>

        <section className="add-subject">
          <input placeholder="Add Subject" />
          <button>Add</button>
        </section>

        <section className="charts">
          📊 Learning Progress Graph (Supabase data)
        </section>

        <section className="recent">
          Recent Topics →
        </section>
      </main>
    </div>
  );
}*/