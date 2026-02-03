namespace EK.Modules.SCV.Pages.Ventas
{
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("ventas", "scv");

    const UBICACIONES_PRECIODEVENTA: string = "Ubicaciones_PrecioVentaEditar";
    const UBICACIONES_ID: string = "Ubicaciones";
    const FINANCIAMIENTO_ID: string = "Financiamiento";


    interface IEditarPrecioVenta extends page.IProps
    {
        editarPrecioVenta?: any;
    };

    export let EditarPrecioVenta: any = global.connect(class extends React.Component<IEditarPrecioVenta, IEditarPrecioVenta>
    {
        constructor(props: IEditarPrecioVenta) {
            super(props);
            this.onSave = this.onSave.bind(this);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            retValue.editarPrecioVenta = Forms.getValue("EditarPrecioVenta", config.id);
            return retValue;
        };
        componentDidMount(): void
        {
            dispatchSuccessful("global-page-data", [], UBICACIONES_PRECIODEVENTA);
            Forms.updateFormElement(config.id, "EditarPrecioVenta", false);
        };
        recalcularUbicaciones(idVenta: number, idFinanciamiento: number, ubicaciones: any[], idExpediente: number): void {
            global.dispatchAsyncPost("scv-ventas-ubicaciones", "ventas/RecalcularUbicaciones", { idVenta, idFinanciamiento, ubicaciones, idExpediente });
            Forms.updateFormElement(config.id, UBICACIONES_ID, createLoadingStoreObject([]));
        };
        shouldComponentUpdate(nextProps: IEditarPrecioVenta, nextState: IEditarPrecioVenta): boolean
        {
            return hasChanged(this.props.entidad, nextProps.entidad) ||
                hasChanged(this.props.editarPrecioVenta, nextProps.editarPrecioVenta);
        };

        onSave(): void
        {
            let item: EditForm = Forms.getForm(UBICACIONES_PRECIODEVENTA);

            let entidades: DataElement = this.props.config.getCatalogo(UBICACIONES_ID);


            let model: any = item
                .addID()
                .addObject("Paquete")
                .addObject("Caracteristicas")
                .addObject("PrecioVenta")
                .addBoolean("Topar")
                .addObject("Ubicacion")
                .addNumber("ImporteMoneda")
                .addNumber("Importe")
                .addNumber("TipoCambio")
                .addNumber("ImporteComisionable")
                .addNumber("IdMoneda")
                .addNumber("Diferencia")
                .addNumber("ImporteOriginal")
                .addNumber("ImporteOriginalMoneda")
                .addNumber("ImporteNuevo")
                .addVersion()
                .toObject();


            model._modificado = true;
            model["ID"] = item["ID"];
            model["ImporteMoneda"] = item['ImporteNuevo'];

            let retValue: DataElement = entidades.upsertItem(model);
            Forms.updateFormElement(config.id, UBICACIONES_ID, retValue);
            this.props.config.setState({ viewMode: true }, UBICACIONES_PRECIODEVENTA);
            Forms.updateFormElement(config.id, "EditarPrecioVenta", false);

            /*Recalcular plan de pagos*/
            let venta: any = getData(this.props.entidad);
            let financiamiento: any = Forms.getValue(FINANCIAMIENTO_ID, config.id);
            let idFinanciamiento: number = 0;

            if (global.isSuccessful(financiamiento)) {
                financiamiento = global.getData(financiamiento, []);

                if (financiamiento && financiamiento.length > 0) {
                    idFinanciamiento = financiamiento[0].Financiamiento.ID;
                };
            };

            let idVenta: number = Forms.getValue("ID", config.id);
            let ubicaciones: any[] = global.getData(retValue, []);
            this.recalcularUbicaciones(idVenta, idFinanciamiento, ubicaciones, venta.Expediente.ID);
        }

        onCancel(): void
        {
           Forms.updateFormElement(config.id, "EditarPrecioVenta", false);
        }
        render(): JSX.Element
        {
            let ml: any = config.getML();
            
            let allowEdit: any = Forms.getValue("EditarPrecioVenta", config.id);

            if (allowEdit)
            {
                return <page.SectionList
                    id={UBICACIONES_PRECIODEVENTA}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                    title={"Editar precio venta"}
                    parent={config.id}
                    hideNewButton={true}
                    addRefresh={false}
                    icon="fas fa-cogs"
                    size={[12, 12, 12, 12]}
                    level={1}
                    readonly={true}
                    mapFormToEntity={(form: EditForm, entidades?: any): any => {
                        let retValue: any = form
                            .addID()
                            .addObject("Paquete")
                            .addObject("Ubicacion")
                            .addObject("Caracteristicas")
                            .addObject("PrecioVenta")
                            .addBoolean("Topar")
                            .addNumber("ImporteMoneda")

                            .addNumber("ImporteOriginalMoneda")
                            .addNumber("ImporteOriginal")

                            .addNumber("ImporteNuevo")

                            .addVersion()
                            .toObject();

                        let e: any[] = entidades;
                        if (e && e.length > 0) {
                            e.forEach((value: any, index: number): any => {
                                if (value.Ubicacion.Clave === retValue.Ubicacion.Clave) {
                                    retValue.ID = value.ID;
                                    retValue._found = true;
                                };
                            });
                        };

                        return retValue;
                    }}
                >
                    <Row>
                        <Column size={[12, 12, 12, 12]}>
                            <label.Entidad id="Ubicacion" label={"Ubicación"} idForm={UBICACIONES_PRECIODEVENTA} size={[10, 6, 6, 6]} />
                            <label.Currency id="ImporteOriginalMoneda" label={ml.form.ImporteOriginalMoneda.label}idForm={UBICACIONES_PRECIODEVENTA} size={[10, 3, 3, 3]} />
                            <input.Currency id="ImporteNuevo" label={ml.form.ImporteNuevo.label} idFormSection={UBICACIONES_PRECIODEVENTA} size={[10, 3, 3, 3]} />
                        </Column>
                    </Row>

                </page.SectionList>
            }
            return null;

        };
    });


}