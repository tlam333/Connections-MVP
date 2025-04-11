import React from "react";
import { Link } from "react-router-dom";


const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: "#FFFDD0" }} >
      <h1 className="text-4xl font-bold mb-8" style={{ color: "#482d1e" }} >Welcome to Connections.</h1>
      <div className="flex space-x-4">
        <Link to="/chat">
          <button className="btn btn-primary">Join Group Chat</button>
        </Link>
        <Link to="/profile">
          <button className="btn btn-secondary">Profile</button>
        </Link>
        
      </div>

    </div>

    
  );
};

export default LandingPage;
