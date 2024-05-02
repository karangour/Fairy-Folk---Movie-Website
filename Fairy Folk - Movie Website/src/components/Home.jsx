import React, { useState } from 'react'

export default function Home() {
    return (
        <div className='home'>
            <div>
            <h1 className='heading-thin'>WATCH</h1> <h1 className='heading-thick'>FILM</h1>
                <hr className='underline-heading' />
                </div>
            <div className='home-buttons'>
            
            <h3 className='need-text oswald'>I NEED A PASSWORD</h3>
            <button className='need-button' />
            <h3 className='have-text oswald'>I HAVE A PASSWORD</h3>
                <button className='have-button' />
                </div>
        </div>
    )
}