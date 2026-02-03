namespace EK.UX {
    "use strict";


    interface ICollapseProps extends React.Props<any> {
        title?: any;
        id?: any;
    }

    interface ICollapseState extends React.Props<any> {
        open: boolean;
    }

    export class Collapse extends React.Component<ICollapseProps, ICollapseState> {
        constructor(props: ICollapseProps) {
            super(props);
            this.state = {
                open: true
            };
        }

       

        shouldComponentUpdate(nextProps: ICollapseProps, nextState: ICollapseProps): boolean {
            return true;
        }
        render(): JSX.Element {

            return <div id={this.props.id} ref="tabTitle">
                <h4>
                <a style={{
                    background : "#eee", 
                    padding: 5, 
                    display: "block",
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#99a8b5"                  

                }} onClick={this.toggle.bind(this)} >
                       {this.props.title}
                </a>
                </h4>
                <div  ref="tabContainer"
                    className={"collapse" + (this.state.open ? ' in' : '')} style={{ padding: 10 }}>
                    {this.props.children}
                </div></div>;
        }


        /**
        * Funciones
        */
        toggle() {
            this.setState({
                open: !this.state.open
            });
        }

    }
}
import CollapsePanel = EK.UX.Collapse;
