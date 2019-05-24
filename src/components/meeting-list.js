import React from 'react'
import styled from 'styled-components'
import moment from 'moment';

const format = 'hh:mm A';
function formatDateTime(dateTime) {
    return moment(dateTime).format(format);
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
                    <Meeting key={index} meeting={meeting} title={meeting.subject} />
                )
            })}
        </Wrapper>
    )
}

const Meeting = (props) => {
    const { meeting } = props;
    const
        beforeTime = moment(meeting.start.dateTime),
        afterTime = moment(meeting.end.dateTime),
        isMeetingActive = moment().isBetween(beforeTime, afterTime);
        
    return (
        <MeetingWrapper isMeetingActive={isMeetingActive}>
            <div className="meeting-title">{meeting.subject}</div>
            <div className="meeting-time">{`${formatDateTime(meeting.start.dateTime)} - ${formatDateTime(meeting.end.dateTime)}`}</div>
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
    font-size: 18px;

    .meeting-title {
        color: #fff;
        flex: 1;
        text-align: left;
    }

    .meeting-time {
        flex: 1;
        color: #ccc;
        text-align: right;
    }

    ${props => props.isMeetingActive ? (`
        .meeting-title,
        .meeting-time {
            color: lightgreen;
        }
    `) : null}
`;

export default MeetingList