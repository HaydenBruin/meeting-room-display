import React from 'react'
import styled from 'styled-components'
import moment from 'moment';

function formatDateTime(dateTime) {
    return moment.utc(dateTime).local().format('h:mm A');
    //return moment.utc(dateTime).local().format('M/D/YY h:mm A');
}

const MeetingList = (props) => {
    console.log('meeting prop: ', props);
    return (
        <Wrapper>
            <div className="today">
                <div className="title">Today's Meetings</div>
                <div className="room">{props.room}</div>
            </div>

            {props.meetings && props.meetings.map((meeting, index) => {
                return (
                    <Meeting key={index} title={meeting.subject} time={`${formatDateTime(meeting.start.dateTime)} - ${formatDateTime(meeting.end.dateTime)}`} />
                )
            })}
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