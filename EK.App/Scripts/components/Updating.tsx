namespace EK.UX {
    "use strict";

    interface IUpdatingProps extends React.Props<any> {
        text?: string;
        size?: number;
        top?: number;
        bottom?: number;
    };

    class UpdatingStyle extends React.Component<{}, {}> {
        shouldComponentUpdate(nextProps: any, nextState: any): boolean {
            return false;
        }

        render(): JSX.Element {
            return <style>{"\
                #cssload-pgloading {}\
                #cssload-pgloading:after {\
                    content: \"\";\
		            z-index: -1;\
		            position: absolute;\
		            top: 0; right: 0; bottom: 0; left: 0;\
                }\
                #cssload-pgloading {\
                    margin-top: 100px;\
                    margin-bottom: 100px;\
                }\
                #cssload-pgloading .cssload-bokeh {\
                    font-size: 97px;\
		            width: 1em;\
		            height: 1em;\
		            position: relative;\
		            margin: 0 auto;\
		            list-style: none;\
		            padding:0;\
		            border-radius: 50%;\
		            -o-border-radius: 50%;\
		            -ms-border-radius: 50%;\
		            -webkit-border-radius: 50%;\
		            -moz-border-radius: 50%;\
                }\
                #cssload-pgloading .cssload-bokeh li {\
                    position: absolute;\
		            width: .2em;\
		            height: .2em;\
		            border-radius: 50% !important;\
		            -o-border-radius: 50% !important;\
		            -ms-border-radius: 50% !important;\
		            -webkit-border-radius: 50% !important;\
		            -moz-border-radius: 50% !important;\
                }\
                #cssload-pgloading .cssload-bokeh li:nth-child(1) {\
                    left: 50%;\
		            top: 0;\
		            margin: 0 0 0 -.1em;\
		            background: rgb(0,193,118);\
		            transform-origin: 50% 250%;\
		            -o-transform-origin: 50% 250%;\
		            -ms-transform-origin: 50% 250%;\
		            -webkit-transform-origin: 50% 250%;\
		            -moz-transform-origin: 50% 250%;\
		            animation:\
				            cssload-rota 1.3s linear infinite,\
				            cssload-opa 4.22s ease-in-out infinite alternate;\
		            -o-animation:\
				            cssload-rota 1.3s linear infinite,\
				            cssload-opa 4.22s ease-in-out infinite alternate;\
		            -ms-animation:\
				            cssload-rota 1.3s linear infinite,\
				            cssload-opa 4.22s ease-in-out infinite alternate;\
		            -webkit-animation:\
				            cssload-rota 1.3s linear infinite,\
				            cssload-opa 4.22s ease-in-out infinite alternate;\
		            -moz-animation:\
				            cssload-rota 1.3s linear infinite,\
				            cssload-opa 4.22s ease-in-out infinite alternate;\
                }\
                #cssload-pgloading .cssload-bokeh li:nth-child(2) {\
                    top: 50%;\
		            right: 0;\
		            margin: -.1em 0 0 0;\
		            background: rgb(255,0,60);\
		            transform-origin: -150% 50%;\
		            -o-transform-origin: -150% 50%;\
		            -ms-transform-origin: -150% 50%;\
		            -webkit-transform-origin: -150% 50%;\
		            -moz-transform-origin: -150% 50%;\
		            animation:\
				            cssload-rota 2.14s linear infinite,\
				            cssload-opa 4.93s ease-in-out infinite alternate;\
		            -o-animation:\
				            cssload-rota 2.14s linear infinite,\
				            cssload-opa 4.93s ease-in-out infinite alternate;\
		            -ms-animation:\
				            cssload-rota 2.14s linear infinite,\
				            cssload-opa 4.93s ease-in-out infinite alternate;\
		            -webkit-animation:\
				            cssload-rota 2.14s linear infinite,\
				            cssload-opa 4.93s ease-in-out infinite alternate;\
		            -moz-animation:\
				            cssload-rota 2.14s linear infinite,\
				            cssload-opa 4.93s ease-in-out infinite alternate;\
                }\
                #cssload-pgloading .cssload-bokeh li:nth-child(3) {\
                    left: 50%;\
		            bottom: 0;\
		            margin: 0 0 0 -.1em;\
		            background: rgb(250,190,40);\
		            transform-origin: 50% -150%;\
		            -o-transform-origin: 50% -150%;\
		            -ms-transform-origin: 50% -150%;\
		            -webkit-transform-origin: 50% -150%;\
		            -moz-transform-origin: 50% -150%;\
		            animation:\
				            cssload-rota 1.67s linear infinite,\
				            cssload-opa 5.89s ease-in-out infinite alternate;\
		            -o-animation:\
				            cssload-rota 1.67s linear infinite,\
				            cssload-opa 5.89s ease-in-out infinite alternate;\
		            -ms-animation:\
				            cssload-rota 1.67s linear infinite,\
				            cssload-opa 5.89s ease-in-out infinite alternate;\
		            -webkit-animation:\
				            cssload-rota 1.67s linear infinite,\
				            cssload-opa 5.89s ease-in-out infinite alternate;\
		            -moz-animation:\
				            cssload-rota 1.67s linear infinite,\
				            cssload-opa 5.89s ease-in-out infinite alternate;\
                }\
                #cssload-pgloading .cssload-bokeh li:nth-child(4) {\
                    top: 50%;\
		            left: 0;\
		            margin: -.1em 0 0 0;\
		            background: rgb(136,193,0);\
		            transform-origin: 250% 50%;\
		            -o-transform-origin: 250% 50%;\
		            -ms-transform-origin: 250% 50%;\
		            -webkit-transform-origin: 250% 50%;\
		            -moz-transform-origin: 250% 50%;\
		            animation:\
				            cssload-rota 1.98s linear infinite,\
				            cssload-opa 6.04s ease-in-out infinite alternate;\
		            -o-animation:\
				            cssload-rota 1.98s linear infinite,\
				            cssload-opa 6.04s ease-in-out infinite alternate;\
		            -ms-animation:\
				            cssload-rota 1.98s linear infinite,\
				            cssload-opa 6.04s ease-in-out infinite alternate;\
		            -webkit-animation:\
				            cssload-rota 1.98s linear infinite,\
				            cssload-opa 6.04s ease-in-out infinite alternate;\
		            -moz-animation:\
				            cssload-rota 1.98s linear infinite,\
				            cssload-opa 6.04s ease-in-out infinite alternate;\
                }\
                @keyframes cssload-rota {\
                                    from { }\
		                to {transform: rotate(360deg); }\
                }\
                @-o-keyframes cssload-rota {\
                                    from { }\
		                to {-o-transform: rotate(360deg); }\
                }\
                @-ms-keyframes cssload-rota {\
                                    from { }\
		                to {-ms-transform: rotate(360deg); }\
                }\
                @-webkit-keyframes cssload-rota {\
                                    from { }\
		                to {-webkit-transform: rotate(360deg); }\
                }\
                @-moz-keyframes cssload-rota {\
                                    from { }\
		                to {-moz-transform: rotate(360deg); }\
                }\
                @keyframes cssload-opa {\
                        0 % {}\
		                12.0% {opacity: 0.80; }\
		                19.5% {opacity: 0.88; }\
		                37.2% {opacity: 0.64; }\
		                40.5% {opacity: 0.52; }\
		                52.7% {opacity: 0.69; }\
		                60.2% {opacity: 0.60; }\
		                66.6% {opacity: 0.52; }\
		                70.0% {opacity: 0.63; }\
		                79.9% {opacity: 0.60; }\
		                84.2% {opacity: 0.75; }\
		                91.0% {opacity: 0.87; }\
                }\
                @-o-keyframes cssload-opa {\
                        0 % {}\
		                12.0% {opacity: 0.80; }\
		                19.5% {opacity: 0.88; }\
		                37.2% {opacity: 0.64; }\
		                40.5% {opacity: 0.52; }\
		                52.7% {opacity: 0.69; }\
		                60.2% {opacity: 0.60; }\
		                66.6% {opacity: 0.52; }\
		                70.0% {opacity: 0.63; }\
		                79.9% {opacity: 0.60; }\
		                84.2% {opacity: 0.75; }\
		                91.0% {opacity: 0.87; }\
                }\
                @-ms-keyframes cssload-opa {\
                        0 % {}\
		                12.0% {opacity: 0.80; }\
		                19.5% {opacity: 0.88; }\
		                37.2% {opacity: 0.64; }\
		                40.5% {opacity: 0.52; }\
		                52.7% {opacity: 0.69; }\
		                60.2% {opacity: 0.60; }\
		                66.6% {opacity: 0.52; }\
		                70.0% {opacity: 0.63; }\
		                79.9% {opacity: 0.60; }\
		                84.2% {opacity: 0.75; }\
		                91.0% {opacity: 0.87; }\
                }\
                @-webkit-keyframes cssload-opa {\
                        0 % {}\
		                12.0% {opacity: 0.80; }\
		                19.5% {opacity: 0.88; }\
		                37.2% {opacity: 0.64; }\
		                40.5% {opacity: 0.52; }\
		                52.7% {opacity: 0.69; }\
		                60.2% {opacity: 0.60; }\
		                66.6% {opacity: 0.52; }\
		                70.0% {opacity: 0.63; }\
		                79.9% {opacity: 0.60; }\
		                84.2% {opacity: 0.75; }\
		                91.0% {opacity: 0.87; }\
                }\
                @-moz-keyframes cssload-opa {\
                        0 % {}\
		                12.0% {opacity: 0.80; }\
		                19.5% {opacity: 0.88; }\
		                37.2% {opacity: 0.64; }\
		                40.5% {opacity: 0.52; }\
		                52.7% {opacity: 0.69; }\
		                60.2% {opacity: 0.60; }\
		                66.6% {opacity: 0.52; }\
		                70.0% {opacity: 0.63; }\
		                79.9% {opacity: 0.60; }\
		                84.2% {opacity: 0.75; }\
		                91.0% {opacity: 0.87; }\
                }\
            "}
            </style>;
        }
    }
    class UpdatingStyleB extends React.Component<{}, {}> {
        shouldComponentUpdate(nextProps: any, nextState: any): boolean {
            return false;
        }

        render(): JSX.Element {
            return <style>{"\
                #circularG{\
	                position:relative;\
	                width:105px;\
	                height:105px;\
	                margin: 100px auto 100px auto;\
                }\
                .circularG{\
	                position:absolute;\
	                background-color:rgb(81,199,226);\
	                width:25px;\
	                height:25px;\
	                border-radius:16px !important;\
		                -o-border-radius:16px !important;\
		                -ms-border-radius:16px !important;\
		                -webkit-border-radius:16px !important;\
		                -moz-border-radius:16px !important;\
	                animation-name:bounce_circularG;\
		                -o-animation-name:bounce_circularG;\
		                -ms-animation-name:bounce_circularG;\
		                -webkit-animation-name:bounce_circularG;\
		                -moz-animation-name:bounce_circularG;\
	                animation-duration:1.1s;\
		                -o-animation-duration:1.1s;\
		                -ms-animation-duration:1.1s;\
		                -webkit-animation-duration:1.1s;\
		                -moz-animation-duration:1.1s;\
	                animation-iteration-count:infinite;\
		                -o-animation-iteration-count:infinite;\
		                -ms-animation-iteration-count:infinite;\
		                -webkit-animation-iteration-count:infinite;\
		                -moz-animation-iteration-count:infinite;\
	                animation-direction:normal;\
		                -o-animation-direction:normal;\
		                -ms-animation-direction:normal;\
		                -webkit-animation-direction:normal;\
		                -moz-animation-direction:normal;\
                }\
                #circularG_1{\
	                left:0;\
	                top:42px;\
	                animation-delay:0.0s;\
		                -o-animation-delay:0.0s;\
		                -ms-animation-delay:0.0s;\
		                -webkit-animation-delay:0.0s;\
		                -moz-animation-delay:0.0s;\
                }\
                #circularG_2{\
	                left:11px;\
	                top:11px;\
	                animation-delay:0.14s;\
		                -o-animation-delay:0.14s;\
		                -ms-animation-delay:0.14s;\
		                -webkit-animation-delay:0.14s;\
		                -moz-animation-delay:0.14s;\
                }\
                #circularG_3{\
	                top:0;\
	                left:42px;\
	                animation-delay:0.28s;\
		                -o-animation-delay:0.28s;\
		                -ms-animation-delay:0.28s;\
		                -webkit-animation-delay:0.28s;\
		                -moz-animation-delay:0.28s;\
                }\
                #circularG_4{\
	                right:11px;\
	                top:11px;\
	                animation-delay:0.42s;\
		                -o-animation-delay:0.42s;\
		                -ms-animation-delay:0.42s;\
		                -webkit-animation-delay:0.42s;\
		                -moz-animation-delay:0.42s;\
                }\
                #circularG_5{\
	                right:0;\
	                top:42px;\
	                animation-delay:0.56s;\
		                -o-animation-delay:0.56s;\
		                -ms-animation-delay:0.56s;\
		                -webkit-animation-delay:0.56s;\
		                -moz-animation-delay:0.56s;\
                }\
                #circularG_6{\
	                right:11px;\
	                bottom:11px;\
	                animation-delay:0.70s;\
		                -o-animation-delay:0.70s;\
		                -ms-animation-delay:0.70s;\
		                -webkit-animation-delay:0.70s;\
		                -moz-animation-delay:0.70s;\
                }\
                #circularG_7{\
	                left:42px;\
	                bottom:0;\
	                animation-delay:0.84s;\
		                -o-animation-delay:0.84s;\
		                -ms-animation-delay:0.84s;\
		                -webkit-animation-delay:0.84s;\
		                -moz-animation-delay:0.84s;\
                }\
                #circularG_8{\
	                left:11px;\
	                bottom:11px;\
	                animation-delay:0.98s;\
		                -o-animation-delay:0.98s;\
		                -ms-animation-delay:0.98s;\
		                -webkit-animation-delay:0.98s;\
		                -moz-animation-delay:0.98s;\
                }\
                @keyframes bounce_circularG{\
	                0%{\
		                transform:scale(1);\
	                }\
	                100%{\
		                transform:scale(.3);\
	                }\
                }\
                @-o-keyframes bounce_circularG{\
	                0%{\
		                -o-transform:scale(1);\
	                }\
	                100%{\
		                -o-transform:scale(.3);\
	                }\
                }\
                @-ms-keyframes bounce_circularG{\
	                0%{\
		                -ms-transform:scale(1);\
	                }\
	                100%{\
		                -ms-transform:scale(.3);\
	                }\
                }\
                @-webkit-keyframes bounce_circularG{\
	                0%{\
		                -webkit-transform:scale(1);\
	                }\
	                100%{\
		                -webkit-transform:scale(.3);\
	                }\
                }\
                @-moz-keyframes bounce_circularG{\
	                0%{\
		                -moz-transform:scale(1);\
	                }\
	                100%{\
		                -moz-transform:scale(.3);\
	                }\
                }\
            "}
            </style>;
        }
    }
    class UpdatingStyleC extends React.Component<{}, {}> {
        shouldComponentUpdate(nextProps: any, nextState: any): boolean {
            return false;
        }

        render(): JSX.Element {
            return <style>{"\
                .spinner div {\
                  width: 15px;\
                  height: 15px;\
                  position: absolute;\
                  left: -20px;\
                  top: 20px;\
                  background-color: rgb(127,230,250);\
                  border-radius: 50% !important;\
                  animation: move 4s infinite cubic-bezier(.2,.64,.81,.23);\
                }\
                .spinner div:nth-child(2) {\
                  animation-delay: 150ms;\
                }\
                .spinner div:nth-child(3) {\
                  animation-delay: 300ms;\
                }\
                .spinner div:nth-child(4) {\
                  animation-delay: 450ms;\
                }\
                @keyframes move {\
                  0% {left: 0%;}\
                  75% {left:100%;}\
                  100% {left:100%;}\
                }\
            "}
            </style>;
        }
    }
    class UpdatingHorizontalStyle extends React.Component<{}, {}> {
        shouldComponentUpdate(nextProps: any, nextState: any): boolean {
            return false;
        }

        render(): JSX.Element {
            return <style>{"\
                .cssload-jumping{\
	                position:relative;\
	                display:block;\
	                margin: 0px auto;\
                }\
                .cssload-jumping, .cssload-jumping * {\
	                box-sizing: border-box;\
                }\
                .cssload-jumping span {\
	                display: inline-block;\
	                height: 13px;\
	                width: 13px;\
	                background: rgb(81,199,226);\
	                border-radius: 437px !important;\
	                background-clip: padding-box;\
		                -o-background-clip: padding-box;\
		                -ms-background-clip: padding-box;\
		                -webkit-background-clip: padding-box;\
		                -moz-background-clip: padding-box;\
                }\
                .cssload-jumping span:nth-child(1) {\
	                animation: scale 1.6s 0.16s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -o-animation: scale 1.6s 0.16s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -ms-animation: scale 1.6s 0.16s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -webkit-animation: scale 1.6s 0.16s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -moz-animation: scale 1.6s 0.16s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
                }\
                .cssload-jumping span:nth-child(2) {\
	                animation: scale 1.6s 0.32s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -o-animation: scale 1.6s 0.32s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -ms-animation: scale 1.6s 0.32s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -webkit-animation: scale 1.6s 0.32s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -moz-animation: scale 1.6s 0.32s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
                }\
                .cssload-jumping span:nth-child(3) {\
	                animation: scale 1.6s 0.48s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -o-animation: scale 1.6s 0.48s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -ms-animation: scale 1.6s 0.48s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -webkit-animation: scale 1.6s 0.48s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -moz-animation: scale 1.6s 0.48s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
                }\
                .cssload-jumping span:nth-child(4) {\
	                animation: scale 1.6s 0.64s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -o-animation: scale 1.6s 0.64s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -ms-animation: scale 1.6s 0.64s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -webkit-animation: scale 1.6s 0.64s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -moz-animation: scale 1.6s 0.64s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
                }\
                .cssload-jumping span:nth-child(5) {\
	                animation: scale 1.6s 0.8s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -o-animation: scale 1.6s 0.8s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -ms-animation: scale 1.6s 0.8s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -webkit-animation: scale 1.6s 0.8s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
		                -moz-animation: scale 1.6s 0.8s infinite cubic-bezier(0.6, -0.28, 0.735, 0.045);\
                }\
                @keyframes scale {\
	                0% {\
		                transform: scale(0);\
	                }\
	                25% {\
		                transform: scale(0.9, 0.9);\
		                background: rgb(127,230,250);\
	                }\
	                50% {\
		                transform: scale(1, 1);\
		                margin: 0 2px;\
		                background: rgb(81,199,226);\
	                }\
	                100% {\
		                transform: scale(0);\
	                }\
                }\
                @-o-keyframes scale {\
	                0% {\
		                -o-transform: scale(0);\
	                }\
	                25% {\
		                -o-transform: scale(0.9, 0.9);\
		                background: rgb(127,230,250);\
	                }\
	                50% {\
		                -o-transform: scale(1, 1);\
		                margin: 0 2px;\
		                background: rgb(81,199,226);\
	                }\
	                100% {\
		                -o-transform: scale(0);\
	                }\
                }\
                @-ms-keyframes scale {\
	                0% {\
		                -ms-transform: scale(0);\
	                }\
	                25% {\
		                -ms-transform: scale(0.9, 0.9);\
		                background: rgb(127,230,250);\
	                }\
	                50% {\
		                -ms-transform: scale(1, 1);\
		                margin: 0 2px;\
		                background: rgb(81,199,226);\
	                }\
	                100% {\
		                -ms-transform: scale(0);\
	                }\
                }\
                @-webkit-keyframes scale {\
	                0% {\
		                -webkit-transform: scale(0);\
	                }\
	                25% {\
		                -webkit-transform: scale(0.9, 0.9);\
		                background: rgb(127,230,250);\
	                }\
	                50% {\
		                -webkit-transform: scale(1, 1);\
		                margin: 0 2px;\
		                background: rgb(81,199,226);\
	                }\
	                100% {\
		                -webkit-transform: scale(0);\
	                }\
                }\
                @-moz-keyframes scale {\
	                0% {\
		                -moz-transform: scale(0);\
	                }\
	                25% {\
		                -moz-transform: scale(0.9, 0.9);\
		                background: rgb(127,230,250);\
	                }\
	                50% {\
		                -moz-transform: scale(1, 1);\
		                margin: 0 2px;\
		                background: rgb(81,199,226);\
	                }\
	                100% {\
		                -moz-transform: scale(0);\
	                }\
                }\
            "}
            </style>;
        }
    }
    class UpdatingHorizontalStyleB extends React.Component<{}, {}> {
        shouldComponentUpdate(nextProps: any, nextState: any): boolean {
            return false;
        }

        render(): JSX.Element {
            return <style>{"\
                .cssload-container{\
		                background:rgb(255,255,255);\
	                }\
	                .cssload-container div {\
	                width: 15px;\
	                height: 15px;\
	                position: absolute;\
	                background-color: rgb(204,204,204);\
	                top: 45%;\
	                border-radius: 50% !important;\
                }\
                .cssload-container div:nth-child(1) {\
	                background-color: rgb(255,84,96);\
	                animation: cssload-move 2.9s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -o-animation: cssload-move 2.9s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -ms-animation: cssload-move 2.9s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -webkit-animation: cssload-move 2.9s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -moz-animation: cssload-move 2.9s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
                }\
                .cssload-container div:nth-child(2) {\
	                background-color: rgb(255,157,132);\
	                animation: cssload-move 2.9s 217.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -o-animation: cssload-move 2.9s 217.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -ms-animation: cssload-move 2.9s 217.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -webkit-animation: cssload-move 2.9s 217.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -moz-animation: cssload-move 2.9s 217.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
                }\
                .cssload-container div:nth-child(3) {\
	                background-color: rgb(240,231,151);\
	                animation: cssload-move 2.9s 435ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -o-animation: cssload-move 2.9s 435ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -ms-animation: cssload-move 2.9s 435ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -webkit-animation: cssload-move 2.9s 435ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -moz-animation: cssload-move 2.9s 435ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
                }\
                .cssload-container div:nth-child(4) {\
	                background-color: rgb(117,176,138);\
	                animation: cssload-move 2.9s 652.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -o-animation: cssload-move 2.9s 652.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -ms-animation: cssload-move 2.9s 652.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -webkit-animation: cssload-move 2.9s 652.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
		                -moz-animation: cssload-move 2.9s 652.5ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);\
                }\
                @keyframes cssload-move {\
	                0% {\
		                left: 0%;\
	                }\
	                100% {\
		                left: 100%;\
	                }\
                }\
                @-o-keyframes cssload-move {\
	                0% {\
		                left: 0%;\
	                }\
	                100% {\
		                left: 100%;\
	                }\
                }\
                @-ms-keyframes cssload-move {\
	                0% {\
		                left: 0%;\
	                }\
	                100% {\
		                left: 100%;\
	                }\
                }\
                @-webkit-keyframes cssload-move {\
	                0% {\
		                left: 0%;\
	                }\
	                100% {\
		                left: 100%;\
	                }\
                }\
                @-moz-keyframes cssload-move {\
	                0% {\
		                left: 0%;\
	                }\
	                100% {\
		                left: 100%;\
	                }\
                }\
            "}
            </style>;
        }
    }

    export class UpdatingA extends React.Component<IUpdatingProps, IUpdatingProps> {
        constructor(props: IUpdatingProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IUpdatingProps, nextState: IUpdatingProps): boolean {
            return false;
        }

        render(): JSX.Element {
            return <grid.Column
                lg={12}
                md={12}
                sm={12}
                xs={12}>
                <UpdatingStyle />
                <div id="cssload-pgloading">
                    <div className="cssload-loadingwrap">
                        <ul className="cssload-bokeh">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </grid.Column>;
        }
    }
    export class UpdatingB extends React.Component<IUpdatingProps, IUpdatingProps> {
        constructor(props: IUpdatingProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IUpdatingProps, nextState: IUpdatingProps): boolean {
            return false;
        }

        render(): JSX.Element {
            return <grid.Column
                lg={12}
                md={12}
                sm={12}
                xs={12}>
                <UpdatingStyleB />
                <div id="circularG">
                    <div id="circularG_1" className="circularG"></div>
                    <div id="circularG_2" className="circularG"></div>
                    <div id="circularG_3" className="circularG"></div>
                    <div id="circularG_4" className="circularG"></div>
                    <div id="circularG_5" className="circularG"></div>
                    <div id="circularG_6" className="circularG"></div>
                    <div id="circularG_7" className="circularG"></div>
                    <div id="circularG_8" className="circularG"></div>
                </div>
            </grid.Column>;
        }
    }
    export class UpdatingC extends React.Component<IUpdatingProps, IUpdatingProps> {
        constructor(props: IUpdatingProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IUpdatingProps, nextState: IUpdatingProps): boolean {
            return false;
        }

        render(): JSX.Element {
            let fontSize: number = 64;
            let top: number = 80;
            let bottom: number = 50;

            if (this.props.size >= 0) {
                fontSize = this.props.size;
            };

            if (this.props.top >= 0) {
                top = this.props.top;
            };

            if (this.props.bottom >= 0) {
                bottom = this.props.bottom;
            };

            return <div className="text-center" style={{ paddingTop: top, paddingBottom: bottom }}>
                <i className="fad fa-circle-notch fa-spin fa-3x fa-fw font-blue-sharp" aria-hidden="true" style={{ fontSize }}></i>
                <h3>{this.props.text}</h3>
            </div>;
        };
    };
    export class UpdatingD extends React.Component<IUpdatingProps, IUpdatingProps> {
        constructor(props: IUpdatingProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IUpdatingProps, nextState: IUpdatingProps): boolean {
            return false;
        }

        render(): JSX.Element {
            let fontSize: number = 64;
            let top: number = 80;
            let bottom: number = 50;

            if (this.props.size >= 0) {
                fontSize = this.props.size;
            };

            if (this.props.top >= 0) {
                top = this.props.top;
            };

            if (this.props.bottom >= 0) {
                bottom = this.props.bottom;
            };

            return <div className="loaders-d"><div className="loader-d">
                <div className="loader-dc">{this.props.text}</div>
                <div className="ball-beat">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            </div>;
        };
    };
    export class UpdatingHorizontal extends React.Component<IUpdatingProps, IUpdatingProps> {
        constructor(props: IUpdatingProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IUpdatingProps, nextState: IUpdatingProps): boolean {
            return false;
        }

        render(): JSX.Element {
            return <Column className="text-center" lg={12} md={12} sm={12} xs={12}>
                <UpdatingHorizontalStyle />
                <div className="cssload-jumping">
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
            </Column>;
        }
    }
    export class UpdatingHorizontalB extends React.Component<IUpdatingProps, IUpdatingProps> {
        constructor(props: IUpdatingProps) {
            super(props);
        }

        shouldComponentUpdate(nextProps: IUpdatingProps, nextState: IUpdatingProps): boolean {
            return false;
        }

        render(): JSX.Element {
            return <grid.Column
                lg={12}
                md={12}
                sm={12}
                xs={12}>
                <UpdatingHorizontalStyleB />
                <div className="cssload-container">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </grid.Column>;
        }
    }

    export interface LeftPanelUpdateProps extends React.Props<any> {
        text?: string;
        info?: DataElement;
        displayContent?: boolean;
    };

    export class PanelUpdate extends React.Component<LeftPanelUpdateProps, LeftPanelUpdateProps>{
        static defaultProps: LeftPanelUpdateProps = {
            text: ""
        };

        render(): any {
            //return <FullPageColumn><Updating text="configurando la vista..." /></FullPageColumn>;
            if (this.props.displayContent === true) {
                return <FullPageColumn>{this.props.children}</FullPageColumn>;
            } else if (this.props.info) {
                if (this.props.info.status === AsyncActionTypeEnum.default) {
                    return <FullPageColumn><Updating text="" /></FullPageColumn>;
                } else if (this.props.info.status === AsyncActionTypeEnum.failed) {
                    return <FullPageColumn><Updating text="error..." /></FullPageColumn>;
                } else if (this.props.info.status === AsyncActionTypeEnum.loading) {
                    return <FullPageColumn><Updating text="" /></FullPageColumn>;
                } else if (this.props.info.status === AsyncActionTypeEnum.updating) {
                    return <FullPageColumn><Updating text="" /></FullPageColumn>;
                } else if (this.props.info.status === AsyncActionTypeEnum.successful) {
                    return <FullPageColumn>{this.props.children}</FullPageColumn>;
                } else {
                    return null;
                };
            } else {
                return <FullPageColumn><Updating text="sin información..." /></FullPageColumn>;
            }
        }
    }

    interface IAwesomeSpinnerProps extends React.Props<any> {
        size?: number;
        icon?: string;
        text?: string;
        colorClass?: string;
        paddingTop?: number;
        paddingBottom?: number;
        marginTop?: number;
        marginLeft?: number;
    };

    export let AwesomeSpinner: any = global.connect(class extends React.Component<IAwesomeSpinnerProps, {}>{
        constructor(props: IAwesomeSpinnerProps) {
            super(props);
        }
        static defaultProps: IAwesomeSpinnerProps = {
            size: 20,
            icon: "fa fa-circle-o-notch",
            colorClass: "font-blue-sharp",
            paddingTop: 14,
            paddingBottom: 0,
            text: "",
            marginTop: 0,
            marginLeft:0
        }
        render(): JSX.Element {
            let iconClass: string = this.props.icon + " fa-spin " + this.props.colorClass;
            let fontSize: number = this.props.size;
            let marginTop: number = this.props.marginTop;
            let marginLeft: number = this.props.marginLeft;
            let paddingTop: number = this.props.paddingTop;
            let paddingBottom: number = this.props.paddingBottom;

            return <FullPageColumn>
                <div className="text-center" style={{ paddingTop, paddingBottom, marginTop, marginLeft }}>
                    <i className={iconClass} style={{ fontSize }}></i>
                    <h4 className="block" style={{ padding: 0, display: "inline", fontSize}}>&nbsp;&nbsp;{this.props.text}</h4>
                </div>
            </FullPageColumn>
        }
    });
}

import Updating = EK.UX.UpdatingC;
import UpdatingHorizontal = EK.UX.UpdatingHorizontal;
import LeftPanelUpdate = EK.UX.PanelUpdate;
import PanelUpdate = EK.UX.PanelUpdate;
import AwesomeSpinner = EK.UX.AwesomeSpinner;