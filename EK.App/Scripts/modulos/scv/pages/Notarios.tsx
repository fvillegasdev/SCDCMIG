namespace EK.Modules.SCV.Pages.Notarios {
    "use strict";
    const PAGE_ID: string = "notarios";
    const PAGE_MODULO: string = "scv";

    interface IFiltroNotarios extends page.IProps
    {
        EstadoEntidad: any;
    }

    export let Vista: any = global.connect(class extends React.Component<IFiltroNotarios, IFiltroNotarios> {
        onFilter(props: any, filters: any, type?: string)
        {
            let f: any = global.isEmpty(filters) ? null : global.getFilters(filters);
            props.config.dispatchCatalogoBasePost("base/scv/notarios/GetBP/GetNotarios", { parametros: f });
        }
        render(): JSX.Element {
            let columns: dt.IDTColumn[] = dt.createColumns($ml[PAGE_ID])
                .addClave({width:10})
                .addNombre({ width: 40 })
                .add({data:"NumNotaria", width:10})
                .add({data:"Email", width:20})
                .add({ data: "Telefono1", width: 20 })
                .addEstatus({ width: 10 })
                .toArray();

            return <page.Main id={PAGE_ID} modulo={PAGE_MODULO} pageMode={PageMode.Principal}
                onFilter={this.onFilter}>
                <page.Filters>
                    <buttons.EstatusFilter />
                </page.Filters>
                <dt.PageTable columns={columns} />
            </page.Main>;
        };
    });
};
