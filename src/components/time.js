import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment';

class Time extends Component {

    clockTimer = null;
    state = {
        time: "",
        date: ""
    }

    getTimes = () => {
        return {
            time: moment().format('hh:mm'),
            date: moment().format("dddd, MMM Do")
        }
    }

    componentDidMount = () => {
        this.setState(this.getTimes());

        this.clockTimer = setInterval(() => {
            this.setState(this.getTimes());
        }, 10000)
    }

    render() {
        const { time, date } = this.state;
        
        return (
            <Wrapper>
                <CurrentTime>{time}</CurrentTime>
                <CurrentDate>{date}</CurrentDate>
            </Wrapper>
        )       
    }
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