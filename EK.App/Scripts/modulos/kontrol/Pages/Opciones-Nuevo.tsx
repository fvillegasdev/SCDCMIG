/// <reference path="../../../../Scripts/typings/react/react-global.d.ts" />
/// <reference path="../../../../Scripts/components/Breadcrumb.tsx" />
/// <reference path="../../../../Scripts/components/Buttons.tsx" />
/// <reference path="../../../../Scripts/components/Icon.tsx" />
/// <reference path="../../../../Scripts/components/Page.tsx" />
/// <reference path="../../../../Scripts/components/Portlet.tsx" />
/// <reference path="../../../../Scripts/components/store/Dispatchs.ts" />

namespace EK.Modules.Kontrol.Pages {
    "use strict";

    interface IOpcionesProps extends React.Props<any> {
        cargaGlobal?: () => void;
        parametersSelected?: any;
    }

    export class PageNuevoOpciones extends React.Component<IOpcionesProps, IOpcionesProps> {
        constructor(props: IOpcionesProps) {
            super(props);
        }

        componentWillMount(): any {
            this.props.cargaGlobal();
        }

        shouldComponentUpdate(nextProps: IOpcionesProps, nextState: IOpcionesProps): boolean {
            // this shouldn't re-render
            return true;
        }

        render(): JSX.Element {
            // define the breadcrumb element, maybe could be automatically in the future
            let itemsBC: EK.UX.IBreadcrumbItem[] = [
                { text: "EK", link: "/" },
                { text: "Catálogos Globales", link: "/" },
                { text: "Opciones", link: "/Opciones" },
                { text: "Nuevo", link: "/Opciones/Nuevo" }
            ];

            let modulo: any = this.props.parametersSelected == undefined ? undefined : this.props.parametersSelected.form.Modulo.value;

            let page: JSX.Element = <Page id="EK0106">
                <PageBar>
                    <Breadcrumb data={itemsBC} />
                    <PageToolbar />
                </PageBar>
                <Grid>
                    <Row>
                        <LeftColumn>
                            <PageTitle title="Nueva Opción" subTitle="Administración de Opciones">
                                <PageToolbar>
                                    <ButtonGroup>
                                        <SaveButton />
                                    </ButtonGroup>
                                </PageToolbar>
                            </PageTitle>
                            <Form id="opcionesNuevo">
                                <Input id="ID" value={"0"} label="" visible={false} />
                                <Input id="Permisos" value={"4"} label="" visible={false} />
                                <CheckBox
                                    id="EsVisible"
                                    label="Es Visible"
                                    value={true}
                                    xs={{ size: 4 }}
                                    sm={{ size: 2 }}
                                    md={{ size: 2 }}
                                    lg={{ size: 2, offset: 8 }}
                                    required={false}
                                    helpLabel="Opción visible " />
                                <CheckBox
                                    id="Estatus"
                                    label="Activo"
                                    xs={{ size: 12 }}
                                    sm={{ size: 6 }}
                                    md={{ size: 6 }}
                                    lg={{ size: 2 }}
                                    required={false}
                                    helpLabel="Estatus de la opción"
                                    value={true} />
                                <Select
                                    id={"Modulo"}
                                    label={"Módulo"}
                                    remoteUrl={"Modulos/Search"}
                                    mode={SelectModeEnum.Single}
                                    itemFormatter={(index: number, item: any) => { return <h5>{item.Nombre}</h5> } }
                                    suggestionFormatter={(item: any) => { return <div>{item.Nombre}</div> } }
                                    size={[12, 12, 12, 12]}
                                    helpLabel={"Capture el nombre del módulo"}
                                    itemLabel={"módulo"}
                                    itemValue={"Nombre"}
                                    itemKey={"ID"}
                                    value={modulo}
                                    required={true} />
                                <Input
                                    id="Opcion"
                                    label="Opción"
                                    size={[12, 6, 6, 6]}
                                    required={true}
                                    helpLabel="Capture el nombre de la opción" />
                                <Input
                                    id="Descripcion"
                                    label="Descripción"
                                    size={[12, 6, 6, 6]}
                                    required={true}
                                    helpLabel="Capture la descripción" />
                                <Input
                                    id="Icono"
                                    label="Icono"
                                    size={[12, 6, 6, 4]}
                                    helpLabel="Capture el nombre del Icono" />
                            </Form>
                        </LeftColumn>
                        <RightColumn>
                        </RightColumn>
                    </Row>
                </Grid>
            </Page >;
            return page;
        }
    }

    const mapProps: any = (state: any): any => {
        return {
            parametersSelected: state.forms.opcionesBuscar
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            cargaGlobal: (): void => {
                dispatchAsync("load::ESTATUS", "catalogos(estatus)");
            }
        };
    };

    const mapSaveButtonProps: any = (state: any) => {
        return {
            info:
            {
                opcion: state.forms.opcionesNuevo,
                estatus: state.global.ESTATUS
            },
            visible: state.forms.opcionesNuevo.hasChanged !== undefined && state.forms.opcionesNuevo.hasChanged,

        };
    };

    const mapSaveButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (info: any): void => {
                let item: any = info.opcion.form;
                let estatus: any[] = info.estatus.data;

                let selectedEstatus: any = estatus.filter(e =>
                    (item.Estatus.value && e.Clave === "A") ||
                    (!item.Estatus.value && e.Clave === "B")
                );

                let opcion: any = {
                    "ID": item.ID.value,
                    "Opcion": item.Opcion.value,
                    "Descripcion": item.Descripcion.value,
                    "Permisos": item.Permisos.value,
                    "EsVisible": item.EsVisible.value,
                    "Estatus": selectedEstatus[0],
                    "Modulo": item.Modulo.value
                }

                dispatchAsyncPut("opciones-insertar", "opciones/insert", opcion);

            }
        };
    };
    export let PageNuevoOpcion: any = ReactRedux.connect(mapProps, mapDispatchs)(PageNuevoOpciones);
    let SaveButton: any = ReactRedux.connect(mapSaveButtonProps, mapSaveButtonDispatchs)(EK.UX.Buttons.SaveButton);
}