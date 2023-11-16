import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import Image from 'next/image'

export function IfStatementIntro() {

    const windowScale = GetWindowScale()

    return (
        <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
            <span style={text_style}><Reader text='Example of if-statement'/></span>
            <Image style={image_style} width={800} height={800} src={"/IfStatementsBook/cloudy.jpg"} alt='Image of construction'/>
            <div style={{...code_box_style, width: "60%"}}>
                <p style={code_style}>
                    if it_is_raining:<br/>
                    {"\t"}print(<span style={code_string_style}>{'"Stop construction"'}</span>)<br/>
                    else:<br/>
                    {"\t"}print(<span style={code_string_style}>{'"Continue construction"'}</span>)
                </p>
            </div>
        </div>
    );
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}

const code_string_style = {
    color: "#b87554"
}

const code_style = {
    fontWeight: "400",
    fontSize: "1rem",
    width: "fit-content",
    whiteSpace: "pre-wrap" as "pre-wrap"
}

const image_style = {
    marginLeft: "auto", 
    marginRight: "auto",
    display: "block"
}

const code_box_style = {
    textAlign: "left" as "left", 
    backgroundColor: "#E8E8E8",
    width: "fit-content",
    margin: "3% auto",
    padding: "3%"
}