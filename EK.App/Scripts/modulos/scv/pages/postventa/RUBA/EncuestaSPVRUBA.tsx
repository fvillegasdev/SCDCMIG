namespace EK.Modules.SCV.Pages.postventa.RUBA.inquestSPV {
    "use strict";
    const INQUEST_ID = "reporte$InquestReportSPV";
    const INQUEST_QUESTIONS_GROUP = "reporte$InquestQuestionsGroupSPV";
    const INQUEST_SAVE = "reporte$InquestQuestionsSAVE";
   // const INQUEST_INFORMATION_ID = "reporte$InformationInquestSPV";

    export class configTypeQuestions {
        static emojisIcons: any = [
            { Icon: "fad fa-grin-alt", ActiveColor: "#bcdd21", InactiveColor: "#b1bbbb", Title: "Excelente", Value: 10 },
            { Icon: "fad fa-smile", ActiveColor: "#41cb9c", InactiveColor: "#b1bbbb", Title: "Bueno", Value: 8 },
            { Icon: "fad fa-meh", ActiveColor: "#ffd600", InactiveColor: "#b1bbbb", Title: "Regular", Value: 6 },
            { Icon: "fad fa-frown", ActiveColor: "#ff8e01", InactiveColor: "#b1bbbb", Title: "Malo", Value: 4 },
            { Icon: "fad fa-angry", ActiveColor: "#ff3037", InactiveColor: "#b1bbbb", Title: "Pésimo", Value: 2 }
        ]

        //static emojisIcons: any = [
        //    { Icon: "fad fa-angry", ActiveColor: "#ff3037", InactiveColor: "#b1bbbb", Title: "Pésimo", Value: 2 },
        //    { Icon: "fad fa-frown", ActiveColor: "#ff8e01", InactiveColor: "#b1bbbb", Title: "Malo", Value: 4 },
        //    { Icon: "fad fa-meh", ActiveColor: "#ffd600", InactiveColor: "#b1bbbb", Title: "Regular", Value: 6 },
        //    { Icon: "fad fa-smile", ActiveColor: "#41cb9c", InactiveColor: "#b1bbbb", Title: "Bueno", Value: 8 },
        //    { Icon: "fad fa-grin-alt", ActiveColor: "#bcdd21", InactiveColor: "#b1bbbb", Title: "Excelente", Value: 10 }
        //]

        static yesnoIcons: any = [
            { Icon: "fas fa-check-circle", ActiveColor: "#41cb9c", InactiveColor: "#b1bbbb", Title: "Si", Value: 10 },
            { Icon: "fas fa-times-circle", ActiveColor: "#ff3037", InactiveColor: "#b1bbbb", Title: "No", Value: 0 }
        ]

        static starsIcons: any = [
            { Icon: "fas fa-star", ActiveColor: "#f1c40f", InactiveColor: "#b1bbbb", Title: "Excelente", Value: 2 },
            { Icon: "fas fa-star", ActiveColor: "#f1c40f", InactiveColor: "#b1bbbb", Title: "Bueno", Value: 4 },
            { Icon: "fas fa-star", ActiveColor: "#f1c40f", InactiveColor: "#b1bbbb", Title: "Regular", Value: 6 },
            { Icon: "fas fa-star", ActiveColor: "#f1c40f", InactiveColor: "#b1bbbb", Title: "Malo", Value: 8 },
            { Icon: "fas fa-star", ActiveColor: "#f1c40f", InactiveColor: "#b1bbbb", Title: "Pésimo", Value: 10 }
        ]
    }

    export const onCalculateAverageGroupQuestions: (items: any) => any = (items: any) => {
        let returnValue: any = 0;
        if (items && items.length >= 0) {
            returnValue = 0;
            items.forEach((row: any, index: number) => {
                returnValue = returnValue + row.Value;
            })
            returnValue = returnValue / items.length; 
        }
        return returnValue;
    }

    export const onIconSatisfactionIndex: (value: any, iconType: any) => JSX.Element = (value: any, iconType: any) => {
        let evalValue: any = value === null || value === undefined ? 0 : value;
        let returnValue: JSX.Element;
        let selectValue: number = 0;
        if (iconType === "EMOJIS") {
            switch (true) {
                case (evalValue >= 8.1):
                    selectValue = 10;
                    break;
                case (evalValue >= 6.1):
                    selectValue = 8;
                    break;
                case (evalValue >= 4.1):
                    selectValue = 6;
                    break;
                case (evalValue >= 2.1):
                    selectValue = 4;
                    break;
                case (evalValue > 0):
                    selectValue = 2;
                    break;
            }
            let activos: any[] = configTypeQuestions.emojisIcons.filter((value) => { if (value.Value === selectValue) { return value } });

            if (activos.length > 0) {
                returnValue = <span key={"totalIndexIncuest"} style={{ color: activos[0].ActiveColor }}><span className={activos[0].Icon} title={activos[0].Title}  ></span></span>;
            }
        }

        return returnValue;
    }
    interface IInquestReportButtonProps extends buttons.IButtonProps, page.IProps { };

    interface IModalIncuestProps extends page.IProps, grid.IColumn {
        style?: React.CSSProperties;
        inquestSave?: global.DataElement;
        onSaveModalInquestReport?: () => void;
    };

    export let IncuestModalBase: any = global.connect(class extends React.Component<IModalIncuestProps, {}> {
        constructor(props: IModalIncuestProps) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        componentWillMount(): void {
            global.dispatchSuccessful("global-page-entity", [], INQUEST_ID);
            global.dispatchSuccessful("global-page-data", [], INQUEST_SAVE);
            
        }
      
        render(): JSX.Element {
            return <Column
                size={this.props.size}
                lg={this.props.lg}
                md={this.props.md}
                sm={this.props.sm}
                xs={this.props.xs}
                style={this.props.style}>
                <ModalIncuestSPV {...this.props} />
            </Column>
        };
    });

    let ModalIncuestSPV: any = global.connect(class extends React.Component<IModalIncuestProps, {}> {
        constructor(props: IModalIncuestProps) {
            super(props);
            this.onSaveModalInquestReport = this.onSaveModalInquestReport.bind(this);
        };
        refs: {
            modal: Element;
        };
        static defaultProps: IModalIncuestProps = {};

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.data = state.global["catalogo$" + INQUEST_QUESTIONS_GROUP];
            retValue.inquestSave = state.global["catalogo$" + INQUEST_SAVE]
            return retValue;
        };

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});

        onClose(): void {
            let modal: any = $("#modalInquestReportSPV");
            modal.modal("hide");
        };

        shouldComponentUpdate(nextProps: IModalIncuestProps, nextState: IModalIncuestProps): boolean {
            return hasChanged(this.props.data, nextProps.data) || hasChanged(this.props.inquestSave, nextProps.inquestSave);
        };

       

        onSaveModalInquestReport(): void {
            let itemFormSection: EditForm = Forms.getForm(INQUEST_ID);
            let modelIncuestSave: any = global.getData(global.createSuccessfulStoreObject(global.getData(EK.Store.getState().global["entity$" + INQUEST_ID])));
            let modelQuestions: any[] = global.getData(this.props.data); 

            if (modelIncuestSave["Cerrada"] === true) {
                global.info("No se puede guardar la encuesta porque ya se encuentra cerrada");
                return;
            }
            //let valueLess: any = modelQuestions.filter((item: any, index: number) => { if (item.Value === 0) { return true } }).length;

            //if (valueLess > 0) {
            //    global.info("No se puede guardar la encuesta porque existe preguntas sin respuestas");
            //    return
            //}
   

            modelIncuestSave["TotalTipoAtencion"] = onCalculateAverageGroupQuestions(modelQuestions[0].Questions); 
            modelIncuestSave["TotalPuntualidad"] = onCalculateAverageGroupQuestions(modelQuestions[1].Questions); 
            modelIncuestSave["TotalLimpieza"] = onCalculateAverageGroupQuestions(modelQuestions[2].Questions); 
            modelIncuestSave["TotalCalidad"] = onCalculateAverageGroupQuestions(modelQuestions[3].Questions); 
            modelIncuestSave["IndiceSatisfaccion"] = ( modelIncuestSave["TotalTipoAtencion"] + modelIncuestSave["TotalPuntualidad"] + modelIncuestSave["TotalLimpieza"] + modelIncuestSave["TotalCalidad"])/4; 
            
        
         
            modelIncuestSave["NoContesto"] = itemFormSection["NoContesto"] === null || itemFormSection["NoContesto"] === undefined || itemFormSection["NoContesto"] === false ? false :  true;
            modelIncuestSave["NoEncontrado"] = itemFormSection["NoEncontrado"] === null || itemFormSection["NoEncontrado"] === undefined || itemFormSection["NoEncontrado"] === false? false : true;
            modelIncuestSave["Observacion"] = itemFormSection["Observacion"] === null || itemFormSection["Observacion"] === undefined ? "" : itemFormSection["Observacion"] ; 

            if (itemFormSection["Cerrada"] === true) {

                if (modelIncuestSave["NoContesto"] === false && modelIncuestSave["NoEncontrado"] === false && modelIncuestSave["IndiceSatisfaccion"] <= 0) {
                    global.info("Para cerrar la  encuesta sin evaluar las preguntas, debes marcar NO SE ENCONTRÓ EL CLIENTE ó NO QUISO CONTESTAR LA ENCUESTA");
                    return;
                }

                if ( (modelIncuestSave["NoContesto"] === true ||  modelIncuestSave["NoEncontrado"] === true ) && modelIncuestSave["IndiceSatisfaccion"] > 0) {
                    global.info("No se puede cerrar la encuesta, porque ya tienen preguntas evaluadas y por lo tanto debes desmarcar  NO SE ENCONTRÓ EL CLIENTE ó NO QUISO CONTESTAR LA ENCUESTA");
                    return;
                }

                if (modelIncuestSave["NoContesto"] === true && modelIncuestSave["NoEncontrado"] === true ) {
                    global.info("Para cerrar la  encuesta, debes marcar NO SE ENCONTRÓ EL CLIENTE ó NO QUISO CONTESTAR LA ENCUESTA");
                    return;
                }

                console.log(modelIncuestSave)
                EK.Global.confirm("¿Desea realizar el cierre de la encuesta?, Presione Confirmar para continuar ", "Encuesta de Satisfacción\n\n", () => {
                    modelIncuestSave["Cerrada"] = true
                    global.dispatchAsyncPut("global-page-data", "base/scv/SPVEncuestasSatisfaccionFija/save", modelIncuestSave, INQUEST_SAVE);
                    global.dispatchSuccessful('load::SavedIncuestData', modelIncuestSave);

                });

            } else {
                modelIncuestSave["Cerrada"] =  false
                global.dispatchAsyncPut("global-page-data", "base/scv/SPVEncuestasSatisfaccionFija/save", modelIncuestSave, INQUEST_SAVE);
            }

        }


        componentDidUpdate(prevProps: IModalIncuestProps, prevState: IModalIncuestProps): any {
            if (this.props.inquestSave && wasUpdated(prevProps.inquestSave, this.props.inquestSave, false)) {
                let item: any = getData(prevProps.inquestSave);
                switch (item.Estado) {
                    case 4: // eliminado con exito
                        break;
                    default:
                        global.success("Información fue almacenada con Éxito");
                        let dataEntity: any = getData(EK.Store.getState().global.currentEntity);
                        let savedIncuesta: any = getData(EK.Store.getState().global.SavedIncuestData);
                        dataEntity.EncuestaSatisfaccion = savedIncuesta;
                        global.dispatchSuccessful('global-page-data', dataEntity,'currentEntity');
                        this.onClose();
                        break;
                }
            }
        };

        footerModalInquestReport(): JSX.Element {
            return <div className="modal-footer">
                <span>
                    {global.isUpdating(this.props.inquestSave) ? <AwesomeSpinner paddingBottom={0} paddingTop={0} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                        : <button type="button" onClick={this.onSaveModalInquestReport} className="btn btn-outline btn-md " style={{ backgroundColor: "#69b65c", color: "#FFFFFF" }}  >Guardar Encuesta</button>
                    }
                    <button type="button" onClick={this.onClose} className="btn  btn-outline btn-md red" data-dismiss="modal">Cerrar</button>
                    </span>
            </div>;
        };

        header(info: any): JSX.Element {
            let data: any = global.getData(this.props.data);
            let totalSumGroup: any = onCalculateAverageGroupQuestions(data);
            let iconTotalSumGroup: any = onIconSatisfactionIndex(totalSumGroup, "EMOJIS")
            let cerrada: any = getData(EK.Store.getState().global["entity$" + INQUEST_ID]).Cerrada
            return <div>
                <span style={{ paddingRight: 10 }}>
                    <h6 className="modal-title" style={{ display: "inline-block", fontWeight: 600, padding: "0px 5px" }}>{info} {cerrada === false || cerrada === undefined || cerrada === null ? "" : <span className="badge1 bold badge1 badge1-success pull-right" style={{ marginTop: "-11px", marginLeft: "5px", fontSize: "20px", color: "white", padding:"4px", height: "36px",backgroundColor: "#659be0" }} > Cerrada </span>}  </h6>
                </span>
                <span className="pull-right" style={{ textAlignLast: "right", fontStyle: "italic" }} >TOTAL INDICE DE SATISFACCIÓN : <i className="badge badge-info">{EK.UX.Labels.formatDecimal(totalSumGroup)}</i> <span style={{ fontSize: "31px", float: "right", marginRight: "23px", marginTop:"-12px" }}  >{iconTotalSumGroup} &nbsp;&nbsp;&nbsp;</span></span>
            </div>
        };

        render(): JSX.Element {
            return <modal.Modal id="modalInquestReportSPV" header={this.header("Encuesta de Satisfacción")} addDefaultCloseFooter={false} footer={this.footerModalInquestReport()}>
                <Row>
                    <Edit />
                </Row>
            </modal.Modal>
        }
    });

    interface IEdit extends page.IProps {
       // item: DataElement;
        items?: global.DataElement;
    };


    let Edit: any = global.connect(class extends React.Component<IEdit, IEdit> {
        constructor(props: IEdit) {
            super(props);
        };
        static props: any = (state: any) => ({
            entidad: state.global.currentEntity,
            config: global.createPageConfigFromState(state.global),
            items: state.global["entity$" + INQUEST_ID],
        });

        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({});


        componentWillReceiveProps(nextProps: IEdit, { }): any {
            if (hasChanged(this.props.items, nextProps.items)) {
                if (global.isSuccessful(nextProps.items)) {
                    let dataItem: any = getData(nextProps.items);
                    Forms.updateFormElement(INQUEST_ID, "NoEncontrado", dataItem.NoEncontrado);
                    Forms.updateFormElement(INQUEST_ID, "NoContesto", dataItem.NoContesto);
                    Forms.updateFormElement(INQUEST_ID, "Cerrada", dataItem.Cerrada);
                    Forms.updateFormElement(INQUEST_ID, "Observacion", dataItem.Observacion);
                }
            }
        };

        render(): JSX.Element {
            let entidad: any = global.getData(EK.Store.getState().global.pageConfig);
            let dataItem: any = getData(this.props.items);
            return <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8, overflowY: "auto", height: "450px", position: "relative" }} >
                <Column size={[12, 12, 12, 12]} >
                    <page.OptionSection
                        id={INQUEST_ID}
                        parent={entidad.id}
                        title={"Opciones de Cierre"}
                        level={1}
                        icon="fa fa-info-circle" collapsed={false}>
                        <Row>
                            { dataItem.Cerrada != true ? 
                                <div>
                                    <Column size={[12, 12, 4, 4]} >
                                        {/*<checkBox.Blocked size={[6, 2, 2, 2]} />*/}
                                        <checkBox.CheckBox id="NoEncontrado" value={dataItem.NoEncontrado}  idFormSection={INQUEST_ID} label="No se encontró el cliente" size={[12, 12, 12, 12]} style={{ minHeight: "0px !important" }} />
                                        <checkBox.CheckBox id="NoContesto" value={dataItem.NoContesto}  idFormSection={INQUEST_ID} label="No quiso contestar la encuesta" size={[12, 12, 12, 12]} style={{ minHeight: "0px !important" }} />
                                        <checkBox.CheckBox id="Cerrada" value={dataItem.Cerrada}  idFormSection={INQUEST_ID} label="Cerrar Encuesta" size={[12, 12, 12, 12]} style={{ minHeight: "0px !important" }} />
                                    </Column>
                                    <Column size={[12, 12, 8, 8]} >
                                        <TextArea id="Observacion" rows={3} idFormSection={INQUEST_ID} label="Observaciones" size={[12, 12, 12, 12]} />
                                    </Column>
                                </div>
                                :
                                <div>
                                    <Column size={[12, 12, 4, 4]} >
                                        <label.Boolean id="NoEncontrado" idForm={INQUEST_ID}  label="No se encontró el cliente" size={[12, 12, 12, 12]} />
                                        <label.Boolean id="NoContesto" idForm={INQUEST_ID} label="No quiso contestar la encuesta"  size={[12, 12, 12, 12]} />
                                        <label.Boolean id="Cerrada" idForm={INQUEST_ID} label="Encuesta Cerrada"  size={[12, 12, 12, 12]} />
                                    </Column>
                                    <Column size={[12, 12, 8, 8]} >
                                        <label.Label id="Observacion" idForm={INQUEST_ID} size={[12, 12, 6, 6]} />
                                    </Column>
                                </div>
                            }

                        </Row>
                    </page.OptionSection>
                </Column>
                <Column size={[12, 12, 12, 12]} style={{ marginTop: "-15px" }} >
                    <Row>
                        <SectionFixedIncuestQuestions id="fixedIncuestQuestion" />
                    </Row>
                </Column>
            </Column>;
        };
    });


    interface IRenderingQuestionsEditorProps extends React.Props<any> {
        renderingElement?: any;
        size?: any;
    }

    class RenderingTypeQuestions extends React.Component<IRenderingQuestionsEditorProps, IRenderingQuestionsEditorProps>{

        constructor(props: IRenderingQuestionsEditorProps) {
            super(props);
            this.getRenderingQuestionFIVESTARS = this.getRenderingQuestionFIVESTARS.bind(this);
            this.onItemClickAswerQuestion = this.onItemClickAswerQuestion.bind(this);
        }

        onItemClickAswerQuestion(elemento: any, value: any): any {
            let items: any = getData(EK.Store.getState().global["entity$" + INQUEST_ID]);
            let itemFormSection: EditForm = Forms.getForm(INQUEST_ID);

            let cerrada: any = itemFormSection["Cerrada"] === null || itemFormSection["Cerrada"] === undefined || itemFormSection["Cerrada"] === false ? false : true; 

            if (items["Cerrada"] === true) {
                global.info("No se puede cambiar la encuesta, porque ya se encuentra cerrada");
                return;
            }

            if (cerrada === true) {
                global.info("No se puede cambiar la encuesta, porque tiene el check ENCUESTA CERRADA seleccionado");
                return;
            }

            items["NoContesto"] = itemFormSection["NoContesto"] === null || itemFormSection["NoContesto"] === undefined || itemFormSection["NoContesto"] === false ? false : true;
            items["NoEncontrado"] = itemFormSection["NoEncontrado"] === null || itemFormSection["NoEncontrado"] === undefined || itemFormSection["NoEncontrado"] === false ? false : true;
            items["Cerrada"] = cerrada;
            items["Observacion"] = itemFormSection["Observacion"] === null || itemFormSection["Observacion"] === undefined ? "" : itemFormSection["Observacion"]; 



            if (elemento.Value != value) {
                items[elemento.Clave] = value;
            } else {
                if (items[elemento.Clave] === 0) {
                    items[elemento.Clave] = value;
                } else {
                    items[elemento.Clave] = 0;
                }
            }
            
            global.dispatchSuccessful("global-page-entity", items, INQUEST_ID);
        };

        getRenderingQuestionYESNO(): JSX.Element {
            let elementsArray: any[] = [];
            let colorSelect: any = "";
            let valueSelect: any = this.props.renderingElement.Value ? this.props.renderingElement.Value : 0;

            for (var i = 0; i < configTypeQuestions.yesnoIcons.length; i++) {
                colorSelect = configTypeQuestions.yesnoIcons[i].InactiveColor;
                if (valueSelect == configTypeQuestions.yesnoIcons[i].Value) {
                    colorSelect = configTypeQuestions.yesnoIcons[i].ActiveColor;
                }
                elementsArray.push(<span key={"questions_yesno_" + this.props.renderingElement.Clave + "_" + i} >{configTypeQuestions.yesnoIcons[i].Title} <span className={configTypeQuestions.yesnoIcons[i].Icon} style={{ fontSize: "18px", padding: "1px", color: colorSelect, cursor:"pointer" }} title={configTypeQuestions.yesnoIcons[i].Title} onClick={this.onItemClickAswerQuestion.bind(this, this.props.renderingElement, configTypeQuestions.yesnoIcons[i].Value)} ></span>&nbsp;&nbsp;&nbsp;</span>);
            };
            return <Column style={{ textAlign: "center" }}>
                <span style={{ fontSize: 12 }}>{elementsArray}</span>
            </Column>;
        };
        getRenderingQuestionFIVESTARS(): JSX.Element {
            let elementsArray: any[] = [];
            let valueSelect: any = this.props.renderingElement.Value ? (this.props.renderingElement.Value / 2) : 0;

            for (var i = 0; i < valueSelect; i++) {
                elementsArray.push(<span key={"fal_fa_star_" + this.props.renderingElement.Clave + "_" + i} style={{ color: configTypeQuestions.starsIcons[i].ActiveColor }}><span className={configTypeQuestions.starsIcons[i].Icon} style={{ cursor: "pointer" }} onClick={this.onItemClickAswerQuestion.bind(this, this.props.renderingElement, configTypeQuestions.starsIcons[i].Value)} ></span></span>);
            };
            for (var i = elementsArray.length; i < configTypeQuestions.starsIcons.length; i++) {
                elementsArray.push(<span key={"fal_fa_star_" + this.props.renderingElement.Clave + "_" + i} style={{ color: configTypeQuestions.starsIcons[i].InactiveColor }} ><span className={configTypeQuestions.starsIcons[i].Icon} style={{ cursor: "pointer" }}  onClick={this.onItemClickAswerQuestion.bind(this, this.props.renderingElement, configTypeQuestions.starsIcons[i].Value)}></span></span>);
            };
            return <Column style={{ textAlign: "center" }}>
                <span style={{ fontSize: 18 }}>{elementsArray}</span>
            </Column>
        };

        getRenderingQuestionEMOJIS(): JSX.Element {
            let elementsArray: any[] = [];
            let colorSelect: any = "";
            let valueSelect: any = this.props.renderingElement.Value ? (this.props.renderingElement.Value) : 0;

            for (var i = 0; i < configTypeQuestions.emojisIcons.length; i++) {
                colorSelect = configTypeQuestions.emojisIcons[i].InactiveColor;
                if (valueSelect == configTypeQuestions.emojisIcons[i].Value) {
                    colorSelect = configTypeQuestions.emojisIcons[i].ActiveColor;
                }
                elementsArray.push(<span key={"questions_emojis_" + this.props.renderingElement.Clave + "_" + i} style={{ color: colorSelect }}><span className={configTypeQuestions.emojisIcons[i].Icon} style={{ fontSize: "24px", padding: "1px", cursor:"pointer" }} title={configTypeQuestions.emojisIcons[i].Title} onClick={this.onItemClickAswerQuestion.bind(this, this.props.renderingElement, configTypeQuestions.emojisIcons[i].Value)} ></span></span>);
            };

            return <Column style={{ textAlign: "center" }}>
                <span style={{ fontSize: 18 }}>{elementsArray}</span>
            </Column>;
        }

        render(): JSX.Element {
            let typeQuestionArr: JSX.Element[] = [];
            switch (this.props.renderingElement.TypeQuestions.Clave) {
                case "FIVESTARS":
                    typeQuestionArr["FIVESTARS"] = this.getRenderingQuestionFIVESTARS();
                    break;
                case "YESNO":
                    typeQuestionArr["YESNO"] = this.getRenderingQuestionYESNO();
                    break;
                case "EMOJIS":
                    typeQuestionArr["EMOJIS"] = this.getRenderingQuestionEMOJIS();
                    break;
                default:
                    break;
            }
            return <div > {typeQuestionArr[this.props.renderingElement.TypeQuestions.Clave]}</div>;
        };
    };

    interface ISectionFixedIncuestQuestionsProps extends page.IProps {
        dataRequestBack?: any;
        //onCalculateAverageGroupQuestions?: (items: any) => any;
        //onIconSatisfactionIndex?: (value: any, iconType: any) => JSX.Element;
    };

    let SectionFixedIncuestQuestions: any = global.connect(class extends React.Component<ISectionFixedIncuestQuestionsProps, ISectionFixedIncuestQuestionsProps> {
        constructor(props: ISectionFixedIncuestQuestionsProps) {
            super(props);
            this.onSave = this.onSave.bind(this);
        };

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.data = state.global["catalogo$" + INQUEST_QUESTIONS_GROUP];
            retValue.dataRequestBack = state.global["entity$" + INQUEST_ID];
            return retValue;
        };

        onSave(): void { };

        shouldComponentUpdate(nextProps: ISectionFixedIncuestQuestionsProps, nextState: page.IProps): boolean {
            return hasChanged(this.props.data, nextProps.data);
        };

        componentWillReceiveProps(nextProps: ISectionFixedIncuestQuestionsProps, { }): any {
            if (hasChanged(this.props.dataRequestBack, nextProps.dataRequestBack)) {
                if (global.isSuccessful(nextProps.dataRequestBack)) {
                    let config: page.IPageConfig = global.assign({}, this.props.config);
                    let slots: any[] = config.slots;
                    let Modulo: string = this.props.modulo;
                    //
                    if (!config.hasSlot(INQUEST_QUESTIONS_GROUP)) {
                        if (!slots) {
                            slots = [];
                        };
                        slots.push(INQUEST_QUESTIONS_GROUP);
                    };
                    //
                    let data: any = getData(nextProps.dataRequestBack);
                    let QuestionsGroup: any[] = [];
                    let item: any;
                    let listsQuestions: any[] = [];
                    //
                    //GRUPO 1
                    listsQuestions.push({ ID: 1, Clave: "P1", Value: data["P1"], TypeQuestions: { Id: 1, Clave: "EMOJIS" }, Question: ".-¿La facilidad con que realizó su reporte de garantía?" });
                    listsQuestions.push({ ID: 2, Clave: "P2", Value: data["P2"], TypeQuestions: { Id: 1, Clave: "EMOJIS" }, Question: ".-¿La manera de conducirse de los trabajadores durante la atención de garantías fue?" });
                    listsQuestions.push({ ID: 3, Clave: "P3", Value: data["P3"], TypeQuestions: { Id: 1, Clave: "EMOJIS" }, Question: ".-¿El seguimiento telefónico que le dió nuestro personal para verificar la atención de su reporte?" });
                    item = { ID: 1, Clave: "A", Nombre: "Tipo de Atención ", Value: onCalculateAverageGroupQuestions(listsQuestions), Icon: "", Color: "", Questions: listsQuestions };
                    QuestionsGroup.push(item);
                    //GRUPO 2
                    listsQuestions = [];
                    listsQuestions.push({ ID: 1, Clave: "P4", Value: data["P4"], TypeQuestions: { Id: 1, Clave: "EMOJIS" }, Question: ".-¿El tiempo de respuesta en la atención de su garantía?" });
                    listsQuestions.push({ ID: 2, Clave: "P5", Value: data["P5"], TypeQuestions: { Id: 1, Clave: "EMOJIS" }, Question: ".-¿La puntualidad del trabajador en la hora en que se acordó la cita?" });
                    item = { ID: 2, Clave: "P", Nombre: "Puntualidad", Value: onCalculateAverageGroupQuestions(listsQuestions), Icon: "", Color: "", Questions: listsQuestions };
                    QuestionsGroup.push(item)
                    //GRUPO 3
                    listsQuestions = [];
                    // listsQuestions.push({ ID: 1, Clave: "P6", Value: data["P6"], TypeQuestions: { Id: 1, Clave: "FIVESTARS" }, Question: "¿La limpieza con la que se realizó el trabajo?" });
                    listsQuestions.push({ ID: 1, Clave: "P6", Value: data["P6"], TypeQuestions: { Id: 1, Clave: "EMOJIS" }, Question: ".-¿La limpieza con la que se realizó el trabajo?" });
                    listsQuestions.push({ ID: 2, Clave: "P7", Value: data["P7"], TypeQuestions: { Id: 1, Clave: "EMOJIS" }, Question: ".-¿El personal que atendió su reporte se presentó debidamente identificado?" });
                    item = { ID: 3, Clave: "L", Nombre: "Limpieza", Value: onCalculateAverageGroupQuestions(listsQuestions), Icon: "", Color: "", Questions: listsQuestions };
                    QuestionsGroup.push(item)
                    //GRUPO 4
                    listsQuestions = [];
                    listsQuestions.push({ ID: 1, Clave: "P8", Value: data["P8"], TypeQuestions: { Id: 2, Clave: "YESNO" }, Question: ".-¿Al momento de atender su reporte, el trabajador llegó con la herramienta y material necesario para su reparación?" });
                    listsQuestions.push({ ID: 2, Clave: "P9", Value: data["P9"], TypeQuestions: { Id: 2, Clave: "YESNO" }, Question: ".-¿Al momento de levantar su reporte se estableció fecha y hora de atención de común acuerdo?" });
                    item = { ID: 4, Clave: "C", Nombre: "Calidad", Value: onCalculateAverageGroupQuestions(listsQuestions), Icon: "", Color: "", Questions: listsQuestions };
                    QuestionsGroup.push(item)
                    //
                    let newQuestionsGroup: any = createSuccessfulStoreObject(QuestionsGroup);
                    global.dispatchSuccessful("global-page-data", newQuestionsGroup, INQUEST_QUESTIONS_GROUP);
                    //
                }
            }
        };

        render(): JSX.Element {
            let estadoEntidad: boolean = global.getData(this.props.state).viewMode;
            let entidad: any = global.getData(EK.Store.getState().global.pageConfig);
            return <page.SectionList
                id={INQUEST_QUESTIONS_GROUP}
                parent={entidad.id}
                title={"Preguntas"}
                subTitle={(index: number, item: any) => { return "" }}
                level={1}
                listMode={"literal"}
                style={{ paddingTop: "5px" }}
                onSave={this.onSave.bind(this)}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-th-list"
                size={[12, 12, 12, 12]}
                listHeader={null}
                listFooter={null}
                formatter={(index: number, item: any) => {
                    return <Row >
                        <div>
                            <span style={{ fontStyle: "italic", fontSize: "18px" }}>{item.Nombre} </span>
                            <span className="pull-right" style={{ textAlignLast: "right", fontStyle: "italic" }} >Total {item.Nombre}: <i className="badge badge-info">{EK.UX.Labels.formatDecimal(item.Value)}</i></span>
                        </div>
                        <List
                            items={global.createSuccessfulStoreObject(item.Questions)}
                            readonly={true}
                            listMode={"literal"}
                            listHeader={null}
                            addRemoveButton={false}
                            formatter={(_index: number, _item: any): any => {
                                return <Row style={{ paddingTop: "2px" }}>
                                    <Column size={[5, 8, 8, 8]}  >
                                        <div> {_item.Question} </div>
                                    </Column>
                                    <Column size={[7, 4, 4, 4]}  >
                                        <RenderingTypeQuestions size={[12, 12, 12, 12]} renderingElement={_item} />
                                    </Column>
                                </Row>
                            }} />
                    </Row>
                }}>
            </page.SectionList>;
        };
    });
};

import ModalInquestReportSPV = EK.Modules.SCV.Pages.postventa.RUBA.inquestSPV.IncuestModalBase;