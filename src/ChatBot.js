import React, { useState, useEffect } from 'react';
import './ChatBot.css';
import data from './data.json';
import TextBox from './TextBox';

const ChatBot = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userResponses, setUserResponses] = useState([]);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const user = prompt("Please enter your username:");
    setUsername(user);
    setWelcomeMessage(`Welcome ${user}!`);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setApplications(data.applications);
  }, []);

  const handleTextBoxSubmit = (question) => {
    // Fetch data from JSON API using the provided question
    // and update the chat with the fetched response
  };

  const toggleChatBot = () => {
    setIsChatBotOpen((prevOpen) => !prevOpen);
  };

  const handleApplicationSelection = (selectedApp) => {
    setSelectedApplication(selectedApp);
    setSelectedIssue(null);
    setCurrentQuestion(findInitialQuestion());
  };


//   const handleIssueTypeSelection = (selectedIssueType) => {
//     setSelectedIssue(selectedIssueType);
//     handleNextQuestion(1);
//   };
  const handleIssueTypeSelection = (selectedIssueType) => {
    console.log('Selected issue:', selectedIssueType);
    setSelectedIssue(selectedIssueType);
    const initialQuestion = findInitialQuestion();
    console.log('Initial question:', initialQuestion);
    setCurrentQuestion(initialQuestion);
  };
     
  const handleNextQuestion = (questionId) => {
    setCurrentQuestion(findQuestionById(questionId));
  };


  const handleUserInput = (response) => {
    addUserResponse(response);

    // Logic to handle user input and navigation goes here

    // For now, let's just go to the next question if available
    const nextQuestionId = currentQuestion.options.find((option) => option.optionText === 'Yes').nextQuestionId;
    handleNextQuestion(nextQuestionId);
  };

  const addUserResponse = (response) => {
    setUserResponses((prevResponses) => [...prevResponses, response]);
  };

  const findInitialQuestion = () => {
    if (!selectedApplication || !selectedIssue) return null;
    const issue = applications
      .find((app) => app.name === selectedApplication)
      .issues.find((issue) => issue.name === selectedIssue);
    
    console.log('Issue:', issue); // Check if the correct issue is found
    console.log('Questions:', issue.questions); // Check if questions array is available
    
    return issue.questions[0]; // Make sure this is correctly finding the initial question
  };
  

  const findQuestionById = (questionId) => {
    if (!selectedApplication || !selectedIssue) return null;
    const issue = applications.find((app) => app.name === selectedApplication).issues.find((issue) => issue.name === selectedIssue);
    return issue.questions.find((question) => question.id === questionId);
  };

  return (
    <div className={`chatbot-container ${isChatBotOpen ? 'open' : ''}`}>
      <div className="chatbot-button" onClick={toggleChatBot}>
        Chat with us
      </div>
      {isChatBotOpen && (
        <div className="chat-bot">
          <div className="chat-header">
            <h2>iCPAQS ChatBot</h2>
            <button onClick={toggleChatBot}>Close</button>
          </div>
          <div className="chat-main">
            <div className="chat-messages">
              {userResponses.map((response, index) => (
                <div key={index} className={`chat-message ${response.includes('Step') ? 'bot' : 'user'}`}>
                  {response}
                </div>
              ))}
            </div>
            
            <div className="chat-input">
            <div className="chat-welcome">
                {welcomeMessage}
              </div>
              <div className="chat-timer">
                Timer: {timer} seconds
              </div>
              {!selectedApplication && (
                <div className="chat-options">
                  <div className="chat-question">Select an Application:</div>
                  <div className="options">
                    {applications.map((app) => (
                      <button
                        key={app.name}
                        onClick={() => handleApplicationSelection(app.name)}
                      >
                        {app.name}
                      </button>
                              
                    ))}
                     <TextBox onQuestionSubmit={handleTextBoxSubmit} /> 
                  </div>
                </div>
              )}
              {selectedApplication && !selectedIssue && (
                <div className="chat-options">
                  <div className="chat-question">Select an Issue:</div>
                  <div className="options">
                    {applications.find((app) => app.name === selectedApplication).issues.map((issue) => (
                      <button
                        key={issue.name}
                        onClick={() => handleIssueTypeSelection(issue.name)}
                      >
                        {issue.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {selectedApplication && selectedIssue && currentQuestion && (
                <div className="chat-options">
                  <div className="chat-question">{currentQuestion.questionText}</div>
                  <div className="options">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.optionText}
                        onClick={() => handleUserInput(option.optionText)}
                        className={option.optionText === 'Yes' ? 'active' : ''}
                      >
                        {option.optionText}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
