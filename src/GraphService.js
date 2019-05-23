var graph = require('@microsoft/microsoft-graph-client');

function getAuthenticatedClient(accessToken) {
    // Initialize Graph client
    const client = graph.Client.init({
        // Use the provided access token to authenticate
        // requests
        authProvider: (done) => {
            done(null, accessToken);
        }
    });

    return client;
}

export async function getUserDetails(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
}

export async function getEvents(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const events = await client
        .api('/me/calendarView')
        .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
        .query({
            startDateTime: '2019-05-23T00:00:00.0000000',
            endDateTime: '2019-05-23T23:59:59.0000000'
        })
        .get();

    return events;
}