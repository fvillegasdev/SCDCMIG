namespace EK.UX.QSTabs {
    "use strict";

    interface ICalendarProps extends EK.UX.IPortletTabPaneProps {
        claveEntidad?: any;
        entidad?: any;
        obtenerHistory?: (entidad: string, idItem: number) => any;
    }

    export class CalendarItem extends React.Component<IPortletTabPaneProps, IPortletTabPaneState> {
        constructor(props: IPortletTabPaneProps) {
            super(props);
        };
        static defaultProps: IPortletTabPaneProps = {
            data: [],
            icon: "fa fa-calendar",
            title: "Calendario"
        };
        componentDidMount() {
        };
        shouldComponentUpdate(nextProps: IPortletTabPaneProps, nextState: IPortletTabPaneState): boolean {
            return global.hasChanged(this.props.data, nextProps.data);
        };
        componentWillReceiveProps(nextProps: IPortletTabPaneProps) {
        };
        render(): JSX.Element {
            return <EK.UX.PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <div className="">
                    <calendar.GlobalCalendar id="calendarQS" />
                </div>
            </EK.UX.PortletTabPane>;
        }
    }
};