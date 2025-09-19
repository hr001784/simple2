import React, { useEffect, useState } from "react";

// Custom styles for the card UI that you can place in App.js (CSS-in-JS)
const cardStyle = {
  borderRadius: "18px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  transition: "transform 0.2s",
  background: "linear-gradient(135deg, #f8fafc 50%, #e0e7ff 100%)",
  border: "none",
};

const avatarShadow = {
  boxShadow: "0 8px 24px rgba(97, 97, 255, 0.19)",
  borderRadius: "50%",
  border: "3px solid #fff",
  background: "#eff6ff",
  margin: "0 auto 20px",
  display: "block",
};

const infoText = {
  color: "#374151",
  fontWeight: "500",
  fontSize: "1rem"
};

function UserCard({ user, avatarUrl }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="card p-3 h-100"
        style={cardStyle}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={avatarUrl}
          alt={user.username}
          style={{ ...avatarShadow, width: "120px", height: "120px" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title" style={{ letterSpacing: "0.5px" }}>{user.name}</h5>
          <h6 className="card-subtitle mb-2 text-primary">@{user.username}</h6>
          <p className="card-text" style={infoText}>
            <span>Email: {user.email}</span><br />
            <span>Phone: {user.phone}</span><br />
            <span>Website: <a href={`http://${user.website}`} rel="noopener noreferrer" target="_blank">{user.website}</a></span><br />
            <span>
              Address: {user.address.street}, {user.address.suite},<br />
              {user.address.city}, {user.address.zipcode}
            </span><br />
            <span>Company: {user.company.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <h1 className="mb-5 text-center text-gradient">User Profiles</h1>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", minHeight: "50vh", alignItems: "center" }}>
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
          <style>{`
            .sk-cube-grid {
              width: 40px;
              height: 40px;
              margin: 40px auto;
            }
            .sk-cube-grid .sk-cube {
              width: 33%;
              height: 33%;
              background-color: #6366f1;
              float: left;
              animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
            }
            .sk-cube-grid .sk-cube1 { animation-delay: 0.2s; }
            .sk-cube-grid .sk-cube2 { animation-delay: 0.3s; }
            .sk-cube-grid .sk-cube3 { animation-delay: 0.4s; }
            .sk-cube-grid .sk-cube4 { animation-delay: 0.1s; }
            .sk-cube-grid .sk-cube5 { animation-delay: 0.2s; }
            .sk-cube-grid .sk-cube6 { animation-delay: 0.3s; }
            .sk-cube-grid .sk-cube7 { animation-delay: 0s; }
            .sk-cube-grid .sk-cube8 { animation-delay: 0.1s; }
            .sk-cube-grid .sk-cube9 { animation-delay: 0.2s; }
            @keyframes sk-cubeGridScaleDelay {
              0%, 70%, 100% { transform: scale3D(1, 1, 1); }
              35% { transform: scale3D(0, 0, 1); }
            }
            .text-gradient {
              background: linear-gradient(90deg,#6366f1,#4f46e5);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          `}</style>
        </div>
      ) : (
        <div className="row">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              avatarUrl={`https://api.dicebear.com/6.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

