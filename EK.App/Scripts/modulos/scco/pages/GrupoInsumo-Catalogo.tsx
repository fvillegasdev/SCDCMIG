namespace EK.Modules.SCCO.Pages.GrupoInsumo {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("GrupoInsumo", "scco");
    const PAGE_ID = "Grupo Insumo";


    interface IEstadoCheck extends page.IProps {
        item?: any;
        entidad?: any;
        checkedPresupuestoImporte?: boolean;
        checkedPresupuestoCantidad?: boolean;
        checkedPresupuestoPrecio: boolean;

        disablePresupuestoImporte?: boolean;
        disablePresupuestoCantidad?: boolean;
        disablePresupuestoPrecio?: boolean;

        cancelarGI?: any;
    }



    class ComportamientoCheck extends React.Component<IEstadoCheck, IEstadoCheck> {
        constructor(props: IEstadoCheck) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.checkedPresupuestoImporte = Forms.getValue("ValidaPresupuestoImporte", config.id, state);
            return retValue;
        };
        
        componentWillReceiveProps(nextProps: IEstadoCheck) {
            let selectCheck: any = Forms.getValue("ValidaPresupuestoImporte", config.id);
            if (global.hasChanged(this.props.checkedPresupuestoImporte, nextProps.checkedPresupuestoImporte)) {
                if (selectCheck == true) {
                    Forms.updateFormElement(config.id, "ValidaPresupuestoCantidad","disabled=false", false);
                    Forms.updateFormElement(config.id, "ValidaPresupuestoPrecio", false);
                } else {
                    null;
                    //Forms.updateFormElement(config.id, "ValidaPresupuestoCantidad", true);
                    //Forms.updateFormElement(config.id, "ValidaPresupuestoPrecio", true);
                };
            };
        };
        
        render() {
            
            let selectCheck: any = Forms.getValue("ValidaPresupuestoImporte", config.id);
            //let selectCheck1: any = Forms.getValue("ValidaPresupuestoCantidad", config.id);
            let entidad: number = getDataID(this.props.entidad);

           
            let retValue: any = null;
            if (entidad == 0) {
                retValue=<div>
                    <CheckBox id="ValidaPresupuestoImporte" size={[6, 4, 2, 2]}/>
                    <CheckBox id="ValidaPresupuestoCantidad" size={[6, 4, 2, 2]}/>
                    <CheckBox id="ValidaPresupuestoPrecio" size={[6, 4, 2, 2]}/>
                </div>
            }
            //else if (selectCheck == true) {
            //    retValue =<div>
            //         <PresupuestoImporteCheck />
            //         <ConjuntoLabel />
            //        </div>
            //} else {
            //    retValue = <div>
            //        <PresupuestoImporteLabel />
            //        <ConjuntoCheck checkedPresupuestoCantidad={false} checkedPresupuestoPrecio={false} />
            //       </div>
            //}
            return retValue;
        }
    }

    class ConjuntoCheck extends React.Component<IEstadoCheck, IEstadoCheck> {
        constructor(props: IEstadoCheck) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.checkedPresupuestoCantidad = Forms.getValue("ValidaPresupuestoCantidad", config.id, state);
            retValue.checkedPresupuestoPrecio= Forms.getValue("ValidaPresupuestoPrecio", config.id, state);
            return retValue;
        };
        componentDidMount(): any {
            this.props.checkedPresupuestoCantidad;
            this.props.checkedPresupuestoPrecio;
        }
        render() {
            return (
                <div>
                        
                        <CheckBox id="ValidaPresupuestoCantidad" size={[6, 4, 2, 2]}/* checked={statuVPC} disabled={disVPC}*/ />
                        <CheckBox id="ValidaPresupuestoPrecio" size={[6, 4, 2, 2]} /*checked={statuVPP} disabled={disVPP} */ />
                    </div>
                )
        }
    }

    class PresupuestoImporteCheck extends React.Component<page.IProps, page.IProps> {
        constructor(props: IEstadoCheck) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.checkedPresupuestoImporte = Forms.getValue("ValidaPresupuestoImporte", config.id, state);
            return retValue;
        };
        componentDidMount(): any {
            //this.props.checkedPresupuestoPrecio;
        }
        
        render() {
            return (
                <CheckBox id="ValidaPresupuestoImporte" size={[6, 4, 2, 2]} />
                )
        }
    }

    class ComportamientoLabel extends React.Component<IEstadoCheck, IEstadoCheck> {
        constructor(props: IEstadoCheck) {
            super(props)
        }
        static props: any = (state: any) => ({
            disablePresupuestoImporte: state.forms.GrupoInsumo.form.ValidaPresupuestoImporte.value
            //var retValue: any = page.props(state);
            //retValue.disablePresupuestoImporte = Forms.getValue("ValidaPresupuestoImporte", config.id, state);

            //return retValue;
        });
        componentDidMount(): any {
            this.props.disablePresupuestoImporte;
        }

        shouldComponentUpdate(nextProps: IEstadoCheck, { }): boolean {
            return true;
        }

        componentWillReceiveProps(nextProps: IEstadoCheck) {
            if (global.hasChanged(this.props.disablePresupuestoImporte, nextProps.disablePresupuestoImporte)) {
                if (this.props.disablePresupuestoImporte == true) {
                    Forms.updateFormElement(config.id, "ValidaPresupuestoCantidad", false);
                    Forms.updateFormElement(config.id, "ValidaPresupuestoPrecio", false);
                } else {
                    Forms.updateFormElement(config.id, "ValidaPresupuestoCantidad", true);
                    Forms.updateFormElement(config.id, "ValidaPresupuestoPrecio", true);
                };
            };
        };

        render() {
            return (
                <div>
                    <label.Boolean id="ValidaPresupuestoImporte" size={[6, 4, 2, 2]} />
                    <label.Boolean id="ValidaPresupuestoCantidad" size={[6, 4, 2, 2]} />
                    <label.Boolean id="ValidaPresupuestoPrecio" size={[6, 4, 2, 2]} />
                </div>
            )
        }
    }

    class ConjuntoLabel extends React.Component<page.IProps, page.IProps> {
        constructor(props: IEstadoCheck) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            //retValue.disablePresupuestoCantidad = Forms.getValue("ValidaPresupuestoCantidad", config.id, state);
            //retValue.disablePresupuestoPrecio = Forms.getValue("ValidaPresupuestoPrecio", config.id, state);
            return retValue;
        };
        componentDidMount(): any {
            //this.props.disablePresupuestoCantidad;
        }
       
        render() {
            return (
                <div>

                    <Label id="ValidaPresupuestoCantidad" size={[6, 4, 2, 2]} />
                    <Label id="ValidaPresupuestoPrecio" size={[6, 4, 2, 2]} />
                </div>
                )
        }
    }

    class PresupuestoImporteLabel extends React.Component<page.IProps, page.IProps> {
        constructor(props: IEstadoCheck) {
            super(props)
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            //retValue.disablePresupuestoPrecio = Forms.getValue("ValidaPresupuestoPrecio", config.id, state);
            return retValue;
        };
        componentDidMount(): any {
            //this.props.disablePresupuestoCantidad;
            //this.props.disablePresupuestoPrecio;
        }
        
        render() {
            return (
                <Label id="ValidaPresupuestoImporte" size={[6, 4, 2, 2]} />
                )
        }
    }



    export class Edicion extends page.Base {

        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addObject("TipoInsumo")
                .addObject("InventariadoGrupoInsumo")
                .addObject("PresupuestoGrupoInsumo")
                .addObject("ValidaPresupuesto")
                .addBoolean("ValidaPresupuestoImporte")
                .addBoolean("ValidaPresupuestoCantidad")
                .addBoolean("ValidaPresupuestoPrecio")
                .addBoolean("TransfierePoliza")
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
            //guarda vista o form al terminar de editar
        };
        render(): JSX.Element {
            //render para mostrar campos al dar doble clik sobre un item o al agregar un nuevo registro
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    //const Edit: any = global.connect(class extends React.Component<IEstadoCheck, IEstadoCheck>
    //const Edit: any = page.connect(class extends page.Base
    //class Edit extends page.Base
    const Edit: any = global.connect(class extends React.Component<IEstadoCheck, IEstadoCheck> {
        constructor(props: IEstadoCheck) {
            super(props);
            
        }
        static props: any = (state: any) => ({
            cancelarGI: state.global.CancelarGIChecks,
            checkedPresupuestoImporte: Forms.getValue("ValidaPresupuestoImporte", config.id, state)
        });

        componentWillReceiveProps(nextProps: IEstadoCheck) {
            let selectCheck: any = Forms.getValue("ValidaPresupuestoImporte", config.id);

            if (global.hasChanged(this.props.checkedPresupuestoImporte, nextProps.checkedPresupuestoImporte || hasChanged(this.props.cancelarGI, nextProps.cancelarGI))) {
                if (selectCheck) {
                    null;
                    Forms.updateFormElement(config.id, "ValidaPresupuestoCantidad", false);
                    Forms.updateFormElement(config.id, "ValidaPresupuestoPrecio", false);
                }
                //else {
                //    Forms.updateFormElement(config.id, "ValidaPresupuestoCantidad", true);
                //    Forms.updateFormElement(config.id, "ValidaPresupuestoPrecio", true);
                //};
            };
        };
        onChangeCancela(e: any): any {
            dispatchSuccessful("load::CancelarGIChecks", { valor: e });
            //if (e === true) {
            //    dispatchSuccessful("load::CancelarGIChecks", { valor: e });

            //} else {
            //    dispatchSuccessful("load::CancelarGIChecks", { valor: e });
            //}
        }
       
        render(): JSX.Element {
            //let selectCheck: any = Forms.getValue("ValidaPresupuestoImporte", config.id);
            let banderaImporte: any = getData(this.props.cancelarGI).valor;
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-boxes fa-3x"
                        collapsed={false}
                        level="main"
                        hideCollapseButton={true}>
                        <Row style={{ paddingBottom: 10 }}>
                            
                            <input.Clave size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={150} />
                            <checkBox.Status size={[6, 2, 2, 2]} />

                            <TipoInsumoDDL id="TipoInsumo" size={[12, 12, 4, 4]} validations={[validations.required()]} />
                            <InventariadoGrupoInsumoDDL id="InventariadoGrupoInsumo" size={[12, 12, 4, 4]}  validations={[validations.required()]}  />
                            <PresupuestoGrupoInsumoDDL id="PresupuestoGrupoInsumo" size={[12, 12, 4, 4]}  validations={[validations.required()]}  />

                            <ValidaPresupuestoDDL id="ValidaPresupuesto" size={[12, 12, 4, 4]} validations={[validations.required()]}  />


                            <checkBox.CheckBox id="ValidaPresupuestoImporte" size={[6, 4, 2, 2]} change={this.onChangeCancela} />
                            {(!banderaImporte) ?
                                <div>
                                    <checkBox.CheckBox id="ValidaPresupuestoCantidad" size={[6, 4, 2, 2]} />
                                    <checkBox.CheckBox id="ValidaPresupuestoPrecio" size={[6, 4, 2, 2]} />
                                </div>
                                :
                                null
                            }
                            <checkBox.CheckBox id="TransfierePoliza" size={[6, 4, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
            
        };
    });
    //let View: any = global.connect(class extends React.Component<IEstadoCheck, IEstadoCheck>
    //class View extends page.Base
    let View: any = global.connect(class extends React.Component<IEstadoCheck, IEstadoCheck> {
        static props: any = (state: any) => ({
            cancelarGI: state.global.CancelarGIChecks,
            checkedPresupuestoImporte: Forms.getValue("ValidaPresupuestoImporte", config.id, state)
        });
        
        
        render(): JSX.Element {
            let banderaImporte: any = getData(this.props.cancelarGI).valor;
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-boxes fa-3x"
                        collapsed={false}
                        level="main"
                        hideCollapseButton={true}>
                        <Row style={{ paddingBottom: 10 }}>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 8, 8, 8]} />
                            <label.Estatus size={[6, 2, 2, 2]} />

                            <label.Entidad id="TipoInsumo" size={[12, 12, 4, 4]} />
                            <label.Entidad id="InventariadoGrupoInsumo" size={[12, 12, 4, 4]} />
                            <label.Entidad id="PresupuestoGrupoInsumo" size={[12, 12, 4, 4]} />

                            <label.Entidad id="ValidaPresupuesto" size={[12, 12, 4, 4]} />

                            <label.Boolean id="ValidaPresupuestoImporte" size={[6, 4, 2, 2]} />
                            {(!banderaImporte) ?
                                <div>
                                    <label.Boolean id="ValidaPresupuestoCantidad" size={[6, 4, 2, 2]} />
                                    <label.Boolean id="ValidaPresupuestoPrecio" size={[6, 4, 2, 2]} />
                                </div>
                                :
                                null
                            }
                            <label.Boolean id="TransfierePoliza" size={[6, 4, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    });
};