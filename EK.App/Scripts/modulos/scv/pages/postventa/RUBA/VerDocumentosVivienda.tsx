namespace EK.Modules.SCV.Pages.postventa.RUBA.VerDocumentos {
    "use strict";
   
    interface IDocViviendaProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
       // entityType: any;
        //entity?: any; 
        titulomodal: any; 
    };

    export let DocuemntosViviendaModalBase: any = global.connect(class extends React.Component<IDocViviendaProps, IDocViviendaProps>{
   // export class DocuemntosViviendaModalBase extends React.Component<IDocViviendaProps, {}> {
        constructor(props: IDocViviendaProps) {
            super(props);
            this.onShow = this.onShow.bind(this);
        };

        //static props: any = (state: any) => ({
        //    // entidad: state.global.currentEntity,
        //    //  config: global.createPageConfigFromState(state.global),
        //    entity: state.global.KontrolFileParameters && getData(state.global.KontrolFileParameters) && state.global.KontrolFileParameters != undefined ? getData(state.global.KontrolFileParameters).ID : 0
        //});

        onShow(): void {
            let modalObj: any = $("#modalDocumentosVivienda");
            modalObj.modal();
            modalObj.css("height", "auto");
        };

        //shouldComponentUpdate(nextProps: IDocViviendaProps, nextState: IDocViviendaProps): boolean {
        //    return (this.props.entity != nextProps.entity ) && nextProps.entity >  0 ;
        //};

        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalVivienda  titulomodal={this.props.titulomodal} />
            </Column>
        }
    });

    interface IModalCheckProps extends page.IProps, grid.IColumn {
        onHide?: () => void;
       // entityType?: any;
        //entity?: any;
        titulomodal: any;
    };

    let ModalVivienda: any = global.connect(class extends React.Component<IModalCheckProps, {}> {
        constructor(props: IModalCheckProps) {
            super(props);
        };

        refs: {
            modal: Element;
        };
        //static props: any = (state: any) => ({
        //   // entidad: state.global.currentEntity,
        // //  config: global.createPageConfigFromState(state.global),
        //    entity: state.global.KontrolFileParameters && getData(state.global.KontrolFileParameters) &&  state.global.KontrolFileParameters != undefined ? getData(state.global.KontrolFileParameters).ID : 0 
        //});
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            obtenerItem: (id: number): void => {

            }
        });

        header(info: any): JSX.Element {
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info}</h6>
                </span>
            </div>
        };
        render(): JSX.Element {
            let tituloModal: any = this.props.titulomodal; 
            return <modal.Modal id="modalDocumentosVivienda" header={this.header(tituloModal)} addDefaultCloseFooter={true} >
                <Edit  />
            </modal.Modal>
        }
    });

    interface IEdit extends page.IProps {
        item: DataElement;
        entityType: any;
        entity: any; 
    }

    let Edit: any = global.connect(class extends React.Component<IEdit, IEdit> {
        onClose(): void {
            let modalObj: any = $("#modalDocumentosVivienda");
            modalObj.modal('hide');
        }

        static props: any = (state: any) => ({
            // entidad: state.global.currentEntity,
            //  config: global.createPageConfigFromState(state.global),
            entity: state.global.KontrolFileParametersCurrentEntity,  //&& getData(state.global.KontrolFileParameters) && state.global.KontrolFileParameters != undefined ? getData(state.global.KontrolFileParameters).ID : 0
            entityType: state.global.KontrolFileParametersCurrentEntityType 
        });



        
        shouldComponentUpdate(nextProps: IEdit, nextState: IEdit): boolean {
            // return hasChanged(this.props.entity , nextProps.entity) && getData(nextProps.entity).ID > 0;
            return hasChanged(this.props.entity, nextProps.entity); //|| hasChanged(this.props.entityType, nextProps.entityType);
        };

        render(): JSX.Element {
             return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 5 }}>
                     <div className="modal-body">
                         {getData(this.props.entity).ID > 0 && this.props.entity != undefined 
                             ? 
                             <KontrolFileManager modulo={'SPV'} entityType={this.props.entityType} tipo={"anexos"} entity={this.props.entity} viewMode={true} multiple={true} size={[12, 12, 12, 12]} />
                             : null }
                    </div>
                </Column>
            </Column>;
        };
    });
};

import VerDocumentosViviendaModal = EK.Modules.SCV.Pages.postventa.RUBA.VerDocumentos.DocuemntosViviendaModalBase;