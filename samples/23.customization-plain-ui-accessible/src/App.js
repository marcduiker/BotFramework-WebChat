import { Components } from 'botframework-webchat-component';
import { createDirectLine } from 'botframework-webchat';
import React from 'react';

import PlainWebChat from './PlainWebChat';

// In this demo, we are using Direct Line token from MockBot.
// To talk to your bot, you should use the token exchanged using your Direct Line secret.
// You should never put the Direct Line secret in the browser or client app.
// https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-authentication

async function getDirectLineToken() {
  const res = await fetch('https://directline.botframework.com/v3/directline/tokens/generate', 
    { method: 'POST',
    headers: {
        'Authorization': 'Bearer <KEY>'
    } });
  const { token } = await res.json();

  return token;
}

export default () => {
  const [directLine, setDirectLine] = React.useState();

  if (!directLine) {
    // We will load DirectLineJS asynchronously on first render.
    getDirectLineToken().then(token => setDirectLine(createDirectLine({ token })));
  }

  return (
    // We are using the "Composer" component here, which all descendants will have access to the Web Chat API by HOC-ing thru "connectToWebChat".
    <React.Fragment>
      <h1>Op Avontuur!</h1>
      <p>Hi! Wat leuk dat je op avontuur wil! Begin je avontuur door iets te zeggen in het tekstveld hieronder.</p>
      {!!directLine && (
        <Components.Composer directLine={directLine}>
          <PlainWebChat />
        </Components.Composer>
      )}
    </React.Fragment>
  );
};
