import React, { useState } from 'react';
import { Reader } from '../Reader';
import Image from 'next/image'
import { CodeSnippet } from '../CodeSnippet';

export function IfStatementIntro() {

    const p1Code = <p>
                        if it_is_raining:<br/>
                        {"\t"}print(<span style={code_string_style}>{'"Stop construction"'}</span>)<br/>
                        else:<br/>
                        {"\t"}print(<span style={code_string_style}>{'"Continue construction"'}</span>)
                    </p>

    return (
        <div className='flex flex-col w-full text-center items-center'>
            <span className="font-semibold text-lg text-center"><Reader text='Example of if-statement'/></span>
            <Image className='mb-2' width={400} height={400} src={"/IfStatementsBook/cloudy.jpg"} alt='Image of construction'/>
            <CodeSnippet code={p1Code}/>
        </div>
    );
}

const code_string_style = {
    color: "#b87554"
}