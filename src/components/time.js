import React from 'react'
import styled from 'styled-components'

const Time = () => {
    const
        days = [
            null,
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],
        months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        today = new Date(),
        date = `${days[today.getDay()]}, ${months[today.getMonth()]} ${today.getDate()}`,
        time = today.getHours() + ":" + today.getMinutes();
    console.log(today);
    return (
        <Wrapper>
            <CurrentTime>{time}</CurrentTime>
            <CurrentDate>{date}</CurrentDate>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 60px 0px;
    text-align: center;
`;
const CurrentTime = styled.div`
    font-size: 82px;
    font-weight: 400;
    color: #FFF;
`;
const CurrentDate = styled.div`
    font-size: 24px;
    font-weight: 400;
    color: #FFF;
`;

export default Time