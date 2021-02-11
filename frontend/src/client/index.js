function fetchAndParse(endpoint, config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(process.env.REACT_APP_API_URL + endpoint, config).then((r) => {
    return r.json().then((data) => {
      if (r.ok) {
        return data;
      } else {
        throw data;
      }
    });
  });
}

const client = {
  get(endpoint) {
    const config = {
      method: "GET",
    };
    return fetchAndParse(endpoint, config);
  },
  post(endpoint, data) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return fetchAndParse(endpoint, config);
  },
  patch(endpoint, data) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return fetchAndParse(endpoint, config);
  },
};

export default client;

// RestClient
// client.get("/me").then(data => {}).catch(err => {})
// client.post("/login", { username }).then(data => {}).catch(err => {})
