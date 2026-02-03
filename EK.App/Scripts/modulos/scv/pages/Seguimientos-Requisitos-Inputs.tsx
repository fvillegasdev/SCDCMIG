//// A '.tsx' file enables JSX support in the TypeScript compiler, 
//// for more information see the following page on the TypeScript wiki:
//// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.Modules.SCV.Pages.SeguimientoExpedientes {
    "use strict";
    const PAGE_ID: string = "seguimientos";

    export class RequisitoInfo {
        static ICONO_ITEMS: any = {
            "E": "fa fa-check",   //REQUISITO ENTREGADO
            "X": "fas fa-exclamation-triangle",           //ADVERTENCIA ESTA POR VENCER
            "F": "fa fa-exclamation",  //REQUISITO VENCIDO
            "*": "fa fa-asterisk",  //REQUISITO VENCIDO

            //'D': "fa fa-clock-o pull-left",         //REQUISITO POR AUTORIZAR
            //'U': "fa fa-shield pull-left",          //REQUISITO AUTORIZADO
            //'P': "fa fa-circle pull-left",          //REQUISITO PENDIENTE
            //'R': "fa fa-times-circle pull-left",    //REQUISITO RECHAZADO

            'SINMARCA': ""                  //REQUISITO VENCIDO
        };

        static ICONO_ITEMS_COLOR: any = {
            'E': "#4cd964",                 //REQUISITO ENTREGADO
            'X': "#ffc107",                 //ADVERTENCIA ESTA POR VENCER
            'F': "#fa060e",                 //REQUISITO VENCIDO
            'SINMARCA': ""                  //REQUISITO VENCIDO
        };

        static ICONO_ITEMS_CLASS: any = {
            'E': "badge badge-info",                 //REQUISITO ENTREGADO
            'X': "badge badge-warning",                 //ADVERTENCIA ESTA POR VENCER
            'F': "badge badge-danger",                 //REQUISITO VENCIDO
            'SINMARCA': ""                  //REQUISITO VENCIDO
        };

        static ROW_ITEMS_STYLE: any = {
            "E": { padding: "5px 0px 0px", margin: 0 },  //REQUISITO ENTREGADO
            "X": { padding: "5px 0px 0px", margin: 0 },  //ADVERTENCIA ESTA POR VENCER
            "P": { padding: "5px 0px 0px", margin: 0 },  //ADVERTENCIA ESTA POR VENCER
            "F": { backgroundColor: "#FFE0B2", padding: "5px 0px 0px", margin: 0 },                 //REQUISITO VENCIDO
            "SINMARCA": { padding: "5px 0px 0px", margin: 0 },  //REQUISITO VENCIDO
        };

        static ICONO_TIPO_REQUISITO: any = {
            'ARCH': "icon-cloud-upload",
            'TEX': "icon-pencil",
            'NUM': "icon-pencil",
            'LIS': "icon-pencil",
            'LOG': "icon-pencil",
            'FEC': "icon-pencil",
            'ENT': "icon-pencil"
        };

        obligatorio: any;
        estatusRequisitoItem: any;
        estatusEtapaItem: any;
        diasParaCulminar: any;
        tieneVencimiento: any;
        diasVencidoRequisito: any;
        diasPlazoVencimiento: any;
        porcentajeSensibilidadAdvertencia: number;
        colorTexto: any;
        colorTextoPosibleVencimiento: any;
        colorTextoRequisitoVencido: any;
        colorRequisitoObligatorio: any;
        activarAlertaPosibleEntrega: boolean;
        activarAlertaRequisitoVencido: boolean;
        estatus_etapa: any;
        class_guadar: any;
        color_guardar: any;
        tipoClave: string;
        existeEtapa: boolean;
        activarEdicion?: boolean;
    }

    interface IRequisitoProps extends IBaseSeguimiento {
        index?: number;
        item?: any;
        info?: RequisitoInfo;
        requisito?: any;
        etapaGlobal?: any;
    }

    interface IRequisitoState {
        viewMode: boolean;
    }

    export let RequisitoItem: any = global.connect(class extends React.Component<IRequisitoProps, IRequisitoState>{
        constructor(props: IRequisitoProps) {
            super(props);
            this.state = { viewMode: true }
        }
        static props: any = (state: any) => ({
            seguimiento: state.seguimientosReducer.selected,
            etapa: state.seguimientosReducer.etapaSelected,
            requisito: state.seguimientosReducer.requisitoSelected,
            etapaGlobal: state.global.seguimiento$etapaGlobal
        });
        componentWillMount(): void {
            dispatchSuccessful("scv-seguimientos-requisitos-setSelected", {});
        }
        componentDidUpdate(prevProps: IRequisitoProps, prevState: IRequisitoState): void {
            let $page: any = $ml[PAGE_ID];
            if (wasUpdated(prevProps.requisito, this.props.requisito)) {
                success($page.mensajes.requisito);
                let id: number = getDataID(this.props.seguimiento);
                let idEtapa: number = this.props.etapaGlobal.data.etapaGlobal ? this.props.etapaGlobal.data.etapaGlobal : 0;
                dispatchAsync("scv-seguimientos-requisitos", "SCV/Seguimientos/SeguimientoRequisitos/" + id + "/" + idEtapa);
            }
        }
        componentWillReceiveProps(nextProps: IRequisitoProps): void {
            let prevId: number = this.props.item.ID;
            let nextId: number = getDataID(nextProps.requisito);
            this.setState({ viewMode: prevId === nextId ? false : true });
        }
        shouldComponentUpdate(nextProps: IRequisitoProps, nextState: IRequisitoState): boolean {
            return hasChanged(this.props.requisito, nextProps.requisito) ||
                this.state.viewMode !== nextState.viewMode;
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let item: any = this.props.item;
            let editView: boolean = !this.state.viewMode;
            let info: RequisitoInfo = this.props.info;

            let style: React.CSSProperties = {
                alignItems: "center",
                display: "flex",
                margin: "0px",
                minHeight: "30px",
                borderStyle: editView ? "dotted" : "none"
            };

            let idForm: string = "requisito-form-" + (item.ID !== undefined && item.ID !== null ? item.ID : this.props.index);

            return !editView
                ? <RequisitoView
                    info={this.props.info}
                    item={this.props.item}
                    idForm={idForm}
                    style={style} />
                : <RequisitoEdit
                    info={this.props.info}
                    item={this.props.item}
                    idForm={idForm}
                    style={style} />
        }
    });

    interface IRequisitoEditorProps extends React.Props<any> {
        info?: RequisitoInfo;
        item?: any;
        idForm?: string;
        requisito?: any;
        style?: React.CSSProperties;
    }

    interface IRequisitoEditorState {
        file: EK.UX.Kontrol.File;
    }

    export let RequisitoEdit: any = global.connect(class extends React.Component<IRequisitoEditorProps, IRequisitoEditorState>{
        constructor(props: IRequisitoEditorProps) {
            super(props);
            this.onCancel = this.onCancel.bind(this);
            this.onSave = this.onSave.bind(this);
            this.onChange = this.onChange.bind(this);

            //--input
            this.getInputTexto = this.getInputTexto.bind(this);
            this.getInputNumero = this.getInputNumero.bind(this);
            this.getInputLogico = this.getInputLogico.bind(this);
            this.getInputFecha = this.getInputFecha.bind(this);
            this.getInputArchivo = this.getInputArchivo.bind(this);
            this.getInputLista = this.getInputLista.bind(this);

            //--save
            this.putValorArchivo = this.putValorArchivo.bind(this);
            this.putValorTexto = this.putValorTexto.bind(this);
            this.putValorNumero = this.putValorNumero.bind(this);
            this.putValorLogico = this.putValorLogico.bind(this);
            this.putValorFecha = this.putValorFecha.bind(this);
            this.putValorLista = this.putValorLista.bind(this);
            this.putValorEntidad = this.putValorEntidad.bind(this);

            this.state = { file: new EK.UX.Kontrol.File(null) }
        }
        static props: any = (state: any) => ({
            requisito: state.seguimientosReducer.requisitoSelected
        });
        refs: {
            row: Element;
        };
        onCancel(): void {
            dispatchSuccessful("scv-seguimientos-requisitos-setSelected", {});
            this.setState({ file: null });
        }
        onChange(file: EK.UX.Kontrol.File): void {
            this.setState({ file: file });
        }
        onSave(): void {
            let $page: any = $ml[PAGE_ID];
            let info: RequisitoInfo = this.props.info;
            let data: FormData = new FormData();

            let form: EditForm = Forms.getForm(this.props.idForm);
            form.addNumberConst("ID", this.props.item.ID)
                .addNumberConst("IdSeguimiento", this.props.item.IdSeguimiento)
                .addNumberConst("IdEtapa", this.props.item.IdEtapa)
                .addNumberConst("IdRequisito", this.props.item.IdRequisito)
                .addObjectConst("TipoRequisito", this.props.item.TipoRequisito)
                .addNumberConst("IdExpediente", this.props.item.IdExpediente);

            if (this.props.item.TieneVencimiento) {
                let date: any = form.getValue("FechaVencimiento");
                if (!date) {
                    warning("Faltó capturar la fecha de vencimiento del requisito");
                    return;
                }
                form.addDate("FechaVencimiento")
            }

            let funcArr: Function[] = [];
            funcArr['ARCH'] = this.putValorArchivo;
            funcArr['TEX'] = this.putValorTexto;
            funcArr['NUM'] = this.putValorNumero;
            funcArr['LOG'] = this.putValorLogico;
            funcArr['FEC'] = this.putValorFecha;
            funcArr['LIS'] = this.putValorLista;
            funcArr['ENT'] = this.putValorEntidad;

            let putValor: Function = funcArr[info.tipoClave];
            if (!putValor) return;
            if (!putValor.apply(this, [form, data])) return;

            let item: any = form.toObject();
            item = EK.Global.assign(item, {
                IdSeguimiento: item.IdSeguimiento,
                IdEtapa: item.IdEtapa,
                IdRequisito: item.IdRequisito,
                TipoRequisito: item.TipoRequisito,
                Valor: item.Valor,
                IdExpediente: item.IdExpediente,
                FechaVencimiento: item.FechaVencimiento
            });

            data.append("item", JSON.stringify(item));
            dispatchAsyncPut("scv-seguimientos-requisitos-guardar", "SCV/Seguimientos/SaveRequisito", data);
        }
        putValorArchivo(form: EditForm, data: FormData): boolean {
            let $page: any = $ml[PAGE_ID];
            let file: EK.UX.Kontrol.File = this.state.file;
            let fileSize: number = EK.UX.Kontrol.DEFAULT_FILE_SIZE;

            if (!file.isValid()) {
                warning("Seleccione el archivo del requisito");
                return false;
            }

            if (file.getSize() > fileSize) {
                warning($page.mensajes.archivo + EK.UX.Kontrol.getFormatBytes(fileSize, 0));
                return false;
            }

            let fileProps: any = {};
            fileProps['FileSize'] = file.getSize();
            fileProps['FileType'] = file.getType();
            fileProps['Nombre'] = file.getName();
            fileProps['FileExtension'] = file.getExtension();

            data.append("fileProps", JSON.stringify(fileProps));
            data.append("file", file.getFile());

            let valor: string = this.props.item.Valor;
            form.addStringConst("Valor", valor);

            return true;
        }
        putValorTexto(form: EditForm, data: FormData): boolean {
            form.addString("Valor");
            return true;
        }
        putValorNumero(form: EditForm, data: FormData): boolean {
            let valor: number = Number(form.getValue("Valor"));
            form.addStringConst("Valor", valor.toPrecision(2));
            return true;
        }
        putValorLogico(form: EditForm, data: FormData): boolean {
            let value: boolean = form.getValue("Valor");
            let valueOf: boolean = Boolean(value).valueOf();
            form.addStringConst("Valor", valueOf.toString());
            return true;
        }
        putValorFecha(form: EditForm, data: FormData): boolean {
            let fecha: Date = form.getValue("Valor");
            let valor: string = new Date(fecha.getTime()).toISOString();
            form.addStringConst("Valor", valor);
            return true;
        }
        putValorLista(form: EditForm, data: FormData): boolean {
            form.addString("Valor");
            return true;
        }
        putValorEntidad(form: EditForm, data: FormData): boolean {
            let entidad: any = form.getValue("Valor");
            let valor: string = "";
            if (entidad) {
                valor = String(entidad.ID);
            }
            form.addStringConst("Valor", valor);
            return true;
        }
        getInputTexto(): JSX.Element {
            let item: any = this.props.item;
            let label: any = item.Requisito ? item.Requisito.Nombre : "";
            let value: string = item.Valor ? String(item.Valor) : "";

            return <input.Text
                id={"Valor"}
                label={label}
                size={[12, 12, 12, 12]}
                value={value}
                required={true}
                maxLength={255}
                idFormSection={this.props.idForm} />
        }
        getInputNumero(): JSX.Element {
            let item: any = this.props.item;
            let label: any = item.Requisito ? item.Requisito.Nombre : "";
            let value: number = item.Valor ? Number(item.Valor) : 0;

            return <input.Integer
                id={"Valor"}
                label={label}
                size={[12, 12, 12, 12]}
                value={value}
                required={true}
                maxLength={255}
                idFormSection={this.props.idForm} />
        }
        getInputLogico(): JSX.Element {
            let item: any = this.props.item;
            let label: any = item.Requisito ? item.Requisito.Nombre : "";
            let str: string = String(item.Valor);
            let value: boolean = str.toLowerCase() === "true";

            return <CheckBox
                id={"Valor"}
                label={label}
                xs={{ size: 12 }}
                sm={{ size: 12 }}
                md={{ size: 6 }}
                lg={{ size: 6 }}
                required={true}
                checkedLabel={label}
                uncheckedLabel={label}
                value={value}
                disabled={false}
                idFormSection={this.props.idForm} />
        }
        getInputFecha(): JSX.Element {
            let item: any = this.props.item;
            let label: any = item.Requisito ? item.Requisito.Nombre : "";

            return <DatePicker
                id={"Valor"}
                label={label}
                size={[12, 12, 12, 12]}
                required={true}
                maxLength={8}
                validations={[validations.required()]}
                idFormSection={this.props.idForm} />
        }
        getInputArchivo(): JSX.Element {
            let item: any = this.props.item;
            let label: any = item.Requisito ? item.Requisito.Nombre : "";

            return <EK.UX.Kontrol.KontrolFile$Input
                id={"Valor"}
                label={label}
                size={[12, 12, 12, 12]}
                required={true}
                onChange={this.onChange}
                validations={[validations.required()]}
                idFormSection={this.props.idForm}
                mode={EK.UX.Kontrol.FileInputMode.Default} />
        }
        getInputLista(): JSX.Element {
            let item: any = this.props.item;
            let label: any = item.Requisito ? item.Requisito.Nombre : "";

            return <RequisitoValoresDDL
                id={"Valor"}
                info={item}
                idFormSection={this.props.idForm}
                label={label}
                hasValidationError={true}
                size={[12, 12, 12, 12]}
                required={true}
                validations={[validations.required()]} />
        }
        getInputEntidad(): JSX.Element {
            let item: any = this.props.item;
            let label: any = item.Requisito ? item.Requisito.Nombre : "";

            return <RequisitoEntidadDDL
                id={"Valor"}
                info={item}
                idFormSection={this.props.idForm}
                label={label}
                hasValidationError={true}
                size={[12, 12, 12, 12]}
                required={true}
                validations={[validations.required()]} />
        }
        componentWillMount(): void {
            Forms.remove(this.props.idForm);
        }
        shouldComponentUpdate(nextProps: IRequisitoEditorProps, nextState: IRequisitoEditorState): boolean {
            return hasChanged(this.props.requisito, nextProps.requisito) ||
                this.state.file !== nextState.file;
        }
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let info: RequisitoInfo = this.props.info;
            let item: any = this.props.item;
            let inputArr: JSX.Element[] = [];

            inputArr['NUM'] = this.getInputNumero();
            inputArr['TEX'] = this.getInputTexto();
            inputArr['LOG'] = this.getInputLogico();
            inputArr['FEC'] = this.getInputFecha();
            inputArr['ARCH'] = this.getInputArchivo();
            inputArr['LIS'] = this.getInputLista();
            inputArr['ENT'] = this.getInputEntidad();

            return isUpdating(this.props.requisito) ?
                <Row style={this.props.style}>
                    <Column size={[12, 12, 12, 12]}>
                        <Updating top={24} size={24} bottom={0} />
                    </Column>
                </Row> : <page.OptionSection
                    title={"Capturar requisito"}
                    subTitle={<span>
                        <span className="badge badge-warning bold" style={{ margin: "0px 5px" }}>{item.TipoRequisito.Nombre}</span>
                    </span>}
                    icon="fa fa-pencil"
                    collapsed={false}
                    hideCollapseButton={true}
                    editMode={true}>
                    <SectionView></SectionView>
                    <SectionEdit
                        idForm={this.props.idForm}
                        onCancel={this.onCancel}
                        onSave={this.onSave}
                        editMode={true}>                        
                            {info.tieneVencimiento ?
                            <Row>
                                <Column size={[8, 8, 8, 8]} style={{ padding: "0" }}>
                                    {inputArr[info.tipoClave]}
                                </Column>
                                <Column size={[4, 4, 4, 4]} style={{ padding: "0" }}>
                                    <DatePicker
                                        id={"FechaVencimiento"}
                                        label={$page.form.section.etapas$Requisitos.list.fechavencimiento}
                                        size={[12, 12, 12, 12]}
                                        required={true}
                                        maxLength={8}
                                        value={item.FechaVencimiento}
                                        idFormSection={this.props.idForm}
                                        validations={[validations.required()]} /> 
                                </Column> 
                            </Row> :
                            <Row>
                                <Column size={[12, 12, 12, 12]} style={{ padding: "0" }}>
                                    {inputArr[info.tipoClave]}
                                </Column>
                            </Row>
                            }
                    </SectionEdit>
                </page.OptionSection>
        }
    });

    export let RequisitoView: any = global.connect(class extends React.Component<IRequisitoEditorProps, {}>{
        constructor(props: IRequisitoEditorProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        }
        onClick(item: any): void {
            dispatchSuccessful("scv-seguimientos-requisitos-setSelected", item);
        }
        render(): JSX.Element {
            let info: RequisitoInfo = this.props.info;
            let item: any = this.props.item;
            let responsable: DataElement = createSuccessfulStoreObject(item.Seguimiento.Posicion);
            let icon: any = RequisitoInfo.ICONO_TIPO_REQUISITO[item.TipoRequisito.Clave]
            let requisito = global.assign({}, item.Requisito);

            let editRequisito: any = {
                icon: icon,
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                    Forms.remove(id);
                    dispatchSuccessful("scv-seguimientos-requisitos-setSelected", item);
                }
            };

            /*
                <Column size={[2, 2, 2, 2]} style={{ fontWeight: "normal" }}>
                    <div style={{ fontWeight: 400, float: "center", color: RequisitoInfo.ICONO_ITEMS_COLOR[info.colorTextoPosibleVencimiento] }}>{EK.UX.Labels.formatDate(item.FechaRecepcionPosible)}</div>
                </Column>
                <Column size={[2, 2, 2, 2]} style={{ fontWeight: "normal" }}>
                    <div style={{ fontWeight: 400, float: "center" }}>{EK.UX.Labels.formatDate(item.FechaRecepcion)}</div>
                </Column>
                <Column size={[2, 2, 2, 2]} style={{ fontWeight: "normal" }}>
                    {info.tieneVencimiento && info.estatusRequisitoItem === 'E' ?
                        <div style={{ fontWeight: 400, float: "center", color: RequisitoInfo.ICONO_ITEMS_COLOR[info.activarAlertaRequisitoVencido ? info.colorTextoRequisitoVencido : 'SINMARCA'] }}>{
                            EK.UX.Labels.formatDate(item.FechaVencimiento)}
                        </div> : null}
                </Column>
            */
            let $page: any = $ml[PAGE_ID];
            let tdStyleLabel: string = "style='font-weight: 600; font-size: 11px; padding: 5px'";
            let tdStyleValue: string = "style='font-weight: 300; font-size: 11px; padding: 5px'";
            let fechasContent: string =
                "<table>" +
                "<tr><td " + tdStyleLabel + ">" + $page.form.section.etapas$Requisitos.list.fechavencimiento + "</td>" +
                "<td " + tdStyleValue + ">" + EK.UX.Labels.formatDate(item.FechaRecepcionPosible) + "</td></tr>" +
                "<tr><td " + tdStyleLabel + ">" + $page.form.section.etapas$Requisitos.list.fecharecepcion + "</td>" +
                "<td " + tdStyleValue + ">" + EK.UX.Labels.formatDate(item.FechaRecepcion) + "</td></tr>" +
                (info.tieneVencimiento && info.estatusRequisitoItem === "E" ?
                    "<tr><td " + tdStyleLabel + ">" + $page.form.section.etapas$Requisitos.list.fechavencimiento + "</td>" +
                    "<td " + tdStyleValue + ">" + EK.UX.Labels.formatDate(item.FechaVencimiento) + "</td></tr>" : "") +
                "</table>";

            return <Row className="list-item-content" style={RequisitoInfo.ROW_ITEMS_STYLE[info.estatus_etapa]}>
                <Column size={[9, 9, 9, 9]}>
                    <span className={RequisitoInfo.ICONO_ITEMS[info.estatus_etapa]} style={{ fontSize: 12, color: RequisitoInfo.ICONO_ITEMS_COLOR[info.colorTextoRequisitoVencido] }}></span>
                    {info.obligatorio ? <span className={RequisitoInfo.ICONO_ITEMS["*"]} style={{ fontSize: 10, color: info.colorRequisitoObligatorio }}></span> : null}
                    <span style={{ fontWeight: 600, fontSize: 11 }}>{requisito.Nombre ? requisito.Nombre.trim() : ""}</span>
                    <div style={{ fontWeight: 300, fontSize: 10, fontStyle: "italic" }}>{requisito.Descripcion ? requisito.Descripcion.trim() : ""}</div>
                </Column>
                <Column size={[1, 1, 1, 1]} className="text-center" style={{ fontWeight: "normal" }}>
                    <span className={RequisitoInfo.ICONO_ITEMS_CLASS[info.colorTexto]}>{info.diasParaCulminar ? info.diasParaCulminar : <i className="fa fa-minus"></i>}</span>
                </Column>
                <Column size={[2, 2, 2, 2]}>
                    <EK.UX.HoverCard content={fechasContent} placement={"left"}><EK.UX.Icon type={"fa fa-calendar"} style={{ fontSize: 16 }} /></EK.UX.HoverCard>
                    <PopoverDemo item={item} info={info} itemKey={"requisito-" + item.ID} />
                    {item.ReadOnlyKontrol === 0 ?
                        <span className="fa fa-lock" style={{ fontSize: "18px", color: "#FF8F00 " }}></span> : 
                        <div style={{ width: 21, height: 20, display: "inline-block" }}>&nbsp;</div>}
                    {info.activarEdicion && item.ReadOnlyKontrol === 1 ?
                        <buttons.PopOver idForm={this.props.idForm} renderColumn={false} style={{marginTop: "-8px"}} info={item} extraData={[editRequisito]} /> : 
                        <div style={{ width: 21, height: 20, display: "inline-block" }}>&nbsp;</div>
                        }
                    {info.estatusRequisitoItem === "D" ?
                            <PopoverAutorizacion responsable={responsable} entidad={"requisito"} placement={"left"} /> : false}
                </Column>
            </Row>
        }
    });

    interface IRequisitoValoresDDL extends IDropDrownListProps {
        info?: any;
    }
    let RequisitoValoresDDL: any = global.connect(class extends React.Component<IRequisitoValoresDDL, {}>{
        constructor(props: IRequisitoValoresDDL) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.simpleddlitems
        });
        static defaultProps: IDropDrownListProps = {
            id: "Valor",
            items: createDefaultStoreObject([]),
            label: "Valor de Requisito",
            helpLabel: "Seleccione el valor de requisito",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let info: any = this.props.info;
            let item: any = { ID: 0, Nombre: "undefined" };
            let items: any[] = [];

            try {
                if (info.Valor) {
                    item = JSON.parse(info.Valor);
                }
            } catch (e) { }

            try {
                if (info.Valores) {
                    items = JSON.parse(info.Valores);
                }
            } catch (e) { }

            Forms.updateFormElement(idForm, "Valor", item);
            dispatchSuccessful("load::simpleddlitems", items);
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });


    interface IRequisitoEntidadDDL extends IDropDrownListProps {
        info?: any;
        catalogoGeneral?: DataElement;
    }
    let RequisitoEntidadDDL: any = global.connect(class extends React.Component<IRequisitoEntidadDDL, {}>{
        constructor(props: IRequisitoEntidadDDL) {
            super(props);
        }
        static props: any = (state: any) => ({
            items: state.global.entidadItems,
            catalogoGeneral: state.global.catalogoGeneral
        });
        static defaultProps: IDropDrownListProps = {
            id: "Valor",
            items: createDefaultStoreObject([]),
            label: "Valor de Requisito",
            helpLabel: "Seleccione el valor de requisito",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12]
        };
        componentDidMount(): void {
            let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let idCatalogo: number = Number(this.props.info.IdTipoEntidad);
            let idEntidad: number = Number(this.props.info.Valor);

            Forms.updateFormElement(idForm, "Valor", { ID: idEntidad });
            global.dispatchAsync("load::catalogoGeneral", "catalogos/get/" + idCatalogo);
        }
        componentWillReceiveProps(nextProps: IRequisitoEntidadDDL): void {
            if (global.hasChanged(this.props.catalogoGeneral, nextProps.catalogoGeneral)) {
                if (global.isSuccessful(nextProps.catalogoGeneral)) {
                    let data: any = global.getData(nextProps.catalogoGeneral);
                    let parametros: any = global.encodeParameters({ activos: 1 });

                    global.dispatchAsync("load::entidadItems", "base/" + data.Clave + "/all/" + parametros);
                }
            }
        }
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    interface IPopoverDemoProps extends React.Props<any> {
        item: any;
        itemKey: string;
        info: RequisitoInfo;
        dataManager?: StateDataManager;
    };
    let PopoverDemo: any = global.connect(class extends React.Component<IPopoverDemoProps, {}>{
        constructor(props: IPopoverDemoProps) {
            super(props);
            this.getValueAsync = this.getValueAsync.bind(this);
        }
        static props: any = (state: any) => ({
            dataManager: new StateDataManager(state.seguimientosReducer)
        });
        getValueAsync(): global.DataElement {
            let item: global.DataElement = this.props.dataManager.getById(this.props.itemKey);
            if (item === null || item === undefined) {
                item = createDefaultStoreObject({});
            }
            return item;
        };
        componentWillMount(): void {
            global.dispatchDefault("scv-seguimientos-requisito-valores", {}, this.props.itemKey);
        };
        componentDidMount(): any {
            let info: RequisitoInfo = this.props.info;
            if (info.tipoClave === "ENT") {
                let idCatalogo: number = Number(this.props.item.IdTipoEntidad);
                let idEntidad: number = Number(this.props.item.Valor);
                global.asyncGet("catalogos/get/" + idCatalogo, (status: AsyncActionTypeEnum, data: any) => {
                    if (status === AsyncActionTypeEnum.successful) {
                        global.dispatchAsyncPost("scv-seguimientos-requisito-valores", "base/" + data.Clave + "/id", { id: idEntidad }, this.props.itemKey);
                    }
                });
            }
        };
        fnNumero($page: any, item: any): any {
            let valor: any = Number(item.Valor) ? Number(item.Valor) : $page.form.section.etapas$Requisitos.popover.nodata;
            //
            return "<span style='font-size: 14px; font-weight: 400'>" + valor + "</span>";
        };
        fnTexto($page: any, item: any): any {
            let valor: string = String(item.Valor) ? String(item.Valor) : $page.form.section.etapas$Requisitos.popover.nodata;
            //
            return "<span style='font-size: 14px; font-weight: 400'>" + valor + "</span>";
        }
        fnFecha($page: any, item: any): any {
            let valor: string = String(item.Valor) ? String(item.Valor) : $page.form.section.etapas$Requisitos.popover.nodata;
            //
            return "<span class='badge badge-success caption-subject'>" + valor + "</span>";
        };
        fnArchivo($page: any, item: any): any {
            let link: string = ["SCV/Seguimientos", "Requisitos/GetFileViewer", item.IdExpediente, item.IdRequisito, item.Valor, "false"].join("/");
            let linkDownload: string = ["SCV/Seguimientos", "Requisitos/GetFileViewer", item.IdExpediente, item.IdRequisito, item.Valor, "true"].join("/");
            //
            let element: string;
            //
            if (item.Valor) {
                //element = '<a href="javascript::global.goModal("""", ""' + link + '"", null, ""nuevo"");" title="' + $page.form.section.etapas$Requisitos.popover.download + '" target="_blank" onClick=><i class="fa fa-download"></i></a>';
                element = '<a href="' + link + '" title="' + $page.form.section.etapas$Requisitos.popover.download + '" target="_blank"><i class="fa fa-download"></i></a>';
            } else {
                element = "<span>" + $page.form.section.etapas$Requisitos.popover.nodata + "</span>";
            }

            return (element);
        };
        fnLogico($page: any, item: any): any {
            let s: boolean = item && item.Valor === true;
            //
            return EK.UX.Labels.badgeEstatusString(s); 
        };
        fnLista($page: any, item: any): any {
            let element: string;

            try {
                if (item.Valor) {
                    let selected = JSON.parse(item.Valor);
                    element = "<span class='badge badge-success caption-subject'>" + selected.Nombre + "</span>";
                } else {
                    element = "<span class='badge badge-danger caption-subject'>" + $page.form.section.etapas$Requisitos.popover.nodata + "</span>";
                }
            } catch (e) {
                element = "<span class='badge badge-danger caption-subject'>Error al obtener la información</span>";
            }

            return (element);
        };
        fnProceso($page: any, item: any): any {
            let valor: string = String(item.Valor) ? String(item.Valor) : $page.form.section.etapas$Requisitos.popover.nodata;
            //
            return "<span class='badge badge-success caption-subject'>" + valor + "</span>";
        };
        fnEntidad($page: any, item: any): any {
            let entidad: global.DataElement = this.getValueAsync();
            let element: any;

            if (global.isSuccessful(entidad)) {
                element = "<span class='badge badge-success caption-subject'>" + global.getData(entidad).Nombre + "</span>";
            } else {
                element = "<span><i class='fa fa-circle-o-notch fa-spin font-blue-sharp' style='font-size: 12px'></i> cargando... </span>";
            };

            return (element);
        };
        shouldComponentUpdate(nextProps: IPopoverDemoProps, {}): boolean {
            return hasChanged(this.props.dataManager, nextProps.dataManager);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let item: any = this.props.item;
            let info: RequisitoInfo = this.props.info;

            if (!item.Valor) {
                return null;
            }

            if (info.tipoClave === "ARCH") {
                if (item.Valor) {
                    let link: string = ["SCV/Seguimientos", "Requisitos/GetFileViewer", item.IdExpediente, item.IdRequisito, item.Valor, "false"].join("/");
                    //element = '<a href="javascript::global.goModal("""", ""' + link + '"", null, ""nuevo"");" title="' + $page.form.section.etapas$Requisitos.popover.download + '" target="_blank" onClick=><i class="fa fa-download"></i></a>';
                    return <a
                        title={$page.form.section.etapas$Requisitos.popover.download}
                        target={"_blank"}
                        onClick={() => {
                            global.goModal("modalArchivosRequisitos", link);
                        }}
                    ><i className="fa fa-download"></i></a>;
                } else {
                    return <span>{$page.form.section.etapas$Requisitos.popover.nodata}</span>;
                }
            }
            else {

                let funciones: Function[] = [];
                funciones['NUM'] = this.fnNumero;
                funciones['TEX'] = this.fnTexto;
                funciones['FEC'] = this.fnFecha;
                funciones['ARCH'] = this.fnArchivo;
                funciones['LOG'] = this.fnLogico;
                funciones['LIS'] = this.fnLista;
                funciones['PROC'] = this.fnProceso;
                funciones['ENT'] = this.fnEntidad;

                let funcion: Function = funciones[info.tipoClave];
                let content: any = funcion.call(this, $page, item);

                return <EK.UX.HoverCard
                    title={""}
                    content={content}
                    placement={"left"}>
                    <EK.UX.Icon type={"fa fa-info"} style={{ fontSize: 16 }} />
                </EK.UX.HoverCard>;
            }
        }
    });
}