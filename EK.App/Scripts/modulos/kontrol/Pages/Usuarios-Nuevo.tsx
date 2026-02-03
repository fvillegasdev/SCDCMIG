/// <reference path="../../../../Scripts/typings/react/react-global.d.ts" />
/// <reference path="../../../../Scripts/components/Breadcrumb.tsx" />
/// <reference path="../../../../Scripts/components/Buttons.tsx" />
/// <reference path="../../../../Scripts/components/Icon.tsx" />
/// <reference path="../../../../Scripts/components/Page.tsx" />
/// <reference path="../../../../Scripts/components/Portlet.tsx" />
/// <reference path="../../../../Scripts/components/store/Dispatchs.ts" />

namespace EK.Modules.Kontrol.Pages {
    "use strict";

    interface IUsuariosProps extends React.Props<any> {
        setSelected: (item: any) => void;
        cargarCompanias: (idUsuario: string) => void;
    }

    export class PageNuevoUsuarios extends React.Component<IUsuariosProps, IUsuariosProps> {
        constructor(props: IUsuariosProps) {
            super(props);

            this.onSelectedUsuarioChanged = this.onSelectedUsuarioChanged.bind(this);
        }

        shouldComponentUpdate(nextProps: IUsuariosProps, nextState: IUsuariosProps): boolean {
            // this shouldn't re-render
            return false;
        }

        onSelectedUsuarioChanged(item: any): void {
            this.props.setSelected(item);
        }

        render(): JSX.Element {
            // define the breadcrumb element, maybe could be automatically in the future
            let itemsBC: EK.UX.IBreadcrumbItem[] = [
                { text: "EK", link: "/" },
                { text: "Catálogos Globales", link: "/" },
                { text: "Usuarios", link: "/Usuarios" },
                { text: "Nuevo", link: "/Usuarios/Nuevo" }
            ];

            let page: JSX.Element = <Page id="EK0106">
                <PageBar>
                    <Breadcrumb data={itemsBC} />
                    <PageToolbar />
                </PageBar>
                <Grid>
                    <Row>
                        <Column lg={8} md={8} sm={12} xs={12} className="bigBorderBox bg-white bg-font-white">
                            <PageTitle title="Usuario Nuevo" subTitle="Administración de Usuarios">
                                <PageToolbar>
                                    <ButtonGroup>
                                        <SaveButton
                                            icon={EK.UX.IconTypeEnum.note}
                                            iconOnly={true}
                                            inverse={true}
                                            isInHeaderPortlet={true}
                                            color={EK.UX.ColorEnum.greenSharp}
                                            visible={true}
                                            />
                                    </ButtonGroup>
                                </PageToolbar>
                            </PageTitle>
                            <Form id="usuariosNuevo">
                                <Input id="ID" value={"0"} label="" visible={false} />
                                <Input id="Foto" value={""} label="" visible={false} />
                                <CheckBox
                                    id="Bloqueado"
                                    label="Bloqueado"
                                    size={[12, 6, 6, 6]}
                                    required={false}
                                    value={false}
                                    disabled={true}
                                    helpLabel="Usuario Bloqueado" />
                                <CheckBox
                                    id="Estatus"
                                    label="Activo"
                                    size={[12, 6, 6, 6]}
                                    required={false}
                                    value={true}
                                    helpLabel="Estatus Usuario"
                                    disabled={true} />
                                <Input
                                    id="NombreUsuario"
                                    label="Nombre"
                                    size={[12, 6, 6, 4]}
                                    required={true}
                                    helpLabel="Capture el Nombre del usuario" />
                                <PuestosDDL 
                                    size={[12, 6, 6, 4]}
                                    required={true}
                                    itemValue="Valor"
                                    itemKey="ID" />
                                <AreasOrganizacionDDL
                                    size={[12, 6, 6, 4]}
                                    required={true}
                                    itemValue="Nombre"
                                    itemKey="ID" />
                                <Input
                                    id="Password"
                                    label="Password"
                                    size={[12, 6, 6, 4]}
                                    required={true}
                                    helpLabel="Capture el password del usuario" />
                                <Input
                                    id="Email"
                                    label="Email"
                                    size={[12, 6, 6, 4]}
                                    required={false}
                                    helpLabel="Capture el email del usuario" />
                                <Input
                                    id="Telefono"
                                    label="Teléfono"
                                    size={[12, 6, 6, 4]}
                                    required={false}
                                    helpLabel="Capture el teléfono del usuario" />
                                <DatePicker
                                    id="VigenciaInicio"
                                    label="Vigente desde"
                                    xs={{ size: 12 }}
                                    sm={{ size: 6 }}
                                    md={{ size: 6 }}
                                    lg={{ size: 4 }}
                                    helpLabel="Fecha de inicio del periodo de vigencia del usuario"
                                    required={true} />
                                <DatePicker
                                    id="VigenciaFin"
                                    label="Vigente hasta"
                                    xs={{ size: 12 }}
                                    sm={{ size: 6 }}
                                    md={{ size: 6 }}
                                    lg={{ size: 4 }}
                                    helpLabel="Capture el nombre completo del usuario"
                                    required={true} />
                                <Input
                                    id="UUID"
                                    label="Usuario AD"
                                    size={[12, 6, 6, 4]}
                                    required={false}
                                    helpLabel="Capture el ID del usuario del AD Azure" />
                            </Form>
                        </Column>
                        <Column lg={4} md={4} sm={12} xs={12} className="bigBorderBox">
                            <Column lg={12} md={4} className="bg-white bg-font-white">
                            </Column>
                        </Column>
                    </Row>
                </Grid>
            </Page >;
            return page;
        }
    }

    const mapSaveButtonProps: any = (state: any) => {
        return {
            info: state.forms.usuariosNuevo,
            visible: state.forms.usuariosNuevo.hasChanged !== undefined && state.forms.usuariosNuevo.hasChanged,
        };
    };

    const mapSaveButtonDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            onClick: (form: any): void => {
                console.log(JSON.stringify(form));

                let sForm: any = {
                    "ID": form.form.ID.value,
                    "NombreUsuario": form.form.NombreUsuario.value,
                    "Password": form.form.Password.value,
                    "Email": form.form.Email.value,
                    "Telefono": form.form.Telefono.value,
                    "VigenciaInicio": form.form.VigenciaInicio.value,
                    "VigenciaFin": form.form.VigenciaFin.value,
                    "UUID": form.form.UUID.value,
                    "Foto": form.form.Foto.value,
                    "IdPuesto": form.form.Puestos.value,
                    "IdAreaOrganizacion": form.form.AreaOrganizacion.value,
                    "Estatus": form.form.Estatus.value,
                    "Bloqueado": form.form.Bloqueado.value
                };

                dispatch(EK.Global.actionAsync({
                    action: "usuarios-guardar",
                    url: "Usuarios/Save?FormJson=" + JSON.stringify(sForm) + "&usuario=1&accion=0"
                }));
            }
        };
    };
    export let PageNuevoUsuario: any = ReactRedux.connect(null, null)(PageNuevoUsuarios);
    let SaveButton: any = ReactRedux.connect(mapSaveButtonProps, mapSaveButtonDispatchs)(buttons.Button);
}