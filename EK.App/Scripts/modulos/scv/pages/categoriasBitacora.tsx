namespace EK.Modules.SCV.Pages.categoriasBitacora {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("tipoElementoBitacora", "scv");

    export let Vista: any = global.connect(class extends React.Component<page.IProps, page.IProps> {
        constructor(props: page.IProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = global.pageProps(state);
            return retValue;
        };
        onFilter(props: page.IProps, filters: any): any {
            config.dispatchCatalogoBase("/base/kontrol/bitacora/Get/ObtenerEventosBitacora/", filters);
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .addClave({ width: 20 })
                .addNombre({ width: 45 })
                .add({ data: "Origen.Nombre", width: 15 })
                .addEstatus({ width: 20 })
                .toArray();

            let entidad: any = getData(this.props.entidad);
            let allowDelete: boolean = entidad &&  entidad.Origen && entidad.Origen.Clave == "GS" ? false : true;
            return <page.Main {...config} pageMode={PageMode.Principal} onFilter={this.onFilter} allowDelete={allowDelete}>
                <page.Filters>
                    <OrigenDDl size={[12, 3, 3, 3]} addNewItem={"SO"} />
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });


    let OrigenDDl: any = global.connect(class extends React.Component<IDropDrownListProps, {}> {
        static props: any = (state: any) => ({
            items: state.global.ORIGENBITACORA,
        });
        static defaultProps: IDropDrownListProps = {
            id: "Origen",
            items: createDefaultStoreObject([]),
            label: "Origen",
            helpLabel: "Seleccione un Origen",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 3, 3, 3],
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                dispatchAsync("load::ORIGENBITACORA", "catalogos/get(TIPOELEMENTOBITACORA)");
            };
        };
        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props}  />;
        }
    });
};