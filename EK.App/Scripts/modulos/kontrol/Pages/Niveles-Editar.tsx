namespace EK.Modules.Kontrol.Pages.Niveles {
    "use strict";

    let PAGE_ID = "niveles";
    let CONFIGAR_PERMISOS_ID: string = "ConfigurarPermisos";
    let PERMISOS_ID: string = "Permisos";
    let ETAPASEXPEDIENTE: string = "Etapas";
    let ETAPAS_ASIGNADAS_EXPEDIENTE: string = "EtapasAsignadas";
    let ETAPAS_NO_ASIGNADAS_EXPEDIENTE: string = "EtapasNoAsignadas";

    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "kontrol", [PERMISOS_ID, ETAPASEXPEDIENTE, ETAPAS_NO_ASIGNADAS_EXPEDIENTE, ETAPAS_ASIGNADAS_EXPEDIENTE]);

    const ICON_BAN: string = "icon-ek-003";
    const ICON_READ: string = "far fa-file-alt";
    const ICON_WRITE: string = "fa fa-edit";
    const ICON_NEW: string = "fa fa-plus";
    const ICON_DELETE: string = "fa fa-trash";

    const ICON_EXPORTAR: string = "far fa-file-excel";


    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            //let etapas: any = Forms.getValue(ETAPASEXPEDIENTE, config.id);
            //let e: any = getData(etapas);
            //let validacion: boolean = true;
            //e.forEach((value: any, index: number): any => {
            //    if (value.EtapaAsignada && value.Orden === null) {
            //        value._validacion = false;
            //        validacion = false;
            //        e[index] = value;
            //    }
            //    else if(value._validacion===false)
            //    {
            //        value._validacion = true;
            //        e[index] = value;
            //    }
            //});
            //if (validacion) {
               
            //}
            //else
            //{
            //    etapas.data = e;
            //    etapas.timestamp = etapas.timestamp + 1;
            //    Forms.updateFormElement(config.id, ETAPASEXPEDIENTE, etapas);
            //    let ml: any = config.getML();
            //    warning(ml.mensajes.error);
            //    return null;
            //}

            let model: any = item
                .addID()
                .addClave()
                .addObject(PERMISOS_ID)
                .addObject(ETAPAS_ASIGNADAS_EXPEDIENTE)
                .addObject("Modulo")
                .addNombre()
                .addEstatus()
                .addVersion()
                .toObject();
            if (model.Permisos && model.Permisos.length > 0) {
                for (var i = 0; i < model.Permisos.length; i++) {
                    model.Permisos[i].Modulo = model.Modulo;
                };
            };
            model.Modulo = null;
            return model;
        };
        onEntityLoaded(props: page.IProps): any {
            let idEntidad: any = getDataID(props.entidad);
            let parametros: any = global.assign({ idNivel: idEntidad });
            props.config.dispatchCatalogoBase("base/kontrol/niveles/Get/ObtenerEtapasNivel/", parametros, ETAPASEXPEDIENTE);
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                onEntityLoaded={this.onEntityLoaded}
                onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    };

    class Edit extends page.Base {
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={"Niveles"}
                        level={"main"}
                        icon="fa fa-sitemap"
                        collapsed={false}
                        hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 8, 8]} maxLength={150} validations={[validations.required()]} />
                            <checkBox.Status size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <EditPermisos />
                        </Row>
                        <Row>
                           <Etapas/>
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
                        level={"main"}
                        subTitle={"Niveles"}
                        icon="fa fa-sitemap" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Estatus size={[12, 12, 2, 2]} />
                        </Row>
                        <Row>
                            <ViewPermisos />
                        </Row>
                        <Row>
                            <Etapas/>
                        </Row>

                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };

    interface IViewPermisosProps extends React.Props<any> {
        modulo?: any;
        opciones?: any;
        entidad?: any;
    };

    const ViewPermisos = global.connect(class extends React.Component<IViewPermisosProps, IViewPermisosProps> {
        constructor(props: IViewPermisosProps) {
            super(props);
        }
        static props: any = (state: any) => ({
            opciones: state.global.catalogo$ConfigurarPermisos,
            modulo: Forms.getValue("Modulo", config.id, state),
            entidad: state.global.currentEntity
        });
        componentWillMount(): any {
            dispatchSuccessful("global-page-data", [], PERMISOS_ID);
            dispatchSuccessful("global-page-data", [], CONFIGAR_PERMISOS_ID);
        };
        componentWillReceiveProps(nextProps: IViewPermisosProps): any {
            if (global.hasChanged(this.props.modulo, nextProps.modulo)) {
                if (nextProps.modulo && nextProps.modulo.ID) {
                    config.dispatchCatalogoBase("base/Kontrol/Niveles/GetBP/GetConfiguracion/", { idNivel: global.getDataID(nextProps.entidad), idModulo: nextProps.modulo.ID }, CONFIGAR_PERMISOS_ID);
                };
            };
        };
        render(): JSX.Element {
            let opciones: any = global.getData(this.props.opciones);
            let iconStyle: React.CSSProperties = { padding: 3, width: 24, height: 24 };
            let iconNormal = (icon: string, p: any, argKkeyBtn: any) => {
                let $titleButton: any;
                let tituloBtnML = $ml['BotonesApp'];
                $titleButton = tituloBtnML[argKkeyBtn] != undefined &&
                    tituloBtnML[argKkeyBtn] != null && tituloBtnML[argKkeyBtn].titulo != undefined &&
                    tituloBtnML[argKkeyBtn].titulo != null ? tituloBtnML[argKkeyBtn].titulo : undefined; 
                return <div className="nivel-permiso-nosel" title={$titleButton}
                        onMouseEnter={(e: any) => { $(e.currentTarget).parent().removeClass().addClass("progress-p" + p); }}>
                        <i className={icon}></i>
                    </div>;
            };
            let altRow: boolean = false;
            if (!opciones || !(opciones.length > 0)) {
                opciones = [];
            };
            let iconExportar = (icon: string, item: any, argKkeyBtn: any) => {

                let $titleButton: any;
                let tituloBtnML = $ml['BotonesApp'];
                $titleButton = tituloBtnML[argKkeyBtn] != undefined &&
                    tituloBtnML[argKkeyBtn] != null && tituloBtnML[argKkeyBtn].titulo != undefined &&
                    tituloBtnML[argKkeyBtn].titulo != null ? tituloBtnML[argKkeyBtn].titulo : undefined;

                if (item.Exportar == true)
                {
                    return <div style={{ marginLeft: "2px" }} className={"nivel-permiso-sel label bg-blue-sharp bg-font-blue-sharp"} title={$titleButton}>
                        <i className={icon}></i>
                    </div>
                }
                else
                {
                    return <div style={{ marginLeft: "2px" }} className={"nivel-permiso-sel label bg-white bg-font-white"} title={$titleButton}>
                        <i className={icon}></i>
                    </div>
                }
            };
            let iconSel = (icon: string, warning?: boolean, p?: any, argKkeyBtn?: any) =>
            {
                let $titleButton: any;
                let tituloBtnML = $ml['BotonesApp'];
                $titleButton = tituloBtnML[argKkeyBtn] != undefined &&
                    tituloBtnML[argKkeyBtn] != null && tituloBtnML[argKkeyBtn].titulo != undefined &&
                    tituloBtnML[argKkeyBtn].titulo != null ? tituloBtnML[argKkeyBtn].titulo : undefined; 
                let labelClass: string = "nivel-permiso-sel label bg-green-meadow bg-font-green-meadow";
                if (warning === true) {
                    labelClass = "nivel-permiso-sel label label-danger";
                };
                return <div className={labelClass} title={$titleButton} onMouseEnter={(e: any) => { $(e.currentTarget).parent().removeClass().addClass("progress-p" + p); }}>
                    <i className={icon}></i>
                </div>;
            };
            let rowClick: any = (e: any): any => {
                let containerChilds: any = $(e.currentTarget).parent().parent().next();
                let cIcon: any = $(e.currentTarget);
                containerChilds.slideToggle();
                if (cIcon.hasClass("fa-caret-right")) {
                    cIcon.removeClass("fa-caret-right");
                    cIcon.addClass("fa-caret-down");
                }
                else {
                    cIcon.removeClass("fa-caret-down");
                    cIcon.addClass("fa-caret-right");
                };
            };
            //
            let formatRow: any = (item: any, nivel: number, idx: number) => {
                let icono: string = item.Icono ? item.Icono : "fa fa-list-alt";
                let esSeccion: boolean = item.EsSeccion;
                let rowClass: any = altRow === true ? "row-nivel-permiso" : "row-nivel-permiso-alt";
                let rowTextClass: string = "nivel-permiso-text";
                let opc: any[] = item.Opciones;
                if (!opc || !opc.length) { opc = []; };
                let hasChilds: boolean = opc.length > 0;
                if (hasChilds) {
                    rowTextClass = rowTextClass + " nivel-permiso-arrow";
                    icono = icono + " nivel-permiso-arrow";
                };
                altRow = !altRow;
                // key={item.ID + "_" + item.Clave} 
                return <Row key={nivel + "_" + idx} style={{ marginLeft: 15}}>
                    <Column className={rowClass}>
                        <Column size={[12, 7, 7, 7]} >
                            {opc.length > 0 ? <i className={"fa fa-caret-right nivel-permiso-icon nivel-permiso-arrow"} onClick={rowClick}></i> : null}
                            <i className={icono + " nivel-permiso-icon"} ></i>
                            {esSeccion ? <span className="badge badge-info">Sección</span> : null}
                            <div className={rowTextClass}>{item.Opcion}</div>
                        </Column>

                        <Column size={[12, 5, 5, 5]} >
                            <div className="progress-p100" style={{ position: "relative", width:190, float: "right", marginTop: -3, fontSize: 18 }}>
                                {item.Permisos === 0 ? iconSel(ICON_BAN, true, "20", "btnNivelesOpcionesNONE") : iconNormal(ICON_BAN, "20", "btnNivelesOpcionesNONE")}
                                {item.Permisos === 1 ? iconSel(ICON_READ, null, "40", "btnNivelesOpcionesRead") : iconNormal(ICON_READ, "40", "btnNivelesOpcionesRead")}
                                {item.Permisos === 2 ? iconSel(ICON_WRITE, null, "60", "btnNivelesOpcionesWrite") : iconNormal(ICON_WRITE, "60", "btnNivelesOpcionesWrite")}
                                {item.Permisos === 4 ? iconSel(ICON_NEW, null, "80", "btnNivelesOpcionesNew") : iconNormal(ICON_NEW, "80", "btnNivelesOpcionesNew")}
                                {item.Permisos === 8 ? iconSel(ICON_DELETE, null, "100", "btnNivelesOpcionesDelete") : iconNormal(ICON_DELETE, "100", "btnNivelesOpcionesDelete")}
                                {iconExportar(ICON_EXPORTAR, item, "btnNivelesOpcionesExportar")}

                            </div>
                        </Column>

                    </Column>
                    <Column className="nivel-permiso-childs" style={{ display: "none" }}>
                        {opc.map((item: any, index: number): any => { return formatRow(item, nivel + 1, index); })}
                    </Column>
                </Row>;
            };
            //
            return <Column style={{ marginTop: 10 }}>
                <page.OptionSection
                    id={CONFIGAR_PERMISOS_ID}
                    title="Configuración de acceso"
                    level={1}
                    icon="fa fa-spinner"
                    readOnly={true}
                    collapsed={false}>
                    <ddl.ModulosDDL size={[12, 12, 12, 12]} />
                    <Row>
                        <Column style={{ padding: "15px 25px" }}>
                            <PanelUpdate info={this.props.opciones}>
                                {opciones.map((item: any, index: number): any => { return formatRow(item, 0, index); })}
                            </PanelUpdate>
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;
        };
    });

    class ButtonNormal extends React.Component<{ icon: string; item: any; permiso: number; onClick: (item: any, permiso: AuthorizePermission) => any }, {}> {
        render(): JSX.Element {
            return <button className="btn btn-icon-only white" onClick={(): any => { this.props.onClick(this.props.item, this.props.permiso); }}>
                <i className={this.props.icon} style={{ fontSize: 18, height: 18, marginTop: -4 }}></i>
            </button>;
        };
    };

    interface IEditPermisosProps extends React.Props<any> {
        modulo?: any;
        acciones?: any;
        opciones?: any;
        entidad?: any;
    };

    const EditPermisos = global.connect(class extends React.Component<IEditPermisosProps, IEditPermisosProps> {
        constructor(props: IEditPermisosProps) {
            super(props);
            this.onPermisoClick = this.onPermisoClick.bind(this);
            this.updatePermisos = this.updatePermisos.bind(this);
        };
        static props: any = (state: any) => ({
            acciones: state.global.catalogo$Permisos,
            opciones: state.global.catalogo$ConfigurarPermisos,
            modulo: Forms.getValue("Modulo", config.id, state),
            entidad: state.global.currentEntity
        });
        componentWillReceiveProps(nextProps: IViewPermisosProps): any {
            if (global.hasChanged(this.props.modulo, nextProps.modulo)) {
                if (nextProps.modulo && nextProps.modulo.ID) {
                    config.dispatchCatalogoBase("base/Kontrol/Niveles/GetBP/GetConfiguracion/", { idNivel: global.getDataID(nextProps.entidad), idModulo: nextProps.modulo.ID }, CONFIGAR_PERMISOS_ID);
                };
            };
        };
        componentWillMount(): any {
            dispatchSuccessful("global-page-data", [], PERMISOS_ID);
        };
        onPermisoClick(item: any, permiso: number, exportar: boolean): void
        {
            let newPermiso: number = permiso == -99 ? item.Permisos : permiso;

            let acciones: any[] = global.getData(this.props.acciones);
            let accionesState: any[] = [];
            let wasFound: boolean = false;

            for (var i = 0; i < acciones.length; i++)
            {
                let value: any = {
                    opcion: global.assign({}, acciones[i].opcion),
                    permiso: global.assign({}, acciones[i].permiso),
                    Permisos: acciones[i].permiso.nuevo,
                    IdOpcion: acciones[i].opcion.ID,
                    ID: acciones[i].ID,
                    Exportar:acciones[i].Exportar,
                    Version: acciones[i].Version
                };

                if (value.opcion.ID === item.ID)
                {
                    if (value.permiso.original !== newPermiso)
                    {
                        value.permiso.nuevo = newPermiso;
                    }

                    if (value.Exportar != exportar)
                    {
                        value.Exportar = exportar;
                    }
                    
                    accionesState.push(value);
                    wasFound = true;
                }
                else
                {
                    accionesState.push(value);
                };

            };

            if (!wasFound) {

                accionesState.push({
                    opcion: EK.Global.assign({}, item),
                    permiso: { original: item.Permisos, nuevo: newPermiso },
                    Permisos: newPermiso,
                    ID: item.NivelOpcion.ID,
                    Version: item.NivelOpcion.Version,
                    Exportar: exportar,
                    IdOpcion: item.ID
                });

            };
            Forms.updateFormElement(PAGE_ID, PERMISOS_ID, accionesState);
            dispatchSuccessful("global-page-data", accionesState, PERMISOS_ID);
        };
        updatePermisos(acciones: any[]): any {
            if (!isSuccessful(this.props.opciones)) {
                return this.props.opciones;
            };

            let retValue: any[] = [];

            let fnSearchPermiso = (opcion: any): any => {
                let newValueItem: any = null;
                if (acciones && acciones.length > 0)
                {
                    for (var i = 0; i < acciones.length; i++)
                    {
                        if (opcion.ID === acciones[i].opcion.ID)
                        {
                            newValueItem = acciones[i];

                            break;
                        };
                    };
                };
                return newValueItem;
            }

            let fnIterateOpciones = (parent, opciones: any[]) =>
            {
                for (var i = 0; i < opciones.length; i++)
                {
                    let opcion: any = opciones[i];

                    let newValueItem: any = fnSearchPermiso(opcion);


                    let nuevaOpcion: any = {
                        ID: opcion.ID,
                        Clave: opcion.Clave,
                        Descripcion: opcion.Descripcion,
                        EsSeccion: opcion.EsSeccion,
                        Icono: opcion.Icono,
                        IdModulo: opcion.IdModulo,
                        Permisos: newValueItem === null ? opcion.Permisos : newValueItem.permiso.nuevo,
                        NivelOpcion: opcion.NivelOpcion,
                        Exportar: newValueItem === null ? opcion.Exportar : newValueItem.Exportar,
                        Ruta: opcion.Ruta,
                        Opcion: opcion.Opcion,
                        DefPermiso: opcion.DefPermiso,
                        Opciones: []
                    };

                    parent.push(nuevaOpcion);

                    if (opcion.Opciones && opcion.Opciones.length > 0) {
                        fnIterateOpciones(nuevaOpcion.Opciones, opcion.Opciones);
                    };
                };
            };

            fnIterateOpciones(retValue, this.props.opciones.data);
            return createSuccessfulStoreObject(retValue);
        };
        render(): JSX.Element {
            let opciones: any = global.getData(this.updatePermisos(global.getData(this.props.acciones)));
            let iconStyle: React.CSSProperties = { padding: 3, width: 24, height: 24 };

            let iconNormal = (icon: string, item: any, perm: number, p: any, argKkeyBtn: any) => {

                let $titleButton: any; 
                let tituloBtnML = $ml['BotonesApp'];
                $titleButton = tituloBtnML[argKkeyBtn] != undefined &&
                    tituloBtnML[argKkeyBtn] != null && tituloBtnML[argKkeyBtn].titulo != undefined &&
                    tituloBtnML[argKkeyBtn].titulo != null ? tituloBtnML[argKkeyBtn].titulo : undefined; 


                return <button className="nivel-permiso-btnnosel btn btn-icon-only white" title={$titleButton} 
                    onMouseEnter={(e: any) => { $(e.currentTarget).parent().removeClass().addClass("progress-p" + p); }}
                    onClick={(): any => { this.onPermisoClick(item, perm, item.Exportar); }}>
                    <i className={icon}></i>
                </button>;
            };

            let iconExportar = (icon: string, item: any, argKkeyBtn: any) =>
            {

                let $titleButton: any;
                let tituloBtnML = $ml['BotonesApp'];
                $titleButton = tituloBtnML[argKkeyBtn] != undefined &&
                    tituloBtnML[argKkeyBtn] != null && tituloBtnML[argKkeyBtn].titulo != undefined &&
                    tituloBtnML[argKkeyBtn].titulo != null ? tituloBtnML[argKkeyBtn].titulo : undefined;

                
                if (item.Exportar == true)
                {
                    return <button style={{ marginLeft:"2px" }} className={"nivel-permiso-btnsel btn btn-icon-only white bg-blue-sharp bg-font-blue-sharp"} title={$titleButton}
                        onClick={(): any => { this.onPermisoClick(item, -99, false); }}>
                        <i className={icon}></i>
                    </button>;
                }
                else
                {
                    return <button style={{ marginLeft: "2px" }}  className={"nivel-permiso-btnnosel btn btn-icon-only white"} title={$titleButton}
                        onClick={(): any => { this.onPermisoClick(item, -99, true); }}>
                        <i className={icon}></i>
                    </button>;
                }
            };

            let altRow: boolean = false;
            if (!opciones || !(opciones.length > 0)) {
                opciones = [];
            };
            let iconSel = (icon: string, warning?: boolean, p?: any, argKkeyBtn?: any) => {
                let $titleButton: any;
                let tituloBtnML = $ml['BotonesApp'];
                $titleButton = tituloBtnML[argKkeyBtn] != undefined &&
                    tituloBtnML[argKkeyBtn] != null && tituloBtnML[argKkeyBtn].titulo != undefined &&
                    tituloBtnML[argKkeyBtn].titulo != null ? tituloBtnML[argKkeyBtn].titulo : undefined; 
                let labelClass: string = "nivel-permiso-btnsel btn btn-icon-only white bg-green-meadow bg-font-green-meadow";
                if (warning === true) {
                    labelClass = "nivel-permiso-btnsel btn btn-icon-only white bg-red bg-font-red";
                };
                //
                return <button className={labelClass} title={$titleButton} onMouseEnter={(e: any) => { $(e.currentTarget).parent().removeClass().addClass("progress-p" + p); }}>
                    <i className={icon}></i>
                </button>;
            };
            let rowClick: any = (e: any): any => {
                let containerChilds: any = $(e.currentTarget).parent().parent().next();
                let cIcon: any = $(e.currentTarget);
                containerChilds.slideToggle();
                if (cIcon.hasClass("fa-caret-right")) {
                    cIcon.removeClass("fa-caret-right");
                    cIcon.addClass("fa-caret-down");
                }
                else {
                    cIcon.removeClass("fa-caret-down");
                    cIcon.addClass("fa-caret-right");
                };
            };
            //
            let formatRow: any = (item: any, nivel: number, idx: number) => {
                let icono: string = item.Icono ? item.Icono : "fa fa-list-alt";
                let esSeccion: boolean = item.EsSeccion;
                let rowClass: any = altRow === true ? "row-nivel-permiso" : "row-nivel-permiso-alt";
                let rowTextClass: string = "nivel-permiso-text";
                let opc: any[] = item.Opciones;
                if (!opc || !opc.length) { opc = []; };
                let hasChilds: boolean = opc.length > 0;
                if (hasChilds) {
                    rowTextClass = rowTextClass + " nivel-permiso-arrow";
                    icono = icono + " nivel-permiso-arrow";
                };
                altRow = !altRow;
                console.log(item);
                // key={item.ID + "_" + item.Clave} 
                return <Row key={nivel +  "_" + idx} style={{ marginLeft: 15 }}>
                    <Column className={rowClass}>
                        <Column size={[12, 7, 7, 7]} >
                            {opc.length > 0 ? <i className={"fa fa-caret-right nivel-permiso-icon nivel-permiso-arrow"} onClick={rowClick}></i> : null}
                            <i className={icono + " nivel-permiso-icon"} ></i>
                            {esSeccion ? <span className="badge badge-info">Sección</span> : null}
                            <div className={rowTextClass}>{item.Opcion}</div>
                        </Column>
                        <Column size={[12, 5, 5, 5]} >
                            {!(item.DefPermiso > 0) ?
                                <div className="progress-p100" style={{ position: "relative", width: 190, float: "right", marginTop: -3, fontSize: 18 }}>
                                    {item.Permisos === 0 ? iconSel(ICON_BAN, true, "20", "btnNivelesOpcionesNONE") : iconNormal(ICON_BAN, item, EK.UX.Auth.NONE_PERMISSION, "20", "btnNivelesOpcionesNONE")}
                                    {item.Permisos === 1 ? iconSel(ICON_READ, null, "40", "btnNivelesOpcionesRead") : iconNormal(ICON_READ, item, EK.UX.Auth.READ_PERMISSION, "40", "btnNivelesOpcionesRead")}
                                    {item.Permisos === 2 ? iconSel(ICON_WRITE, null, "60", "btnNivelesOpcionesWrite") : iconNormal(ICON_WRITE, item, EK.UX.Auth.WRITE_PERMISSION, "60", "btnNivelesOpcionesWrite")}
                                    {item.Permisos === 4 ? iconSel(ICON_NEW, null, "80", "btnNivelesOpcionesNew") : iconNormal(ICON_NEW, item, EK.UX.Auth.NEW_PERMISSION, "80", "btnNivelesOpcionesNew")}
                                    {item.Permisos === 8 ? iconSel(ICON_DELETE, null, "100", "btnNivelesOpcionesDelete") : iconNormal(ICON_DELETE, item, EK.UX.Auth.DELETE_PERMISSION, "100", "btnNivelesOpcionesDelete")}
                                    {iconExportar(ICON_EXPORTAR, item, "btnNivelesOpcionesExportar")}
                                </div>
                                : null}
                        </Column>
                    </Column>
                    <Column className="nivel-permiso-childs" style={{ display: "none" }}>
                        {opc.map((item: any, index: number): any => { return formatRow(item, nivel + 1, index); })}
                    </Column>
                </Row>;
            };
            //
            return <Column style={{ marginTop: 10 }}>
                <page.OptionSection
                    id={CONFIGAR_PERMISOS_ID}
                    title="Configuración de acceso"
                    level={1}
                    icon="fa fa-spinner"
                    readOnly={true}
                    collapsed={false}>
                    <ddl.ModulosDDL size={[12, 12, 12, 12]} />
                    <Row>
                        <Column style={{ padding: "15px 25px" }}>
                            <PanelUpdate info={this.props.opciones}>
                                {opciones.map((item: any, index: number): any => { return formatRow(item, 0, index); })}
                            </PanelUpdate>
                        </Column>
                    </Row>
                </page.OptionSection>
            </Column>;
        };
    });

    interface IEtapasAsignadas extends page.IProps {
        etapas: any;
        etapasAsignadas: any;
        etapasNoAsignadas: any;
    };

    export let Etapas: any = global.connect(class extends React.Component<IEtapasAsignadas, IEtapasAsignadas> {
        constructor(props: IEtapasAsignadas) {
            super(props);
            this.posicionCambio = this.posicionCambio.bind(this);
            this.actualizarForm = this.actualizarForm.bind(this);
            this.agregarElemento = this.agregarElemento.bind(this);
            this.eliminarElemento = this.eliminarElemento.bind(this);
        };
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.etapas = state.global.catalogo$Etapas;
            retValue.etapasNoAsignadas = Forms.getValue(ETAPAS_NO_ASIGNADAS_EXPEDIENTE, config.id);
            retValue.etapasAsignadas = Forms.getValue(ETAPAS_ASIGNADAS_EXPEDIENTE, config.id);
            return retValue;
        };
        posicionCambio(props: any, nextProps: any): number {
            let posicionCambio: number = -1;
            if (props && props.length > 0 && (props.length === nextProps.length))
            {
                for (var i = 0; i < nextProps.length; i++) {
                    if ((nextProps[i].EtapaAsignada != props[i].EtapaAsignada)) {
                        posicionCambio = i;
                        break;
                    }
                }
            }
            return posicionCambio;
        }
        actualizarForm(data: any, info: any, form: string): void {
            let elementos = info;
            elementos.data = data;
            elementos.timestamp = info.timestamp + 1;
            Forms.updateFormElement(config.id, form, elementos)
        }
        agregarElemento(props: any, nextProps: any, posicion: number, asignacion: boolean): any {
            let etapas: any[] = new Array();
            let elementoPorAgregar: any = nextProps[posicion];
            if (asignacion)
            {
                let etapasAsignadas: any = getData(this.props.etapasAsignadas);
                elementoPorAgregar.Orden = etapasAsignadas.length>0 ? etapasAsignadas.length + 1:1;
            }
            if (isSuccessful(props) && props.data.length > 0) {
                etapas = getData(props);
                etapas.push(elementoPorAgregar)
            }
            else {
                etapas.push(elementoPorAgregar)
            }

            return etapas;
        }
        eliminarElemento(props: any, nextProps: any, posicion: number): any {
            let etapas: any[] = new Array();

            if (isSuccessful(nextProps) && props.data.length > 0) {
                etapas = getData(nextProps);
                etapas.splice(posicion, 1);
            }
            return etapas;
        }
        componentWillReceiveProps(nextProps: IEtapasAsignadas): any {
            if (global.hasChanged(this.props.etapas, nextProps.etapas)) {
                if (isSuccessful(nextProps.etapas)) {

                    let etapas: any[] = getData(nextProps.etapas);
                    var etapasNoAsignadas: any[] = new Array();
                    var etapasAsignadas: any[] = new Array();

                    etapas.forEach((value: any, index: number) => {
                        if (!value.EtapaAsignada) {
                            etapasNoAsignadas.push(value);
                        }
                        else
                        {
                            etapasAsignadas.push(value);
                        }
                    });
                    EK.Global.dispatchFullSuccessful("global-page-data", etapasAsignadas, ETAPAS_ASIGNADAS_EXPEDIENTE, 0, "")
                    EK.Global.dispatchFullSuccessful("global-page-data", etapasNoAsignadas , ETAPAS_NO_ASIGNADAS_EXPEDIENTE, 0, "")
                }
            };
            if (global.hasChanged(this.props.etapasNoAsignadas, nextProps.etapasNoAsignadas)) {

                let posicionCambio: number = -1;
                let npe: any = getData(nextProps.etapasNoAsignadas);
                let tpe: any = getData(this.props.etapasNoAsignadas);

                if (npe && npe.length > 0 && tpe && tpe.length > 0) {

                    posicionCambio = this.posicionCambio(tpe, npe);

                    if (posicionCambio != -1)
                    {
                        if (npe[posicionCambio].EtapaAsignada) {
                           
                            let etapasA: any = this.agregarElemento(this.props.etapasAsignadas, npe, posicionCambio,true);
                            this.actualizarForm(etapasA, this.props.etapasAsignadas, ETAPAS_ASIGNADAS_EXPEDIENTE);
                            
                            let etapasE:any=this.eliminarElemento(this.props.etapasAsignadas, nextProps.etapasNoAsignadas, posicionCambio)
                            this.actualizarForm(etapasE, nextProps.etapasNoAsignadas, ETAPAS_NO_ASIGNADAS_EXPEDIENTE);
                        }
                    }
                }
            }
            if (global.hasChanged(this.props.etapasAsignadas, nextProps.etapasAsignadas)) {
                let posicionCambio: number = -1;
                let npe: any = getData(nextProps.etapasAsignadas);
                let tpe: any = getData(this.props.etapasAsignadas);

                if (npe && npe.length > 0 && tpe && tpe.length > 0) {

                    posicionCambio = this.posicionCambio(tpe, npe);

                    if (posicionCambio != -1) {
                        if (!npe[posicionCambio].EtapaAsignada) {
                            let etapasA: any = this.agregarElemento(this.props.etapasNoAsignadas, npe, posicionCambio,false);
                            this.actualizarForm(etapasA, this.props.etapasNoAsignadas, ETAPAS_NO_ASIGNADAS_EXPEDIENTE);

                            let etapasE: any = this.eliminarElemento(this.props.etapasNoAsignadas, nextProps.etapasAsignadas, posicionCambio);

                          

                            this.actualizarForm(etapasE, nextProps.etapasAsignadas, ETAPAS_ASIGNADAS_EXPEDIENTE);
                        }
                    }

                    //let posicionCambioOrden: number = -1;

                    //if (npe && npe.length > 0 && tpe && tpe.length > 0) {
                    //    for (var i = 0; i < npe.length; i++) {
                    //        if ((npe[i].Orden != tpe[i].Orden)) {
                    //            posicionCambioOrden = i;
                    //            break;
                    //        }
                    //    }
                    //}
                    //if (posicionCambioOrden != -1)
                    //{
                    //    npe[posicionCambioOrden].Orden = parseInt(npe[posicionCambioOrden].Orden);
                    //    if (npe && npe.length > 0) {
                    //        for (var i = 0, k = 0; i < npe.length - 1; i++) {
                    //            k = i;
                    //            for (var j = i + 1; j < npe.length; j++) {

                    //                var valorEnCurso = npe[k].Orden;
                    //                var valorEnCurso2 = npe[j].Orden;
                    //                if (valorEnCurso > valorEnCurso2) {
                    //                    k = j;
                    //                }
                    //            }
                    //            if (i != k) {
                    //                var temporal = npe[i];
                    //                npe[i] = npe[k];
                    //                npe[k] = temporal
                    //            }
                               
                    //        }

                    //        npe[0].Orden = 1;

                    //        for (var i = 1; i < npe.length; i++) {
                    //            if (!(parseInt(npe[i].Orden) - 1 == parseInt(npe[i - 1].Orden))) {
                    //                npe[i].Orden = parseInt(npe[i - 1].Orden + 1);
                    //            }
                    //        }
                    //        //nextProps.etapasAsignadas.timestamp = nextProps.etapasAsignadas.timestamp + 1;
                    //        //Forms.updateFormElement(config.id, ETAPAS_ASIGNADAS_EXPEDIENTE, nextProps.etapasAsignadas);
                    //        EK.Global.dispatchFullSuccessful("global-page-data", npe, ETAPAS_ASIGNADAS_EXPEDIENTE, 0, "")

                    //    }

                    //}
                }
            }
        };
        render(): JSX.Element {
            return <div>
                <EtapasAsignadas />
                <EtapasNoAsignadas />
            </div>
        };
    });
    export let EtapasAsignadas: any = global.connect(class extends React.Component<IEtapasAsignadas, IEtapasAsignadas> {
        constructor(props: IEtapasAsignadas) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.etapas = state.global.catalogo$Etapas;
            retValue.etapasAsignadas = Forms.getValue(ETAPAS_ASIGNADAS_EXPEDIENTE, config.id);
            return retValue;
        };
        componentWillReceiveProps(nextProps: IEtapasAsignadas): any {
            if (global.hasChanged(this.props.etapasAsignadas, nextProps.etapasAsignadas)) {

                let posicionCambio: number = -1;
                let npe: any = getData(nextProps.etapasAsignadas);
                let tpe: any = getData(this.props.etapasAsignadas);

                let numeroMayor: number = 0;
                let posicionNumeroMayor: number = -1;
                let numeroMenor: number = 0;
                let primerOrden: boolean = false;
                let contador: number = 0;

                if (npe && npe.length > 0 && tpe && tpe.length > 0)
                {
                    for (var i = 0; i < npe.length; i++) {
                        if ((npe[i].Orden != tpe[i].Orden))
                        {
                            posicionCambio = i;
                            break;
                        }
                    }
                }
                if (posicionCambio != -1)
                {
                    for (var i = 0; i < npe.length; i++) {

                        if (npe[i].Orden > numeroMayor) {
                            if (i != posicionCambio)
                            {
                                numeroMayor = parseInt(npe[i].Orden);
                                posicionNumeroMayor = i;
                            }
                        };

                        if (numeroMenor > parseInt(npe[i].Orden)) {
                            if (npe[i].Orden != null) {
                                numeroMenor = parseInt(npe[i].Orden);
                            }
                        }

                        if (npe[i].Orden == null)
                        {
                            contador = contador + 1;
                        }
                    }

                    let numeroInsertar: any = parseInt(npe[posicionCambio].Orden);
                    primerOrden = contador === npe.length - 1 ? true : false;

                    if (!primerOrden && (numeroInsertar > numeroMayor+1))
                    {
                            npe[posicionCambio].Orden = numeroMayor + 1;
                    }

                    if (primerOrden && parseInt(npe[posicionCambio].Orden) != 1 && npe[posicionCambio].Orden != null)
                    {
                        npe[posicionCambio].Orden = 1;
                    }
                    

                    let numeroIgual: number = 0;
                    let posicionIgual: number = 0;
                    let ordenA: number = parseInt(npe[posicionCambio].Orden);

                    for (var b = 0; b < npe.length-1; b++) {
                        let ordenB: number = parseInt(npe[b].Orden);

                        if (ordenA === ordenB && b != posicionCambio) {
                            numeroIgual = ordenB;
                            posicionIgual = b;
                            npe[b].Orden = parseInt(npe[b].Orden) + 1;
                        }
                      

                    }
                    if (numeroIgual > 0)
                    {

                        for (var a = 0; a < npe.length - 1; a++) {

                            let orden: number = parseInt(npe[a].Orden);

                            if ((orden >= numeroIgual)
                                && (a != posicionIgual)
                                && (a != posicionCambio)
                            )

                                if (orden != null) {
                                    npe[a].Orden = parseInt(npe[a].Orden) + 1;
                                }
                        }

                    }
                    /* Actualizar*/

                    let data: any = nextProps.etapasAsignadas;

                    if (npe && npe.length>0)
                    {
                        data.data = npe;
                        data.timestamp = data.timestamp + 1;
                        Forms.updateFormElement(config.id, ETAPAS_ASIGNADAS_EXPEDIENTE, data);
                    }
                }
            }
        };
        shouldComponentUpdate(nextProps: IEtapasAsignadas, nextState: IEtapasAsignadas): boolean {
            return global.hasChanged(this.props.etapas, nextProps.etapas) ||
                global.hasChanged(this.props.etapasAsignadas, nextProps.etapasAsignadas);
        };
        render(): JSX.Element {

            let entidad: any = getData(this.props.entidad);
            /*Estado de la entidad */
            let entidadModoVista: boolean = getData(this.props.state).viewMode;

            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.etapas, []).length].join("")}</span>;

            return <div>
                <page.SectionList
                    id={ETAPAS_ASIGNADAS_EXPEDIENTE}
                    parent={config.id}
                    subTitle={subTitleSeccion}
                    icon={"fa fa-cog"}
                    size={[12, 6, 6, 6]}
                    level={1}
                    items={createSuccessfulStoreObject([])} readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 4, 4, 4]} className="list-default-header"><span>{"Fase"}</span></Column>
                                <Column size={[12, 4, 4, 4]} className="list-default-header"><span>{"Etapa"}</span></Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Orden"}</span></Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Permiso"}</span></Column>
                            </Row>
                        </div>
                    }
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                           
                            <Column size={[12, 4, 4, 4]}>
                                <span>{item.FaseExpediente.Nombre}</span>
                            </Column>

                            <Column size={[12, 4, 4, 4]}>
                                <span style={{ marginLeft: "1%" }}>{item.Etapa.Nombre}</span>
                            </Column>

                            <Column size={[12, 2, 2, 2]}>
                                {entidadModoVista ?
                                    <span style={{ textAlign: "center" }} className="badge badge-primary">{item.Orden}</span> :
                                    <div>
                                        <input.Integer property={ETAPAS_ASIGNADAS_EXPEDIENTE} index={index} value={item.Orden} id="Orden" idFormSection={config.id} />
                                    </div>
                                }
                            </Column>

                            <Column size={[12, 2, 2, 2]} >
                                {entidadModoVista ?
                                    <span>{EK.UX.Labels.bool(item.EtapaAsignada)}</span> :
                                    <div>
                                        <div className="col-xs-12 col-sm-1 col-md-1 col-lg-1">
                                            <checkBox.CheckBox textAlign="center" property={ETAPAS_ASIGNADAS_EXPEDIENTE}
                                                value={item.EtapaAsignada} index={index} id={"EtapaAsignada"} idFormSection={config.id} />
                                        </div>
                                    </div>
                                }
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </div>
        };
    });

    export let EtapasNoAsignadas: any = global.connect(class extends React.Component<IEtapasAsignadas, IEtapasAsignadas> {
        constructor(props: IEtapasAsignadas) {
            super(props);
        };
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.etapas = state.global.catalogo$Etapas;
            retValue.etapasNoAsignadas = Forms.getValue(ETAPAS_NO_ASIGNADAS_EXPEDIENTE, config.id);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IEtapasAsignadas, nextState: IEtapasAsignadas): boolean {
            return global.hasChanged(this.props.etapas, nextProps.etapas) ||
                   global.hasChanged(this.props.etapasNoAsignadas, nextProps.etapasNoAsignadas);
        };
        render(): JSX.Element {
            let entidad: any = getData(this.props.entidad);
            /*Estado de la entidad */
            let entidadModoVista: boolean = getData(this.props.state).viewMode;
            let titulo: any = $ml[config.id].sections[ETAPAS_NO_ASIGNADAS_EXPEDIENTE].title;

            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.etapasNoAsignadas, []).length].join("")}</span>;

            return <div>
                <page.SectionList
                    id={ETAPAS_NO_ASIGNADAS_EXPEDIENTE}
                    parent={config.id}
                    subTitle={subTitleSeccion}
                    icon={"fa fa-cog"}
                    size={[12, 6, 6, 6]}
                    level={1}
                    items={createSuccessfulStoreObject([])}
                    readonly={false}
                    addRemoveButton={false}
                    hideNewButton={true}
                    listHeader={
                        <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                            <Row>
                                <Column size={[12, 4, 4, 4]} className="list-default-header"><span>{"Fase"}</span></Column>
                                <Column size={[12, 6, 6, 6]} className="list-default-header"><span>{"Etapa"}</span></Column>
                                <Column size={[12, 2, 2, 2]} className="list-default-header"><span>{"Permiso"}</span></Column>
                            </Row>
                        </div>
                    }
                    formatter={(index: number, item: any) => {
                        return <Row style={{ padding: "0px 10px" }}>
                            <Column size={[12, 4, 4, 4]} >
                                <span>{item.FaseExpediente.Nombre}</span>
                            </Column>
                            <Column size={[12, 6, 6, 6]}>
                                <span style={{ marginLeft: "1%" }}>{item.Etapa.Nombre}</span>
                            </Column>
                            <Column size={[12, 2, 2, 2]} >
                                {entidadModoVista ?
                                    <span>
                                        {EK.UX.Labels.bool(item.EtapaAsignada)}
                                    </span> :
                                    <div>
                                        <div className="col-xs-12 col-sm-1 col-md-1 col-lg-1">
                                            <checkBox.CheckBox textAlign="center" property={ETAPAS_NO_ASIGNADAS_EXPEDIENTE}
                                                value={item.EtapaAsignada} index={index} id={"EtapaAsignada"} idFormSection={config.id} />
                                        </div>
                                    </div>
                                }
                            </Column>
                        </Row>;
                    }}>
                </page.SectionList>
            </div>
        };
    });

};