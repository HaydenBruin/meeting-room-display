import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import GlobalStyles from '../components/global-styles'
import Time from '../components/time'
import MeetingList from '../components/meeting-list'
import Authentication from '../components/authentication';
import config from '../Config';
import { getEvents, getUserDetails } from '../GraphService';
import { UserAgentApplication } from 'msal';

class Index extends Component {
    constructor(props) {
        super(props);

        this.userAgentApplication = new UserAgentApplication(config.appId, null, null);

        var user = this.userAgentApplication.getUser();

        this.state = {
            events: [],
            isAuthenticated: (user !== null),
            user: {},
            error: null
        };

        if (user) {
            // Enhance user object with data from Graph
            this.getUserProfile();
        }
    }

    async login() {
        try {
            await this.userAgentApplication.loginPopup(config.scopes);
            await this.getUserProfile();
        }
        catch (err) {
            var errParts = err.split('|');
            this.setState({
                isAuthenticated: false,
                user: {},
                error: { message: errParts[1], debug: errParts[0] }
            });
        }
    }

    logout() {
        this.userAgentApplication.logout();
    }

    async getUserProfile() {
        try {
            // Get the access token silently
            // If the cache contains a non-expired token, this function
            // will just return the cached token. Otherwise, it will
            // make a request to the Azure OAuth endpoint to get a token

            var accessToken = await this.userAgentApplication.acquireTokenSilent(config.scopes);

            if (accessToken) {
                // Get the user's profile from Graph
                var user = await getUserDetails(accessToken);
                this.setState({
                    isAuthenticated: true,
                    user: {
                        displayName: user.displayName,
                        email: user.mail || user.userPrincipalName
                    },
                    error: null
                });
            }
        }
        catch (err) {
            var error = {};
            if (typeof (err) === 'string') {
                var errParts = err.split('|');
                error = errParts.length > 1 ?
                    { message: errParts[1], debug: errParts[0] } :
                    { message: err };
            } else {
                error = {
                    message: err.message,
                    debug: JSON.stringify(err)
                };
            }

            this.setState({
                isAuthenticated: false,
                user: {},
                error: error
            });
        }
    }

    async componentDidMount() {
        try {
            // Get the user's access token
            var accessToken = await window.msal.acquireTokenSilent(config.scopes);
            // Get the user's events
            var events = await getEvents(accessToken);
            // Update the array of events in state
            this.setState({
                events: events.value
            });
        }
        catch (err) {
            this.props.showError('ERROR', JSON.stringify(err));
        }
    }


    render() {
        console.log(this.state);
        if (!this.state.isAuthenticated) {
            return (
                <button onClick={() => this.login()}>authenticate ya self</button>
            )
        }

        return (
            <Fragment>
                <GlobalStyles />
                <MeetingRoom style={{ backgroundImage: "url(https://source.unsplash.com/random/1920x1080?nature,water)" }}>
                    <CurrentMeeting>

                    </CurrentMeeting>
                    <UpcomingMeetings>
                        <Time />
                        <MeetingList meetings={this.state.events} room={this.state.user.displayName} />
                    </UpcomingMeetings>
                </MeetingRoom>
            </Fragment>
        )
    }
}

const MeetingRoom = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const CurrentMeeting = styled.div`
    flex: 1;
`;

const UpcomingMeetings = styled.div`
    flex: 1;
    background: rgba(0,0,0,0.6);
`;

export default Index