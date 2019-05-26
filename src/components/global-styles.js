import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap');

    html, body {
        background: #000;
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', sans-serif;
    }

    h1 {
        margin: 0;
        padding: 0;
    }
`
export default GlobalStyle;