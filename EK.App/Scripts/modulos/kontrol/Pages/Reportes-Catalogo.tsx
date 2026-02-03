namespace EK.Modules.Kontrol.Pages.Reportes {
    "use strict";

    const FILTROS_ID: string = "Filtros";
    const CAMPOS_ID: string = "Campos";
    const CAMPOS_SEL_ID: string = "CamposSel";
    const CAMPOS_LOADING_ID: string = "CamposLoading";
    const RPBI_ID: string = "RPBI";
    const config: page.IPageConfig = global.createPageConfig("reportes", "kontrol", [CAMPOS_ID, FILTROS_ID, CAMPOS_LOADING_ID, CAMPOS_SEL_ID, RPBI_ID]);

    export class Edicion extends page.Base {
        constructor(props: page.IProps) {
            super(props);

            this.printReport = this.printReport.bind(this);
            this.updateCampos = this.updateCampos.bind(this);
            this.saveForm = this.saveForm.bind(this);
        };
        updateCampos(campos: any): any {
            //let nCampos: any[] = [];
            //
            $("#camposContainer").find(".resizable").each((index: number, elem: any) => {
                let path: string = $(elem).attr("data-path");

                for (var i = 0; i < campos.length; i++) {
                    if (path === campos[i].Clave) {
                        //let nCampo: any = global.assign(campos[i]);
                        campos[i].Width = parseInt($(elem).data("width"));
                        //nCampos.push(nCampo);
                        //
                        break;
                    };
                };
            });
            Forms.updateFormElement(config.id, "Campos", global.createSuccessfulStoreObject(campos));
            //
            return campos;
        };
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addString("SubTitulo")
                .addObject("Entidad")
                .addObject("PlantillaEnc")
                .addObject("PlantillaPP")
                .addObject("Campos")
                .addObject("Filtros")
                .addObject("Categoria")
                .addObject("TipoReporte")
                .addEstatus()
                .addVersion()
                .toObject();

            //
            if (model.TipoReporte.Clave === "RKV10") {
                model.Campos = this.updateCampos(model.Campos);
            }
            else if (model.TipoReporte.Clave === "RPBI") {
                let modelPBI: any = (new EditForm(RPBI_ID)).addObject("ReportePBI");

                model.PlantillaEnc = null;
                model.PlantillaPP = null;
                model.ReportePBI = modelPBI.ReportePBI;
            };
            
            //
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let reporte: any = getData(props.entidad);
            let idReporte = getDataID(props.entidad);


            if (idReporte <= 0 || idReporte === undefined) {
                global.dispatchSuccessful("global-page-data", [], CAMPOS_ID);
                global.dispatchSuccessful("global-page-data", [], FILTROS_ID);
            }
            else {
                global.dispatchSuccessful("global-page-data", reporte.Campos, CAMPOS_ID);
                global.dispatchSuccessful("global-page-data", reporte.Filtros, FILTROS_ID);
            };
        };
        onEnterEditMode(props: page.IProps): any {
            if (global.isSuccessful(props.entidad)) {
                let data: any = global.getData(props.entidad);
                //
                if (data.TipoReporte.Clave === "RPBI") {
                    Forms.updateFormElement(RPBI_ID, "ReportePBI", data.ReportePBI);
                };
            };
        };
        printReport(props: any): any {
            let w: any = window;
            let model: any = Forms.getForm(config.id)
                .addID()
                .addClave()
                .addNombre()
                .addString("SubTitulo")
                .addObject("Entidad")
                .addObject("Campos")
                .addObject("Filtros")
                .addObject("PlantillaEnc")
                .addObject("PlantillaPP")
                .addObject("Categoria")
                .addObject("TipoReporte")
                .addEstatus()
                .addVersion()
                .toObject();
            
            if (model.TipoReporte.Clave === "RKV10") {
                model.Campos = this.updateCampos(model.Campos); //nCampos;
            }
            else if (model.TipoReporte.Clave === "RPBI") {
                model.ReportePBI = Forms.getValue("ReportePBI", RPBI_ID);
            };
            
            //
            let formName: string = "pdfDocument";
            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", props.action);
            form.setAttribute("target", props.target);
            //form.setAttribute("action", "kontrol/reportes/preview");
            //form.setAttribute("target", formName);
            //
            var input = document.createElement("input");
            input.type = "hidden";
            input.name = "data";
            input.value = global.encodeParameters(model);
            form.appendChild(input);
            //
            document.body.appendChild(form);
            //
            //window.open("about:blank", formName);
            //
            form.submit();
            //
            document.body.removeChild(form);
        };
        render(): JSX.Element {
            //<Button icon="icon-ek-128" color={"white"} className={"btn btn-default-ek btn-sm white"} onClick={() => { this.printReport(); }} />
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded} onEnterEditMode={this.onEnterEditMode}>
                <PageButtons>
                    <modal.ModalButton icon="icon-ek-128" className="btn btn-default-ek btn-sm white" url="kontrol/reportes/preview/?modal=1" onShowModal={this.printReport} />
                </PageButtons>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    interface IEditState {
        camposClassState: string;
    };
    interface IEditProps extends page.IProps {
        operadores?: DataElement;
        operadoresLogicos?: DataElement;
        tiposDatos?: DataElement;
        alineacion?: DataElement;
    };
    const Edit: any = page.connect(class extends React.Component<IEditProps, IEditState> {
        constructor(props: IEditProps) {
            super(props);

            this.state = { camposClassState: "reporter-fields-container-compressed" };
        };
        //
        static props: any = (state: any) => ({
            operadores: state.global.TIPOOPERADOR,
            operadoresLogicos: state.global.TIPOOPERADORLOGICO,
            tiposDatos: state.global.TIPOSDATO,
            alineacion: state.global.HALINEACION
        });
        //
        componentWillMount(): any {
            if (!isLoadingOrSuccessful(this.props.operadoresLogicos)) {
                dispatchAsync("load::TIPOOPERADORLOGICO", "catalogos/get(TIPOOPERADORLOGICO)");
            };
            if (!isLoadingOrSuccessful(this.props.operadores)) {
                dispatchAsync("load::TIPOOPERADOR", "catalogos/get(TIPOOPERADOR)");
            };
            if (!isLoadingOrSuccessful(this.props.tiposDatos)) {
                dispatchAsync("load::TIPOSDATO", "catalogos/get(TIPODATO)");
            };
            if (!isLoadingOrSuccessful(this.props.alineacion)) {
                dispatchAsync("load::HALINEACION", "catalogos/get(HALINEACION)");
            };

            //Forms.updateFormElement(config.id, CAMPOS_ID, )
        };
        //
        render(): JSX.Element {
            let displayKV10: boolean = false;
            let displayPBI: boolean = false;

            let tipoReporte: any = Forms.getValue("TipoReporte", config.id);
            let idReporte: any = Forms.getValue("ID", config.id);
            if (tipoReporte) {
                if (tipoReporte.Clave === "RKV10") {
                    displayKV10 = true;
                }
                else if (tipoReporte.Clave === "RPBI") {
                    displayPBI = true;
                };
            };

            return <page.Edit>
                <div className={"reporter-fields-container " + this.state.camposClassState}>
                    <Button icon="fa fa-expand" color={"white"} className={"btn btn-default-ek  btn-sm white reporter-btn-expand"}
                        onClick={() => { this.setState({ camposClassState: "reporter-fields-container-expanded" }); }} />
                    <Button icon="fa fa-compress" color={"white"} className={"btn btn-default-ek  btn-sm white reporter-btn-compress"}
                        onClick={() => { this.setState({ camposClassState: "reporter-fields-container-compressed" }); }} />
                    <div className="reporter-selector"><ddl.EntidadesDDL /></div>
                    <Column className="reporter-fields"><ReporteTreeView /></Column>
                </div>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-money" title={"Generales"} collapsed={false} hideCollapseButton={true}>
                            <input.Clave size={[12, 2, 2, 2]} />
                            <input.Nombre size={[12, 4, 4, 4]} />
                            <input.Text id="SubTitulo" maxLength={150} size={[12, 4, 4, 4]} />
                            <checkBox.Status size={[6, 1, 1, 1]} />
                            {idReporte > 0 ? <label.Entidad id="TipoReporte" size={[12, 12, 6, 6]} /> : <ddl.TiposReporte size={[12, 12, 6, 6]} /> }
                            <ddl.CategoriasReporte size={[12, 12, 6, 6]} />
                            {displayKV10 === true ? <ddl.PlantillasDDL id="PlantillaEnc" size={[12, 12, 6, 6]} /> : null}
                            {displayKV10 === true ? <ddl.PlantillasDDL id="PlantillaPP" size={[12, 12, 6, 6]} /> : null}
                            {displayKV10 === true ?
                                <Column style={{ marginTop: 10 }}>
                                    <page.OptionSection id="RKV10" icon="fa fa-list" level={1} collapsed={false}>
                                        <Column size={[12, 12, 12, 12]} style={{ paddingTop: 15 }}>
                                            <ListaFiltros />
                                        </Column>
                                        <Column size={[12, 12, 12, 12]}>
                                            <ListaColumnas />
                                        </Column>
                                    </page.OptionSection>
                                </Column> : null}
                            {displayPBI === true ?
                                <Column style={{ marginTop: 10 }}>
                                    <page.OptionSection id={RPBI_ID} icon="fa fa-list" level={1} collapsed={false}>
                                        <ddl.ReportesPBI idFormSection={RPBI_ID} size={[12, 12, 6, 6]} validations={validations.required()} />
                                    </page.OptionSection>
                                </Column> : null}
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.Edit>;
        };
    });
    export interface IReporteTreeView extends React.Props<any> {
        entidad?: any;
        campos?: DataElement;
        camposLoading?: DataElement;
    };
    const ReporteTreeView: any = global.connect(class extends React.Component<IReporteTreeView, IReporteTreeView> {
        constructor(props: IReporteTreeView) {
            super(props);

            this.onNodeClick = this.onNodeClick.bind(this);
            this.appendData = this.appendData.bind(this);
        };
        //
        static props: any = (state: any) => ({
            entidad: Forms.getValue("Entidad", config.id, state),
            campos: state.global.catalogo$CamposSel,
            camposLoading: state.global.catalogo$CamposLoading
        });
        //
        shouldComponenteUpdate(nextProps: IReporteTreeView): any {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.campos, nextProps.campos);
        };
        componentWillReceiveProps(nextProps: IReporteTreeView): any {
            if (global.hasChanged(nextProps.entidad, this.props.entidad)) {
                if (nextProps.entidad.Clave) {
                    config.dispatchCatalogoBase("base/Kontrol/Entidades/Get/GetEntidadCampos/", { Clave: nextProps.entidad.Clave }, CAMPOS_LOADING_ID);
                };
            };
            if (global.hasChanged(this.props.camposLoading, nextProps.camposLoading)) {
                if (global.isSuccessful(nextProps.camposLoading)) {
                    let campos: any[] = global.getData(this.props.campos);
                    let camposLoading: any[] = global.getData(nextProps.camposLoading);
                    let nombre: string = Forms.getValue("Entidad", CAMPOS_LOADING_ID);

                    camposLoading = camposLoading.map((value: any, index: number) => {
                        return global.assign(value);
                    });
                    //
                    if (!nombre) {
                        //
                        campos = this.appendData("", camposLoading, null, "");
                        //
                        global.dispatchSuccessful("global-page-data", campos, CAMPOS_SEL_ID);
                        //
                    }
                    else {
                        //
                        Forms.updateFormElement(CAMPOS_LOADING_ID, nombre, camposLoading);
                        //
                        campos = this.appendData(nombre, campos, camposLoading, "");
                        //
                        global.dispatchSuccessful("global-page-data", campos, CAMPOS_SEL_ID);
                        //
                        Forms.updateFormElement(CAMPOS_LOADING_ID, "Entidad", undefined);
                        //
                    }
                };
            };
        };
        componentDidMount(): any {
            if (this.props.entidad && this.props.entidad.ID) {
                config.dispatchCatalogoBase("base/Kontrol/Entidades/Get/GetEntidadCampos/", { Clave: this.props.entidad.Clave }, CAMPOS_LOADING_ID);
            };
        };
        appendData(dt: string, campos: any[], data: any[], path: string): any {
            let retValue: any[] = [];
            for (var i = 0; i < campos.length; i++) {
                let c: any = global.assign(campos[i]);
                let nodePath: string = path + (path ? "." : "") + c.Nombre;

                if (data) {
                    if (c.SourceDataType.indexOf("$") === 0) {
                        if (c.loaded === true) {
                            c.children = this.appendData(dt, c.children, data, nodePath);
                        }
                        else if (c.SourceDataType === dt) {
                            c.children = this.appendData(dt, data, null, nodePath);
                            c.loaded = true;
                        };
                    };
                };

                if (!c.path) {
                    c.path = nodePath;
                };
                retValue.push(c);
            };

            return retValue;
        };
        onNodeClick(node: any, e: any): any {
            if (node && node.SourceDataType && node.loaded !== true) {
                let dt: string = node.SourceDataType;

                if (dt.substr(0, 1) === "$") {
                    let nombre: string = dt.toLowerCase();
                    let form: any = Forms.getValue(nombre, CAMPOS_LOADING_ID);

                    if (form) {
                        e.preventDefault();
                        e.stopImmediatePropagation();

                        let campos: any[] = global.getData(this.props.campos);
                        let camposLoading: any[] = form;

                        camposLoading = camposLoading.map((value: any, index: number) => {
                            return global.assign(value);
                        });
                        //
                        campos = this.appendData(nombre, campos, camposLoading, "");
                        //
                        global.dispatchSuccessful("global-page-data", campos, CAMPOS_SEL_ID);
                    //
                    }
                    else {
                        Forms.updateFormElement(CAMPOS_LOADING_ID, "Entidad", dt.toLowerCase());
                        config.dispatchCatalogoBase("base/Kontrol/Entidades/Get/GetEntidadCampos/", { Clave: dt.substring(1) }, CAMPOS_LOADING_ID);
                    };
                };
            };
        };
        render(): JSX.Element {
            return <TreeView id="Campos" data={this.props.campos} onItemSelected={this.onNodeClick}></TreeView>;
        };
    });
    export interface IListaColumnasProps extends React.Props<any> {
        entidad?: any;
        campos?: DataElement;
        alineacion?: DataElement;
    };
    const ListaColumnas: any = global.connect(class extends React.Component<IListaColumnasProps, IListaColumnasProps> {
        constructor(props: IListaColumnasProps) {
            super(props);

            this.initResizable = this.initResizable.bind(this);
            this.getDefaultAlineacion = this.getDefaultAlineacion.bind(this);
        };
        //
        static props: any = (state: any) => ({
            entidad: Forms.getValue("Entidad", config.id, state),
            campos: Forms.getValue("Campos", config.id),
            alineacion: state.global.HALINEACION
        });
        //
        getDefaultAlineacion(): any {
            let retValue: any = null;
            if (global.isSuccessful(this.props.alineacion)) {
                let data: any[] = global.getData(this.props.alineacion);

                for (var i = 0; i < data.length; i++) {
                    if (data[i].Clave === "left") {
                        retValue = data[i];
                    };
                };
            };
            return retValue;
        };
        initResizable(): void {
            let elementos: any = $("#camposContainer").find(".resizable");
            let campos = global.getData(Forms.getValue("Campos", config.id));
            //
            elementos.each((index: number, elem: any) => {
                if (!$(elem).data("width")) {
                    let path: string = $(elem).attr("data-path");
                    let width: string = "200";
                    //
                    for (var i = 0; i < campos.length; i++) {
                        if (path === campos[i].Clave && campos[i].Width) {
                            width = campos[i].Width.toString();
                            //
                            break;
                        };
                    };

                    $(elem).data("width", width);
                };
            });

            elementos.each((index: number, elem: any): any => {
                if (!$(elem).data("width")) {
                    $(elem).data("width", "200");
                };
            });
            elementos.resizable(
                {
                    grid: 1,
                    handles: "e"
                }).resize((e) => {
                    let ct: any = $(e.currentTarget);
                    let elem: any = ct.find(".width-field");
                    let elemWidth: string = ct.width().toString();

                    ct.data("width", elemWidth);
                    elem.html(elemWidth);
                });
        }
        shouldComponenteUpdate(nextProps: IListaColumnasProps): any {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.campos, nextProps.campos);
        };
        componentWillReceiveProps(nextProps: IListaColumnasProps): any {
            if (nextProps.campos) {

            };
        };
        componentWillMount(): any {
            let campos: any = this.props.campos;

            if (campos && campos.length >= 0) {
                Forms.updateFormElement(config.id, CAMPOS_ID, global.createSuccessfulStoreObject(campos));
            };
        };
        componentDidMount(): any {};
        componentDidUpdate(): any {};
        render(): JSX.Element {
            let campos: any[] = [];
            if (global.isSuccessful(this.props.campos)) {
                campos = global.getData(this.props.campos);
            };

            // Item 
            let dragOver: any = (e) => {
                $(e.currentTarget).addClass("hover-drop");
            };
            let dragStart: any = (e) => {
                var dragIcon = document.createElement('img');
                dragIcon.src = "Content/Img/document-icon.png";
                dragIcon.width = 100;

                e.dataTransfer.setDragImage(dragIcon, -10, -10);
                e.dataTransfer.setData("path", $(e.currentTarget).attr("data-path"))
                e.dataTransfer.effectAllowed = "move";

                $(e.currentTarget).addClass("reporter-hover-drop");
            };
            let dragEnd: any = (e) => {
                $(e.currentTarget).removeClass("reporter-hover-drop");
            };
            let dragLeave: any = (e) => {
                $(e.currentTarget).removeClass("hover-drop");
            };
            let dragDrop: any = (e) => {
                let id: string = e.dataTransfer.getData("path");
                if (id) {
                    id = id.replace(".", "\\.");
                    id = "#campo_" + id;

                    if ($(e.currentTarget).hasClass("right-drop")) {
                        $(id).closest(".panel-main").insertAfter($(e.currentTarget).closest(".panel-main"));
                    };
                    if ($(e.currentTarget).hasClass("left-drop")) {
                        $(id).closest(".panel-main").insertBefore($(e.currentTarget).closest(".panel-main"));
                    };
                }
                $(e.currentTarget).removeClass("hover-drop");

                //
                let dCampos: any[] = global.getData(Forms.getValue("Campos", config.id));
                let nCampos: any[] = [];

                campos = global.getData(this.props.campos);
                $("#camposContainer").find(".resizable").each((index: number, elem: any) => {
                    let path: string = $(elem).attr("data-path");

                    for (var i = 0; i < campos.length; i++) {
                        if (path === campos[i].Clave) {
                            nCampos.push(global.assign(campos[i]));

                            break;
                        };
                    };
                });

                Forms.updateFormElement(config.id, "Campos", global.createSuccessfulStoreObject(nCampos));
            };
            let removeItem: any = (value: any) => {
                let dCampos: any[] = global.getData(Forms.getValue("Campos", config.id));
                let nCampos: any[] = [];

                let c = global.getData(this.props.campos);

                for (var i = 0; i < c.length; i++) {
                    let item: any = global.assign(c[i]);
                    if (value.Clave !== c[i].Clave) {
                        nCampos.push(item);
                    }
                    else {
                        if (c[i].ID > 0) {
                            item._eliminado = true;
                            nCampos.push(item);
                        };
                    };
                };

                Forms.updateFormElement(config.id, "Campos", global.createSuccessfulStoreObject(nCampos));
            };
            //

            return <page.OptionSection level={1} icon="fa fa-database" title="Campos" collapsed={false}>
                <div id="camposContainer" style={{ minHeight: 110, overflowX: "scroll", whiteSpace: "nowrap", zIndex: 899, margin: "-15px", padding: "0px 15px" }}
                onDrop={(e) => {
                    if (!e.dataTransfer.getData("data")) {
                        return;
                    };

                    e.preventDefault();
                    $("#camposContainer").removeClass("dragEnterContainer");

                    let campos: DataElement = Forms.getValue("Campos", config.id);
                    let dataCampos: any[];
                    let dropCampo: any = JSON.parse(e.dataTransfer.getData("data"));

                    if (campos) {
                        dataCampos = global.getData(campos);
                    };

                    if (!dataCampos || isNaN(dataCampos.length)) {
                        dataCampos = [];
                    };

                    for (var i = 0; i < dataCampos.length; i++) {
                        let c: any = dataCampos[i];

                        if (c.Clave === dropCampo.path) {
                            global.warning("El campo ya fue agregado");

                            return;
                        };
                    };
                    let defaultAlineacion: any = this.getDefaultAlineacion();
                    dataCampos.push({
                        Clave: dropCampo.path,
                        Nombre: dropCampo.Nombre,
                        Titulo: dropCampo.Nombre,
                        Width: 200,
                        IdDataType: dropCampo.DataType.ID,
                        DataType: dropCampo.DataType,
                        SourceName: dropCampo.SourceName,
                        SourceDataType: dropCampo.SourceDataType,
                        Alineacion: defaultAlineacion,
                        IdAlineacion: defaultAlineacion.ID
                    });
                    
                    Forms.updateFormElement(config.id, "Campos", global.createSuccessfulStoreObject(dataCampos));
                }}
                onDragEnter={(e) => {
                    e.preventDefault(); $("#camposContainer").addClass("dragEnterContainer");
                }} 
                onDragLeave={(e) => {
                    e.preventDefault(); $("#camposContainer").removeClass("dragEnterContainer");
                }} 
                onDragEnd={(e) => {
                    e.preventDefault(); $("#camposContainer").removeClass("dragEnterContainer");
                }}
                onDragOver={(e) => { e.preventDefault(); }}>
                    {campos.map((value: any, index: number) => {
                        let idSection: string = "key_" + value.Clave;

                        if (value._eliminado === true) {
                            return null;
                        };

                        return <page.OptionSection
                            id={"key_" + value.Clave}
                            key={value.Clave}
                            level={11}
                            title={""}
                            subTitle={""}
                            icon="fa fa-columns"
                            collapsed={false}
                            inlineEdit={false}
                            hideCollapseButton={true}
                            editMode={false}>
                            <SectionView
                                onUpdated={(e) => {
                                    this.initResizable();
                                }}
                                onMounted={(e) => {
                                    this.initResizable();
                                }}>
                                <div
                                id={"campo_" + value.Clave}
                                className="draggable resizable reporter-column-data"
                                style={{ width: parseInt(value.Width), height: 70, display: "inline-block", cursor: "pointer", overflow: "hidden" }}
                                data-path={value.Clave}
                                draggable={true}
                                onDragStart={dragStart}
                                onDragEnd={dragEnd}
                                onClick={(e: any) => {
                                        let nCampos: any[] = [];
                                        let campos = global.getData(Forms.getValue("Campos", config.id));
                                        //
                                        let currentPath: string = $(e.currentTarget).attr("data-path");
                                        let currentElem: any;
                                        //
                                        $("#camposContainer").find(".resizable").each((index: number, elem: any) => {
                                            let path: string = $(elem).attr("data-path");

                                            for (var i = 0; i < campos.length; i++) {
                                                let nCampo: any = global.assign(campos[i]);
                                                //
                                                if (path === nCampo.Clave) {
                                                    nCampo.Width = parseInt($(elem).data("width"));
                                                    nCampos.push(nCampo);
                                                    //
                                                    break;
                                                };
                                                //
                                                if (currentPath === nCampo.Clave) {
                                                    currentElem = nCampo;
                                                };
                                            };
                                        });
                                        //
                                        for (var i = 0; i < nCampos.length; i++) {
                                            let nCampo: any = nCampos[i];
                                            if (currentPath === nCampo.Clave) {
                                                currentElem = nCampo;
                                                //
                                                break;
                                            };
                                        };
                                        //
                                        Forms.updateFormElement(config.id, "Campos", global.createSuccessfulStoreObject(nCampos));
                                        Forms.updateFormElements(CAMPOS_ID, currentElem);
                                        //
                                        config.setState({ viewMode: false }, "key_" + value.Clave);
                                }}
                                >
                                <div className="left-drop" style={{ position: "relative", float: "left", width: 15, height: "100%"}}
                                    onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}></div>
                                <div className="right-drop" style={{ position: "relative", float: "right", width: 15, height: "100%", marginRight: 3 }}
                                        onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}>
                                        <div onClick={() => removeItem(value)}
                                            style={{ position: "relative", cursor: "pointer", textAlign: "center" }}>
                                            <i className="fa fa-close"></i>
                                        </div>
                                    </div>

                                <div className="bold" style={{fontSize: 11}}>{value.Titulo}</div>
                                <div style={{ fontSize: 10 }}>{value.Clave}</div>
                                <span className="badge badge-success width-field">{value.Width}</span>
                                <span className="badge badge-info">{value.DataType.Nombre}</span>
                                <span className="badge badge-info">{value.Alineacion ? value.Alineacion.Nombre : "default"}</span>
                                </div>
                            </SectionView>
                            <SectionEdit
                                onCancel={() => {
                                    Forms.remove(CAMPOS_ID);

                                    config.setState({ viewMode: true }, idSection);
                                }}
                                onSave={() => {
                                    let entidades: any[] = global.getData(Forms.getValue(CAMPOS_ID, config.id));
                                    let nEntidades: any[] = [];
                                    let entidad: any;

                                    if (!Forms.isValid(CAMPOS_ID)) {
                                        warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                                        return;
                                    };
                                    let item: any = Forms.getForm(CAMPOS_ID)
                                        .addClave()
                                        .addNombre()
                                        .addString("Titulo")
                                        .addNumber("Width")
                                        .addString("SourceName")
                                        .addString("SourceDataType")
                                        .addObject("DataType")
                                        .addObject("Alineacion")
                                        .toObject();

                                    for (var i = 0; i < entidades.length; i++) {
                                        let nEntidad: any = global.assign(entidades[i]);
                                        //
                                        if (item.Clave === nEntidad.Clave) {
                                            nEntidad.Clave = item.Clave;
                                            nEntidad.Nombre = item.Nombre;
                                            nEntidad.Titulo = item.Titulo;
                                            nEntidad.Width = item.Width;
                                            nEntidad.IdDataType = item.IdDataType;
                                            nEntidad.DataType = item.DataType;
                                            nEntidad.SourceName = item.SourceName;
                                            nEntidad.SourceDataType = item.SourceDataType;
                                            nEntidad.IdAlineacion = item.IdAlineacion;
                                            nEntidad.Alineacion = item.Alineacion;
                                        };
                                        //
                                        nEntidades.push(nEntidad);
                                    };
                                    //
                                    Forms.updateFormElement(config.id, CAMPOS_ID, global.createSuccessfulStoreObject(nEntidades));
                                    //
                                    config.setState({ viewMode: true }, idSection);
                                }}>
                                <Row>
                                    <label.Label id="Clave" idForm={CAMPOS_ID} size={[12, 4, 2, 2]}/> 
                                    <input.Text id="Titulo" idFormSection={CAMPOS_ID} size={[12, 8, 5, 5]}/>
                                    <input.Integer id="Width" idFormSection={CAMPOS_ID} size={[6, 4, 1, 1]}/>
                                    <ddl.TiposDatoDDL id="DataType" idFormSection={CAMPOS_ID} size={[6, 4, 2, 2]} />
                                    <ddl.HAlineacionDDL idFormSection={CAMPOS_ID} size={[6, 4, 2, 2]} />
                                </Row>
                            </SectionEdit>
                        </page.OptionSection>;
                })}
                </div>
                </page.OptionSection>;
        };
    });
    export interface IListaFiltrosProps extends React.Props<any> {
        entidad?: any;
        filtros?: DataElement;
        operadores?: DataElement;
        operadoresLogicos?: DataElement;
        tiposDatos?: DataElement;
    };
    const ListaFiltros: any = global.connect(class extends React.Component<IListaFiltrosProps, IListaFiltrosProps> {
        constructor(props: IListaColumnasProps) {
            super(props);

            this.getDefaultOperador = this.getDefaultOperador.bind(this);
            this.getDefaultOperadorLogico = this.getDefaultOperadorLogico.bind(this);
        };
        //
        static props: any = (state: any) => ({
            entidad: Forms.getValue("Entidad", config.id, state),
            filtros: Forms.getValue("Filtros", config.id),
            operadores: state.global.TIPOOPERADOR,
            operadoresLogicos: state.global.TIPOOPERADORLOGICO,
            tiposDatos: state.global.TIPOSDATO
        });
        //
        shouldComponenteUpdate(nextProps: IListaFiltrosProps): any {
            return global.hasChanged(this.props.entidad, nextProps.entidad) ||
                global.hasChanged(this.props.filtros, nextProps.filtros);
        };
        componentWillReceiveProps(nextProps: IListaFiltrosProps): any {
        };
        componentWillMount(): any {
            let filtros: any = this.props.filtros;

            if (filtros && filtros.length >= 0) {
                Forms.updateFormElement(config.id, FILTROS_ID, global.createSuccessfulStoreObject(filtros));
            };
        };
        componentDidMount(): any {
        };
        componentDidUpdate(): any {
        };
        getDefaultOperador(): any {
            let retValue: any = null;
            if (global.isSuccessful(this.props.operadores)) {
                let data: any[] = global.getData(this.props.operadores);

                for (var i = 0; i < data.length; i++) {
                    if (data[i].Clave === "EQ") {
                        retValue = data[i];
                    };
                };
            };
            return retValue;
        };
        getDefaultOperadorLogico(): any {
            let retValue: any = null;
            if (global.isSuccessful(this.props.operadoresLogicos)) {
                let data: any[] = global.getData(this.props.operadoresLogicos);

                for (var i = 0; i < data.length; i++) {
                    if (data[i].Clave === "AND") {
                        retValue = data[i];
                    };
                };
            };
            return retValue;
        };
        render(): JSX.Element {
            let filtros: any[] = [];
            if (global.isSuccessful(this.props.filtros)) {
                filtros = global.getData(this.props.filtros);
            };

            // Item 
            let dragOver: any = (e) => {
                $(e.currentTarget).addClass("hover-drop");
            };
            let dragStart: any = (e) => {
                var dragIcon = document.createElement('img');
                dragIcon.src = "Content/Img/document-icon.png";
                dragIcon.width = 100;

                e.dataTransfer.setDragImage(dragIcon, -10, -10);
                e.dataTransfer.setData("path", $(e.currentTarget).attr("data-id"))
                e.dataTransfer.effectAllowed = "move";

                $(e.currentTarget).addClass("reporter-hover-drop");
            };
            let dragEnd: any = (e) => {
                $(e.currentTarget).removeClass("reporter-hover-drop");
            };
            let dragLeave: any = (e) => {
                $(e.currentTarget).removeClass("hover-drop");
            };
            let dragDrop: any = (e) => {
                let id: string = e.dataTransfer.getData("path");
                if (id) {
                    //id = id.replace(".", "\\.");
                    //let idFiltro: string = "filtro_" + (value.ID > 0 ? value.ID : "$" + (value.ID * -1));
                    let intID: number = parseInt(id);
                    id = "#filtro_" + (intID > 0 ? intID : "$" + (intID * -1));

                    if ($(e.currentTarget).hasClass("right-drop")) {
                        $(id).insertAfter($(e.currentTarget).parent());
                    };
                    if ($(e.currentTarget).hasClass("left-drop")) {
                        $(id).insertBefore($(e.currentTarget).parent());
                    };
                }
                $(e.currentTarget).removeClass("hover-drop");

                //
                let dFiltros: any[] = global.getData(Forms.getValue("Filtros", config.id));
                let nFiltros: any[] = [];

                filtros = global.getData(this.props.filtros);
                $("#filtrosContainer").find(".resizable").each((index: number, elem: any) => {
                    let path: number = parseInt($(elem).attr("data-id"));

                    for (var i = 0; i < filtros.length; i++) {
                        if (path === filtros[i].ID) {
                            nFiltros.push(global.assign(filtros[i]));

                            break;
                        };
                    };
                });

                Forms.updateFormElement(config.id, "Filtros", global.createSuccessfulStoreObject(nFiltros));
            };
            let removeItem: any = (value: any) => {
                let dFiltros: any[] = global.getData(Forms.getValue("Filtros", config.id));
                let nFiltros: any[] = [];

                let c = global.getData(this.props.filtros);

                for (var i = 0; i < c.length; i++) {
                    if (value.ID !== c[i].ID) {
                        nFiltros.push(global.assign(c[i]));
                    };
                };

                Forms.updateFormElement(config.id, "Filtros", global.createSuccessfulStoreObject(nFiltros));
            };
            //

            return <page.OptionSection level={1} title="Filtros" collapsed={false}>
                <div id="filtrosContainer" style={{ overflowX: "scroll", minHeight: 67, whiteSpace: "nowrap", zIndex: 899, margin: "-15px", padding: "0px 15px" }}
                    onDrop={(e) => {
                        if (!e.dataTransfer.getData("data")) {
                            return;
                        };

                        e.preventDefault();
                        $("#filtrosContainer").removeClass("dragEnterContainer");

                        let filtros: DataElement = Forms.getValue("Filtros", config.id);
                        let dataFiltros: any[];
                        let dropFiltro: any = JSON.parse(e.dataTransfer.getData("data"));

                        if (filtros) {
                            dataFiltros = global.getData(filtros);
                        };

                        if (!dataFiltros || isNaN(dataFiltros.length)) {
                            dataFiltros = [];
                        };

                        let nID: number = -1;
                        for (var i = 0; i < dataFiltros.length; i++) {
                            if (dataFiltros[i].ID <= nID) {
                                nID = dataFiltros[i].ID - 1;
                            };
                        };

                        let defaultOperador: any = this.getDefaultOperador();
                        let defaultOperadorLogico: any = this.getDefaultOperadorLogico();

                        dataFiltros.push({
                            ID: nID,
                            Clave: dropFiltro.path,
                            Nombre: dropFiltro.Nombre,
                            Titulo: dropFiltro.path,
                            Value: null,
                            IdOperador: defaultOperador.ID,
                            Operador: defaultOperador,
                            IdOperadorLogico: defaultOperadorLogico.ID,
                            OperadorLogico: defaultOperadorLogico,
                            DataType: dropFiltro.DataType,
                            SourceName: dropFiltro.SourceName,
                            SourceDataType: dropFiltro.SourceDataType
                        });

                        Forms.updateFormElement(config.id, "Filtros", global.createSuccessfulStoreObject(dataFiltros));
                    }}
                    onDragEnter={(e) => {
                        e.preventDefault(); $("#filtrosContainer").addClass("dragEnterContainer");
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault(); $("#filtrosContainer").removeClass("dragEnterContainer");
                    }}
                    onDragEnd={(e) => {
                        e.preventDefault(); $("#filtrosContainer").removeClass("dragEnterContainer");
                    }}
                    onDragOver={(e) => { e.preventDefault(); }}>
                    {filtros.map((value: any, index: number) => {
                        let idSection: string = "keyFiltro_" + value.Clave;
                        let idFiltro: string = "filtro_" + (value.ID > 0 ? value.ID : "$" + (value.ID * -1));
                        return <page.OptionSection
                            id={idSection}
                            key={idFiltro}
                            level={11}
                            title={""}
                            subTitle={""}
                            icon="fa fa-columns"
                            collapsed={false}
                            inlineEdit={false}
                            hideCollapseButton={true}
                            editMode={false}>
                            <SectionView>
                                <div
                                    id={idFiltro}
                                    key={idFiltro}
                                    className="draggable resizable reporter-column-data"
                                    style={{ position: "relative", height: 30, paddingRight: 25, display: "inline-block", cursor: "pointer" }}
                                    data-id={value.ID}
                                    data-path={value.Clave}
                                    draggable={true}
                                    onDragStart={dragStart}
                                    onDragEnd={dragEnd}
                                    onClick={(e: any) => {
                                        let filtros = global.getData(Forms.getValue(FILTROS_ID, config.id));
                                        //
                                        let currentID: number = parseInt($(e.currentTarget).attr("data-id"));
                                        let currentElem: any;
                                        //
                                        for (var i = 0; i < filtros.length; i++) {
                                            let nFiltro: any = filtros[i];
                                            if (currentID === nFiltro.ID) {
                                                currentElem = nFiltro;
                                                //
                                                break;
                                            };
                                        };
                                        //
                                        Forms.updateFormElements(FILTROS_ID, currentElem);
                                        //
                                        config.setState({ viewMode: false }, idSection);
                                }}>
                                <div className="left-drop" style={{ position: "absolute", top: 0, left: 0, width: 15, height: "100%" }}
                                    onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}></div>
                                    <div className="right-drop" style={{ position: "absolute", top: 0, right: 0, width: 15, height: "100%" }}
                                        onDragOver={dragOver} onDragLeave={dragLeave} onDrop={dragDrop}>
                                        <div onClick={() => removeItem(value)}
                                            style={{ cursor: "pointer", textAlign: "center" }}>
                                            <i className="fa fa-close"></i>
                                        </div>
                                    </div>

                                    {index > 0 ? <span className="badge badge-info" style={{marginRight: 5}}>{value.OperadorLogico.Nombre}</span> : null}
                                    <span className="bold" style={{fontSize: 11}}>[{value.Titulo}]</span>
                                    <span style={{ fontSize: 11, marginLeft: 5, marginRight: 5 }}>{value.Operador.Nombre}</span>
                                    
                                    <span style={{ fontWeight: "bolder", fontSize: 11, textDecoration: "underline", color: "#0288D1" }}>
                                        {value.Value !== null && value.Value !== undefined ? value.Value : "???"}
                                    </span>
                                </div>
                            </SectionView>
                            <SectionEdit
                                onCancel={() => {
                                    Forms.remove(FILTROS_ID);

                                    config.setState({ viewMode: true }, idSection);
                                }}
                                onSave={() => {
                                    let entidades: any[] = global.getData(Forms.getValue(FILTROS_ID, config.id));
                                    let nEntidades: any[] = [];
                                    let entidad: any;

                                    if (!Forms.isValid(FILTROS_ID)) {
                                        warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                                        return;
                                    };

                                    let item: any = Forms.getForm(FILTROS_ID)
                                        .addID()
                                        .addClave()
                                        .addNombre()
                                        .addString("Titulo")
                                        .addString("SourceName")
                                        .addString("SourceDataType")
                                        .addObject("DataType")
                                        .addObject("OperadorLogico")
                                        .addObject("Operador")
                                        .add("Value")
                                        .toObject();

                                    for (var i = 0; i < entidades.length; i++) {
                                        let nEntidad: any = global.assign(entidades[i]);
                                        //
                                        if (item.ID === nEntidad.ID) {
                                            nEntidad.ID = item.ID;
                                            nEntidad.Clave = item.Clave;
                                            nEntidad.Nombre = item.Nombre;
                                            nEntidad.Titulo = item.Titulo;
                                            nEntidad.SourceName = item.SourceName;
                                            nEntidad.SourceDataType = item.SourceDataType;
                                            nEntidad.IdDataType = item.IdDataType;
                                            nEntidad.DataType = item.DataType;
                                            nEntidad.IdOperador = item.IdOperador;
                                            nEntidad.Operador = item.Operador;
                                            nEntidad.IdOperadorLogico = item.IdOperadorLogico;
                                            nEntidad.OperadorLogico = item.OperadorLogico;
                                            nEntidad.Value = item.Value;
                                        };
                                        //
                                        nEntidades.push(nEntidad);
                                    };
                                    //
                                    Forms.updateFormElement(config.id, FILTROS_ID, global.createSuccessfulStoreObject(nEntidades));
                                    //
                                    config.setState({ viewMode: true }, idSection);
                                }}>
                                <Row>
                                    <ddl.TiposDatoDDL id="DataType" idFormSection={FILTROS_ID} size={[6, 4, 2, 2]} />
                                    <ddl.OperadoresLogicosDDL id="OperadorLogico" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} />
                                    <input.Text id="Titulo" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} />
                                    <ddl.OperadoresDDL id="Operador" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} />
                                    <MultiEditor />
                                </Row>
                            </SectionEdit>
                        </page.OptionSection>;
                    })}
                </div>
            </page.OptionSection>;
        };
    });
    export interface IMultiEditorProps extends React.Props<any> {
        dataType?: any;
    };
    const MultiEditor: any = global.connect(class extends React.Component<IMultiEditorProps, IMultiEditorProps>{
        static props: any = (state: any) => ({
            dataType: Forms.getValue("DataType", "Filtros")
        });
        //
        componentWillReceiveProps(nextProps: IMultiEditorProps) {
            if (this.props.dataType && nextProps.dataType) {
                if (this.props.dataType.Clave !== nextProps.dataType.Clave) {
                    Forms.updateFormElement(FILTROS_ID, "Value", null);
                };
            }
            else {
                Forms.updateFormElement(FILTROS_ID, "Value", null);
            };
        };
        render(): JSX.Element {
            let retValue: any = null;

            if (this.props.dataType.Clave === "STR") {
                retValue = <input.Text id="Value" key="STR" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} validations={[validations.required()]}/>;
            } else if (this.props.dataType.Clave === "BOOL") {
                retValue = <checkBox.CheckBox id="Value" key="BOOL" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} validations={[validations.required()]}/>;
            } else if (this.props.dataType.Clave === "DATE") {
                retValue = <DatePicker id="Value" key="DATE" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} validations={[validations.required()]}/>;
            } else if (this.props.dataType.Clave === "DEC") {
                retValue = <input.Currency id="Value" key="DEC" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} validations={[validations.required()]}/>;
            } else if (this.props.dataType.Clave === "DT") {
                retValue = <DatePicker id="Value" key="DT" type="datetime" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} validations={[validations.required()]}/>;
            } else if (this.props.dataType.Clave === "INT") {
                retValue = <input.Integer id="Value" key="INT" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} validations={[validations.required()]}/>;
            } else if (this.props.dataType.Clave === "MON") {
                retValue = <input.Currency id="Value" key="MON" idFormSection={FILTROS_ID} size={[12, 6, 2, 2]} validations={[validations.required()]}/>;
            };
            
            return retValue;
        };
    });
    const View: any = page.connect(class extends page.Base {
        render(): JSX.Element {
            let displayKV10: boolean = false;
            let displayPBI: boolean = false;

            if (global.isSuccessful(this.props.entidad)) {
                let tipoReporte: any = global.getData(this.props.entidad).TipoReporte;
                if (tipoReporte) {
                    if (tipoReporte.Clave === "RKV10") {
                        displayKV10 = true;
                    }
                    else if (tipoReporte.Clave === "RPBI") {
                        displayPBI = true;
                    };
                };
            };

            return <page.View>
                <Row>
                    <Column size={[12, 12, 12, 12]}>
                        <page.OptionSection icon="fa fa-money" title={"Generales"} collapsed={false} hideCollapseButton={true}>
                            <label.Clave size={[12, 2, 2, 2]} />
                            <label.Nombre size={[12, 4, 4, 4]} />
                            <label.Label id="SubTitulo" size={[12, 4, 4, 4]} />
                            <label.Estatus id="Estatus" size={[6, 1, 1, 1]} />
                            {displayKV10 === true ? <label.Entidad id="PlantillaEnc" size={[12, 12, 6, 6]} /> : null}
                            {displayKV10 === true ? <label.Entidad id="PlantillaPP" size={[12, 12, 6, 6]} /> : null}
                            <label.Entidad id="TipoReporte" size={[12, 12, 6, 6]} />
                            <label.Entidad id="Categoria" size={[12, 12, 6, 6]} />
                            {displayKV10 === true ?
                                <Column style={{ marginTop: 10 }}>
                                    <page.OptionSection id="RKV10" icon="fa fa-list" level={1} collapsed={false}>
                                        <page.SectionList
                                            id={CAMPOS_ID}
                                            parent={config.id}
                                            title={"Columnas"}
                                            level={1}
                                            items={createSuccessfulStoreObject([])}
                                            size={[12, 6, 6, 6]}
                                            style={{ paddingTop: 20 }}
                                            listHeader={<Row className="listHeader-default">
                                                <Column size={[12, 6, 6, 6]} className="list-default-header">{"Columna"}</Column>
                                                <Column size={[12, 6, 6, 6]} className="list-default-header">{"Ancho/Tipo/Alineación"}</Column>
                                            </Row>}
                                            formatter={(index: number, item: any) => {
                                                return <Row>
                                                    <Column size={[12, 6, 6, 6]} className="listItem-default-item">
                                                        {item.Titulo}
                                                    </Column>
                                                    <Column size={[12, 6, 6, 6]} className="listItem-default-item">
                                                        <span className="badge badge-info">{item.Width}</span>
                                                        <span className="badge badge-info" style={{ marginLeft: 5 }}>{item.DataType.Nombre}</span>
                                                        <span className="badge badge-info" style={{ marginLeft: 5 }}>{item.Alineacion.Nombre}</span>
                                                    </Column>
                                                </Row>;
                                            }}>
                                        </page.SectionList>
                                        <page.SectionList
                                            id={FILTROS_ID}
                                            parent={config.id}
                                            title={"Filtros"}
                                            level={1}
                                            items={createSuccessfulStoreObject([])}
                                            size={[12, 6, 6, 6]}
                                            style={{ paddingTop: 20 }}
                                            listHeader={<Row className="listHeader-default">
                                                <Column size={[12, 12, 12, 12]} className="list-default-header">{"Filtro"}</Column>
                                            </Row>}
                                            formatter={(index: number, item: any) => {
                                                return <Row>
                                                    <Column size={[12, 12, 12, 12]} className="listItem-default-item">
                                                        <span className="bold">{item.OperadorLogico.Nombre}</span>
                                                        <span style={{ marginLeft: 10 }}>{item.Nombre}</span>
                                                        <span className="badge badge-info" style={{ marginLeft: 10 }}>{item.Operador.Nombre}</span>
                                                        <span style={{ marginLeft: 10 }}>{item.Value}</span>
                                                    </Column>
                                                </Row>;
                                            }}>
                                        </page.SectionList>
                                    </page.OptionSection>
                                </Column> : null}
                                {displayPBI == true ?
                                    <Column style={{ marginTop: 10 }}>
                                        <page.OptionSection id={RPBI_ID} icon="fa fa-list" level={1} collapsed={false}>
                                            <label.Entidad id="ReportePBI" size={[12, 12, 6, 6]} />
                                        </page.OptionSection>
                                    </Column>
                                    : null}
                        </page.OptionSection>
                    </Column>
                </Row>
            </page.View>;
        };
    });
};