// ✅ Correct Base URL
const API_URL = "http://localhost:5000/api/resume";

// 🔥 Upload resumes
export async function uploadResumes(jobTitle, jobDescription, files) {
  const formData = new FormData();

  formData.append("jobTitle", jobTitle);
  formData.append("jobDescription", jobDescription);

  for (let i = 0; i < files.length; i++) {
    formData.append("resumes", files[i]);
  }

  try {
    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    // ✅ SAFE ERROR HANDLING
    if (!response.ok) {
      let errorMessage = "Server error";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = "Invalid server response";
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("API ERROR:", error.message);

    throw {
      response: {
        data: { error: error.message }
      }
    };
  }
}

// 🔥 Get results
export async function getResults(jobId) {
  try {
    const response = await fetch(`${API_URL}/results/${jobId}`);

    if (!response.ok) {
      let errorMessage = "Failed to fetch results";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = "Invalid server response";
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Fetch Results Error:", error.message);

    throw {
      response: {
        data: { error: error.message }
      }
    };
  }
}