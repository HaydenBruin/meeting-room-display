import React, { Component, Fragment } from 'react'

// Styled Components
import styled from 'styled-components'
import GlobalStyles from '../global-styles'

export default class Layout extends Component {
    render() {
        return (
            <Fragment>
                <GlobalStyles />
                <MeetingRoom style={{ backgroundImage: `url(https://source.unsplash.com/random/1920x1080?nature,water)` }}>
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
