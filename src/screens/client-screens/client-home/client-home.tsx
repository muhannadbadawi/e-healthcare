const ClientHome = () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome, {user?.name || "Valued Guest"}</h1>
      <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
        We're glad to have you on our medical consultation platform. Here, you
        can get trusted and timely health advice from certified professionals.
      </p>
      <p style={{ marginTop: "1rem" }}>
        Start exploring our doctors, book your consultation, and manage your
        health information with ease.
      </p>
    </div>
  );
};

export default ClientHome;
