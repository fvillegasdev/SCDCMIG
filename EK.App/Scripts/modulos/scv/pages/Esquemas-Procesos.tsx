// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX

namespace EK.Modules.SCV.Pages.SCVEsquemas {
    "use strict";
    const PAGE_ID: string = "esquemas";
    const PAGE_PROCESOS_ID: string = "esquemas$proceso";

    export interface IChild extends React.Props<any> {
        editMode?: boolean;
        idEsquema?: number;
        etapa?: any;
    }

    interface IProcesos extends IChild {
        proceso?: global.DataElement;
        procesos: global.DataElement;
        getProcesos?: (props: IProcesos) => void;
    }

    export let Procesos: any = global.connect(class extends React.Component<IProcesos, {}>{
        constructor(props: IProcesos) {
            super(props);
            this.onAddNew = this.onAddNew.bind(this);
            this.onCancel = this.onCancel.bind(this);
            this.onSave = this.onSave.bind(this);
            this.onSelect = this.onSelect.bind(this);
            this.onDelete = this.onDelete.bind(this);
        }
        static props: any = (state: any) => ({
            etapa: state.esquemas.etapaCurrent,
            procesos: state.esquemas.procesos,
            proceso: state.esquemas.procesoSelected
        });
        static defaultProps: IProcesos = {
            editMode: false,
            idEsquema: 0,
            proceso: global.createDefaultStoreObject({}),
            procesos: global.createDefaultStoreObject([])
        };
        static dispatchs: any = (dispatch: Redux.Dispatch<any>) => ({
            getProcesos: (props: IProcesos): void => {
                let idEtapa: number = global.getData(props.etapa).ID;
                let idEsquema: number = props.idEsquema;
                let encodedFilters: string = global.encodeObject({ idEtapa, idEsquema });
                global.dispatchAsync("scv-esquemas-etapas-procesos", "esquemas/procesos/all/" + encodedFilters);
            }
        });
        componentWillMount(): void {
            global.dispatchDefault("scv-esquemas-etapas-procesos", []);
        };
        componentWillReceiveProps(nextProps: IProcesos) {
            if (global.hasChanged(this.props.etapa, nextProps.etapa)) {
                this.props.getProcesos(nextProps);
            }
        };
        componentDidMount(): any {
            this.props.getProcesos(this.props);
        };
        shouldComponentUpdate(nextProps: IProcesos, {}): boolean {
            return hasChanged(this.props.procesos, nextProps.procesos) ||
                hasChanged(this.props.proceso, nextProps.proceso) ||
                hasChanged(this.props.etapa, nextProps.etapa) ||
                this.props.editMode !== nextProps.editMode;
        };
        componentDidUpdate(prevProps: IProcesos, {}): any {
            let $page: any = $ml[PAGE_ID];
            if (global.wasUpdated(prevProps.proceso, this.props.proceso, false)) {
                let item: any = global.getData(this.props.proceso);

                if (item.Estado === 4) {
                    success("El proceso ha sido eliminado");
                } else {
                    success("El proceso ha sido actualizado");
                }

                this.props.getProcesos(this.props);
                this.onCancel();
            }
        };
        onSelect(item: any): void {
            Forms.remove(PAGE_PROCESOS_ID);
            global.dispatchSuccessful("scv-esquemas-etapas-procesos-setSelected", item);
        };
        onDelete(item: any): void {
            EK.Global.confirm("Presione Confirmar para eliminar el proceso", "Eliminar proceso", () => {
                let model = EK.Global.assign(item);
                global.dispatchAsyncPut("scv-esquemas-etapas-procesos-guardar", "esquemas/procesos/delete", model);
            });
        };
        onAddNew(): void {
            let newId: number = this.props.procesos.getNextLowerID();
            let item: any = {
                ID: newId,
                Proceso: global.createDefaultStoreObject({}),
                IdEtapa: global.getData(this.props.etapa).ID,
                IdEsquema: this.props.idEsquema
            };
            this.onSelect(item);
        };
        onCancel(): void {
            Forms.remove(PAGE_PROCESOS_ID);
            global.dispatchDefault("scv-esquemas-etapas-procesos-setSelected", {});
        };
        onSave(): void {
            let $page: any = $ml[PAGE_ID];

            if (!Forms.isValid(PAGE_PROCESOS_ID)) {
                global.warning($page.mensajes.warning.message);
                return;
            }

            let item: EditForm = Forms.getForm(PAGE_PROCESOS_ID);

            let configuracion: any = Forms.getForm("esquemas$proceso$Detalle");

            //let Nombre: any = EK.Store.getState().forms.esquemas$proceso$Detalle.form.EstatusDeUbicacion.value.Nombre;
            let config: any = global.getFilters(configuracion);

            let model: any = item
                .addNumber("ID")
                .addObject("Proceso")
                .addNumber("IdEsquema")
                .addNumber("IdEtapa")
                .addString("Configuracion")
                .addString("Nombre")
                .toObject();

            if (model.Nombre == null || model.Nombre == undefined) {
                model.Nombre = (EK.Store.getState().forms.esquemas$proceso$Detalle == undefined) ? null : EK.Store.getState().forms.esquemas$proceso$Detalle.form.EstatusDeUbicacion.value.Nombre;
            }

            model.Configuracion = JSON.stringify(config);

            global.dispatchAsyncPut("scv-esquemas-etapas-procesos-guardar", "esquemas/procesos/save", model);
        };
        render(): JSX.Element {
            let $page: any = $ml[PAGE_ID];
            let title: string = "Procesos";
            let listMode: boolean = global.getDataID(this.props.etapa) > 0 ? true : false;
            if (listMode) {
                title = "Procesos de " + global.getData(this.props.etapa).Nombre;
            }

            let items: global.DataElement = this.props.procesos;
            if (global.isSuccessful(this.props.procesos)) {
                items = this.props.procesos.getActiveItems();
            }

            let editMode: boolean = global.isSuccessful(this.props.proceso);
            let model: any = global.getData(this.props.proceso);

            let edit: any = {
                icon: "icon-pencil",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onSelect(item) }
            };
            let remove: any = {
                icon: "fa fa-trash",
                action: (id: string, idParent: string, item: any, config: page.IPageConfig) => { this.onDelete(item) }
            };

            /*
            EK.Store.getState().forms.esquemas$proceso$Detalle.form.EstatusDeUbicacion.value.Nombre
            */

            const listHeader: JSX.Element =
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <Column size={[7, 7, 7, 7]} className="list-default-header">{"Proceso"}</Column>
                        <Column size={[4, 4, 4, 4]} className="list-default-header">{"Evento"}</Column>
                        <Column size={[1, 1, 1, 1]} className="list-default-header">&nbsp;</Column>
                    </Row>
                </Column>

            return this.props.editMode ?
                <page.OptionSection title={title}
                    icon="fa fa-cogs" collapsed={false} hideCollapseButton={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[global.getData(items, []).length].join("")}
                    </span>}
                    readOnly={false} level={1} editMode={editMode}>
                    <SectionView onAddNew={listMode ? this.onAddNew : null}>
                        <PanelUpdate info={this.props.procesos}>
                            <List
                                items={items}
                                readonly={true}
                                addRemoveButton={false}
                                listHeader={listHeader}
                                formatter={(index: number, item: any) => {
                                    var nombre = item.Nombre;
                                    if (nombre != null || nombre != undefined) {
                                        nombre = '  ( ' + nombre + ' )';
                                    }
                                    else {
                                        nombre = '';
                                    }
                                    return <Row>
                                        <Column size={[7, 7, 7, 7]} className="listItem-default-header">
                                            <span style={{ fontWeight: 400, paddingRight: 7 }}>{item.Proceso.Nombre}</span>
                                            <span>{nombre}</span>
                                        </Column>
                                        <Column size={[4, 4, 4, 4]} className="listItem-default-header">
                                            <span style={{ fontWeight: 400 }}>{item.Proceso.Evento}</span>
                                        </Column>
                                        <buttons.PopOver idForm={PAGE_PROCESOS_ID} info={item} extraData={[edit, remove]} />
                                    </Row>
                                } } />
                        </PanelUpdate>
                    </SectionView>
                    <SectionEdit
                        idForm={PAGE_PROCESOS_ID}
                        onCancel={this.onCancel}
                        onSave={this.onSave}>
                        <Row>
                            <input.Hidden id={"ID"} idFormSection={PAGE_PROCESOS_ID} value={model.ID} />
                            <input.Hidden id={"IdEsquema"} idFormSection={PAGE_PROCESOS_ID} value={model.IdEsquema} />
                            <input.Hidden id={"IdEtapa"} idFormSection={PAGE_PROCESOS_ID} value={model.IdEtapa} />
                            <ddl.SCVProcesosDDL
                                id={"Proceso"}
                                idFormSection={PAGE_PROCESOS_ID}
                                label={$page.form.section.esquemas$Etapas.form.section.etapas$Procesos.form.proceso.label}
                                required={true}
                                size={[12, 12, 12, 12]}
                                helpLabel={$page.form.section.esquemas$Etapas.form.section.etapas$Procesos.form.proceso.helplabel}
                                value={model.Proceso}
                                validations={[validations.required()]} />

                            <EK.Modules.SCV.Pages.Esquemas.Procesos.EsquemaProcesoDetalle/>

                        </Row>
                    </SectionEdit>
                </page.OptionSection >
                : <page.OptionSection title={title}
                    icon="fa fa-cogs" collapsed={false} hideCollapseButton={false}
                    subTitle={<span className="badge badge-info" style={{ marginLeft: 5 }}>
                        {[global.getData(items, []).length].join("")}
                    </span>}
                    readOnly={false} level={1}>
                    <PanelUpdate info={this.props.procesos}>
                        <List
                            items={items}
                            readonly={true}
                            addRemoveButton={false}
                            listHeader={listHeader}
                            formatter={(index: number, item: any) => {
                                var nombre = item.Nombre;
                                if (nombre != null || nombre != undefined) {
                                    nombre = '  ( ' + nombre + ' )';
                                }
                                else {
                                    nombre = '';
                                }
                                return <Row>
                                    <Column size={[7, 7, 7, 7]} className="listItem-default-header">
                                        <span style={{ fontWeight: 400, paddingRight:7 }}>{item.Proceso.Nombre}</span>
                                        <span >{nombre}</span>
                                    </Column>
                                    <Column size={[4, 4, 4, 4]} className="listItem-default-header">
                                        <span style={{ fontWeight: 400 }}>{item.Proceso.Evento}</span>
                                    </Column>
                                    <Column size={[1, 1, 1, 1]}></Column>
                                </Row>
                            } } />
                    </PanelUpdate>
                </page.OptionSection>
        }
    });
}