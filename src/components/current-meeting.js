import React from 'react'
import styled from 'styled-components'

const CurrentMeeting = (props) => {
    return (
        <Wrapper>
            <div className="container">
                <div className="content">
                    <div className="title">OPEN</div>
                    <div className="desc">Room open until 12:30 PM</div>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    flex: 1;
    height: 100%;
    padding-left: 30px;
    padding-bottom: 30px;
    background: rgba(0,0,0,0.3);

    .container {
        display: flex;
        align-items: flex-end;
        height: 100%;

        .content {
            text-shadow: 0px 0px 1px #444;
            color: #FFF;

            .title {
                font-size: 72px;
                line-height: 1;
                text-transform: uppercase;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .desc {
                font-size: 24px;
            }
        }
    }
`;

export default CurrentMeeting