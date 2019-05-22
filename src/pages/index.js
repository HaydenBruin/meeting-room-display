import React, { Fragment } from 'react'
import styled from 'styled-components'
import GlobalStyles from '../components/global-styles'
import Time from '../components/time'
import MeetingList from '../components/meeting-list'
import Authentication from '../components/authentication';

const index = () => {
    if(1 != 2) return <Authentication />;

    return (
        <Fragment>
            <GlobalStyles />
            <MeetingRoom style={{ backgroundImage: "url(https://source.unsplash.com/random/1920x1080?nature,water)" }}>
                <CurrentMeeting>

                </CurrentMeeting>
                <UpcomingMeetings>
                    <Time />
                    <MeetingList />
                </UpcomingMeetings>
            </MeetingRoom>
        </Fragment>
    )
}

const MeetingRoom = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`;

const CurrentMeeting = styled.div`
    flex: 2;
`;

const UpcomingMeetings = styled.div`
    flex: 1;
    background: rgba(0,0,0,0.6);
`;

export default index