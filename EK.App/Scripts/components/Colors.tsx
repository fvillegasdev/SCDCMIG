/// <reference path="../typings/react/react-global.d.ts" />

namespace EK.UX {
    "use strict";

    export interface IColorEnum {
        white: string;
        default: string;
        dark: string;
        blue: string;
        blueMadison: string;
        blueChambray: string;
        blueHoki: string;
        blueOleo: string;
        blueSharp: string;
        blueSteel: string;
        green: string;
        greenJungle: string;
        greenMeadow: string;
        greenSharp: string;
        greenTurquoise: string;
        greyCararra: string;
        greySalt: string;
        greySteel: string;
        redSunglo: string;
        yellowCasablanca: string;
        yellowHaze: string;
        yellowSoft: string;
    };

    export var ColorEnum: IColorEnum = {
        white : "white",
        default : "default",
        dark : "dark",
        blue : "blue",
        blueMadison: "blue-madison",
        blueChambray: "blue-chambray",
        blueHoki: "blue-hoki",
        blueOleo: "blue-oleo",
        blueSharp: "blue-sharp",
        blueSteel: "blue-steel",
        green: "green",
        greenJungle: "green-jungle",
        greenMeadow: "green-meadow",
        greenSharp: "green-sharp",
        greenTurquoise: "green-turquoise", 
        greyCararra: "grey-cararra",
        greySalt: "grey-salt",
        greySteel: "grey-steel",
        redSunglo: "red-sunglo",
        yellowCasablanca: "yellow-casablanca",
        yellowHaze: "yellow-haze",
        yellowSoft: "yellow-soft"
    };
}

import ColorEnum = EK.UX.ColorEnum;