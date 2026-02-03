namespace EK.Modules.Kontrol.Pages {
    const PAGE_ID: string = "ENK005$CL";

    interface IClasificadoresProps extends React.Props<any> {
        data?: any;
        params?: any;
        entidad?: { ID: number };
        claveEntidad?: string;
        cargaUsuario?: (idUsuario: number) => void;
    };

    class ClasificadoresForm extends React.Component<IClasificadoresProps, IClasificadoresProps> {
        constructor(props: IClasificadoresProps) {
            super(props);

            this.onCancelEditForm = this.onCancelEditForm.bind(this);
            this.onSaveForm = this.onSaveForm.bind(this);
        }

        componentDidMount(): void {
            if (this.props.params.id) {
                if (!isLoadingOrSuccessful(this.props.entidad)) {
                    this.props.cargaUsuario(Number(this.props.params.id));
                };
            } else {
                dispatchFailed("usuarios-setSelected", null);
            }
        }

        onCancelEditForm(): void {
            ReactRouter.hashHistory.goBack();
        }

        onSaveForm(): void {
            ReactRouter.hashHistory.goBack();
        }

        render(): JSX.Element {
            let bc: any = [$ml.bc.global.ek, $ml.bc.kontrol.cg, $ml.bc.kontrol.usuarios, $ml.bc.kontrol.clasificadores];

            let entidad: any = this.props.entidad;
            let current: any = entidad.data;

            let estatus: boolean = false;
            if (current.Clave) {
                estatus = EK.Global.getGlobal(Catalogos.estatus).isActive(entidad.Estatus);
            }

            let title: IPageTitle = {
                title: current.Nombre,
                subTitle: ["<", current.Email, ">"].join("")
            };

            // create the page component
            let page: JSX.Element = <PageV2 id={PAGE_ID} title={title} breadcrumb={bc}>
                <PageButtons>
                    <Clasificadores$SaveButton />
                    <CancelButton onClick={this.onCancelEditForm} />
                </PageButtons>
                <Row style={{ marginBottom: 35 }}>
                    <ClasificadoresSection id={PAGE_ID} claveEntidad={EK.Global.ClaveCatalogos.USUARIOS} item={current} />
                </Row>
            </PageV2>;

            return page;
        };
    };

    const mapClasificadoresProps: any = (state: any): any => {
        return {
            entidad: state.usuarios.selected,
            claveEntidad: EK.Global.ClaveCatalogos.USUARIOS
        };
    };

    const mapClasificadoresDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargaUsuario: (idUsuario: number): void => {
                dispatchAsync("usuarios-setSelected", "Usuarios/GetById/" + idUsuario);
            }
        };
    };

    export let Usuario$Clasificadores: any = ReactRedux.connect(mapClasificadoresProps, mapClasificadoresDispatchs)(ClasificadoresForm);
};