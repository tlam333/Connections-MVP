import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  // Local state for user profile
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  // Add an interest to the interests array
  const addInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setInterestInput('');
    }
  };

  // Remove an interest from the interests array
  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  // Save profile data (for now, just logging and using localStorage)
  const saveProfile = () => {
    const profile = { name, age, interests };
    console.log("Profile saved:", profile);
    // Optionally store in localStorage for persistence (even on page reload)
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Profile saved! Check your console or localStorage.");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
      
      {/* Name Field */}
      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input 
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      
      {/* Age Field */}
      <div className="mb-4">
        <label className="block mb-1">Age</label>
        <input 
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      
      {/* Interests Field */}
      <div className="mb-4">
        <label className="block mb-1">Interests</label>
        <div className="flex mb-2">
          <input 
            type="text"
            placeholder="Add an interest..."
            value={interestInput}
            onChange={e => setInterestInput(e.target.value)}
            className="input input-bordered flex-grow mr-2"
          />
          <button className="btn" onClick={addInterest}>
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <div key={index} className="badge badge-primary">
              {interest}
              <button 
                className="btn btn-xs ml-1"
                onClick={() => removeInterest(interest)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Save Profile Button */}
      <button className="btn btn-primary w-full" onClick={saveProfile}>
        Save Profile
      </button>
    </div>
  );
};

export default ProfilePage;
