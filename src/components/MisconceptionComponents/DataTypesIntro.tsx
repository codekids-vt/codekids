"use client"
import React from 'react';
import { Reader } from '../Reader';
import Image from 'next/image'
import { CodeSnippet } from '../CodeSnippet';
import { Type, TypeStyle } from '../TypeStyle';

export function DataTypesIntro() {

    const stringCode = <p>
                            greeting = <TypeStyle text='"Hello"' style={Type.STRING}/><br/>
                            days_of_week = <TypeStyle text='"7"' style={Type.STRING}/><br/>
                            therapy_dog = <TypeStyle text="'Epcot'" style={Type.STRING}/>
                        </p>

    return(
        <div className='flex flex-col w-full text-center items-center font-semibold text-lg text-center'>
            <span className="font-semibold text-lg text-center"><Reader text="The Variable name jersey_number is of type Integer"/></span>
            <div className='flex flex-col-2 m-5 items-center gap-36'>
                <CodeSnippet code={<p>jersey_number = <TypeStyle text='25' style={Type.INTEGER}/></p>}/>
                <Image width={150} height={150} src='/jersey-25.png' alt="Football jersey with number 25"/>
            </div>
                <Reader text='The variables greeting, days_of_week, and therapy_dog are Strings.'/>
                <Reader text={"You can tell they are strings because they are surrounded by double or single quotation marks."}/>
            <div className='flex flex-col-2 m-5 items-center gap-36'>
                <Image width={200} height={200} src='/dog_in_box.png' alt="Box in representing variable with name therapy_dog"/>
                <CodeSnippet code={stringCode}/>
            </div>
            <span><Reader text="The variable sky_is_blue is a Boolean"/></span>
            <div className='flex flex-col-2 m-5 items-center gap-36'>
                <CodeSnippet code={<p>sky_is_blue = <TypeStyle text="True" style={Type.BOOLEAN}/></p>}/>
                <Image width={200} height={200} src='/VariablesBook/sky-boolean.png' alt="Image of sky show it is True that the sky is blue"/>
            </div>
        </div>
    );

}