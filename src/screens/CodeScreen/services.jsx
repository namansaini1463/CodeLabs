const languageMappings = {
  cpp: 54,
  java: 91,
  python: 92,
  javascript: 93,
};

async function getSubmission(tokenId, callback) {
  const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "86c4cf7d25msh39a4a4fcecfa437p104f90jsn1dcb37f988f7",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  } catch (error) {
    callback({ apiStatus: "error", message: JSON.stringify(error) });
  }
}

export async function makeSubmission({ code, language, callback, stdinput }) {
  //` Makes an submission and handles the status code of the submission
  const url = "https://judge0-ce.p.rapidapi.com/submissions?fields=*";

  const httpOptions = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "86c4cf7d25msh39a4a4fcecfa437p104f90jsn1dcb37f988f7",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageMappings[language],
      source_code: code,
      stdin: stdinput,
    }),
  };

  /*
    Generic response from the API
    {
      apiStatus: 'loading' || 'error' || 'success ',
      data : response,
      message: 'Runtime Error' | 'Compilation error'

    }
  */

  try {
    callback({ apiStatus: "loading" });
    const response = await fetch(url, httpOptions);
    const result = await response.json();
    const tokenId = result.token;

    let statusCode = 1;

    let apiSubmissionResult;
    while (statusCode === 1 || statusCode === 2) {
      try {
        apiSubmissionResult = await getSubmission(tokenId);
        statusCode = apiSubmissionResult.status.id;
      } catch (error) {
        callback({ apiStatus: "error", message: JSON.stringify(error) });
        return;
      }
    }

    if (apiSubmissionResult) {
      callback({ apiStatus: "success", data: apiSubmissionResult });
    }
  } catch (error) {
    callback({ apiStatus: "error", message: JSON.stringify(error) });
  }
}
