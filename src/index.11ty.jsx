import React from 'react';

export const data = {
    layout: "coming-soon-layout.njk",
    title: "Home"
}

export default function (data) {
    return (
        <>
            <div id="coming-soon">
                <img src="/img/logo.svg" alt="Logo" />
                <h1><span>Coming Soon</span>
                <span><a href="/docs">Visit the Docs</a></span></h1>
            </div>
        </>
    );
};