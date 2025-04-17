import React, { useState } from 'react';
import { interestCategories, InterestCategory } from '../../data/interestCategories';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  // Local state for user profile
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Toggle expand/collapse for a category and add that category as a selected interest if opening.
  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      // Collapse the category (but leave the general interest in selectedInterests)
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      // Expand the category
      setExpandedCategories([...expandedCategories, category]);
      // Also add the general category to selectedInterests if not already selected
      if (!selectedInterests.includes(category)) {
        setSelectedInterests([...selectedInterests, category]);
      }
    }
  };

  // Add a specific interest (if not already selected).
  const selectInterest = (interest: string) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Remove a specific interest.
  const removeInterest = (interest: string) => {
    setSelectedInterests(selectedInterests.filter(i => i !== interest));
  };

  // Save profile data (for now: just log it).
  const saveProfile = () => {
    if (!name.trim() || !age.trim()) {
      alert("Name and age fields cannot be empty.");
      return;
    }

    const profile = { name, age, description, interests: selectedInterests };
    console.log("Profile saved:", profile);
    alert("Profile saved! Check your console or localStorage.");
  };
  

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Your Profile</h1>
      
      {/* Name Field */}
      <div className="mb-4">
        <label className="block mb-1">Name:</label>
        <input 
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      
      {/* Age Field */}
      <div className="mb-4">
        <label className="block mb-1">Age:</label>
        <input 
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label className="block mb-1">Description:<br /> ( Tell people what type of conversations your into! )</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full h-32 resize-none overflow-y-auto"
        />

      </div>
      
      {/* Interest Selection */}
      <div className="mb-4">
        <label className="block mb-1">Select Interests:</label>
        <div className="space-y-4">
          {interestCategories.map((cat: InterestCategory) => (
            <div key={cat.category} className="border p-2 rounded">
              <div className="flex justify-between items-center">
                <span className="font-bold">{cat.category}</span>
                <button 
                  onClick={() => toggleCategory(cat.category)}
                  className="btn btn-xs"
                >
                  {expandedCategories.includes(cat.category) ? 'Hide' : 'Show'}
                </button>
              </div>
              {expandedCategories.includes(cat.category) && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {cat.options.map(option => (
                    <button 
                      key={option}
                      onClick={() => selectInterest(option)}
                      className={`btn btn-sm ${selectedInterests.includes(option) 
                        ? 'btn-primary' 
                        : 'btn-outline'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Display Selected Interests */}
      <div className="mb-4">
        <label className="block mb-1">Selected Interests:</label>
        <div className="flex flex-wrap gap-2">
          {selectedInterests.map((interest, index) => (
            <div key={index} className="badge badge-accent">
              {interest}
              <button 
                className="btn btn-xs btn-outline ml-1"
                onClick={() => removeInterest(interest)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Save Button */}
      <button className="btn btn-primary w-full" onClick={saveProfile}>
        Save Profile
      </button>
          <br /><br />
      <div className="flex space-x-4 justify-center">
        <Link to="/chat">
          <button className="btn btn-primary">Join Group Chat</button>
        </Link>
        <Link to="/">
          <button className="btn btn-secondary">Home</button>
        </Link>
        
      </div>
    </div>
  );
};

export default ProfilePage;
