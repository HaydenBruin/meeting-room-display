import React, { Component } from 'react'

// Styled Components
import styled from 'styled-components'

// Clock Component
import Time from '../components/time'

// Layout Component
import Layout from '../components/templates/default'

// Meeting Components
import CurrentMeeting from '../components/current-meeting'
import MeetingList from '../components/meeting-list'

// API & Authentication
import config from '../Config'
import { getCalendarGroupsCalendars, getCalendarGroups, getEvents, getUserDetails } from '../GraphService'
import { UserAgentApplication } from 'msal'

// Homepage Component
export default class Homepage extends Component {
    constructor(props) {
        super(props);

        this.userAgentApplication = new UserAgentApplication(config.appId, null, null);
        var user = this.userAgentApplication.getUser();

        this.state = {
            events: [],
            calendarGroups: [],
            calendarGroup: null,
            calendarGroupsCalendars: [],
            calendarGroupsCalendar: null,
            isAuthenticated: user ? user : null,
            user: {},
            error: null
        };

        if (user) {
            this.getUserProfile();
        }
    }

    async login() {
        try {
            await this.userAgentApplication.loginPopup(config.scopes);
            await this.getUserProfile();
            this.findMeetingsForRoom();
            this.findCalendarGroups();
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

    async findCalendarGroups() {
        try {
            const accessToken = await window.msal.acquireTokenSilent(config.scopes);
            const calendarGroups = await getCalendarGroups(accessToken);
            this.setState({
                calendarGroups: calendarGroups.value
            });
        }
        catch (err) {
            console.warn('Calendar Groups Error: ', JSON.stringify(err))
        }
    }

    async findCalendarGroupsCalendars() {
        console.log('this shit: ', this.state);
        try {
            const accessToken = await window.msal.acquireTokenSilent(config.scopes);
            const calendarGroups = await getCalendarGroupsCalendars(accessToken, this.state.calendarGroup);
            this.setState({
                calendarGroupsCalendars: calendarGroups.value
            });
        }
        catch (err) {
            console.warn('Calendar Groups Error: ', JSON.stringify(err))
        }
    }

    async findMeetingsForRoom() {
        try {
            const accessToken = await window.msal.acquireTokenSilent(config.scopes);
            const events = await getEvents(accessToken, this.state.calendarGroup, this.state.calendarGroupsCalendar);
            this.setState({
                events: events.value
            });
        }
        catch (err) {
            console.warn('Events Error: ', JSON.stringify(err))
        }
    }

    componentDidMount = () => {
        this.findMeetingsForRoom();
        this.findCalendarGroups();
    }

    render() {
        let layout = null;
        if (!this.state.isAuthenticated) {
            layout = (
                <Authenticate>
                    <div className="box">
                        <div className="title">Login to your<br />Microsoft Account</div>
                        <div className="desc">Once you've logged in select the calendar that represents the meeting room it will be displayed outside of.</div>
                        <img onClick={() => this.login()} alt="Sign in with Microsoft" src="https://docs.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-azure-ad-apps/ms-symbollockup_signin_light.svg" />
                    </div>
                </Authenticate>
            )
        }
        else if (this.state.isAuthenticated && (!this.state.calendarGroup || !this.state.calendarGroupsCalendar)) {
            if (this.state.calendarGroup) {
                layout = (
                    <Authenticate>
                        <div className="box">
                            <div className="title">Select a Calendar from the list below</div>
                            {this.state.calendarGroupsCalendars && this.state.calendarGroupsCalendars.map((calendarGroup, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="calendar"
                                        onClick={() => { this.setState({ calendarGroupsCalendar: calendarGroup.id }, () => { this.findMeetingsForRoom()}) }}>{calendarGroup.name}</div>
                                )
                            })}
                        </div>
                    </Authenticate>
                )
            }
            else {
                layout = (
                    <Authenticate>
                        <div className="box">
                            <div className="title">Select a Calendar group from the list below</div>
                            {this.state.calendarGroups && this.state.calendarGroups.map((calendarGroup, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="calendar"
                                        onClick={() => { this.setState({ calendarGroup: calendarGroup.id }, () => { this.findCalendarGroupsCalendars(); }) }}>{calendarGroup.name}</div>
                                )
                            })}
                        </div>
                    </Authenticate>
                )
            }
        }
        else {
            layout = (
                <Meetings>
                    <CurrentMeeting />
                    <UpcomingMeetings>
                        <Time />
                        <MeetingList meetings={this.state.events} room={this.state.user.displayName} />
                    </UpcomingMeetings>
                </Meetings>
            );
        }

        return (
            <Layout>
                {layout}
            </Layout>
        )
    }
}

const Authenticate = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .box {
        background: rgba(0,0,0,0.6);
        padding: 50px 100px;
        width: 320px;
        max-width: 100%;
        text-align: center;
        color: #FFF;

        .title {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .desc {
            font-size: 16px;
            margin-bottom: 30px;
            line-height: 1.33;
        }

        img {
            transition: all 0.3s ease;
            cursor: pointer;

            &:hover {
                transform: scale(1.1);
            }
        }

        .calendar {
            padding: 15px;
            margin-bottom: 5px;
            background: #FFF;
            color: #333;
            transition: all 0.3s ease;
            cursor: pointer;
            
            &:hover {
                transform: scale(1.1);
            }
        }
    }
`;

const Meetings = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

const UpcomingMeetings = styled.div`
    flex: 1;
    background: rgba(0,0,0,0.6);
    height: 100%;
`;
