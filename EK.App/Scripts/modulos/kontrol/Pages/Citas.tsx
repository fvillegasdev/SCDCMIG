namespace EK.Modules.Kontrol.Pages.Citas {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("citas", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();
            let columns: dt.IDTColumn[] = dt.createColumns(ml)
                .add({ data: "TipoCitas.Nombre", width: 10 })
                .add({ data: "Cliente.Nombre", width: 20 })
                .add({ data: "Expediente.ID", width: 10 })
                .add({ data: "Localidad.Nombre", width: 20 })
                .addDate({ data: "FechaInicio", width: 20 })
                .addDate({ data: "FechaFin", width: 10 })
                .addEstatus({ data: "Asistio", width: 10, title: ml.consulta.grid.headers.asistio})
                .toArray();

            return <page.Main {...config} pageMode={PageMode.Principal}>
                <page.Filters>
                </page.Filters>
                <Row>
                    <Column>
                        <page.OptionSection id="Info" icon="far fa-calendar-alt" hideCollapseButton={true} collapsed={false}>
                                <Row>
                                    <Column>
                                    <calendar.GlobalCalendar onDayClick={(d: any, jsEvent: any, view: any) => {
                                        // new event
                                        let date: any = d.toDate();
                                        let url: string = ["id?nuevo&", global.encodeParameters({ ID: -1, FechaInicio: date, FechaFin: date })].join("");

                                        go(url, true);
                                    }} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                            <page.OptionSection id="Info" icon="fa fa-th" hideCollapseButton={true} collapsed={false}>
                                <Row>
                                    <Column>
                                        <dt.PageTable columns={columns} />
                                    </Column>
                                </Row>
                            </page.OptionSection>
                        </Column>
                    </Row>
            </page.Main>;
        };
    };

    interface ICitas extends page.IProps {
        config?: any;
        id?: any;
        item?: any;
        items?: any;
    };
    export let CitasSectionList: any = global.connect(class extends React.Component<ICitas, ICitas> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$Citas;
            return retValue;
        };
        componentDidMount() {
            //let filtro: string = global.encodeObject({ estatusClave: 'EC' });
            dispatchAsync("global-page-data", "base/kontrol/citas/Get/GetAll/", "Citas");
        }
        shouldComponentUpdate(nextProps: ICitas, nextState: any): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>
                {[global.getData(this.props.items, []).length].join("")}</span>;

            return <Column size={[12, 6, 6, 6]}>
                <div>
                    <OptionSection
                        id={"Citas"}
                        icon="far fa-calendar-alt"
                        level={1}
                        title={"Agenda"}
                        subTitle={subTitleSeccion}
                        collapsed={true}>
                        <calendar.GlobalCalendar onDayClick={(d: any, jsEvent: any, view: any) => {
                            let date: any = d.toDate();
                            let url: string = ["id?nuevo&", global.encodeParameters({ ID: -1, FechaInicio: date, FechaFin: date })].join("");
                            go(url, true);
                        }} />
                    </OptionSection>
                </div>
            </Column>
        };
    })
};