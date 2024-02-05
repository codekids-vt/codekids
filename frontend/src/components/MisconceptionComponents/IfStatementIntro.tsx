import React from 'react';
import { Reader } from '../Reader';
import { CodeSnippet } from '../CodeSnippet';
import { Type, TypeStyle } from '../TypeStyle';

export function IfStatementIntro() {

    const p1Code = <p>
                        if it_is_raining:<br/>
                        {"\t"}print(<TypeStyle text='"Stop Construction"' style={Type.STRING}/>)<br/>
                        else:<br/>
                        {"\t"}print(<TypeStyle text='"Continue Construction"' style={Type.STRING}/>)
                    </p>

    return (
        <div className='flex flex-col w-full items-center font-semibold text-lg text-center gap-3'>
            <Reader text='Example of if-statement'/>
            <img width={400} height={400} src={"/IfStatementsBook/cloudy.jpg"} alt='Image of construction' />
            <CodeSnippet code={p1Code}/>
        </div>
    );
}