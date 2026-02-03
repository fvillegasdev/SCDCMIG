namespace EK.Modules.Kontrol.Pages.TareaEstatus {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tareaEstatus", "kontrol");
    let PAGE_ID = "Tarea de Estatus";
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("Catalogo")
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .toObject();
            if (model.Catalogo == undefined) {
                let catalogo: any = {
                    ID: 0, Clave: config.id, Nombre: ""
                };
                model.Catalogo = catalogo;
            };
            config.dispatchEntityBase(model, "base/kontrol/CGValores/save", undefined, global.HttpMethod.PUT);
            return null;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            config.dispatchEntityBase({ id }, "base/kontrol/CGValores/id/", undefined, global.HttpMethod.POST);
        };
        onEntitySaved(props: page.IProps): void {
            dispatchDefault("global-current-catalogo", {});

        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onWillEntityLoad={this.onWillEntityLoad} onEntitySaved={this.onEntitySaved}>
                <View />
                <Edit />
            </page.Main>;
        };
    }
    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };
    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-info-circle" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus id="Estatus" size={[6, 6, 2, 2]} />
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        }
    }
}


//namespace EK.Modules.Kontrol.Pages {
//    "use strict";

//    const idForm: string = "tareaestatus";
//    const PAGE_ID: string = "tareaEstatus";
//    const CLAVECATALOGO: string = "TAREASTATUS";

//    const form: () => EditForm = (): EditForm => {
//        return new EditForm(idForm);
//    };

//    interface IParams {
//        id: number;
//    }

//    interface IProps extends React.Props<any> {
//        cargarDatos?: (id: number) => void;
//        tareaestatus?: any;
//        params?: IParams;
//        guardar?: (item: any[]) => void;
//        global?: any;
//        isNew?: boolean;
//        inicializaForma?: (idForm: string) => void;
//    }

//    interface IState {
//        viewMode?: boolean;
//    }

//    export class ConnectedPageEditarTareaEstatus extends React.Component<IProps, IState> {
//        constructor(props: IProps) {
//            super(props);
//            this.editForm = this.editForm.bind(this);
//            this.saveForm = this.saveForm.bind(this);
//            this.cancelEditForm = this.cancelEditForm.bind(this);
//            this.state = { viewMode: true };
//        }

//        static defaultProps: IProps = {
//            tareaestatus: undefined,
//            global: {},
//            isNew: false
//        };

//        saveForm(): void {
//            let item: EditForm = Forms.getForm();
//            let model: any = item
//                .addNumberConst("ID", this.props.tareaestatus.data.ID)
//                .addStringConst("ClaveCatalogo", CLAVECATALOGO)
//                .addString("Clave")
//                .addString("Nombre")
//                .addEstatus("Estatus")
//                .toObject();

//            this.props.guardar(model);
//            this.setState({ viewMode: false });
//        }

//        editForm(): void {
//            this.setState({ viewMode: false });
//        }

//        cancelEditForm(): void {
//            let $bc: any = $ml.bc;
//            if (!this.props.isNew && !this.state.viewMode) {
//                this.setState({ viewMode: true });
//            } else {
//                ReactRouter.hashHistory.push("kontrol/tareaestatus");
//            }
//        }

//        shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
//            return hasChanged(this.props.tareaestatus, nextProps.tareaestatus)
//                || (this.state.viewMode !== nextState.viewMode);
//        }

//        componentDidMount(): any {
//            requireGlobal(Catalogos.estatus);

//            if (!this.props.isNew) {
//                if (this.props.params.id) {
//                    this.props.cargarDatos(Number(this.props.params.id));
//                } else {
//                    dispatchFailed("tareaestatus-setSelected", null);
//                }
//            } else {
//                dispatchSuccessful("tareaestatus-setSelected", createSuccessfulStoreObject({}));
//            }
//        };

//        componentDidUpdate(prevProps: IProps, prevState: IState): any {
//            let $page: any = $ml[PAGE_ID];  
//            if (prevProps.tareaestatus.status === AsyncActionTypeEnum.updating) {
//                if (this.props.tareaestatus.status === AsyncActionTypeEnum.successful) {
//                    success($page.mensajes.update);
//                }
//            }
//        }

//        render(): JSX.Element {
//            let current: any = this.props.tareaestatus.data;
//            let $page: any = $ml[PAGE_ID];
//            let $bc: any = $ml.bc;
//            let bc: any = [$bc.global.ek, $bc.kontrol.tareaEstatus,
//            (this.props.isNew ? { text: $page.editar.title, href: $page.editar.href } :
//                { text: current.Clave, href: "" })];           
            
//            let editView: boolean = this.props.isNew || !this.state.viewMode;

//            let title: IPageTitle = {
//                title: !this.props.isNew ? current.Nombre : $page.editar.title,
//                subTitle: !this.props.isNew ? current.Clave : $page.editar.subtitle,
//                children: [EK.UX.Labels.badgeEstatus(this.props.tareaestatus.data.Estatus)]
//            };

//            // create the page component
//            let page: JSX.Element =
//                <PageV2 id={PAGE_ID} breadcrumb={bc} title={title}>
//                    <PageButtons>
//                        {editView ? <SaveButton onClick={this.saveForm} /> : null}
//                        {!editView ? <EditButton onClick={this.editForm} /> : null}
//                        <CancelButton onClick={this.cancelEditForm} />
//                    </PageButtons>
//                            <PanelUpdate info={this.props.tareaestatus}>
//                                {!this.props.isNew && this.state.viewMode
//                                    ? <View data={current}  />
//                                    : <Edit isNew={this.props.isNew} data={current}  />}
//                            </PanelUpdate>                     
//                </PageV2>;
//            //{
//            //    !this.props.isNew
//            //    ? <QuickSidebarTab>
//            //        <InfoItem />
//            //        <History />
//            //    </QuickSidebarTab>
//            //    : null
//            //}
//            return page;
//        }
//    }

//    const mapProps: any = (state: any): any => {
//        return {
//            tareaestatus: state.tareaestatus.selected
//        };
//    };
//    const infoItemMapProps: any = (state: any): any => {
//        return { data: state.tareaestatus.selected };
//    };

//    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {       
//        return {
//            cargarDatos: (id: number): void => {
//                dispatch(EK.Global.actionAsync({
//                    action: "tareaestatus-setSelected",
//                    url: "catalogos/get/" + id
//                }));
//            },
//            guardar: (item: any): void => {
//                dispatch(actionAsync({
//                    action: "tareaestatus-guardar",
//                    type: HttpMethod.PUT,
//                    url: "catalogosgeneralesvalores/save",
//                    data: item,
//                    custom: {
//                        processData: false,
//                        contentType: false
//                    },
//                    status: AsyncActionTypeEnum.updating
//                }));
//            }
//        };
//    };
//    let InfoItem: any = ReactRedux.connect(infoItemMapProps, null)(InfoItemTab);
//    export let PagetareaestatusCatalogo: any = ReactRedux.connect(mapProps, mapDispatchs)(ConnectedPageEditarTareaEstatus);

//    /*** BEGIN: NEW FORM ***/
//    export class Nuevotareaestatus extends React.Component<{}, {}> {
//        render(): JSX.Element {
//            return <PagetareaestatusCatalogo isNew={true} />
//        }
//    };
//    /*** END: NEW FORM ***/

//    /*** BEGIN: EDIT FORM ***/
//    interface IEditProps extends React.Props<any> {
//        data: any;
//        isNew?: boolean;
//    };

//    class Edit extends React.Component<IEditProps, IEditProps> {
//        constructor(props: IEditProps) {
//            super(props);
//        };

//        refs: {
//            form: any;
//        };

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];            
//            let current: any = this.props.data;
//            let Status: boolean = this.props.isNew ? true : (current.Estatus && current.Estatus.Clave === "A") ? true : false;
           
//            return <FadeInColumn>               
//                    <Input id="ID" value={current.ID} label="" visible={false} />
//                    <Input id="Clave" label={$page.form.clave.label} size={[12, 6, 6, 2]}
//                        required={true} value={current.Clave} helpLabel={$page.form.clave.helpLabel}
//                        maxLength={100} validations={[validations.required($page.form.clave.validations)]} />
//                    <Input id="Nombre" label={$page.form.nombre.label} size={[12, 6, 6, 8]} required={true} value={current.Nombre} helpLabel={$page.form.nombre.helpLabel}
//                    maxLength={300} validations={[validations.required($page.form.nombre.validations) ]} />
//                    <CheckBoxStatus id="Estatus" label={$page.form.estatus.label} size={[12, 6, 6, 2]} helpLabel={$page.form.estatus.helpLabel}
//                        required={false} value={Status} disabled={false} style={{ marginTop: 25 }} />               
//            </FadeInColumn>;
//        };
//    }
//    /*** END: EDIT FORM ***/

//    /*** BEGIN: VIEW FORM ***/
//    interface IViewProps extends React.Props<any> {
//        data: any;
//    };

//    class View extends React.Component<IViewProps, IViewProps> {
//        constructor(props: IViewProps) {
//            super(props);
//        }

//        render(): JSX.Element {
//            let $page: any = $ml[PAGE_ID];   
//            let current: any = this.props.data;
//            let Status: boolean = (current.Estatus && current.Estatus.Clave === "A") ? true : false;

//            return <FadeInColumn>                
//                <Row style={{ marginBottom: 35 }}>
//                    <Label label={$page.form.nombre.label} value={current.Clave} size={[12, 10, 10, 2]} />
//                    <Label label={$page.form.clave.label} value={current.Nombre} size={[12, 12, 12, 10]} />
//                </Row>
//            </FadeInColumn >;
//        };
//    }
//    /*** END: VIEW FORM ***/

//    // History
//    const historyMapProps: any = (state: any): any => {
//        return {
//            data: state.tareaestatus.history[state.tareaestatus.selected.data.ID]
//        };
//    };

//    let History: any = ReactRedux.connect(historyMapProps, null)(HistoryItemCatalogoTab);
//}
