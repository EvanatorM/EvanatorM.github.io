import React from 'react';

export const data = {
    layout: "globalLayout.njk",
    title: "Home"
}

export default function (data) {
    return (
        <>
            <div id="coming-soon">
                <img src="logo.svg" alt="Logo" />
                <h1>Coming Soon</h1>
            </div>
        </>
    );
};