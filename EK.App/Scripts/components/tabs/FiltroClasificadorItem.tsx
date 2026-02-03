namespace EK.UX.Tabs {
    "use strict";

    interface IFiltroClasificadorItemProps extends IPortletTabPaneProps {
        data?: any;
        claveEntidad?: any;
        //   onClick: (item: any) => void;
    }

    export class FiltrosClasificadorItem extends React.Component<IFiltroClasificadorItemProps, IFiltroClasificadorItemProps> {
        constructor(props: IFiltroClasificadorItemProps) {
            super(props);
            this.onClick = this.onClick.bind(this);
        };

        

        shouldComponentUpdate(nextProps: IFiltroClasificadorItemProps, nextState: IFiltroClasificadorItemProps): boolean {
            return true;
        }
        onClick(item: any): void {
            //this.props.onClick(item);
            let accion: string;
            let ruta: string;
            let todos: number = item.todos.value == true ? 1 : 0;

            switch (this.props.claveEntidad) {
                case 'CuentaBancaria':
                    accion = "CuentasBancarias-catalogo";
                    ruta = "cuentabancaria/CuentasClasificador(" + item.tipoClasificador.data.ID +
                        "/" + item.clasificador.data.ID +
                        "/" + todos + "/0)";
                    break;
                case 'TipoMovimiento':
                    accion = "TipoMovimiento-catalogo";
                    ruta = "tipomovimiento/TMClasificador(" + item.tipoClasificador.data.ID +
                        "/" + item.clasificador.data.ID +
                        "/" + todos + ")";
                    break;


            };

            dispatchAsync(accion, ruta);

        }

        render(): JSX.Element {
            let filtrado: boolean = true;

            return <Form id="filtros">
                <TiposClasificadorEntidadFilter claveEntidad={this.props.claveEntidad} size={[12, 12, 12, 12]} />
                <ClasificadoresEntidadFilter claveEntidad={this.props.claveEntidad} size={[12, 12, 12, 12]} />
                     <checkBox.CheckBox
                    id="todos"
                    label="Mostrar Todo"
                    size={[12, 12, 12, 12]}
                    required={false}
                    value={true}
                    helpLabel="Mostrar Todo" />

                <Row style={{ marginLeft: 125 }}>
                    <FilterButton icon={"fa fa-table"}
                        iconOnly={false}
                        inverse={false}
                        color={ColorEnum.greenSharp}
                        text="Consultar" info={this.props.claveEntidad} onClick={this.onClick} />
                </Row></Form>;
        }
    }

    /// Filtro de DDLTipo de Clasificadores por Entidad
    export interface ITipoClasificadorEntidadFilterDDLProps extends IDropDrownListProps {
        obtenerTiposClasificadorEntidad: (item: string) => void;
        cleanup: () => void;
        claveEntidad: any;
    }
    export class TipoClasificadorentidadFilterDDL extends React.Component<ITipoClasificadorEntidadFilterDDLProps, ITipoClasificadorEntidadFilterDDLProps> {
        constructor(props: ITipoClasificadorEntidadFilterDDLProps) {
            super(props);

        }

        static defaultProps: IDropDrownListProps = {
            id: "TipoClasificador",
            items: createDefaultStoreObject([]),
            label: "Tipo",
            helpLabel: "Seleccione el tipo de clasificador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };

        componentWillUnmount(): any {
            this.props.cleanup();
        };

        shouldComponentUpdate(nextProps: ITipoClasificadorEntidadFilterDDLProps, nextState: ITipoClasificadorEntidadFilterDDLProps): boolean {
            return getTimestamp(this.props.items) !== getTimestamp(nextProps.items) ||
                getTimestamp(this.props.value) !== getTimestamp(nextProps.value);
        };

        componentDidMount(): any {

            this.props.obtenerTiposClasificadorEntidad(this.props.claveEntidad);
        };

        componentDidUpdate(prevProps: ITipoClasificadorEntidadFilterDDLProps, prevState: ITipoClasificadorEntidadFilterDDLProps) {
            if (isSuccessful(this.props.items)) {
                if (!isSuccessful(this.props.value) && this.props.items.data.length > 0) {
                    this.props.change(this.props.items.data[0]);
                }
            }
        };

        render(): any {
            let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;
            let style: React.CSSProperties = EK.Global.assign({}, this.props.style);

            return <DropdownList
                id={this.props.id}
                items={this.props.items}
                label={this.props.label}
                style={style}
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        };
    }
    const ddlTipoClasificadoresMapProps: any = (state: any): any => {
        return {
            value: state.clasificadores.tipoClasificador,
            items: state.clasificadores.tipoClasificadores
        };
    }
    // Dispatchs
    const ddlTipoClasificadoresMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            cleanup: (): void => {
                dispatchDefault("clasificadores-tipo", {});
                dispatchDefault("clasificadores-tipos", []);
            },
            change: (item: any): void => {
                dispatchSuccessful("clasificadores-tipo", item);
            },
            obtenerTiposClasificadorEntidad: (clave: string): void => {
                dispatchAsync("clasificadores-tipos", "tiposclasificadoresentidad(" + clave + ")");
            }
        };
    };

    export let TiposClasificadorEntidadFilter: any = ReactRedux.connect(ddlTipoClasificadoresMapProps, ddlTipoClasificadoresMapDispatchs)(TipoClasificadorentidadFilterDDL);


    /// Filtro de DDLClasificadores por Entidad
    export interface IClasificadorEntidadFilterDDLProps extends IDropDrownListProps {
        tipoClasificador?: any;
        obtenerClasificadores?: (clave: number, claveentidad: string) => any;
        init?: () => any;
        cleanup: () => void;
        claveEntidad: any;
    }

    export class ClasificadorEntidadFilterDDL extends React.Component<IClasificadorEntidadFilterDDLProps, IClasificadorEntidadFilterDDLProps> {
        constructor(props: IClasificadorEntidadFilterDDLProps) {
            super(props);
        }

        static defaultProps: IDropDrownListProps = {
            id: "Clasificador",
            items: createDefaultStoreObject([]),
            label: "Clasificador",
            helpLabel: "Seleccione el clasificador",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: undefined
        };

        componentWillUnmount(): any {
            this.props.cleanup();
        };

        componentDidUpdate(prevProps: IClasificadorEntidadFilterDDLProps) {
            if (isSuccessful(this.props.tipoClasificador)) {
                if (getTimestamp(this.props.tipoClasificador) !== getTimestamp(prevProps.tipoClasificador)) {
                    this.props.obtenerClasificadores(this.props.tipoClasificador.data.ID, this.props.claveEntidad);
                } else {
                    if (getTimestamp(this.props.items) !== getTimestamp(prevProps.items)
                        && this.props.items.data && this.props.items.data.length > 0) {
                        this.props.change(this.props.items.data[0]);
                    }
                }
            }
        };

        shouldComponentUpdate(nextProps: IClasificadorEntidadFilterDDLProps, nextState: IClasificadorEntidadFilterDDLProps): boolean {
            return getTimestamp(this.props.tipoClasificador) !== getTimestamp(nextProps.tipoClasificador) ||
                getTimestamp(this.props.items) !== getTimestamp(nextProps.items) ||
                getTimestamp(this.props.value) !== getTimestamp(nextProps.value);
        };

        componentWillReceiveProps(nextProps: IClasificadorEntidadFilterDDLProps): void {

        };

        render(): any {
            let value: any = (this.props.value && this.props.value.data) ? this.props.value.data : undefined;

            return <DropdownList
                id={this.props.id}
                items={this.props.items}
                label={this.props.label}
                style={this.props.style}
                size={this.props.size}
                helpLabel={this.props.helpLabel}
                itemValue={this.props.itemValue}
                itemKey={this.props.itemKey}
                value={value}
                change={this.props.change} />;
        }
    }

    const ddlClasificadoresMapProps: any = (state: any): any => {
        return {
            tipoClasificador: state.clasificadores.tipoClasificador,
            value: state.clasificadores.clasificador,
            items: state.clasificadores.clasificadores
        };
    }

    const ddlClasificadoresMapDispatchs: any = (dispatch: Redux.Dispatch<any>): any => {
        return {
            cleanup: (): void => {
                dispatchDefault("clasificadores-clasificador", {});
                dispatchDefault("clasificadores-clasificadores", []);
            },
            change: (item: any): void => {
                dispatchSuccessful("clasificadores-clasificador", item);
            },
            obtenerClasificadores: (clave: number, claveentidad: string): any => {
                dispatchDefault("clasificadores-clasificador", {});
                dispatchAsync("clasificadores-clasificadores", "clasificadoresentidad/catalogo(" + clave + "/" + claveentidad + ")");
            }
        };
    };

    export let ClasificadoresEntidadFilter: any = ReactRedux.connect(ddlClasificadoresMapProps, ddlClasificadoresMapDispatchs)(ClasificadorEntidadFilterDDL);

    const mapFilterButtonProps: any = (state: any) => {
        return {
            info: {

                tipoClasificador: state.clasificadores.tipoClasificador,
                clasificador: state.clasificadores.clasificador,
                todos: state.forms.filtros.form.todos

            }
        };
    }

    export let FilterButton: any = ReactRedux.connect(mapFilterButtonProps, null)(Button);

}

import FiltrosClasificadorItemTab = EK.UX.Tabs.FiltrosClasificadorItem