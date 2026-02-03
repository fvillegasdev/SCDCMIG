namespace EK.UX.Tabs {
    "use strict";

    const PAGE_ID: string = "filtrosChequesAutomaticos";
    const form: () => EditForm = (): EditForm => {
        return new EditForm(PAGE_ID);
    };

    export interface IFiltroChequesAutoamticosProps extends IPortletTabPaneProps {
        CC?: any;
        Proveedores?: any;
        ObtenerCC?: () => void;
        ObtenerProveedores?: () => void;
    }
    
    export class filtroChequesAutomaticos extends React.Component<IFiltroChequesAutoamticosProps, IFiltroChequesAutoamticosProps> {
        constructor(props: IPortletTabPaneProps) {
            super(props);
        }

        static defaultProps: IPortletTabPaneProps = {
            data: {},
            icon: "icon-ek-135",
            title: "Filtros",
        };

        componentDidMount(): void {
            this.props.ObtenerCC();
            this.props.ObtenerProveedores();
        };

        render(): JSX.Element {
            return <PortletTabPane
                title={this.props.title}
                icon={this.props.icon}>
                <Form id={PAGE_ID} ref="form">
                    <Label id={"lblCentroCosto"} label="Centro de costo:" value={"Centro de costo:"} />
                   
                </Form>
            </PortletTabPane>;
        }
    }

   

}