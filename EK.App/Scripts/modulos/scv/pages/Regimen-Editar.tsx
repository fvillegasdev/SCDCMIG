namespace EK.Modules.SCV.Pages.Regimen {
    "use strict";

    const scv_Regimen_Compania: string = "RegimenCCompania";
    const config: page.IPageConfig = global.createPageConfig("Regimen", "scv", [scv_Regimen_Compania]);
    let PAGE_ID = "Régimen";

    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addClave()
                .addNombre()
                .addEstatus()
                .addObject(scv_Regimen_Compania)
                .addVersion()
                .toObject();
            return model;
        };
        onEntityLoaded(props: page.IProps): void {
            let entity: any = getData(props.entidad);
            let idRegimen = getDataID(props.entidad);
            let parametros: any = global.assign({ idRegimen: idRegimen });
            if (idRegimen <= 0 || idRegimen === undefined) {
                global.dispatchSuccessful("global-page-data", [], scv_Regimen_Compania);
            }
            else {
                props.config.dispatchCatalogoBase("base/scv/Regimen/Get/GetAllRegimenCompania/", parametros, scv_Regimen_Compania);
            };
        };


     
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm} onEntityLoaded={this.onEntityLoaded}>
                <View />
                <Edit />
            </page.Main>;

        };
    };

    interface IPageEditProps extends page.IProps {
        item?: any;
        Impuesto: any;
    };
    
    class Edit extends page.Base {
        
        render(): JSX.Element {
            
            let retValue: any = null;
            let entidad: number = getDataID(this.props.entidad);
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        //id="TMComisiones"
                        //subTitle="Movimiento Cancelacion"
                        icon="fas fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 12, 12, 12]} style={{ padding: 0 }}>
                            <input.Clave  size={[12, 2, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 8, 8, 8]} maxLength={50} />            
                            <checkBox.Status size={[12, 2, 2, 2]} />
                            </Column>     

                           <ListasCompania/>
                            
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;

        };
    };
    //Fin Movimiento Cancelacion
    class View extends page.Base {
        
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        //id="MovimientoCancelacion"
                        //SubTitle="Movimiento Cancelacion"
                        icon="fas fa-ring fa-3x fa-fw" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <Column size={[12, 12, 12, 12]}>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} /> 
                            <label.Estatus size={[12, 12, 2, 2]} />
                            </Column>
                            <ListasCompania/>
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };
    
    export let ListasCompania: any = global.connect(class extends React.Component<IPageEditProps, IPageEditProps> {
        constructor(props: IPageEditProps) {
            super(props);
        }
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };

        render(): JSX.Element {
            let estadoEntidad: boolean = getData(this.props.state).viewMode;
            let Porcen: any = Forms.getForm("RegimenCCompania");
            let data: any = getData(this.props.data);
            var estadoImpuesto = "0.00";
            if (Porcen !== null && Porcen !== undefined && Porcen.Impuesto !== null && Porcen.Impuesto !== undefined) {
                estadoImpuesto = Porcen.Impuesto.Porcentaje
            }
            

            return <page.SectionList
                id={scv_Regimen_Compania}
                parent={config.id}
                title={"Lista Compañia"}
                level={1}
                items={createSuccessfulStoreObject([])}
                icon="fas fa-th-list"
                size={[12, 12, 12, 12]}
                listHeader={
                    <div key="listHeaderKey" style={{ padding: "0px 10px" }}>
                        <Row>
                            <Column size={[6, 6, 6, 6]} className="list-default-header">{"Compañia"}</Column>
                            <Column size={[5, 5, 5, 5]} className="list-default-header">{"Impuesto"}</Column>
                        </Row>
                    </div>}
                mapFormToEntity={(form: EditForm, entidades?: any): any => {
                    let retValue: any = form
                        .addID()
                        .addEstatus()
                        .addObject("Compania")
                        .addObject("Impuesto")
                        .addNumber("Porcentaje")
                        .addVersion()
                        .toObject();

                    let e: any[] = entidades;

                    if (e && e.length > 0) {
                        e.forEach((value: any, index: number): any => {

                            if (value.Compania.ID === retValue.Compania.ID) {
                                retValue.ID = value.ID;
                                retValue._found = true;
                            };
                        });
                    }

                    return retValue;
                }}
                formatter={(index: number, item: any) => {
                    return <Row>
                        <Column size={[6, 6, 6, 6]} className="listItem-default-header">
                            <span className="badge badge-success" style={{ marginRight: 10 }}>{item.Compania.Clave} </span>
                            <span className="font-weight-bolder">{item.Compania.Nombre}</span>
                        </Column>
                        <Column size={[5, 5, 5, 5]} className="listItem-default-header">
                            <span className="badge badge-success" style={{ marginRight: 10 }}>{item.Impuesto.Clave} </span>
                            <span className="font-weight-bolder">{item.Impuesto.Nombre}{" "}</span>
                            <span>{" ( "}{item.Impuesto.Porcentaje}{" % )"}</span>
                        </Column>
                        {(estadoEntidad) ? null:
                            <buttons.PopOver idParent={config.id} idForm={scv_Regimen_Compania} info={item}
                            extraData={[buttons.PopOver.edit, buttons.PopOver.remove]} />
                        }
                    </Row>;
                }}>
                <Column size={[12, 12, 12, 12]}>
                    <Row>
                        <ddl.CompaniaDDL id={"Compania"} idFormSection={scv_Regimen_Compania} size={[12, 4, 4, 4]} />
                        <ImpuestosDDL id={"Impuesto"} idFormSection={scv_Regimen_Compania} size={[12, 4, 4, 4]}  />
                    </Row>
                </Column>
            </page.SectionList>
        };
    })

};
