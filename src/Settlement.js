import React from 'react';

const Settlement = (props) => {
    let current = 1;
    if (props.lps < 3) current = 1;
    else if (props.lps < 15) current = 2;
    else if (props.lps < 100) current = 3;
    else if (props.lps < 300) current = 4;
    else if (props.lps < 600) current = 5;
    else if (props.lps < 1000) current = 6;
    else current = 7;
    
    // Display the fucking plane if you have it
    if (props.aFuckingPlane) current = 8;
    
    let settlementUrl = 
        `${process.env.PUBLIC_URL}/settlement/${current}.png`;
    return (
        <div class="row">
            <img alt="settlement"
                className="mx-auto img-fluid"
                style={{maxHeight: 240}}
                src={settlementUrl} />
        </div>
    )
}

export default Settlement;