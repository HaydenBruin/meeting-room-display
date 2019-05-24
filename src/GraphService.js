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

export async function getCalendarGroups(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const calendars = await client
        .api('/me/calendarGroups')
        .select('id,name')
        .get();

    return calendars;
}
export async function getCalendarGroupsCalendars(accessToken, calendarGroupId) {
    const client = getAuthenticatedClient(accessToken);

    const calendars = await client
        .api(`/me/calendarGroups/${calendarGroupId}/calendars`)
        .select('id,name,owner')
        .get();

    return calendars;
}

export async function getEvents(accessToken, calendarGroupId, calendarGroupCalendarId, ) {
    if (!calendarGroupId) return [];
    const client = getAuthenticatedClient(accessToken);

    const events = await client
        .api(`/me/calendarGroups/${calendarGroupId}/calendars/${calendarGroupCalendarId}/calendarView`)
        .header('Prefer', 'outlook.timezone="New Zealand Standard Time"')
        .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
        .query({
            startDateTime: '2019-05-24T00:00:00.0000000',
            endDateTime: '2019-05-24T23:59:59.0000000'
        })
        .orderby('start/dateTime asc')
        .get();

    return events;
}