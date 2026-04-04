const API_URL = "http://localhost:5000/api";

// Upload resumes and get results
export async function uploadResumes(jobTitle, jobDescription, files) {
  const formData = new FormData();
  formData.append("jobTitle", jobTitle);
  formData.append("jobDescription", jobDescription);

  for (let i = 0; i < files.length; i++) {
    formData.append("resumes", files[i]);
  }

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
}

// Get results by job ID
export async function getResults(jobId) {
  const response = await fetch(`${API_URL}/results/${jobId}`);
  const data = await response.json();
  return data;
}