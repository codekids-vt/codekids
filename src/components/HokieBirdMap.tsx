"use client"
import React, { useState} from "react";



export function HokieBirdMap({ props }: { props: any}) {
        return (
            <div>{props.title}
            <img width={175} height={500} src={props.LostHokieBird}></img>
            </div>
        )
        
    }