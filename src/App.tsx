import { useEffect, useState } from "react";
import axios from "axios";


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

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p className="text-center mt-10 text-lg">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Latest Remote Marketing Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.slice(0, 10).map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold mb-2">{job.jobTitle}</h2>
            <p className="text-gray-700 font-medium">{job.companyName}</p>
            <p className="text-sm text-gray-500 mt-1">{job.jobGeo}</p>
            <p className="text-sm text-gray-400">{job.jobType}</p>

            <a
              href={job.url}
              target="_blank"
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              View Details →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
