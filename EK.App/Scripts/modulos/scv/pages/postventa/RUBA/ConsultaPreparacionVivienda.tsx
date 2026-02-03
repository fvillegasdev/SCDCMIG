namespace EK.Modules.SCV.Pages.postventa.RUBA.ConsultaPreparacionVivienda {
    //Consulta Preparacion de Vivienda
    const PAGE_ID: string = "ConsultaPreparacionVivienda";
    const PAGE_RESULT: string = "ConsultaPreparacionViviendaResult";
    const SECTION_CONCEPTO_ID: string = "ConsultaVE";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv", [PAGE_RESULT]);

    const formatBadgeOk: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        data = (data === "True" || data === "SI") ? true : (data === "False" || data === "NO") ? false : data;
        return <div style={{ textAlign: "center" }}>{label.ok(data)}</div>
    };
    //
    const formatDate: (data: boolean, type: any, row: any) => any = (data: any, type: any, row: any[]): any => {
        data = (data.getFullYear() === 1) ? null : data;
        return <div style={{ textAlign: "center" }}>{label.formatDate(data)}</div>
    };
    const filterFracc = (Fraccionamientos: any) => {
        let fracc: string = "";
        for (const x in Fraccionamientos) {
            fracc += Fraccionamientos[x].ID + ","
        }
        let count = fracc.length;
        let fraccparams = fracc.slice(0, count - 1);
        return fraccparams;
    };
    export class Vista extends page.Base {
        
        onExcel(): void {
            let model: any = Forms.getForm(PAGE_ID);
            let item: any = {};

            if (!Forms.isValid(PAGE_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            };


            item['Plaza'] = model.PlazaInicial.ID;
            item['fechaInicial'] = model.FechaInicio;
            item['fechaFinal'] = model.FechaFinal;
            item['financiamiento'] = model.Financiamiento.ID;
            item['fraccionamiento'] = global.filterFracc(model.Fraccionamientos);
            item['vocaciones'] = model.Vocaciones.ID;
            item['equipamiento'] = model.Equipamiento.ID;
            item['clientesPagados'] = model.ClientesPagados.ID;

            //Exportamos a Excel
            let formName: string = "ConsultaPreparacionVivienda";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "ConsultaPreparacionVivienda/Excel/");
            form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = global.encodeParameters(item);
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);

        }

        onRowDoubleClick(item: any): any {
            return null;
        };

        render(): JSX.Element {
            let ml: any = config.getML();
           

            return <page.Main {...config} pageMode={PageMode.Personalizado} allowSave={false} allowEdit={false} allowDelete={false} allowNew={false}>
                <PageButtons>
                    <ExcelButton onClick={this.onExcel}  />
                </PageButtons>
                <Filtros />
                <ResultView />
            </page.Main>;
        };
    };

    interface IConsultaViviendaEntregableProps extends page.IProps {
        PreparacionVivienda?: DataElement;
        plaza?: any;
        viviendasentregables?: DataElement;
    };

    interface ConsultaViviendaEntregableState {

    };

    let Filtros: any = global.connect(class extends React.Component<IConsultaViviendaEntregableProps, {}> {

        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);

            this.onSelectPreparacionViv = this.onSelectPreparacionViv.bind(this);

        };

        static props: any = (state: any) => ({
            config: global.getPageConfig(state.global.pageConfig),
            plaza: state.global.Plaza_Seleccionada
        });


        //Dispatchs Section
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        });

        componentDidMount(): void {
            global.dispatchSuccessful("global-page-data", [], PAGE_RESULT);
            Forms.updateFormElement([PAGE_ID].join(""), "FechaInicio", new Date(global.getToday(true).getFullYear(), 0, 1));
            Forms.updateFormElement([PAGE_ID].join(""), "FechaFinal", global.getToday(true));
        };


        onSelectPreparacionViv(changeViewMode?: boolean): void {
            if (!Forms.isValid(PAGE_ID)) {
                warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                return;
            };

            let model: any  = Forms.getForm(PAGE_ID);
            let plaza: any = model.PlazaInicial.ID;
            let fechaInicial: any = model.FechaInicio;
            let fechaFinal: any = model.FechaFinal;
            let financiamiento: any = model.Financiamiento.ID;
            let fraccionamiento: any = global.filterFracc(model.Fraccionamientos);
            let vocaciones: any = model.Vocaciones.ID;
            let equipamiento: any = model.Equipamiento.ID; 
            let clientesPagados: any = model.ClientesPagados.ID;
            let segmento: any = model.segmento && model.segmento.ID ? model.segmento.ID !== 9999 ? model.segmento.ID : '-2' : '-2'
            let p: any = global.assign({
                Plaza: plaza,
                FechaInicial: fechaInicial,
                FechaFinal: fechaFinal,
                Financiamiento: financiamiento,
                Fraccionamiento: fraccionamiento,
                Vocaciones: vocaciones,
                Equipamiento: equipamiento,
                ClientesPagados: clientesPagados,
                Segmento: segmento
            });
            global.dispatchAsyncPost("global-page-data", "base/kontrol/ConsultaPreparacionVivienda/GetBP/GetPreparacionVivienda/", { parametros: p }, PAGE_RESULT);
        }

        componentWillReceiveProps(nextProps: IConsultaViviendaEntregableProps, nextState: IConsultaViviendaEntregableProps): void {
            if (getData(nextProps.plaza).ID != getData(this.props.plaza).ID) {
                //Forms.updateFormElement(PAGE_ID, "FraccInicial", null)
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "Vocacion", { ID: -2, Clave: "-2", Nombre: "TODOS" });
                Forms.updateFormElement([PAGE_ID + "$filters"].join(""), "PlazaInicial", getData(nextProps.plaza));
            }
        };

        render(): JSX.Element {
            let idForm: any = EK.Store.getState().forms[PAGE_ID] ? EK.Store.getState().forms[PAGE_ID] : null;
            let color: string = "#d26c35";
            // let className: string = "font-white";
            let className: string = "";
            if (idForm === null || idForm === undefined) {

            } else {
                if (idForm.hasChanged) {
                    color = "white";
                    className = " btn-editing";
                }
            }

            return <Column size={[12, 12, 12, 12]}>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle={"Filtros Reporte de Equipamientos"}
                    level={2}
                    icon="icon-folder"
                    collapsed={false}>
                    <SectionButtons >
                        <Button className={className} keyBtn={"btnSPVFiltrarInformacion"} iconOnly={true} color={color} icon="fa fa-search" onClick={this.onSelectPreparacionViv} style={{ marginRight: 5, color }} />
                    </SectionButtons >
                    <Row>
                        <Column size={[12, 12, 12, 12]} >
                            {/*<PlazasDDL id={"PlazaInicial"} label={"Plaza"} idFormSection={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                            {/*<VocacionesSPVDDL id={"Vocaciones"} idForm={PAGE_ID} size={[12, 12, 4, 4]} validations={[validations.required()]} required={true} />*/}
                            <ddl.PlazasDDL id="PlazaInicial" label={"PLAZAS"} idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.VocacionesFilterDDL id="Vocaciones" idForm={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <ddl.SegmentosDDL id="segmento" idForm={PAGE_ID} size={[12, 12, 3, 3]} />
                            <EquipamientoDDL id={"Equipamiento"} idFormSection={PAGE_ID} size={[12, 12, 3, 3]} validations={[validations.required()]} required={true} />
                            <page.TagsFraccionamientosPlazaVV size={[12, 12, 6, 6]} id="Fraccionamientos" idForm={PAGE_ID} /> 

                           {/* <ddl.TagsFraccionamientosV2 id="Fraccionamientos" idForm={PAGE_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />*/}

                            <FinanciamientoDDL id={"Financiamiento"} idFormSection={PAGE_ID} size={[12, 12, 6, 6]} validations={[validations.required()]} required={true} />
                          
                        </Column>
                    </Row>
                    <Row style={{paddingBottom:'15px'}}>
                        <Column size={[12, 12, 12, 12]} >
                            <ClientesPagadosDDL idForm={PAGE_ID} size={[12, 12, 3, 2]} validations={[validations.required()]} required={true} />
                            <input.Date id={"FechaInicio"} label={"Fecha Inicio"} idFormSection={PAGE_ID} size={[12, 12, 6, 2]} validations={[validations.required()]} />
                            <input.Date id={"FechaFinal"} label={"Fecha Final"} idForm={PAGE_ID} size={[12, 12, 6, 2]} validations={[validations.required()]} />
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;

        }
    });

    export let ResultView: any = page.connect(class extends page.Base {
        constructor(props: IConsultaViviendaEntregableProps) {
            super(props);
            this.onRowDoubleClick = this.onRowDoubleClick.bind(this);
        }

        onRowDoubleClick(item: any): any {
            return null
        };
        render(): JSX.Element {
            let UrlAplicacion: any = window.location;
            let labelInterior = UrlAplicacion.pathname.includes("intra") ? 'DPTO' : 'I';
            let ml: any = config.getML();
            let dtConfig: dt.IDTConfig = dt.createConfig(ml);
            dtConfig.columns
                .add({ data: "Nombre", width: "300px", fixed: true })
                .add({ data: "Equipamiento", width: "130px", format: formatBadgeOk }).toArray();
                if (UrlAplicacion.pathname.includes("intra")) {
                    dtConfig.columns
                        .add({ data: "edificio", title: "Edificio", width: "150px" })
                        .add({ data: "nivel", title: "Nivel", width: "150px" }).toArray();
                }
            dtConfig.columns
                .add({ data: "I", width: "100px", title: labelInterior })
                .add({ data: "dir_casa", width: "200px" })
                .add({ data: "No_Exterior", width: "75px" })
                .add({ data: "dir_email", width: "250px" })
                .add({ data: "CURP", width: "200px" })
                .add({ data: "RFC", width: "200px" })
                .add({ data: "Celular", width: "120px" })
                .add({ data: "tel_casa", width: "120px" })
                .add({ data: "tel_oficina", width: "120px" })
                .add({ data: "desc_tipo_vivienda", width: "200px" })
                .add({ data: "nom_fracc", width: "250px" })
                .add({ data: "Prototipo", width: "200px" })

                if (!UrlAplicacion.pathname.includes("intra")) {
                    dtConfig.columns.add({ data: "ET", width: "60px" })
                        .add({ data: "M", width: "50px" })
                        .add({ data: "L", width: "50px" }).toArray();
                } 
               
                dtConfig.columns
                .add({ data: "nom_financinst", width: "200px" })
                .add({ data: "subsidio", width: "100px", format: formatBadgeOk })
                .add({ data: "Ecocasa", width: "100px", format: formatBadgeOk })
               
                .add({ data: "cve_Equipamiento", width: "150px" })
                .add({ data: "Desc_Equipamiento", width: "200px" })
                .add({ data: "Firma_Escritura", width: "150px", format: formatDate })
                .add({ data: "Firmo", width: "120px", format: formatDate })
                .add({ data: "Etapa_Firma", width: "150px" })
                .add({ data: "Pend_Pago", width: "100px", format: formatBadgeOk })
                .add({ data: "Fec_Pend_Pago", width: "120px", format: formatDate })
                .add({ data: "pago", width: "100px", format: formatBadgeOk })
                .add({ data: "fec_pago", width: "120px", format: formatDate })
                .add({ data: "Cve_Contra", width: "150px" })
                .add({ data: "Nom_Contra", width: "200px" })
                .add({ data: "dias_firma", width: "180px" })
                .add({ data: "FechaEscrituracion", width: "180px", format: formatDate })
                .add({ data: "DiasDesdeEscrituracion", width: "180px" })
                .add({ data: "monto_seguro", width: "100px", format: formatBadgeOk })
                .toArray();

            return <Column size={[12, 12, 12, 12]}>
                <Row>
                    <page.SectionListExtended
                        id={PAGE_RESULT}
                        parent={config.id}
                        icon="fa fa-table"
                        level={1}
                        dtConfig={dtConfig}
                        hideNewButton={true}
                        size={[12, 12, 12, 12]}
                        readonly={true}
                        onRowDoubleClick={this.onRowDoubleClick}
                        items={createSuccessfulStoreObject([])}>
                        <Row>
                        </Row>
                    </page.SectionListExtended>
                </Row>
            </Column>;
        };
    });

   class ClientesPagados$DDL extends React.Component<ddl.IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global[PAGE_ID + "$clientesPagados"]
        });
        static defaultProps: ddl.IDropDrownListProps = {
            id: "ClientesPagados",
            items: createDefaultStoreObject([]),
            label: "Clientes Pagados",
            helpLabel: "Seleccione una opción",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 6, 6],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    return item.text;
                }
                else {
                    return $([
                        "<span class='badge badge-success'> ", item.Clave, " </span>",
                        "<span style='font-size: 90%'> ", item.Nombre, " </span>"
                    ].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                };
                return $([
                    "<span class='badge badge-success'> ", item.Clave, " </span>",
                    "<span style='font-size: 90%'> ", item.Nombre, " </span>"
                ].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let items: any[] = [];
                items.push({ ID: 1, Clave: "S", Nombre: "SI" });
                items.push({ ID: 2, Clave: "N", Nombre: "NO" });
                items.push({ ID: -2, Clave: "T", Nombre: "TODOS" });
                global.dispatchSuccessful("load::" + PAGE_ID + "$clientesPagados", items);
            };
        };
        render(): JSX.Element {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    };
    const ClientesPagadosDDL: any = ReactRedux.connect(ClientesPagados$DDL.props, null)(ClientesPagados$DDL);
};

