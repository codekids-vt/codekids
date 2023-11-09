"use client"
import React from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';

export function DataTypesIntro() {

    const windowScale = GetWindowScale()

    return(
        <div style={{textAlign: "center", width: "100%", zoom: windowScale}}>
            <span style={text_style}><Reader text="The Variable name jersery_number is of type Integer"/></span>
            
            <div style={horizontal_div_style}>
                <p style={code_style}>jersery_number = <span style={code_integer_style}>25</span></p>
                <img src="/jersey-25.png" alt="Football jersey with number 25" />
            </div>

            <span style={text_style}>
                <Reader text='The variables greeting, days_of_week, and therapy_dog are Strings.'/>
                <Reader text={"You can tell they are strings because they are surrounded by double or single quotation marks."}/>
            </span>
            
            <div style={horizontal_div_style}>
                <img src="/dog_in_box.png" alt="Box in representing variable with name therapy_dog" />
                <p style={code_style}>
                    greeting = <span style={code_string_style}>"Hello"</span><br/>
                    days_of_week = <span style={code_string_style}>"7"</span><br/>
                    therapy_dog = <span style={code_string_style}>'Epcot'</span>
                </p>
            </div>

            <span style={text_style}><Reader text="The variable sky_is_blue is a Boolean"/></span>
            
            <div style={horizontal_div_style}>
                <p style={code_style}>sky_is_blue = <span style={code_boolean_style}>True</span></p>
                <img src="/VariablesBook/sky-boolean.png" alt="Image of sky show it is True that the sky is blue" />
            </div>
        </div>
    );

}

const horizontal_div_style = {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "20%",
    margin: "5%"
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}

const code_style = {
    fontWeight: "400",
    fontSize: "1.5rem"
}

const code_string_style = {
    color: "#b87554"
}

const code_boolean_style = {
    color: "#669955"
}

const code_integer_style = {
    color: "#ff6371"
}