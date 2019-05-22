import React from 'react'
import styled from 'styled-components'

const MeetingList = () => {
    return (
        <Wrapper>
            <div className="today">
                <div className="title">Today's Meetings</div>
                <div className="room">The Distillery</div>
            </div>

            <Meeting title="Lorem's Onboarding" time="2:30 - 3:30" />
            <Meeting title="Sprint Planning - Contact Energy" time="3:30 - 4:00" />
            <Meeting title="Retro with Contact" time="4:30 - 5:30" />
        </Wrapper>
    )
}

const Meeting = (props) => {
    const { title, time } = props;
    return (
        <MeetingWrapper>
            <div className="meeting-title">{title}</div>
            <div className="meeting-time">{time}</div>
        </MeetingWrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;

    .today {
        display: flex;
        background: rgba(0,0,0,0.5);
        color: #FFF;
        padding: 30px;
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        margin-bottom: 30px;

        .title {
            flex: 1;
        }
        .room {
            flex: 1;
            text-align: right;
            color: #ccc;
        }
    }
`;

const MeetingWrapper = styled.div`
    display: flex;
    padding: 15px 30px;
    font-size: 20px;

    .meeting-title {
        color: #fff;
        flex: 2;
        text-align: left;
    }

    .meeting-time {
        flex: 1;
        color: #ccc;
        text-align: right;
    }
`;

export default MeetingList