/// <reference path="../typings/react/react-global.d.ts" />
/// <reference path="./Colors.tsx" />
/// <reference path="./Icon.tsx" />

namespace EK.UX {
    "use strict";

    interface IHiddenProps extends React.Props<any>, grid.IColumn {
        id: string;        
        value: string;
        hasChanged?: boolean;
    }

    export class Hidden extends React.Component<IHiddenProps, IHiddenProps> {
        constructor(props: IHiddenProps) {
            super(props);
        }       

        refs: {
            requiredPoint: Element;
        };


        shouldComponentUpdate(nextProps: IHiddenProps, nextState: IHiddenProps): boolean {
            if (this.props.value !== nextProps.value) {
                return true;
            } else {
                return false;
            }
        }

        render(): JSX.Element {
            let formControlId: string;                        

            if (!this.props.id) {
                let d: any = new Date();
                formControlId = "formControl_" + Number(d).toString();
            } else {
                formControlId = "formControl_" + this.props.id;
            };           

            return <grid.Column> 
                <div>                               
                <input type="hidden" htmlFor={formControlId} value={this.props.value}></input>                
                </div>
            </grid.Column>;
        }
    }
}