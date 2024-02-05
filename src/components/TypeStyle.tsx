import React from "react";

export enum Type {
    INTEGER,
    STRING,
    BOOLEAN
}

export function TypeStyle({text, style} : {text: string, style : Type}) {


    var styleTailwind = ""

    if(style === Type.INTEGER) {
        styleTailwind = "text-red-600"
    } else if (style === Type.STRING) {
        styleTailwind = "text-amber-600"
    } else if (style === Type.BOOLEAN) {
        styleTailwind = "text-lime-600"
    }

    return(
        <span className={styleTailwind}>{text}</span>
    );
}