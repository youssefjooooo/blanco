export const getInitialData = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(
      "https://blanco-backend.vercel.app/api/v1/expences",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) throw new Error("There was a problem with the fetch request.");
    const data = await res.json();
    return data.data.expences;
  } catch (err) {
    console.error("Error", err);
  }
};
