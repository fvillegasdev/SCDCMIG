namespace EK.UX.Buttons {
    "use strict";
    const STYLE_DEF_BUTTON_ID: string = "";

    /* BEGIN: class aliases */
    class Icon extends EK.UX.Icon { };
    /* END: class aliases */

    export var ButtonTypeEnum: any = {
        iconOnly: "btn-icon-only"
    };

    export interface IButtonProps extends global.props, grid.IColumn {
        id?: string;
        idParent?: string;
        buttonType?: string;
        index?: number;
        property?: string;
        extraData?: any;
        text?: string;
        icon?: string;
        iconRight?: string;
        color?: string;
        titulo?: string;
        keyBtn?: string;
        inverse?: boolean;
        rounded?: boolean;
        iconOnly?: boolean;
        buttonSize?: "xs" | "sm" | "md" | "lg";
        visible?: boolean | Function;
        info?: any;
        onClick?: Function;
        linkTo?: string;
        target?: string;
        style?: React.CSSProperties;
        className?: string;
    }

    interface IStateButtonProps extends IButtonProps {
        mapProps?: any;
    }

    export class ButtonGroup extends React.Component<{}, {}> {
        render(): any {
            return <div className="page-bar-button" style={{ float: "right", display: "inline-block" }}>{this.props.children}</div>;
        }
    }
    export class PageButtons extends React.Component<global.props, {}> {
        static defaultProps: global.props = {
            $displayName: "PageButtons"
        };
        render(): JSX.Element {
            return <ButtonGroup>
                {this.props.children}
            </ButtonGroup>;
        };
    };
    export class SectionButtons extends React.Component<global.props, {}> {
        static defaultProps: global.props = {
            $displayName: "SectionButtons"
        };
        render(): JSX.Element {
            return <div className="actions">
                {this.props.children}
            </div>;
        }
    }

    interface ISectionEditProps extends global.props {
        title?: string;
        idForm?: string;
        editMode?: boolean;
        iconSave?: string;
        inlineNew?: boolean;
        getButtons?: (id: string, props: ISectionEditProps) => any[];
        onSave?: (config?: page.IPageConfig) => any;
        onCancel?: () => any;
        defaultCancelButton?: boolean;
    };
    export class SectionEdit extends React.Component<ISectionEditProps, {}> {
        constructor(props: ISectionEditProps) {
            super(props);

            this.initComponent = this.initComponent.bind(this);
        }
        static defaultProps: ISectionEditProps = {
            $displayName: "SectionEdit",
            iconSave: "fa fa-check",
            getButtons: (id: string, props: ISectionEditProps) => {
                let buttons: any[] = [];

                if (props.onSave) {
                    buttons.push(<SaveButton id={props.idForm + "_saveButtonKey"} idFormSection={props.idForm} icon={props.iconSave} iconOnly={true} className="" style={null} key={props.idForm + "_saveButtonKey"} onClick={props.onSave}></SaveButton>);
                };

                if (props.onCancel) {
                    buttons.push(<CancelButton idFormSection={props.idForm} iconOnly={true} className="" style={null} key="cancelButtonKey" onClick={props.onCancel}></CancelButton>);
                } else if (props.defaultCancelButton) {
                    buttons.push(<CancelButton idFormSection={id} iconOnly={true} className="" style={null} key="cancelButtonKey" onClick={props.onCancel}></CancelButton>);
                };

                return buttons;
            }
        }
        refs: {
            container: Element
        };
        initComponent(props: ISectionEditProps): any {
            let parents: any = $(this.refs.container).parents(".panel.panel-main");
            let wrapper: any = $(".page-container");

            $(this.refs.container).data("wasInit", true);
            $(parents.get(0)).addClass("panel-edit");
            if (parents.size() === 1) {
                let p: any = $(parents.get(0));

                wrapper.find(".blockUI").remove();
                wrapper.block({ message: null });
                p.css("z-index", 1011);
            }
            else {
                if (parents.size() > 1) {
                    let p: any = $(parents.get(1));
                    if (p.css("z-index") === "1011") {
                        setTimeout(() => { p.block({ message: null }); }, 100);
                    }
                    else {
                        wrapper.find(".blockUI").remove();
                        setTimeout(() => { wrapper.block({ message: null }); }, 100);
                    };

                    $(parents.get(0)).css("z-index", 1011);
                };
            };
        };
        componentDidMount(): void {
            if (this.props.editMode !== true) return;
            //
            this.initComponent(this.props);
        };
        componentWillReceiveProps(nextProps: ISectionEditProps, nextState: ISectionEditProps): void {
            if (this.props.editMode !== nextProps.editMode) {
                if (nextProps.editMode === true) {
                    this.initComponent(nextProps);
                };

                return;
            };

            if (nextProps.editMode === true && $(this.refs.container).data("wasInit") !== true) {
                this.initComponent(nextProps);
                //
                return;
            };
            //this.initComponent(nextProps);
        };
        componentWillUnmount(): void {
            if (this.props.editMode !== true) return;

            let parents: any = $(this.refs.container).parents(".panel.panel-main");
            let wrapper: any = $(".page-container");

            $(parents.get(0)).removeClass("panel-edit");
            if (parents.size() === 1) {
                let p: any = $(parents.get(0));

                wrapper.unblock({ message: null });
                p.css("z-index", "auto");
                wrapper.find(".blockUI").remove();
            }
            else {
                if (parents.size() > 1) {
                    let p: any = $(parents.get(1));
                    if (p.css("z-index") === "1011") {
                        p.unblock({ message: null });
                    }
                    else {
                        wrapper.unblock({ message: null });
                        wrapper.find(".blockUI").remove();
                    };

                    $(parents.get(0)).css("z-index", "auto");
                };
            };
        };
        render(): any {
            let sectionChildren: any[] = [];
            React.Children.forEach(this.props.children, (child: any, index: number): any => {
                if (child) {
                    if (child.props.$displayName === "SpecialButton") {
                        let btnProps: buttons.IButtonProps = global.assign(child.props);
                        btnProps.key = "specialBtn$";
                        btnProps.$props = {
                            idParentSection: this.props.idForm,
                            buttonMode: "edit"
                        };

                        let btnEditSpecial: any = React.cloneElement(child, btnProps);

                        sectionChildren.push(btnEditSpecial);
                    }
                    else {
                        sectionChildren.push(child);
                    };
                };
            });

            return <div ref="container" className="section-edit">{this.props.children}</div>;
        }
    };

    interface ISectionViewProps extends global.props {
        title?: string;
        editMode?: boolean;
        inlineNew?: boolean;
        getButtons?: (id: string, props: ISectionViewProps) => any[];
        onAddNew?: () => any;
        onEdit?: () => any;
        onDelete?: () => any;
        defaultEditButton?: boolean;
        onMounted?: (e: any) => void;
        onUpdated?: (e: any) => void;
    };
    export class SectionView extends React.Component<ISectionViewProps, {}> {
        constructor(props: ISectionViewProps) {
            super(props);
        }
        static defaultProps: ISectionViewProps = {
            $displayName: "SectionView",
            getButtons: (id: string, props: ISectionViewProps) => {
                let buttons: any[] = [];

                if (!(props.inlineNew === true)) {
                    if (props.onAddNew) {
                        buttons.push(<AddButton key="addButtonKey" iconOnly={true} className="" style={null} onClick={props.onAddNew}></AddButton>);
                    };
                };

                if (props.onEdit || props.defaultEditButton === true) {
                    buttons.push(<EditButton key="editButtonKey" iconOnly={true} className="" style={null} slot={id} onClick={props.onEdit}></EditButton>);
                };

                if (props.onDelete) {
                    buttons.push(<DeleteButton key="deleteButtonKey" iconOnly={true} className="" style={null} slot={id} onClick={props.onDelete}></DeleteButton>);
                };

                return buttons;
            }
        }
        refs: {
            container: Element
        };
        componentDidMount(): void {
            let parents: any = $(this.refs.container).parents(".panel.panel-main");

            $(parents.get(0)).addClass("panel-view");

            if (this.props.onMounted) {
                this.props.onMounted(this.refs.container);
            };
        };
        componentDidUpdate(): void {
            if (this.props.onUpdated) {
                this.props.onUpdated(this.refs.container);
            };
        };
        componentWillUnmount(): void {
            let parents: any = $(this.refs.container).parents(".panel.panel-main");

            $(parents.get(0)).removeClass("panel-view");
        };
        render(): any {
            return <div ref="container" className="section-view">{this.props.children}</div>;
        }
    }

    export class Button extends React.Component<IButtonProps, IButtonProps> {
        constructor(props: IButtonProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        }

        static defaultProps: IButtonProps = {
            buttonType: ButtonTypeEnum.iconOnly,
            icon: "",
            text: "",
            titulo: undefined,
            keyBtn: "",
            color: EK.UX.ColorEnum.default,
            inverse: false,
            rounded: false,
            iconOnly: false,
            visible: true,
            info: {
                data: {},
                timestamp: -1,
                status: -1
            }
        };

        refs: {
            button: Element
        };
        onClick(e: any): any {
            if (this.props.onClick) {
                this.props.onClick(this.props.info, this.refs.button);
            }
            else {
                if (this.props.linkTo) {
                    go(this.props.linkTo);
                };
            };
        };
        shouldComponentUpdate(nextProps: IButtonProps, nextState: IButtonProps): boolean {
            return true;
        };
        componentDidMount(): any {
            //$(this.refs.button).on("mousedown", function (e) {
            //e.preventDefault();
            //return false;
            //});
        };
        componentWillUnmount(): any {
            //$(this.refs.button).off("mousedown");
        };
        render(): JSX.Element {
            // this.props.key; 
            let $titleButton: any;
            if (!this.props.visible) {
                return null;
            }
            $titleButton = this.props.titulo;
            if ((this.props.titulo === undefined || this.props.titulo === null) && this.props.keyBtn != undefined && this.props.keyBtn != null) {
                let tituloBtnML = $ml['BotonesApp'];
                $titleButton = tituloBtnML[this.props.keyBtn] != undefined &&
                    tituloBtnML[this.props.keyBtn] != null && tituloBtnML[this.props.keyBtn].titulo != undefined &&
                    tituloBtnML[this.props.keyBtn].titulo != null ? tituloBtnML[this.props.keyBtn].titulo : undefined;
            }

            let className: string = this.props.className;
            let icon: JSX.Element;
            let btnSize: string;

            if (this.props.buttonType === "list-item") {
                if (this.props.icon !== "") {
                    icon = <Icon type={this.props.icon} />;
                };

                return <li onClick={this.onClick} data-target-button={this.props.target}><a tabIndex={-1} className={className} href="javascript:void(0)" ref="button">
                    {icon} {this.props.text}
                    {this.props.children}
                </a></li>;
            }
            else if (this.props.buttonType === "anchor") {
                if (this.props.icon !== "") {
                    icon = <Icon type={this.props.icon} />;
                };

                return <div>
                    <a onClick={this.onClick} tabIndex={-1} className={className} href="javascript:void(0)" ref="button">
                        {icon} {this.props.text}
                    </a>
                    {this.props.children}
                </div>;
            }
            else {
                if (this.props.iconOnly !== true) {
                    className = "btn " + className + " ";
                    btnSize =
                        this.props.buttonSize === "xs" ? "btn-xs" :
                            this.props.buttonSize === "sm" ? "btn-sm" :
                                this.props.buttonSize === "md" ? "" :
                                    this.props.buttonSize === "lg" ? "btn-lg" : "";

                    className += " " + btnSize;

                    if (this.props.inverse) {
                        className += " btn-outline";
                    };

                    className += " " + this.props.color;

                    if (this.props.icon !== "") {
                        icon = <Icon type={this.props.icon} />;
                    };
                }
                else {
                    let icoClassName: string = ""; //className.replace("btn-ico-ek", "");
                    icoClassName += " " + this.props.color;

                    if (this.props.icon !== "") {
                        icon = <i className={icoClassName + " " + this.props.icon} style={this.props.style}></i>;
                    };
                }

                if (this.props.iconOnly === true) {
                    return <button
                        id={this.props.id}
                        className={className}
                        onClick={this.onClick}
                        onMouseDown={() => { $("#formControl_Importe").blur(); }}
                        style={this.props.style}
                        title={$titleButton}
                        ref="button">{icon}
                        {this.props.children}
                    </button>
                }
                else {
                    return <button
                        id={this.props.id}
                        className={className}
                        href="javascript:void(0)"
                        onClick={this.onClick}
                        style={this.props.style}
                        title={$titleButton}
                        ref="button">
                        {icon}
                        {this.props.text !== "" ? <span className="hidden-xs"> {this.props.text}</span> : null}
                        {this.props.children}
                    </button>;
                }
            }
        }
    }
    export class Link extends React.Component<IButtonProps, IButtonProps> {
        constructor(props: IButtonProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        }

        static defaultProps: IButtonProps = {
            buttonType: ButtonTypeEnum.iconOnly,
            icon: "",
            text: "",
            color: EK.UX.ColorEnum.default,
            inverse: false,
            rounded: false,
            iconOnly: false,
            visible: true,
            info: {
                data: {},
                timestamp: -1,
                status: -1
            }
        };

        shouldComponentUpdate(nextProps: IButtonProps, nextState: IButtonProps): boolean {
            return true;
        }

        onClick(e: any): any {
            if (this.props.onClick) {
                this.props.onClick(this.props.info);
            }
        }

        render(): JSX.Element {
            if (!this.props.visible) {
                return null;
            }

            let className: string = "";
            let icon: JSX.Element;
            let btnSize: string =
                this.props.buttonSize === "xs" ? "btn-xs" :
                    this.props.buttonSize === "sm" ? "btn-sm" :
                        this.props.buttonSize === "md" ? "" :
                            this.props.buttonSize === "lg" ? "btn-lg" : "";

            className += btnSize;
            if (this.props.inverse) {
                className += " btn-outline";
            };

            className += " " + this.props.color;

            if (this.props.icon !== "") {
                icon = <Icon type={this.props.icon} />;
            };

            if (this.props.iconOnly) {
                // className += " btn-icon-only";
            };

            if (this.props.className) {
                className += " " + this.props.className;
            };

            return <a
                className={this.props.className}
                href="javascript:;"
                onClick={this.onClick}
                style={this.props.style}>
                {icon}
                {this.props.text}
            </a>;
        }
    }
    export class ButtonPlus extends React.Component<IButtonProps, {}> {
        constructor(props: IButtonProps) {
            super(props);
        }

        static defaultProps: IButtonProps = {
            icon: IconTypeEnum.plus,
            text: "",
            color: "",
            className: "",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };

        render(): JSX.Element {
            let color: string = "white";
            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn-default-ek";
            };

            return <Button {...this.props} keyBtn={"btnSectionButtonPlus"} className={className} color={color} />;
        }
    }
    export class StateButton extends React.Component<IStateButtonProps, IStateButtonProps> {
        private stateButton: any;

        shouldComponentUpdate(nextProps: IStateButtonProps, nextState: IStateButtonProps): boolean {
            return true;
        }

        render(): JSX.Element {
            if (!this.stateButton) {
                this.stateButton = ReactRedux.connect(this.props.mapProps)(Button);
            }

            return <this.stateButton
                icon={this.props.icon}
                iconOnly={this.props.iconOnly}
                inverse={this.props.inverse}
                color={this.props.color}
            />;
        }
    }
    export interface ISaveButtonProps extends IButtonProps {
        config?: page.IPageConfig,
        forms?: any;
        entidad?: DataElement;
        state?: DataElement;
        idForm?: string;
        idFormSection?: string;
        pageLink?: DataElement;
    }
    class Save$Button extends React.Component<ISaveButtonProps, {}> {
        constructor(props: ISaveButtonProps) {
            super(props);
            this.dispatchEntity = this.dispatchEntity.bind(this);
            this.onSave = this.onSave.bind(this);
        }
        //
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            forms: state.forms,
            idForm: getData(state.global.page).id,
            entidad: state.global.currentEntity,
            state: state.global.currentEntityState,
            pageLink: state.global.currentLink
        });
        //
        static defaultProps: ISaveButtonProps = {
            icon: "icon-cloud-upload",
            text: "",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        //
        dispatchEntity(item: any, url?: string): void {
            let pageLink: string = getData(this.props.pageLink);
            let actionUrl: string = url ? url : [pageLink, "/save"].join("");
            //let idPage: string = this.props.id;

            dispatchAsyncPut("global-current-entity", actionUrl, item);
        };
        onSave(): void {
            try {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;

                //if (idForm == "scv_Planes_Pagos_ConceptosPago") {

                //    let porcentaje: any = Forms.getValue("Porcentaje", idForm);
                //    let importe: any = Forms.getValue("Importe", idForm);

                //    if ((porcentaje && porcentaje != 0) && (importe && importe != 0)) {
                //        warning("Sólo se puede llenar uno de los campos de importe o porcentaje, no ambos")
                //        return;
                //    }
                //}
                if (!Forms.isValid(idForm)) {
                    warning("Los datos están incompletos, verificar campos requeridos y validaciones");
                    return;
                } else {
                    if (this.props.onClick) {
                        let item: any = this.props.onClick(this.props.config);

                        if (item) {
                            let dispatchItem: any;
                            let url: string;

                            if (item.url) {
                                dispatchItem = item.model;
                                url = item.url;
                            } else {
                                dispatchItem = item;
                            }

                            this.dispatchEntity(dispatchItem, url);
                        };
                    };
                };
            } catch (e) { }
        };
        componentDidMount(): void { };
        componentWillReceiveProps(nextProps: ISaveButtonProps, nextState: ISaveButtonProps): any {
            if (global.hasChanged(this.props.entidad, nextProps.entidad)) {
                let idEntidad: number = getDataID(nextProps.entidad);
                if (idEntidad > 0) {
                    let context: any = global.getCurrentContext();
                    let location: any = context.location;
                    let search: string = location.search;

                    let nuevoPos: number = search.indexOf("?nuevo");

                    if (nuevoPos === 0) {
                        let id: string = getDataID(nextProps.entidad);

                        let url: string = context.routes[0].path;
                        url = url.replace(":id", id);
                        go(url)
                    }
                }
            };
        };
        render(): JSX.Element {
            if (isSuccessful(this.props.state)) {
                let state = getData(this.props.state);

                if (state.viewMode === true) {
                    return null;
                };
            };

            if (isUpdating(this.props.entidad)) {
                return null;
            };

            let color: string = "white";
            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn-default-ek";
            };

            try {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                let form: any = this.props.forms[idForm];

                if (form.hasChanged) {
                    color = "yellow-casablanca";
                    className = className + " btn-editing";
                }
            } catch (e) { }
            let idFrm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
            let stateButtons: boolean = false;
            let state: any = EK.Store.getState();
            let f: any = state.forms[idFrm];
            let item: EK.UX.IFormElement;
            if (f) {
                let form = f.form;
                if (form) {
                    stateButtons = true;
                    //Validate Form Elements
                    for (var e in form) {
                        item = Forms.getFormElement(idFrm, { id: e });
                        item.validate = true;
                        //Capture required element
                        if (item.hasValidationError === true) {
                            stateButtons = false;
                        };
                    }
                }
            }
            if (stateButtons) {
                return <Button {...this.props} color={color} keyBtn={"btnSave"} className={className} onClick={this.onSave} />;
            } else {
                return null;
            }
        }
    }
    export let SaveButton: any = ReactRedux.connect(Save$Button.props, null)(Save$Button);

    export interface IViewButtonProps extends IButtonProps {
        globalLink?: string;
    }
    class View$Button extends React.Component<IViewButtonProps, {}> {
        constructor(props: IViewButtonProps) {
            super(props);

            this.getLink = this.getLink.bind(this);
            this.onClick = this.onClick.bind(this);
        };
        //
        static props: any = (state: any) => ({
            info: state.global.currentEntity,
            visible: isSuccessful(state.global.currentEntity),
            globalLink: getData(state.global.currentLink)
        });
        // 
        static defaultProps: IViewButtonProps = {
            icon: "fa fa-info",
            text: "",
            color: "white",
            className: "btn-ver btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        getLink(): string {
            let retValue: string;

            if (this.props.linkTo) {
                retValue = [this.props.linkTo, getDataID(this.props.info)].join("");
            }
            else {
                if (this.props.globalLink) {
                    retValue = [getDataID(this.props.info)].join("");
                };
            };

            return retValue;
        };
        onClick(e: any): any {
            if (!this.props.onClick) {
                go(this.getLink(), true)
            } else {
                this.props.onClick(this.props.info);
            };
        };
        render(): JSX.Element {
            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Read}>
                <Button {...this.props} keyBtn={"btnView"} onClick={this.onClick} />
            </Authorize>;
        };
    };
    export let ViewButton: any = ReactRedux.connect(View$Button.props, null)(View$Button);

    export interface IViewerButtonProps extends IButtonProps {
        entityType?: string;
        dataManager?: StateDataManager;
    }
    export interface IMapViewerButtonProps extends IButtonProps {
        entidad?: DataElement;
        entityType?: string;
        dataManager?: StateDataManager;
        url: string;
        showUpdateGeo: boolean;
        showRelateLocation: boolean;
        config: page.IPageConfig;
    }
    class MapViewer$Button extends React.Component<IMapViewerButtonProps, {}> {
        constructor(props: IMapViewerButtonProps) {
            super(props);

            this.getPropId = this.getPropId.bind(this);
            this.getItems = this.getItems.bind(this);
            this.onClick = this.onClick.bind(this);
            this.setModalUrl = this.setModalUrl.bind(this);
            this.updateLatLng = this.updateLatLng.bind(this);
        };
        //
        static props: any = (state: any) => ({
            info: state.global.currentEntity,
            entidad: state.global.currentEntity,
            entityType: state.global.currentEntityType,
            dataManager: new StateDataManager(state.kontrolFileManager),
            config: global.createPageConfigFromState(state.global)
        });
        // 
        static defaultProps: IViewerButtonProps = {
            id: "btnMap",
            icon: "fad fa-map-marked-alt",
            text: "",
            color: "white",
            className: "btn-ver btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined,
            style: {
                color: "#0277BD"
            }
        };
        refs: {
            modal: Element
        };
        getPropId(): string {
            let idEntityType: any = getData(this.props.entityType);
            let idEntity: any = getDataID(this.props.info);
            let tipo: string = EK.UX.Kontrol.KontrolFileTipo.Anexos;

            return ["catalogo_", tipo, idEntityType, idEntity].join("");
        };
        getItems(): any {
            let propId: string = this.getPropId();
            let items: DataElement = this.props.dataManager.getById(propId);
            let images: any[] = [];

            if (!items) {
                items = createDefaultStoreObject([]);
            };

            let itemsArr: any[] = global.getData(items);
            itemsArr.map((value: any, index: number) => {
                let fileType: string = $.trim(value.FileType).toLowerCase();
                if (fileType.indexOf("image/") === 0) {
                    images.push({
                        type: "image",
                        src: value.FilePath,
                        title: value.Nombre,
                        txt: "",
                        author: value.CreadoPor.Nombre
                    });
                };
            });

            return images;
        };
        addModalDivs(btnupdGeo: string, btnLocationLatLng: string): void {
            $("body").append("<div class='modal fade' id='" + this.props.id + "_modal' tabIndex='-1' role='dialog' aria-hidden='true' style='display: contents;'>" +
                "<div class='modal-dialog modal-full'>" +
                "<div class='modal-content' style='min-height:450px;'>" +
                "<div class='modal-header'>" +
                "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'></button>" +
                "<h4 class='modal-title'></h4>" +
                "</div>" +
                "<div class='modal-body' style='min-height:450px;'><iframe id='frmMaps' geolatlng='0' src='' style='width:100%; height: 100%; min-height:450px;' frameborder='0'></iframe></div>" +
                "</div >" +
                "</div>");
        }
        cleanModal(): void {
            let modalWindow: any = $("#" + this.props.id + "_modal");
            modalWindow.modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $('#' + this.props.id + '_modal').remove();
        }
        onClick(e: any): any {
            let btnupdGeo: string = this.props.showUpdateGeo ? "<button id='btnSaveGeo' type='button' class='btn green'>Actualizar Geolocalizacion</button>" : "";
            let btnLocationLatLng: string = this.props.showRelateLocation ? "<button id='btnMapLocation' type='button' class='btn green'  data-dismiss='modal'>Actualizar Ubicaciones</button>" : "";
            if (!$('#' + this.props.id + '_modal').length) {
                this.addModalDivs(btnupdGeo, btnLocationLatLng);
            } else {
                this.cleanModal();
                this.addModalDivs(btnupdGeo, btnLocationLatLng);
            }

            //this.setModalUrl();
            $('#btnSaveGeo').click(this.updateGeo);
            $("#" + this.props.id + "_modal").on('shown.bs.modal', (e: any) => {
                this.setModalUrl();
            });
            $('#btnMapLocation').click(this.updateLatLng);
            $('#frmMaps').attr("src", '');
            let modal: any = $("#" + this.props.id + "_modal");

            modal.modal('show');
        };
        setModalUrl(): any {
            let geoLatLng;
            $('#frmMaps').attr("src", this.props.url);

        };
        componentDidUpdate(prevProps: IMapViewerButtonProps, prevState: IMapViewerButtonProps): any {

        };
        updateGeo(): any {
            let geoLatLng: string = $('#frmMaps').contents().find('#hdnGeoLatLng').val();
            Forms.updateFormElement('scvclientes', 'Geolocalizacion', geoLatLng.replace('(', '').replace(')', ''));
        }

        updateLatLng(): any {
            let locationLatLng: any = $('#frmMaps').contents().find('#jsll_des').val();
            let modalwindow: any;
            if (locationLatLng.length > 0) {
                dispatchAsyncPut("global-page-data", "KontrolFiles/UpdateGeoJson", JSON.parse(locationLatLng));
                //dispatchAsyncPut("global-page-data", "KontrolFiles/UpdateGeoJson", JSON.parse(locationLatLng));
                //dispatchAsyncPut("global-current-entity", "KontrolFiles/UpdateGeoJson", JSON.parse(locationLatLng));
                //this.props.config.setState({ viewMode: true });
                let modalWindow: any = $("#" + this.props.id + "_modal");
                modalwindow.modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                this.cleanModal();
                setTimeout(function () {
                    success('Se agregaron las ubicaciones al Mapa', 'Desarrollos');
                }, 200);
            }
            else {
                errorMessage('No ha seleccionado ubicaciones', 'Desarrollos');
            }
        }
        componentDidMount(): any {

        };
        componentWillUnmount(): any {
            $('#frmMaps').attr("src", '');
            $("#" + this.props.id + "_modal").remove();
        };
        render(): JSX.Element {
            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Read}>
                <div style={{ display: "inline-block" }}>
                    <Button {...this.props} onClick={this.onClick} />
                </div>
            </Authorize>;
        };
    };
    export let MapViewerButton: any = ReactRedux.connect(MapViewer$Button.props, null)(MapViewer$Button);

    class Viewer$Button extends React.Component<IViewerButtonProps, {}> {
        constructor(props: IViewerButtonProps) {
            super(props);

            this.getPropId = this.getPropId.bind(this);
            this.getItems = this.getItems.bind(this);
            this.onClick = this.onClick.bind(this);
        };
        //
        static props: any = (state: any) => ({
            info: state.global.currentEntity,
            entityType: state.global.currentEntityType,
            dataManager: new StateDataManager(state.global)
        });
        // 
        static propsOnlyData: any = (state: any) => ({
            dataManager: new StateDataManager(state.global)
        });
        // 
        static defaultProps: IViewerButtonProps = {
            icon: "fa fa-image",
            text: "",
            color: "white",
            className: "btn-ver btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        getPropId(): string {
            let idEntityType: any = getData(this.props.entityType);
            let idEntity: any = getDataID(this.props.info);
            let tipo: string = EK.UX.Kontrol.KontrolFileTipo.Anexos;

            return [tipo, idEntityType, idEntity].join("$");
        };
        getItems(): any {
            let propId: string = this.getPropId();
            let items: DataElement = this.props.dataManager.getById(propId);
            let images: any[] = [];
            if (!items) {
                items = createDefaultStoreObject([]);
            };

            let itemsArr: any[] = global.getData(items);
            itemsArr.map((value: any, index: number) => {
                let fileType: string = $.trim(value.FileType).toLowerCase();
                if (fileType.indexOf("image/") === 0) {
                    images.push({
                        type: "image",
                        src: value.FilePath,
                        title: value.Nombre,
                        txt: "",
                        author: value.CreadoPor.Nombre
                    });
                };
            });

            return images;
        };
        onClick(e: any): any {
            let data: any = this.getItems();

            if (data && data.length > 0) {
                let lb: any = window["lc_lightbox"](data, { "skin": "dark" });
                window["lcl_open"](lb, 0);
            };
        };
        render(): JSX.Element {
            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Read}>
                <Button {...this.props} onClick={this.onClick} />
            </Authorize>;
        };
    };
    export let ViewerButton: any = ReactRedux.connect(Viewer$Button.props, null)(Viewer$Button);
    export let CustomViewerButton: any = ReactRedux.connect(Viewer$Button.propsOnlyData, null)(Viewer$Button);


    export interface INewButtonProps extends IButtonProps {
        globalLink?: string;
        state?: DataElement;
    }
    export const NewButton: any = global.connect(class extends React.Component<INewButtonProps, {}> {
        constructor(props: INewButtonProps) {
            super(props);

            this.getLink = this.getLink.bind(this);
            this.onClick = this.onClick.bind(this);
        }
        //
        static props: any = (state: any) => ({
            info: state.global.currentEntity,
            globalLink: getData(state.global.currentLink),
            state: state.global.currentEntityState
        });
        // 
        static defaultProps: INewButtonProps = {
            icon: "fa fa-plus",
            text: "",
            color: "white",
            className: "btn-nuevo btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        getLink(): string {
            let retValue: string;

            if (this.props.linkTo) {
                retValue = this.props.linkTo;

                go(retValue, false);
            }
            else {
                retValue = ["id?nuevo"].join("");

                let context: any = global.getCurrentContext();
                if (context && context.routes && context.routes.length > 0) {
                    let baseRoute = context.routes[0].path;
                    if (baseRoute.indexOf(":id") >= 0) {
                        retValue = baseRoute.replace(":id", "id?nuevo");
                        go(retValue, false);

                        return;
                    };
                };

                go(retValue, true);
            };
        };
        onClick(e: any): any {
            if (!this.props.onClick) {
                this.getLink();
            } else {
                this.props.onClick(this.props.info);
            };
        };
        render(): JSX.Element {
            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.New}>
                <Button {...this.props} keyBtn={"btnNew"} onClick={this.onClick} />
            </Authorize>;
        }
    });
    //export let NewButton: any = ReactRedux.connect(New$Button.props, null)(New$Button);

    export interface IEditButtonProps extends IButtonProps {
        config?: page.IPageConfig;
        slot?: string;
        entidad?: DataElement;
        state?: DataElement;
        page?: string;
    }
    class Edit$Button extends React.Component<IEditButtonProps, {}> {
        constructor(props: IEditButtonProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        }
        //
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            entidad: state.global.currentEntity,
            state: state.global.currentEntityState,
            page: getData(state.global.page).id
        });
        //
        static defaultProps: IButtonProps = {
            icon: "fa fa-edit",
            text: "",
            color: "white",
            className: "btn-editar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };

        getData(): DataElement {
            let id: string = this.props.slot;
            let config: page.IPageConfig = this.props.config;
            let retValue: DataElement;

            let slot: string;
            if (config.hasSlot(id)) {
                retValue = config.getEntity(id);
            }
            else {
                retValue = config.getEntity();
            };

            return retValue;
        };

        onClick(e: any): any {
            if (!this.props.onClick) {
                let configEntity: DataElement = this.props.config.getEntity(this.props.slot);
                if (isSuccessful(configEntity)) {
                    this.props.config.updateForm(this.props.slot);
                    //let entidad: any = getData(configEntity);
                    //let elements: any = {};

                    //for (var p in entidad) {
                    //    if (p === "Estatus") {
                    //        let data: any = entidad[p];
                    //        if (data && data.Clave === "A") {
                    //            elements[p] = true;
                    //        } else if (data && data.Clave === "B") {
                    //            elements[p] = false;
                    //        } else {
                    //            elements[p] = entidad[p]
                    //        }
                    //    } else {
                    //        elements[p] = entidad[p];
                    //    };
                    //};
                    //Forms.updateFormElements(this.props.page, elements);
                };
                this.props.config.setState({ viewMode: false }, this.props.slot);
                //dispatchSuccessful("global-current-entity-state", { viewMode: false });
            } else {
                this.props.onClick(this.props.info);
            };
        };

        componentDidMount(): void {
        };

        render(): JSX.Element {
            let configState: DataElement = this.props.config.getState(this.props.slot);
            let configEntity: DataElement = this.props.config.getEntity(this.props.slot);

            if (isSuccessful(configState)) {
                let state = getData(configState);

                if (state.viewMode === false) {
                    return null;
                };
            };
            //if (isSuccessful(this.props.state)) {
            //    let state = getData(this.props.state);

            //    if (state.viewMode === true) {
            //        return null;
            //    };
            //};

            if (!isSuccessful(configEntity)) {
                return null;
            };

            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn-editar btn-default-ek";
            };

            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={AuthorizePermission.Write}>
                <Button {...this.props} className={className} keyBtn={"btnEdit"} onClick={this.onClick} />
            </Authorize>;
        }
    }
    export let EditButton: any = ReactRedux.connect(Edit$Button.props, null)(Edit$Button);

    export interface IDeleteButtonProps extends IButtonProps {
        forms?: any;
        entidad?: any;
        idForm?: string;
        idFormSection?: string;
        fullTrust: boolean;
        state?: DataElement;
        pageLink?: DataElement;
        onDelete?: (id: any, props: page.IProps) => void;
        config?: any
    }
    export class Delete$Button extends React.Component<IDeleteButtonProps, {}> {
        constructor(props: IDeleteButtonProps) {
            super(props);
            this.dispatchEntity = this.dispatchEntity.bind(this);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            idForm: getData(state.global.page).id,
            entidad: state.global.currentEntity,
            state: state.global.currentEntityState,
            pageLink: state.global.currentLink,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            defaultDeleteAction: (id: any, idForm: string): void => go("/kontrol/" + idForm + "/delete/" + id)
        });
        //
        static defaultProps: IDeleteButtonProps = {
            icon: "fa fa-trash",
            text: "",
            color: "white",
            className: "btn-eliminar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined,
            fullTrust: false
        };
        dispatchEntity(id: number): void {
            let actionUrl: string = [getData(this.props.pageLink), "/delete"].join("");
            let idPage: string = this.props.idForm;
            dispatchUpdating("global-current-catalogo", {});
            dispatchAsyncPut("global-current-entity", actionUrl, { id });
        };
        defaultDeleteAction(): void {
        };
        onClick(): void {
            if (isSuccessful(this.props.entidad)) {
                let config: page.IPageConfig = this.props.config;
                let configid: any = config.id;
                EK.Global.confirm("Presione continuar para eliminar el elemento seleccionado", "EnKontrol", () => {
                    if (this.props.onDelete) {
                        dispatchUpdating("global-current-catalogo", {});
                        this.props.onDelete(getDataID(this.props.entidad), this.props);
                    }
                    else {
                        this.dispatchEntity(getDataID(this.props.entidad));
                    }
                    if (getCurrentContext().params.id != undefined) {
                        global.goBack();
                        //go(config.modulo + "/" + config.id, false);
                    }
                });
            };
        };
        render(): JSX.Element {
            let state: any = getData(this.props.state);
            if (!isSuccessful(this.props.entidad)) {
                return null;
            };

            if (isUpdating(this.props.entidad)) {
                return null;
            };

            if (isSuccessful(this.props.state)) {
                if (state.isNew === true) {
                    return null;
                };
            };

            let color: string = "white";
            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn-default-ek";
            };

            try {
                let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                let form: any = this.props.forms[idForm];

                if (form.hasChanged) {
                    color = "yellow-casablanca";
                    className = className + " btn-editing";
                }
            } catch (e) { }

            let permiso: AuthorizePermission = AuthorizePermission.Delete;
            if (this.props.fullTrust === true) {
                permiso = AuthorizePermission.None;
            };

            return <Authorize accion={AuthorizeAction.RenderBlocked} permiso={permiso}>
                <Button {...this.props} keyBtn={"btnDelete"} onClick={this.onClick} />
            </Authorize>;
        }
    }
    export let DeleteButton: any = ReactRedux.connect(Delete$Button.props, null)(Delete$Button);

    export interface ICancelButtonProps extends IButtonProps {
        config?: page.IPageConfig,
        forms?: any;
        idForm?: string;
        idFormSection?: string;
        state?: DataElement;
        slot?: string;
    }
    class Cancel$Button extends React.Component<ICancelButtonProps, {}> {
        constructor(props: ICancelButtonProps) {
            super(props);

            this.onDefaultClick = this.onDefaultClick.bind(this);
            this.onCancel = this.onCancel.bind(this);
        };
        //
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global),
            forms: state.forms,
            idForm: getData(state.global.page).id,
            state: state.global.currentEntityState
        });

        static defaultProps: ICancelButtonProps = {
            icon: "fa fa-arrow-left",
            text: "",
            color: "white",
            className: "btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };
        //

        onDefaultClick(): void {
            if (this.props.onClick) {
                this.props.onClick();
            }
            else {
                let goBack: boolean = true;
                let configState: DataElement = this.props.config.getState(this.props.idFormSection);
                //console.log(this.props.idFormSection)
                if (isSuccessful(configState)) {
                    //console.log('ent1')
                    let state: any = getData(configState);
                    if (state.viewMode === false) {
                        //console.log('ent1')

                        if (state.isNew === true) {
                            //console.log('ent2')

                            this.props.config.setEntity({}, this.props.idFormSection);
                            //dispatchSuccessful("global-current-entity", {});
                            //dispatchSuccessful("global-current-entity-state", { viewMode: true });
                        } else {
                           // console.log('ent3')

                            goBack = false;
                            //dispatchSuccessful("global-current-entity-state", { viewMode: true });
                        };
                        Forms.remove(this.props.idFormSection);
                        this.props.config.setState({ viewMode: true }, this.props.idFormSection);
                        //console.log(this.props.idFormSection)
                    };
                };

                if (goBack) {
                    if (window.self !== window.top) {
                        let parent: any = window.parent;
                        //
                        if (parent.closeModal) {
                            parent.closeModal();
                        };
                    }
                    else {
                        ReactRouter.hashHistory.goBack();
                    }
                };
            };
        };

        onCancel(): void {
            try {
                if (page.canViewEditMode()) {
                    if (!this.props.onClick) {
                        let idForm: string = this.props.idFormSection ? this.props.idFormSection : this.props.idForm;
                        let form: any = this.props.forms[idForm];

                        if (form.hasChanged) {
                            EK.Global.confirm("Al continuar, se perderán los cambios realizados...", "EnKontrol", () => {
                                this.onDefaultClick();
                            });
                        } else {
                            this.onDefaultClick();
                        };
                    }
                    else {
                        this.props.onClick(this.props.info);
                    };
                } else {
                    this.onDefaultClick();
                }
            } catch (e) { }
        };

        render(): JSX.Element {
            let className: string;

            if (this.props.iconOnly === true) {
                className = "btn-ico-ek";
            }
            else {
                className = "btn-cancelar btn-default-ek";
            };

            return <Button {...this.props} className={className} keyBtn={"btnCancel"} onClick={this.onCancel} />;
        };
    };
    export let CancelSL: any = Cancel$Button;
    export let CancelButton: any = ReactRedux.connect(Cancel$Button.props, null)(Cancel$Button);

    interface ICollapseButton extends IButtonProps {
        collapsed?: boolean;
        idElement?: string;
        collapsedClass?: string;
        collapsedDownIcon?: string;
        collapsedUpIcon?: string;
    };
    export class CollapseButton extends React.Component<ICollapseButton, ICollapseButton> {
        constructor(props: ICollapseButton) {
            super(props);

            this.onClick = this.onClick.bind(this);

            this.state = {
                collapsed: props.collapsed === true
            };
        }

        static defaultProps: ICollapseButton = {
            icon: "",
            text: "",
            color: "grey-steel",
            className: "btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            style: {
                marginLeft: 10, backgroundColor: "#ECEFF1", borderColor: "#ECEFF1", color: "#E65100"
            },
            info: undefined,
            collapsedDownIcon: "fas fa-chevron-down",
            collapsedUpIcon: "fas fa-chevron-up"
        };

        onClick(e, r): any {
            let collapse: boolean = !this.state.collapsed;

            if (this.props.idElement) {
                let et: any = $("#" + this.props.idElement);

                if (collapse) {
                    et.addClass(this.props.collapsedClass);
                    //et.slideUp(200);
                } else {
                    et.removeClass(this.props.collapsedClass);
                    //et.slideDown(200);
                };
            }
            else {
                let pl = $(r).closest(".panel");
                let el = $(r).closest(".panel").children(".panel-body");
                let et = $(r).closest(".panel").children(".panel-heading");

                if (collapse) {
                    et.addClass("collapsed");
                    pl.addClass("collapsed");
                    el.slideUp(200);
                } else {
                    et.removeClass("collapsed");
                    pl.removeClass("collapsed");
                    el.slideDown(200);
                };
            };

            this.setState({
                collapsed: !this.state.collapsed
            });

            if (this.props.onClick) {
                this.props.onClick(this.state.collapsed);
            };
        };

        componentDidMount(): void {
        };

        render(): JSX.Element {
            let icon: string = this.state.collapsed ? this.props.collapsedDownIcon : this.props.collapsedUpIcon;
            let color: string;

            //if (this.props.iconOnly === true) {
            //    color = this.props.inverse === true ? "font-grey-mint" : "font-white";
            //}
            //else {
            //    color = this.props.inverse === true ? "white" : "grey-mint";
            //}

            return <Button {...this.props} icon={icon} color={color} onClick={this.onClick} />;
        }
    }

    export class CloseButton extends React.Component<IButtonProps, {}> {
        constructor(props: IButtonProps) {
            super(props);
        }

        static defaultProps: IButtonProps = {
            icon: IconTypeEnum.delete,
            text: "",
            color: "white",
            className: "",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };

        componentDidMount(): void {
        };

        render(): JSX.Element {
            return <Button {...this.props} />;
        }
    }

    export interface IPrintButtonProps extends IButtonProps {
        globalLink?: string;
        idForm?: string;
    };
    export class Print$Button extends React.Component<IPrintButtonProps, {}> {
        constructor(props: IPrintButtonProps) {
            super(props);

            this.getLink = this.getLink.bind(this);
            this.onClick = this.onClick.bind(this);
        }
        //
        static props: any = (state: any) => ({
            info: state.global.currentEntity,
            globalLink: getData(state.global.currentLink),
            idForm: getData(state.global.page).id
        });
        // 
        static defaultProps: IPrintButtonProps = {
            icon: "icon-ek-128",
            text: "",
            color: "white",
            className: "btn-imprimir btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };

        getLink(): string {
            let retValue: string;

            if (this.props.linkTo) {
                retValue = this.props.linkTo;
            }
            else {
                if (this.props.globalLink) {
                    let idForm: string = [this.props.idForm, "filters"].join("$");
                    retValue = [this.props.globalLink, "/imprimir/", global.encodeFilters(idForm)].join("");
                };
            };

            return retValue;
        };

        onClick(): void {
            if (!this.props.onClick) {
                window.open(this.getLink());
            } else {
                this.props.onClick();
            }
        };

        render(): JSX.Element {
            return null;
            //return <Button {...this.props} onClick={this.onClick} />;
        }
    }
    export let PrintButton: any = ReactRedux.connect(Print$Button.props, null)(Print$Button);

    export interface IExcelButtonProps extends IButtonProps {
        globalLink?: string;
        idForm?: string;
    };
    class Excel$Button extends React.Component<IExcelButtonProps, {}> {
        constructor(props: IExcelButtonProps) {
            super(props);

            this.getLink = this.getLink.bind(this);
            this.onClick = this.onClick.bind(this);
        }
        //
        static props: any = (state: any) => ({
            info: state.global.currentEntity,
            globalLink: getData(state.global.currentLink),
            idForm: getData(state.global.page).id
        });
        // 

        static defaultProps: IExcelButtonProps = {
            icon: "icon-ek-079",
            text: "",
            color: "white",
            className: "btn-exportar btn-default-ek",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined
        };

        getLink(): string {
            let retValue: string;

            if (this.props.linkTo) {
                retValue = this.props.linkTo;
            }
            else {
                if (this.props.globalLink) {
                    let idForm: string = [this.props.idForm, "filters"].join("$");
                    retValue = [this.props.globalLink, "/exportar/", global.encodeFilters(idForm)].join("");
                };
            };

            return retValue;
        };

        onClick(e: any): any {
            if (!this.props.onClick) {
                //page.applyFilter(this.props, null, "exportar");
                window.open(this.getLink())
            } else {
                this.props.onClick(this.props.info);
            }
        };

        render(): JSX.Element {
            let allowExport: boolean = EK.UX.Auth.getOptionExportValue(this.props.idForm);
            if (allowExport) {
                return <Button {...this.props} keyBtn={"btnExcel"} onClick={this.onClick} />;
            }
            else {
                return null;
            }

        };
    };
    export let ExcelButton: any = ReactRedux.connect(Excel$Button.props, null)(Excel$Button);

    export interface IPopOverProps extends IButtonProps {
        config?: page.IPageConfig;
        idForm?: string;
        titulo?: string;
        idParent?: string;
        url?: string;
        placement?: string;
        renderColumn?: boolean;
        style?: React.CSSProperties;
        container?: string;
    };
    export const PopOver: any = global.connect(class extends React.Component<IPopOverProps, IPopOverProps> {
        constructor(props: IExcelButtonProps) {
            super(props);

            this.state = { id: Number(new Date()).toString() + Math.ceil(Math.random() * 10000).toString() }
            this.onClick = this.onClick.bind(this);
        }
        // 
        static defaultProps: IPopOverProps = {
            icon: "fa fa-ellipsis-v",
            text: "",
            titulo: "",
            color: "white",
            className: "btn-ellipsis",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            placement: "left",
            visible: true,
            info: undefined,
            renderColumn: true
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        static edit: any = {
            icon: "icon-pencil",
            titulo: "Editar",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                Forms.remove(id);
                Forms.updateFormElements(id, item);

                let entidad: any = item;
                let elements: any = {};

                for (var p in entidad) {
                    if (p === "Estatus") {
                        let data: any = entidad[p];
                        if (data && data.Clave === "A") {
                            elements[p] = true;
                        } else if (data && data.Clave === "B") {
                            elements[p] = false;
                        } else {
                            elements[p] = entidad[p]
                        }
                    } else {
                        elements[p] = entidad[p];
                    };
                };

                //Forms.updateFormElements(id, elements);
                //config.setEntity(item, id);
                config.setState({ viewMode: false }, id);

            }
        };

        static link: any = {
            icon: " fa fa-share",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig, url: string) => {
                go(url);
            }
        };

        static remove: any = {
            icon: "fa fa-trash",
            titulo: "Eliminar",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                let element: DataElement = Forms.getValue(id, idParent);
                Forms.updateFormElement(idParent, id, element.removeItem(item));
            }
        };
        onClick(e: any): any {
            let button: any = $("#" + this.state.id);
            button.css('position', 'relative');
            button.css('z-index', 9999);
            button.popover("show");
        };
        componentDidMount(): void {
            let button: any = $("#" + this.state.id);

            const w: any = window;

            let registrarWindowFn: string = "$cerrarPopOver";
            if (!w[registrarWindowFn]) {
                w[registrarWindowFn] = (id: number) => {
                    let button: any = $("#" + id);
                    button.popover('hide');
                };
            };

            let content: any = $("<div><span style='float:right' onClick='window." + registrarWindowFn + "(" + this.state.id + ")' class='fas fa-times'></span></div>");
            let container: any = this.props.container;

            if (this.props.extraData) {
                let actions: any[] = this.props.extraData;
                let titulo: string;
                actions.forEach((value: any, index: number) => {
                    titulo = "";
                    if (value.info === undefined) {

                        value.info = '';
                    }
                    if (value.titulo === undefined || value.titulo === null) {
                        value.titulo = '';
                    }
                    titulo = "title ='" + value.titulo + "' ";
                    let button: any = $("<button class='btn btnPopupOver'><i class='" + value.icon + "' " + titulo + " ></i><span>" + value.info + "</span></button>");
                    button.click(() => {
                        let item: any;
                        if (this.props.index >= 0) {
                            let aElement: IFormElement = Forms.getFormElement(this.props.idParent, { id: this.props.idForm });
                            let aElementValue: any[] = global.getData(aElement.value);
                            //
                            if (aElementValue && aElementValue.length > 0) {
                                item = aElementValue[this.props.index];
                            };
                        }
                        else {
                            item = this.props.info;
                        };

                        value.action(this.props.idForm, this.props.idParent, item, this.props.config, this.props.url);
                    });

                    content.append(button);
                });
            };
            button.popover({
                placement: this.props.placement,
                title: "",
                content: content,
                container: container,
                html: true,
                popout: false,
                singleton: false,
                trigger: "click"
            });
        };
        componentWillUnmount(): void {
            //let button: any = $("#" + this.state.id);

            //button.popover("dispose");
        };
        render(): JSX.Element {
            if (this.props.renderColumn === true) {
                return <Column size={[1, 1, 1, 1]} style={{ overflow: "unset" }}>
                    <button tabIndex={0} id={this.state.id} style={this.props.style} className="btn btn-ellipsis" onClick={this.onClick}><i className="fa fa-ellipsis-v"></i>
                    </button>
                </Column>;
            }
            else {
                return <button tabIndex={0} id={this.state.id} className="btn btn-ellipsis" onClick={this.onClick}><i className="fa fa-ellipsis-v"></i></button>;
            };
        };
    });

    export const PopOver2: any = global.connect(class extends React.Component<IPopOverProps, IPopOverProps> {
        constructor(props: IExcelButtonProps) {
            super(props);

            this.state = { id: Number(new Date()).toString() + Math.ceil(Math.random() * 10000).toString() }
            this.onClick = this.onClick.bind(this);
        }
        // 
        static defaultProps: IPopOverProps = {
            icon: "fa fa-ellipsis-v",
            text: "",
            titulo: "",
            color: "white",
            className: "btn-ellipsis",
            iconOnly: false,
            inverse: false,
            //buttonSize: "sm",
            buttonSize: "xs",
            placement: "left",
            visible: true,
            info: undefined,
            renderColumn: true
        };
        static props: any = (state: any) => ({
            config: global.createPageConfigFromState(state.global)
        });
        static edit: any = {
            icon: "icon-pencil",
            titulo: "Editar",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                Forms.remove(id);

                let entidad: any = item;
                let elements: any = {};

                for (var p in entidad) {
                    if (p === "Estatus") {
                        let data: any = entidad[p];
                        if (data && data.Clave === "A") {
                            elements[p] = true;
                        } else if (data && data.Clave === "B") {
                            elements[p] = false;
                        } else {
                            elements[p] = entidad[p]
                        }
                    } else {
                        elements[p] = entidad[p];
                    };
                };

                Forms.updateFormElements(id, elements);

                config.setEntity(item, id);
                config.setState({ viewMode: false }, id);
            }
        };

        static link: any = {
            icon: " fa fa-share",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig, url: string) => {
                go(url);
            }
        };

        static remove: any = {
            icon: "fa fa-trash",
            titulo: "Eliminar",
            action: (id: string, idParent: string, item: any, config: page.IPageConfig) => {
                let element: DataElement = Forms.getValue(id, idParent);
                Forms.updateFormElement(idParent, id, element.removeItem(item));
            }
        };
        onClick(e: any): any {
            let button: any = $("#" + this.state.id);
            button.css('position', 'relative');
            button.css('z-index', 9999);
            button.popover("show");
        };
        componentDidMount(): void {
            let button: any = $("#" + this.state.id);

            const w: any = window;

            let registrarWindowFn: string = "$cerrarPopOver";
            if (!w[registrarWindowFn]) {
                w[registrarWindowFn] = (id: number) => {
                    let button: any = $("#" + id);
                    button.popover('hide');
                };
            };

            //let content: any = $("<div><span style='float:right;left:100px' onClick='window." + registrarWindowFn + "(" + this.state.id + ")' class='fas fa-times'></span></div>");
            //let content: any = $("<div style='background-color:gainsboro;border-style:solid;'><span style='float:right' onClick='window." + registrarWindowFn + "(" + this.state.id + ")' class='fas fa-times'></span></div>");
            //let content: any = $("<div style=''><span style='float:right' onClick='window." + registrarWindowFn + "(" + this.state.id + ")' class='fas fa-times'></span></div>");
            let content: any = $("<div></div>");
            let container: any = this.props.container;

            if (this.props.extraData) {
                let actions: any[] = this.props.extraData;
                let titulo: string;
                actions.forEach((value: any, index: number) => {
                    titulo = "";
                    if (value.info === undefined) {

                        value.info = '';
                    }
                    if (value.titulo === undefined || value.titulo === null) {
                        value.titulo = '';
                    }
                    titulo = "title ='" + value.titulo + "' ";
                    let button: any = $("<button style='border-style: outset; border-color: gainsboro; border-width: 2px;' class='btn btnPopupOver'><i class='" + value.icon + "' " + titulo + " ></i><span>" + value.info + "</span></button>");
                    button.click(() => {
                        let item: any;
                        if (this.props.index >= 0) {
                            let aElement: IFormElement = Forms.getFormElement(this.props.idParent, { id: this.props.idForm });
                            let aElementValue: any[] = global.getData(aElement.value);
                            //
                            if (aElementValue && aElementValue.length > 0) {
                                item = aElementValue[this.props.index];
                            };
                        }
                        else {
                            item = this.props.info;
                        };

                        value.action(this.props.idForm, this.props.idParent, item, this.props.config, this.props.url);
                    });

                    content.append(button);
                });
            };
            button.popover({
                placement: this.props.placement,
                title: "",
                content: content,
                container: container,
                delay: { "show": 100, "hide": 500 },
                html: true,
                popout: false,
                singleton: false,
                trigger: "focus",
            });
        };
        componentWillUnmount(): void {
            //let button: any = $("#" + this.state.id);
            //button.popover("dispose");
        };
        render(): JSX.Element {
            /*if (this.props.renderColumn === true) {
                return <Column size={[1, 1, 1, 1]} style={{ overflow: "unset" }}>
                    <button tabIndex={0} id={this.state.id} style={this.props.style} className="btn btn-ellipsis" onClick={this.onClick}><i className="fa fa-ellipsis-v"></i>
                    </button>
                </Column>;
            }
            else {*/
            return <button tabIndex={0} id={this.state.id} className="btn btn-ellipsis" onClick={this.onClick}><i className="fa fa-ellipsis-v"></i></button>;
            //};
        };
    });

    export interface IRefreshFilterButtonProps extends IButtonProps, page.IProps {
        idForm?: string;
    };
    class RefreshFilter$Button extends React.Component<IRefreshFilterButtonProps, {}> {
        constructor(props: IRefreshFilterButtonProps) {
            super(props);

            this.onClick = this.onClick.bind(this);
        }
        //
        static props: any = (state: any) => ({
            info: state.global.currentEntity,
            pageLink: getData(state.global.currentLink),
            idForm: getData(state.global.page).id
        });
        // 
        static defaultProps: IRefreshFilterButtonProps = {
            icon: "fas fa-sync-alt",
            text: "Actualizar",
            color: "white",
            className: "",
            iconOnly: false,
            inverse: false,
            buttonSize: "md",
            visible: true,
            info: undefined
        };
        onClick(e: any): any {
            //let props: page.IProps = {
            //    id : this.props.idForm,
            //    pageLink: this.props.pageLink,
            //    onFilter: this.props.onFilter,
            //    onWillFilter: this.props.onWillFilter,
            //    dispatchGlobalData: this.props.dispatchGlobalData
            //};
            //dispatchAsyncPost('load::','base/scv/prereportes/all')
            console.log()
            if (this.props.config.id !== 'Prereportes') {
                page.applyFilter(this.props);
            }
            //dispatchSuccessful('load::buscarPrereportes', true);
        };
        render(): JSX.Element {
            return <Button {...this.props} keyBtn="btnRefreshFilter" onClick={this.onClick} />;
        };
    };
    export let RefreshFilterButton: any = ReactRedux.connect(global.pageProps, null)(RefreshFilter$Button);



    export interface IVerificacionButtonProps extends IButtonProps {
        tipoEntidad: string;
        idRegistro: number;
        verificado: any;
    }


    export class Verificacion$Button extends React.Component<IVerificacionButtonProps, {}> {
        constructor(props: IVerificacionButtonProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };
        static props: any = (state: any) => ({
            forms: state.forms,
            idForm: getData(state.global.page).id,
            entidad: state.global.currentEntity,
            state: state.global.currentEntityState,
            config: global.createPageConfigFromState(state.global)
        });
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
        });
        static defaultProps: IVerificacionButtonProps = {
            icon: "fas fa-user-check",
            text: "",
            color: "white",
            iconOnly: false,
            inverse: false,
            buttonSize: "sm",
            visible: true,
            info: undefined,
            tipoEntidad: undefined,
            idRegistro: undefined,
            verificado: undefined
        };
        onClick(): void {
            EK.Global.confirm("Presione Confirmar para verificar el elemento", "EnKontrol", () => {
                if (this.props.idRegistro > 0 && this.props.tipoEntidad != undefined) {

                    global.asyncGet("base/scv/verificacion/Get/VerificacionItem/" + global.encodeParameters({
                        idRegistro: this.props.idRegistro,
                        claveEntidad: this.props.tipoEntidad
                    })
                        , (status: AsyncActionTypeEnum, data: any) => {
                            if (status === AsyncActionTypeEnum.successful) {
                                success("Código de verificación enviado");
                            }
                        });

                }

            });
        };
        render(): JSX.Element {
            let verificado: any = this.props.verificado;

            if (verificado && verificado.ID > 0) {
                if (verificado.Estatus.Clave == "C") {
                    return <i className="far fa-star"></i>

                }
                else {
                    return <i className="fas fa-hourglass-end"></i>
                }
            }
            else {
                return <Button {...this.props} keyBtn={"btnVerificar"} onClick={this.onClick} />

            }

        }
    }
    export let VerificacionButton: any = ReactRedux.connect(Verificacion$Button.props, null)(Verificacion$Button);

    export interface ISpecialAddButtonProps extends buttons.IButtonProps, global.IDefaultComponentProps { };
    //export const SpecialAddButton: any = global.connect(class extends React.Component<ISpecialAddButtonProps, ISpecialAddButtonProps> {
    export class SpecialAddButton extends React.Component<ISpecialAddButtonProps, ISpecialAddButtonProps> {
        constructor(props: ISpecialAddButtonProps) {
            super(props);

            this.onClick = this.onClick.bind(this);

            let nState: ISpecialAddButtonProps = {};
            //
            if (props.$defProps) {
                let mapPropNames: any = {
                    "propForm": "id"
                };
                //
                for (var p in props.$defProps) {
                    let propName: string = mapPropNames[p];
                    if (propName) {
                        nState[propName] =
                            global.isNull(props[p])
                                ? props.$defProps[p]
                                : props[p];
                    };
                    nState[p] =
                        global.isNull(props[p])
                            ? props.$defProps[p]
                            : props[p];
                };
            };
            //
            this.state = nState;
        };
        //
        static props: any = (state: any) => ({
            $modalResult: state.global.modalResult
        });
        //
        static defaultProps: ISpecialAddButtonProps = {
            $displayName: "SpecialButton",
            $props: {},
            $modalResult: createSuccessfulStoreObject({})
        };
        //
        onClick(): any {
            let url: string = this.state.url + "/id?nuevo";
            //
            global.goModal("modal_" + this.state.config.id, url);
        };
        //
        componentWillReceiveProps(nextProps: ISpecialAddButtonProps, nextState: ISpecialAddButtonProps) {
            if (global.hasChanged(this.props.$modalResult, nextProps.$modalResult)) {
                if (global.isSuccessful(nextProps.$modalResult)) {
                    let result: any = global.getData(nextProps.$modalResult);
                    //
                    for (var p in result) {
                        if (p === this.props.config.id) {
                            let actionName: string = !this.props.ddlTargetAction ? "load::ddlBase" + this.props.propForm : this.props.ddlTargetAction;
                            let targetURL: string = this.props.ddlCG ? "catalogos/get(" + this.props.ddlCG + ")" : this.props.ddlTargetUrl;
                            //
                            if (!this.props.ddlTargetAction) {
                                actionName = "load::ddlBase" + this.props.propForm;
                            }
                            else {
                                actionName = this.props.ddlTargetAction;
                                targetURL = this.props.ddlTargetUrl;
                            };
                            //
                            dispatchAsync(actionName, targetURL);
                            //
                            Forms.updateFormElement(this.props.$props.idParentSection, this.props.propForm, result[p]);
                        };
                    };
                };
            };
        };
        //
        render(): JSX.Element {
            return <div style={{ display: "inline-block" }}>
                <Button {...this.props} {...this.state} keyBtn={"btn" + this.state.propForm} iconOnly={true} className={"btn-ico-ek btn-special"} onClick={this.onClick}>
                    <i className="fa fa-plus" style={{ fontSize: "60%", marginLeft: 5 }}></i>
                </Button>
                <modal.Modal id={"modal_" + this.state.config.id} url={"about:blank"}></modal.Modal>
            </div>;
        };
    };
    export let base: any = {};
};

import IButtonProps = EK.UX.Buttons.IButtonProps;
import AddButton = EK.UX.Buttons.ButtonPlus;
import Button = EK.UX.Buttons.Button;
import ButtonGroup = EK.UX.Buttons.ButtonGroup;
import CancelButton = EK.UX.Buttons.CancelButton;
import CloseButton = EK.UX.Buttons.CloseButton;
import CollapseButton = EK.UX.Buttons.CollapseButton;
import DeleteButton = EK.UX.Buttons.DeleteButton;
import EditButton = EK.UX.Buttons.EditButton;
import ExcelButton = EK.UX.Buttons.ExcelButton;
import Link = EK.UX.Buttons.Link;
import NewButton = EK.UX.Buttons.NewButton;
import PageButtons = EK.UX.Buttons.PageButtons;
import PrintButton = EK.UX.Buttons.PrintButton;
import SaveButton = EK.UX.Buttons.SaveButton;
import SectionButtons = EK.UX.Buttons.SectionButtons;
import SectionEdit = EK.UX.Buttons.SectionEdit;
import SectionView = EK.UX.Buttons.SectionView;
import ViewButton = EK.UX.Buttons.ViewButton;

import VerificacionButton = EK.UX.Buttons.Verificacion$Button;