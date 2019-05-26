import React, { Component, Fragment } from 'react'

// Styled Components
import styled from 'styled-components'
import GlobalStyles from '../global-styles'

// Verified Images - https://source.unsplash.com/random/1920x1080?nature
import landscape1 from '../../images/landscape-1.jpg'
import landscape2 from '../../images/landscape-2.jpg'
import landscape3 from '../../images/landscape-3.jpg'

export default class Layout extends Component {
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    render() {
        const random = this.getRandomInt(3);
        let imageUrl = "";

        switch (random) {
            case 1: { imageUrl = landscape2; break; }
            case 2: { imageUrl = landscape3; break; }
            default: { imageUrl = landscape1; break; }
        }
        return (
            <Fragment>
                <GlobalStyles />
                <MeetingRoom style={{ backgroundImage: `url(${imageUrl})` }}>
                    {this.props.children}
                </MeetingRoom>
            </Fragment >
        )
    }
}


const MeetingRoom = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;
