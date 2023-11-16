import React, { useState } from 'react';
import { Reader } from '../Reader';
import { GetWindowScale } from './GetWindowScale';
import { PythonTutor } from '../PythonTutor';
import Image from 'next/image'

const code = '# Fill in your name as a String\nyour_name = ""\n\n# Fill in your age as an Integer\nyour_age = 0\n\n# Type a thank you message!\nyour_message = ""\n\n' +
            '# Don\'t worry about the complicated line, it\'s just creating your message.\n' +
            '# If you can figure what it\'s doing, congratulations! If not, no problem!\n' +
            'thank_you_message = ("Hello, my name is " +  your_name + " and I am " + str(your_age) + " years old.\\n" + your_message + "\\nSincerely,\\n" + your_name)\n\n' +
            'print(thank_you_message)'

export function MooseThankYou() {
    const windowScale = GetWindowScale()

    return (
        <div style={whole_container_style}>
            <div style={text_style}><Reader text='Fill out the code template to write you thank you message!'/></div>
            <Image style={image_style} width={500} height={500} src={"/LifeOfMoose/moose_with_hokie_bird.jpg"} alt='Image of Moose with Hokie Bird'/>
            <PythonTutor props={{code: code}}/>
        </div>
    );
}

const whole_container_style = {
    display: "flex",
    flexDirection: "column" as "column",
    textAlign: "center" as "center",
    width: "100%",
    height: "100%",
    justifyContent: "space-around"
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