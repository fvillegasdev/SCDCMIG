namespace EK.UX.Modal {
    "use strict";
    interface IModalProps extends React.Props<any> {
        title?: string;
        url?: string;
        id?: string;
        header?: any;
        footer?: any;
        style?: React.CSSProperties;
        addDefaultCloseFooter?: boolean;
        camController?: any;
    };
    export class Modal extends React.Component<IModalProps, IModalProps> {
        constructor(props: IDataTableProps) {
            super(props);
        };
        static defaultProps: IModalProps = {
            title: "",
            addDefaultCloseFooter: false
        };
        refs: {
            container: Element;
        };
        componentDidMount(): any {
            let d: any = $(document);
            let modal: any = $("#" + this.props.id);
            //
            d.on("show.bs.modal", "#" + this.props.id, () => {
                let w: any = window;
                w["closeModal"] = () => {
                    modal.modal("hide");
                };
                //
                modal.css("height", modal.height() + "px");
            });
        };
        shouldComponentUpdate(nextProps: any): any {
            if (this.props.url) {
                return false;
            };

            return true;
        };
        componentWillUnmount(): any {
            let d: any = $(document);
            d.off("show.bs.modal", "#" + this.props.id);
        };

        tryCloseCam() {
            if (this.props.id === 'modalCameraOpened') {
                try {
                    this.props.camController.stop();
                } catch (ex) {}
            }
            
        }

        render(): JSX.Element {
            let style: React.CSSProperties;
            let className: any; 
            if (this.props.style != undefined) {
                style = this.props.style
            }
            else
            {
                style = {
                    height: "auto",
                    minHeight: "90%",
                    borderRadius: 0
                }
            }
            if (this.props.url) {
                className = 'modal container modal-fade-scale'; 
            } else {
                className = 'modal container SinUrl modal-fade-scale'; 
            }

            return <div id={this.props.id} ref="container" className={className} tabIndex={-1} style={style}>
                {this.props.header
                    ? <div className="modal-header" style={{background:'#ffab00',color:'#fff'}}>
                        <button type="button" className="close" data-dismiss="modal" onClick={()=>this.tryCloseCam()} aria-hidden="true"></button>
                        {this.props.header}
                    </div>
                    : null }
                <div className="modal-body" style={{
                    width: "100%",
                    height: "100%",
                    margin: 0}}>
                    {this.props.url
                        ? <iframe id={"iframe_" + this.props.id} name={"iframe_" + this.props.id} height="96%" width="100%" style={{ width: "100%", height: "96%", border: "none" }} />
                        : this.props.children}
                </div>
                {this.props.addDefaultCloseFooter === true
                    ? <div className="modal-footer">
                        <button type="button" className="btn dark btn-outline" data-dismiss="modal">Cerrar</button>
                    </div>
                    : this.props.footer 
                        ? this.props.footer
                        : null}
            </div>;
        };
    };

    interface IModalButtonProps extends IModalProps, buttons.IButtonProps {
        onShowModal?: (props?: any) => any;
    };
    export class ModalButton extends React.Component<IModalButtonProps, IModalButtonProps> {
        constructor(props: IDataTableProps) {
            super(props);

            this.onClick = this.onClick.bind(this);

            let id: string = this.props.id;
            if (!this.props.id) {
                id = ["mb", new Date().getTime()].join("_");
            };
            this.state = { id };
        };
        static defaultProps: IModalButtonProps = {
            title: ""
        };
        refs: {
            container: Element;
        };
        shouldComponentUpdate(nextProps: IModalButtonProps, nextState: IModalButtonProps): boolean {
            return false;
        };
        componentDidMount(): any {
            let modalObj: any = $("#" + this.state.id);
            //
            modalObj.on('shown.bs.modal', () => {
                var iframehght = modalObj.height();
                modalObj.find("iframe").height(iframehght);
            });
            //
            window["closeModal"] = () => {
                modalObj.modal("hide");
            };
        };
        componentWillUnmount(): any {
            $("#" + this.state.id).remove();
        };
        ///
        onClick(e: any): any {
            let modalObj: any = $("#" + this.state.id);
            let $iframe: any = $("#iframe_" + this.state.id);
            let onShowModal: any = this.props.onShowModal;
            //
            modalObj.modal();
            //
            if (onShowModal) {
                onShowModal({ action: this.props.url, target: "iframe_" + this.state.id });
            }
            else {
                $iframe.attr("src", "?modal=1&" + this.props.url);
            }; 
        };
        render(): JSX.Element {
            //let url: string = "/?modal=1" + this.props.url;
            //
            return <buttons.Button {...this.props} onClick={this.onClick}>
                <Modal id={this.state.id} title={this.props.title} url={"about:blank"} />
            </buttons.Button>;
        };
    };
};

import modal = EK.UX.Modal;

/*
    <div className="modal-header">
        <a className="close" data-dismiss="modal" aria-hidden={true}></a>
        <h4 className="modal-title">{this.props.title}</h4>
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="btn btn-outline dark">Close</button>
        <button type="button" class="btn green">Save changes</button>
    </div>
*/
