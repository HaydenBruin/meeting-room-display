import React from 'react'

const Authentication = () => {
    // App configuration
    const authEndpoint = 'https://login.microsoftonline.com/common/oauth2/nativeclient?';
    const redirectUri = 'http://localhost:8000';
    const appId = '7b789f67-0316-448f-b189-650bbcd09c1c';
    const scopes = 'https://outlook.office.com/calendars.read.shared';

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // eslint-disable-next-line
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
      }

    function buildAuthUrl() {
        // Generate random values for state and nonce
        sessionStorage.authState = guid();
        sessionStorage.authNonce = guid();
      
        var authParams = {
          response_type: 'id_token token',
          client_id: appId,
          redirect_uri: redirectUri,
          scope: scopes,
          state: sessionStorage.authState,
          nonce: sessionStorage.authNonce,
          response_mode: 'code'
        };
        const URLparams = new URLSearchParams(Object.entries(authParams))
        return authEndpoint + URLparams.toString();
      }

    return (
        <div>
            <a href={buildAuthUrl()}>Connect to outlook</a>
        </div>
    )
}

export default Authentication