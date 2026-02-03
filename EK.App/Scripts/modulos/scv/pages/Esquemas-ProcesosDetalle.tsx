namespace EK.Modules.SCV.Pages.Esquemas.Procesos
{

    const PAGE_ID: string = "esquemas";
    const PAGE_PROCESOS_ID: string = "esquemas$proceso";
    const PAGE_PROCESOS_ID_DETALLE: string = "esquemas$proceso$Detalle";

    interface IEsquemaProcesoDetalle extends page.IProps
    {
        procesoSeleccionado?: any;
    };

    export let EsquemaProcesoDetalle: any = global.connect(class extends React.Component<IEsquemaProcesoDetalle, {}>{
        constructor(props: IEsquemaProcesoDetalle) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.procesoSeleccionado = Forms.getValue("Proceso", PAGE_PROCESOS_ID);
            return retValue;
        };
        shouldComponentUpdate(nextProps: IEsquemaProcesoDetalle, nextState: IEsquemaProcesoDetalle): boolean {
            return hasChanged(this.props.procesoSeleccionado, nextProps.procesoSeleccionado)
        };
        render(): JSX.Element {

            let proceso: any = (this.props.procesoSeleccionado);
            let procesoClave: string = proceso ? proceso.Clave : "";

            switch (procesoClave)
            {
                case "ASIGNACION-EST":
                    return <EsquemaProcesoAsignacionEstatus />;

            }
            return null;
        }
    });


    interface IProcesoAsignacionEstatus extends page.IProps {
        proceso?: any;
        estatusDeUbicacion?: any;
    };
    export let EsquemaProcesoAsignacionEstatus: any = global.connect(class extends React.Component<IProcesoAsignacionEstatus, {}>{
        constructor(props: IProcesoAsignacionEstatus) {
            super(props);
        }
        static props: any = (state: any) => {
            let retValue: any = global.pageProps(state);
            retValue.proceso = state.esquemas.procesoSelected;
            retValue.estatusDeUbicacion = state.global.catalogo$EstatusDeUbicacion;
            return retValue;
        };
        componentWillReceiveProps(nextProps: IProcesoAsignacionEstatus, nextState: IProcesoAsignacionEstatus): any
        {
            if (global.hasChanged(this.props.estatusDeUbicacion, nextProps.estatusDeUbicacion))
            {
                let data: any = getData(nextProps.estatusDeUbicacion);
                if (data.ID > 0)
                {
                    Forms.updateFormElement(PAGE_PROCESOS_ID_DETALLE, "EstatusDeUbicacion", data);
                }
            };

        };
        componentDidMount()
        {
            Forms.updateFormElement(PAGE_PROCESOS_ID_DETALLE, "EstatusDeUbicacion", { ID: -1, Clave:"Seleccione una opción"});

            let proceso: any = getData(this.props.proceso);
            let configuracionProceso: string = proceso && proceso.Configuracion ? proceso.Configuracion : "";

            if (configuracionProceso != "")
            {
                let config: any = JSON.parse(configuracionProceso);
                let idEstatusDeUbicacion: number = config.IdEstatusDeUbicacion;
                this.props.config.dispatchCatalogoBasePost("base/scv/ubicacionEstatus/id/", {id: idEstatusDeUbicacion }, "EstatusDeUbicacion");
            }

        }
        render(): JSX.Element {

            return <Column size={[12, 12, 12, 12]} style={{ padding:0 }}>
                <ddl.EstatusDeUbicacionDDL size={[12, 12, 12, 12]} addNewItem={"SO"} idFormSection={PAGE_PROCESOS_ID_DETALLE} validations={[validations.required()]} />
            </Column>
        }
    });
}