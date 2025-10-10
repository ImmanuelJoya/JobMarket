import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Moon, Sun, Briefcase, MapPin, Building2, DollarSign } from "lucide-react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { LogoutButton } from "./pages/Sout";
import { useAuth } from "./context/AuthContext"; // 👈 custom Firebase hook

// IconPack
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBriefcase } from '@fortawesome/free-solid-svg-icons'

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  jobGeo: string;
  jobIndustry: string;
  url: string;
  jobType: string;
  annualSalaryMin?: string;
  annualSalaryMax?: string;
}

// 🔒 Protected Route Wrapper
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/jobs");
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const formatSalary = (min?: string, max?: string) => {
    if (!min && !max) return null;
    if (min && max) return `$${min} - $${max}`;
    if (min) return `From $${min}`;
    if (max) return `Up to $${max}`;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Loading jobs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
      >
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${darkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
    >
      {/* Header */}
      <header
        className={`border-b ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Briefcase
              className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
            />
            <h1
              className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              Remote Marketing Jobs
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors ${darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <p
              className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              No jobs available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 10).map((job) => (
              <article
                key={job.id}
                className={`rounded-lg p-6 transition-all duration-200 hover:scale-[1.02] ${darkMode
                  ? "bg-gray-800 border border-gray-700 hover:border-gray-600"
                  : "bg-white border border-gray-200 hover:shadow-lg"
                  }`}
              >
                <h2
                  className={`text-lg font-semibold mb-3 line-clamp-2 ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  {job.jobTitle}
                </h2>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Building2
                      className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                    />
                    <span
                      className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                      {job.companyName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin
                      className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                    />
                    <span
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      {job.jobGeo}
                    </span>
                  </div>

                  {formatSalary(job.annualSalaryMin, job.annualSalaryMax) && (
                    <div className="flex items-center gap-2">
                      <DollarSign
                        className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                      />
                      <span
                        className={`text-sm font-medium ${darkMode ? "text-green-400" : "text-green-600"
                          }`}
                      >
                        {formatSalary(job.annualSalaryMin, job.annualSalaryMax)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${darkMode
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {job.jobType}
                  </span>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium transition-colors ${darkMode
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-blue-600 hover:text-blue-700"
                      }`}
                  >
                    View Details →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        
        <div className="flex gap-4">
          <Link to="/">
          <FontAwesomeIcon icon={faHouse} />
          Home</Link>
          <Link to="/jobs">
          <FontAwesomeIcon icon={faBriefcase} />
          Jobs</Link>
        </div>
        {user ? (
          <LogoutButton />
        ) : (
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
