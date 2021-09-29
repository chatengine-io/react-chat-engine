import React from 'react'
import { ChatEngine } from 'react-chat-engine'

function SupportDashboard() {
  return (
    <ChatEngine 
      projectID='1ed59673-1fd6-46ed-9eb9-56239a6a4f82'
      userName='Adam La Morre'
      userSecret='pass1234'
      height='calc(100vh - 12px)'
    />
  );
}

export default SupportDashboard;
