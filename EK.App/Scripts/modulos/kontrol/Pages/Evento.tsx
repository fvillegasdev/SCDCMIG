namespace EK.Modules.Kontrol.Pages.Eventos {
    "use strict";
    let defaultProps: page.IPageDefaultProps = new page.PageDefaultProps({
        config: global.createPageConfig("eventos", "kontrol", ["eventos"]),
        icon: "fas fa-calendar-week",
        url: "#/kontrol/eventos",
        propForm: "Evento"
    });

    interface IEventosSectionProps extends page.IProps {
        config?: any;
        id?: any;
        item?: any;
        items?: any;
    };
    export let EventosSectionList: any = global.connect(class extends React.Component<IEventosSectionProps, IEventosSectionProps> {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.items = state.global.catalogo$Evento;
            //
            return retValue;
        };
        componentDidMount() {
            defaultProps.config.dispatchCatalogoBase("base/kontrol/eventos/GetAll/", null, defaultProps.propForm);
        }
        shouldComponentUpdate(nextProps: IEventosSectionProps, nextState: IEventosSectionProps): boolean {
            return hasChanged(this.props.items, nextProps.items)
        };
        render(): JSX.Element {
            let subTitleSeccion: any = <span className="badge badge-info" style={{ marginLeft: 10 }}>{[global.getData(this.props.items, []).length].join("")}</span>;

            return <Column size={[12, 6, 6, 6]}>
                <div>
                    <OptionSection
                        id={"Eventos"}
                        icon="fas fa-calendar-week"
                        level={1}
                        title={"Eventos"}
                        subTitle={subTitleSeccion}
                        collapsed={false}>
                        <calendar.GlobalCalendar onDayClick={(d: any, jsEvent: any, view: any) => {
                            let date: any = d.toDate();
                            let url: string = ["id?nuevo&", global.encodeParameters({ ID: -1, FechaInicio: date, FechaFin: date })].join("");
                            go(url, true);
                        }} />
                    </OptionSection>
                </div>
            </Column>
        };
    });
};