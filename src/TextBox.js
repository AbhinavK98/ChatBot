import React, { useState } from 'react';

const TextBox = ({ onQuestionSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = () => {
    onQuestionSubmit(question);
    setQuestion('');
  };

  return (
    <div className="text-box">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={question}
        onChange={handleQuestionChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TextBox;
