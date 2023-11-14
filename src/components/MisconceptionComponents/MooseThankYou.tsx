import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import { PythonTutor } from '../PythonTutor';

const code = '# Fill in your name as a String\nyour_name = ""\n\n# Fill in your age as an Integer\nyour_age = 0\n\n# Type a thank you message!\nyour_message = ""\n\n' +
            '# Don\'t worry about the complicated line, it\'s just creating your message.\n' +
            '# If you can figure what it\'s doing, congratulations! If not, no problem!\n' +
            'thank_you_message = ("Hello, my name is " +  your_name + " and I am " + str(your_age) + " years old.\\n" + your_message + "\\nSincerely,\\n" + your_name)\n\n' +
            'print(thank_you_message)'

export function MooseThankYou() {
    const windowScale = GetWindowScale()

    return (
        <div style={{textAlign: "center", width: "100%", height:"50vh", zoom: windowScale}}>
            <div style={text_style}><Reader text='Fill out the code template to write you thank you message!'/></div>
            <img style={image_style} src='/LifeOfMoose/moose_with_hokie_bird.png' alt='Image of Moose graduating'></img>
            <PythonTutor props={{code: code}}/>
        </div>
    );
}

const text_style = {
    fontWeight: "600",
    fontSize: "1.5rem",
    lineHeight: "2rem",
    textAlign: "center" as "center"
}

const image_style = {
    marginLeft: "auto", 
    marginRight: "auto",
    display: "block"
}