namespace EK.Modules.SCV.Pages.postventa.RUBA.ComiteReunionesAgenda {
    "use strict";
    const PAGE_ID = "ComiteReunionesAgenda";
    const MATERIALES = "Materiales";
    declare const DevExpress: any;
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", []);

    interface IComiteReunionesAgenda extends page.IProps {
        modeEdit: any,
        initTable?: (data: any) => void,
        loadCatalogo: () => void,
        entity: any,
        entityItem: any,
        loadData: any,
        comiteSelected: any,
        itemsLoad: (data) => void,
        MaterialesReunion: any,
        AgendaReuniones: any,
        Event:any
    };

    let getData = (IdComite: number) => {
        let loader = document.getElementById('loading');
        let loaded = document.getElementById('loadedData');
        let calendar: any = $('#AgendaReuniones');
        let date = new Date(calendar.fullCalendar('getDate').format());
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let parametros = global.assign({
            IDCOMITE: IdComite,
            MONTH: month,
            YEAR: year,
        })

        global.asyncPost("base/kontrol/Comites/GetBP/GetAgenda/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
            switch (status) {
                case AsyncActionTypeEnum.successful:
                    console.log(data)
                    dispatchSuccessful("load::AgendaReuniones", data)

                    loader.style.display = 'none';
                    loaded.style.display = 'inherit';
                    break;
                case AsyncActionTypeEnum.loading:
                    loader.style.display = 'block';
                    loaded.style.display = 'none'
                    break;
                case AsyncActionTypeEnum.failed:
                    loader.style.display = 'none';
                    loaded.style.display = 'inherit';
                    break;
            }
        })
    }

    export let Vista = global.connect(class extends React.Component<IComiteReunionesAgenda, {}> {
        constructor(props: IComiteReunionesAgenda) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({

        })

        componentWillReceiveProps(nextProps: IComiteReunionesAgenda): void {

        }
        componentDidMount(): any {
            dispatchSuccessful("load::modeEdit", { modeEdit: false })
            dispatchSuccessful("load::Event", [])
            Forms.updateFormElement(PAGE_ID, "Comites", { ID: -1, Clave: "Seleccione una opción", Descripcion: "Seleccione una opción" });
        };
        render(): JSX.Element {
            let fecha = global.getToday();
            let className: string = "btn-editing";
            let color: string = "black";
            return <page.Main {...config} pageMode={PageMode.Personalizado}>
                <PageButtons>

                </PageButtons>
                <ComiteReunionesAgenda />
                <ModalDetalles />
            </page.Main>;
        };
    });
    //========================================================================
    // AGENDA REUNIONES 
    //=========================================================================
    const ComiteReunionesAgenda: any = global.connect(class extends React.Component<IComiteReunionesAgenda, {}>{
        constructor(props: IComiteReunionesAgenda) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEdit = state.global.modeEdit;
            retValue.comiteSelected = state.global.COMITES_Seleccionada;
            retValue.MaterialesReunion = state.global.Materiales;
            retValue.AgendaReuniones = state.global.AgendaReuniones;
            retValue.Event = state.global.Event;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        componentWillReceiveProps(nextProps: IComiteReunionesAgenda): void {
            if (hasChanged(this.props.comiteSelected, nextProps.comiteSelected) && getDataID(this.props.comiteSelected) !== getDataID(nextProps.comiteSelected)) {
                if (isSuccessful(nextProps.comiteSelected) && nextProps.comiteSelected.data.ID > 0) {
                    let data: any = global.getData(nextProps.comiteSelected);
                    Forms.updateFormElement(PAGE_ID, "Plaza", data.Plaza)
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", data.Fraccionamiento)
                    Forms.updateFormElement(PAGE_ID, "Segmento", data.SegmentoNombre)

                    getData(data.ID);
                } else if (isSuccessful(nextProps.comiteSelected) && nextProps.comiteSelected.data.ID === -2) {
                    console.log("todos")
                    Forms.updateFormElement(PAGE_ID, "Plaza", null)
                    Forms.updateFormElement(PAGE_ID, "Fraccionamiento", null)
                    Forms.updateFormElement(PAGE_ID, "Segmento", null)
                    getData(-2);

                };

            };
            if (hasChanged(this.props.Event, nextProps.Event) && global.isSuccessful(nextProps.Event)) {
                if (isSuccessful(nextProps.Event) && nextProps.Event.data.length > 0) {
                    let data: any = global.getData(nextProps.Event);
                    console.log(data[0])
                    Forms.updateFormElement(PAGE_ID, "ComiteLabel", data[0].Comite)
                    Forms.updateFormElement(PAGE_ID, "FechaLabel", data[0].FechaReunion.toLocaleDateString())
                    Forms.updateFormElement(PAGE_ID, "RealizadaLabel", data[0].Realizada ? "SI" : "NO")
                };
            };
        }
        componentWillUnmount() {
            Forms.reset(PAGE_ID);
            dispatchDefault("load::AgendaReuniones", null);
        };
        onPrintGrid(): void {
            //console.log('sds');
            let model = Forms.getValues(PAGE_ID);
            let FechaInicio = model.FechaInicio;
            let FechaFin = model.FechaFin;
            let IdComite = global.getData(EK.Store.getState().global.COMITES_Seleccionada).ID;
            let item: any = {};
            if (IdComite === -1 || IdComite === undefined) {
                warning("Seleccione un comite", "Atencion");
                return
            }
            item['FECHAINICIO'] = FechaInicio;
            item['FECHAFIN'] = FechaFin;
            item['IDCOMITE'] = IdComite;

            let formName: string = "PrintCalendarContractors";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "base/scv/Comites/print/printDocumentAgendaReuniones/");
            form.setAttribute("target", formName);
            //


            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = (JSON.stringify(item));
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);
        };
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let isModeEdit;
            if (isSuccessful(this.props.modeEdit)) {
                isModeEdit = this.props.modeEdit.data.modeEdit;
            }
            let textTitle = "AGENDA DE REUNIONES";
            let icon = "fas fa-list-alt";

            if (isModeEdit) {
                textTitle = "EDITAR";
                icon = "fa fa-edit";
            }

            return <div id="">
                <div id="loading" style={{ display: 'none' }}>
                    <Updating text="Cargando..." />
                </div>
                <Row id="loadedData">
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={textTitle}
                            level={2}
                            icon={icon}
                            collapsed={false}>
                            <SectionButtons >

                            </SectionButtons >

                            <Row >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={"FILTROS"}
                                        level={1}
                                        icon={"fa fa-users"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 12, 12]}>
                                                <ddl.Comites id={"Comites"} label={"Comité"} selectAll={true} size={[12, 12, 6, 4]} idForm={PAGE_ID} validations={[validations.required()]} required={true} />
                                                <label.Label id={"Plaza"} size={[12, 12, 4, 4]} label={"PLAZA"} idForm={PAGE_ID} />
                                                <label.Label id={"Segmento"} size={[12, 12, 4, 4]} label={"Segmento"} idForm={PAGE_ID} />{/**/}
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                <label.Label id={"Fraccionamiento"} size={[12, 12, 4, 4]} label={"Fraccionamiento"} idForm={PAGE_ID} />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </page.OptionSection>
                        <page.OptionSection
                            id={PAGE_ID}
                            subTitle={"CALENDARIO"}
                            level={2}
                            icon={icon}
                            collapsed={false}>
                            <SectionButtons >

                            </SectionButtons >

                            <Row >
                                <Column size={[12, 12, 12, 12]}>
                                    <page.OptionSection
                                        id={PAGE_ID}
                                        subTitle={""}
                                        level={1}
                                        icon={"fa fa-calendar"}
                                        collapsed={false}>
                                        <Row>
                                            <Column size={[12, 12, 5, 5]} style={{ float: "Right", top: "10px", bottom: "10px", paddingBottom: "20px" }}  >
                                                <div className="input-group right-addon">
                                                    <DatePicker id={"FechaInicio"} size={[6, 6, 6, 6]} label={"Fecha Inicio"} type="date" idForm={this.props.config.id} value={global.getObtenerFecha()} validations={[validations.required()]} />
                                                    <DatePicker id={"FechaFin"} size={[6, 6, 6, 6]} label={"Fecha Fin"} type="date" idForm={this.props.config.id} value={global.getObtenerFecha()} validations={[validations.required()]} />
                                                    <span className="input-group-btn">
                                                        <Button className="btn default" onClick={() => this.onPrintGrid()} style={{ height: "30px", top: "10px", left: "-14px", color: "rgb(38, 194, 129)" }}>
                                                            <i className="fas fa-print"></i>
                                                        </Button>
                                                    </span>
                                                </div>
                                            </Column>
                                            <Column size={[12, 12, 12, 12]}>
                                                <calendar.GlobalAgendaReuniones id="AgendaReuniones" idForm={PAGE_ID} applyValuesControl="FechaInicio" minTime="07:00:00" maxTime="20:00:00" />
                                            </Column>
                                        </Row>
                                    </page.OptionSection>
                                </Column>
                            </Row>
                        </page.OptionSection>
                    </Column>
                </Row>
            </div >
        };
    });

    const ModalDetalles: any = global.connect(class extends React.Component<IComiteReunionesAgenda, {}>{
        constructor(props: IComiteReunionesAgenda) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.modeEditIntegrantes = state.global.modeEditIntegrantes;
            return retValue;
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        })
        onSave() {
            let Realizada = Forms.getValue("Realizada", "CHECKREALIZADA");
            let data = global.getData(EK.Store.getState().global.Event)
            let IdReunion = data[0].ID
            let Comite = Forms.getValue("Comites", PAGE_ID)
            let parametros = global.assign({
                ID: IdReunion,
                REALIZADA: Realizada ? 1 : 0
            })
            global.asyncPost("base/kontrol/Comites/GetBP/SaveRealizada/", { parametros: parametros }, (status: AsyncActionTypeEnum, data: any) => {
                switch (status) {
                    case AsyncActionTypeEnum.successful:
                        if (data[0].code === 0) {
                            success(data[0].msg, "Exito");
                            Forms.reset("CHECKREALIZADA");
                            dispatchSuccessful("load::Event", [])
                            getData(Comite.ID)
                            let modalAgenda: any = $("#ModalAgendaReuniones");
                            modalAgenda.modal('hide');
                        } else {
                            warning("Ha ocurrido un error", "Atención");
                        }
                        break;
                    case AsyncActionTypeEnum.loading:
                        break;
                    case AsyncActionTypeEnum.failed:
                        dispatchSuccessful("load::Load", { load: false })
                        break;
                }
            })
        }
        footerModal(): JSX.Element {
            let realizada;
            if (isSuccessful(EK.Store.getState().global.Event)) {
                let data = global.getData(EK.Store.getState().global.Event)
                if (data.length > 0) {
                    realizada = data[0].Realizada
                }
            }
            return <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                {
                    !realizada ?
                        <button type="button" className="btn btn-primary" onClick={this.onSave} >Guardar</button>
                        : null
                }
            </div>;
        };
        render(): JSX.Element {
            let className: string = "btn-editing";
            let color: string = "white";
            let load;
            let realizada;
            if (isSuccessful(EK.Store.getState().global.Load)) {
                load = global.getData(EK.Store.getState().global.Load).load;
            }
            if (isSuccessful(EK.Store.getState().global.Event)) {
                let data = global.getData(EK.Store.getState().global.Event)
                if (data.length > 0) {
                    realizada = data[0].Realizada
                }
            }
            return <modal.Modal id="ModalAgendaReuniones" header={"Check Reuniones"} footer={this.footerModal()}
                style={{ width: "35%" }} addDefaultCloseFooter={false}>
                            {
                                load ? <div className="alert alert-info" style={{ marginTop: 20 }}>
                                    <AwesomeSpinner text="Cargando datos..." paddingBottom={0} paddingTop={0} size={25} icon={"fas fa-sync-alt"} colorClass={"font-blue"} />
                                </div>
                                    : null
                            }
                            {
                                !load ? <Row>
                                    <Column size={[12, 12, 12, 12]}>
                                        <label.Label id={"ComiteLabel"} size={[12, 12, 12, 12]} label={"Comite"} idForm={PAGE_ID} />
                                        <label.Label id={"FechaLabel"} size={[12, 12, 12, 12]} label={"Fecha de Reunion"} idForm={PAGE_ID} />
                                        {
                                            realizada ?
                                                <label.Label id={"RealizadaLabel"} size={[12, 12, 12, 12]} label={"Realizada"} idForm={PAGE_ID} />
                                                :null
                                        }
                                        {
                                            !realizada ?
                                                <checkBox.CheckBox id={"Realizada"} idFormSection={"CHECKREALIZADA"} label={"Realizada"} size={[12, 12, 12, 12]} />
                                                : null
                                        }
                                    </Column>
                                </Row>
                                    : null
                            }
            </modal.Modal>
        };
    });
};