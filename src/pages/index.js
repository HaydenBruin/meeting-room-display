import React, { Component, Fragment } from 'react'

// Styled Components
import styled from 'styled-components'
import GlobalStyles from '../components/global-styles'

// Clock Component
import Time from '../components/time'

// Meeting Components
import CurrentMeeting from '../components/current-meeting'
import MeetingList from '../components/meeting-list'

// API & Authentication
import config from '../Config'
import { getEvents, getUserDetails } from '../GraphService'
import { UserAgentApplication } from 'msal'

// Homepage Component
export default class Homepage extends Component {

    imageTimer = null;

    constructor(props) {
        super(props);

        this.userAgentApplication = new UserAgentApplication(config.appId, null, null);

        var user = this.userAgentApplication.getUser();

        this.state = {
            imageCategory: true,
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
            const accessToken = await this.userAgentApplication.acquireTokenSilent(config.scopes);

            if (accessToken) {
                const user = await getUserDetails(accessToken);
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
            const accessToken = await window.msal.acquireTokenSilent(config.scopes);
            const events = await getEvents(accessToken);
            this.setState({
                events: events.value
            });
        }
        catch (err) {
            console.warn('Events Error: ', JSON.stringify(err))
        }

        this.imageTimer = setInterval(() => {
            this.setState(prevState => ({
                imageCategory: !prevState.imageCategory
            }))
        },60000);
    }
    componentWillUnmount = () => {
        clearTimeout(this.imageTimer)
    }
    
    render() {
        if (!this.state.isAuthenticated) {
            return (
                <button onClick={() => this.login()}>authenticate ya self</button>
            )
        }
        const category = this.state.imageCategory ? "nature" : "water";

        return (
            <Fragment>
                <GlobalStyles />
                <MeetingRoom style={{ backgroundImage: `url(https://source.unsplash.com/random/1920x1080?${category})` }}>
                    <CurrentMeeting />
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
    align-items: flex-end;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const UpcomingMeetings = styled.div`
    flex: 1;
    background: rgba(0,0,0,0.6);
    height: 100%;
`;
