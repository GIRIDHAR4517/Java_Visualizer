export async function apiRequest(url, options) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: "Bearer " + token,
    },
  });

  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem("token");
    alert("Session Expired redirecting to login page ...")
    window.location.href = "/login";
  }

  return res.json();
}