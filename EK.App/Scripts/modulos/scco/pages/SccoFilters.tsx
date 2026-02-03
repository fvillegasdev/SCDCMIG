namespace EK.Modules.SCCO.Filtros {
    const PAGE_ID: string = "scco$filters";
    const PAGE_SIDEBAR_ID: string = "scco$sidebar";

    export interface ISCCOFiltersProps extends React.Props<any> {
        app?: global.DataElement;
        pageId?: string;
        config?: page.IPageConfig;
        entidad?: global.DataElement;
        entityType?: global.DataElement;
        onFilter?: (props: any, filters: any) => void;
        obra: any;
    };

    export const isValid: () => boolean = (): boolean => {
        let state: any = EK.Store.getState();

        let $filters: any = Forms.getValues(PAGE_ID);
        if ($filters) {
            let filters: any = global.getFilters($filters);

            let pageId = global.getData(state.global.page).id;
            if (pageId === "TabuladoresInsumos") {
                return (filters.IdObra > 0 && filters.IdTipoPresupuesto > 0);
            } else {
                return (filters.IdObra > 0 && filters.IdTipoPresupuesto > 0 && filters.IdTabulador > 0);
            }
        };

        return false;
    };

    class $SCCOFilters extends React.Component<ISCCOFiltersProps, ISCCOFiltersProps>{
        constructor(props: ISCCOFiltersProps) {
            super(props);
            this.getUserKey = this.getUserKey.bind(this);
            this.onShowSideBar = this.onShowSideBar.bind(this);
            this.onApplyChanges = this.onApplyChanges.bind(this);
        };
        static props: any = (state: any) => ({
            app: state.global.app,
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
            entityType: state.global.currentEntityType,
            pageId: global.getData(state.global.page).id,
            obra: Forms.getDataValue("Obra", PAGE_SIDEBAR_ID, state)
        });
        getUserKey(): string {
            let retValue: string = "";
            //
            if (global.isSuccessful(this.props.app)) {
                let me: any = global.getData(this.props.app).Me;
                if (me && !global.isEmptyObject(me)) {
                    retValue = [PAGE_ID, "$user$", me.ID].join("");
                };
            };
            //
            return retValue;
        };
        componentWillReceiveProps(nextProps: ISCCOFiltersProps) {
            if (global.hasChanged(this.props.obra, nextProps.obra)) {
                if (global.getDataID(this.props.obra) !== global.getDataID(nextProps.obra)) {
                    if (isSuccessful(nextProps.obra)) {
                        if (global.getDataID(nextProps.obra) > 0) {
                            let obra: any = global.getData(nextProps.obra);
                            if (obra) {
                                Forms.updateFormElement(PAGE_SIDEBAR_ID, "Tabulador", obra.Tabulador)
                            }                            
                        };
                    };
                };
            };
        };
        componentDidMount(): void {
            try {
                if (global.supportLocalStorage() === true) {
                    try {
                        let key: string = this.getUserKey();
                        let obj: string = global.getLocalStorage().getItem(key);
                        if (obj) {
                            let model: any = JSON.parse(obj);
                            if (model) {
                                for (var prop in model) {
                                    let itemValue: any = model[prop];
                                    if (itemValue) {
                                        Forms.updateFormElement(PAGE_ID, prop, itemValue);
                                    };
                                };
                            };
                        };
                    } catch (e) { }
                };
            } catch (e) { };
        };
        onShowSideBar(): void {
            Forms.remove(PAGE_SIDEBAR_ID);
            //
            let values: any = Forms.getValues(PAGE_ID);
            if (values) {
                for (var p in values) {
                    let itemValue: any = values[p];
                    if (itemValue) {
                        Forms.updateFormElement(PAGE_SIDEBAR_ID, p, itemValue);
                    }
                };
            };
            //
            global.showSidebar("tb_sb_scco_filters");
        };
        onApplyChanges(): void {
            if (!Forms.isValid(PAGE_SIDEBAR_ID)) {
                global.warning("Los datos están incompletos, verificar campos requeridos y validaciones.");
                return;
            };
            //
            let item: global.EditForm = Forms.getForm(PAGE_SIDEBAR_ID);
            let model: any = item
                .addObject("Obra")
                .addObject("Tabulador")
                .addObject("TipoPresupuesto")
                .toObject();
            //
            Forms.remove(PAGE_ID);
            //
            if (this.props.pageId) {
                if (this.props.pageId === "TabuladoresInsumos") {
                    let idEntidad: number = global.getDataID(this.props.entidad);
                    if (idEntidad && idEntidad > 0) {
                        model = global.assign(model, { IdTabulador: idEntidad, Tabulador: global.getData(this.props.entidad) });
                    };
                };
            };
            //
            if (model) {
                for (var prop in model) {
                    let itemValue: any = model[prop];
                    if (itemValue) {
                        Forms.updateFormElement(PAGE_ID, prop, itemValue);
                    };
                };
                //
                try {
                    if (global.supportLocalStorage() === true) {
                        let key: string = this.getUserKey();
                        global.getLocalStorage().removeItem(key);
                        global.getLocalStorage().setItem(key, JSON.stringify(model));
                    };
                } catch (e) { };
            };
            //
            if (this.props.onFilter) {
                let filters: any = global.getFilters(model);
                //
                this.props.onFilter(this.props, filters);
            };
            //
            global.closeSidebar("tb_sb_scco_filters");
        };
        render(): JSX.Element {
            let displayObra: boolean;
            let displayTabulador: boolean;
            let displayTipoPresupuesto: boolean;
            //
            if (this.props.pageId) {
                if (this.props.pageId === "TabuladoresInsumos") {
                    displayObra = true;
                    displayTipoPresupuesto = true;
                } else {
                    displayObra = true;
                    displayTabulador = true;
                    displayTipoPresupuesto = true;
                }
            };
            //
            return <Column size={[12, 12, 12, 12]}>
                <Sidebar id="tb_sb_scco_filters">
                    <div className="c-sidebar-scco-filter-title">
                        <i className="fas fa-cog"></i>
                        <span>Filtros SCCO</span>
                    </div>
                    <Row>
                        {displayObra === true ? <ddl.SCCO$ObrasDDL size={[12, 12, 12, 12]} idFormSection={PAGE_SIDEBAR_ID} addNewItem="SO" required={true} validations={[validations.required()]} /> : null}
                        {displayTabulador === true ? <ddl.SCCOTabuladoresDDL size={[12, 12, 12, 12]} idFormSection={PAGE_SIDEBAR_ID} addNewItem="SO" required={true} validations={[validations.required()]} /> : null}
                        {displayTipoPresupuesto === true ? <ddl.SCCOTiposPresupuestoDDL size={[12, 12, 12, 12]} idFormSection={PAGE_SIDEBAR_ID} addNewItem="SO" required={true} validations={[validations.required()]} /> : null}
                        <Column size={[12, 12, 12, 12]} style={{ marginTop: 15 }}><button type="button" className="btn btn-sm blue pull-right" onClick={this.onApplyChanges}>Aplicar Cambios</button></Column>
                    </Row>
                </Sidebar>
                <page.OptionSection
                    id={PAGE_ID}
                    subTitle="Filtros SCCO"
                    icon="fa fa-edit"
                    collapsed={false}
                    hideCollapseButton={false}
                    level={1}>
                    <buttons.SectionButtons>
                        <Button className="btn-ico-ek white" iconOnly={true} color="white" icon="fas fa-pencil" onClick={this.onShowSideBar} />
                    </buttons.SectionButtons>
                    <Row>
                        {displayObra === true ? <label.Link id="Obra" label="Obra" idForm={PAGE_ID} size={[12, 12, 4, 4]} link={"#/scco/Obra/:id"} /> : null}
                        {displayTabulador === true ? <label.Tabulador id="Tabulador" label="Tabulador" idForm={PAGE_ID} link={"#/scco/TabuladoresInsumos/:id"} /> : null}
                        {/*displayTabulador === true ? <label.Link id="Tabulador" label="Tabulador" idForm={PAGE_ID} size={[12, 12, 4, 4]} link={"#/scco/TabuladoresInsumos/:id"} /> : null*/}
                        {displayTipoPresupuesto === true ? <label.Entidad id="TipoPresupuesto" label="Tipo Presupuesto" idForm={PAGE_ID} size={[12, 12, 4, 4]} /> : null}
                    </Row>
                </page.OptionSection>
            </Column>
        };
    };

    export const SCCOFilters: any = ReactRedux.connect($SCCOFilters.props, null)($SCCOFilters);
};