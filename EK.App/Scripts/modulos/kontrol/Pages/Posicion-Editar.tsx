namespace EK.Modules.Kontrol.Pages.Posiciones {
    "use strict";

    const config: page.IPageConfig = global.createPageConfig("posiciones", "kontrol");
    let PAGE_ID = "Posiciones"
    PAGE_ID = PAGE_ID.toUpperCase();
    export class Edicion extends page.Base {
        saveForm(props: page.IProps, item: EditForm): any {
            let model: any = item
                .addID()
                .addObject("Padre")
                .addObject("Categoria")
                .addClave()
                .addNombre()
                .addEstatus()
                .addVersion()
                .toObject();
            return model;
        };
        render(): JSX.Element {
            return <page.Main {...config} pageMode={PageMode.Edicion} onSave={this.saveForm}>
                <View />
                <Edit />
            </page.Main>;
        };
    };
    class Edit extends page.Base {
        componentWillMount() {
            let url: string = global.encodeAllURL("scv", "posiciones", { activos: 1 });
            dispatchAsync("load::Posiciones", url);
        }
        render(): JSX.Element {
            return <page.Edit>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <input.Clave size={[12, 12, 2, 2]} maxLength={50} />
                            <input.Nombre size={[12, 12, 8, 8]} maxLength={150} validations={[validations.required()]} />
                            <label.Entidad id={"Estatus"} label="Estatus" size={[12, 12, 2, 2]} />
                            <PadreDDL id={"Padre"} size={[12, 12, 6, 6]} addNewItem={"SO"} addNewItemText={"Seleccione una Opción"} />
                            <EKCategoriasDDL id={"Categoria"} size={[12, 12, 6, 6]} addNewItem={"SO"} addNewItemText={"Seleccione una Opción"} validations={[validations.required()]}/>                                                      
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.Edit>;
        };
    };

    export let EKCategoriasDDL: any = global.connect(class extends React.Component<IDropDrownListProps, {}>{
        static props: any = (state: any) => ({
            items: state.global.EK_CATEGORIAS
        });
        static defaultProps: IDropDrownListProps = {
            id: "Categoria",
            items: createDefaultStoreObject([]),
            label: "Categoría",
            helpLabel: "Seleccione una categoría",
            value: createDefaultStoreObject({}),
            initialValue: undefined,
            hasChanged: false,
            hasValidationError: false,
            required: false,
            itemKey: "ID",
            itemValue: "Nombre",
            size: [12, 12, 12, 12],
            itemFormatter: (item, container): any => {
                if (!item.id) {
                    if (item.obj) {
                        return $([
                            "<span class='badge badge-success bold'>",
                            item.obj.Clave, " ",
                            "</span> ", " ",
                            " <span class='bold' style='font-size: 90%'>",
                            item.obj.Nombre,
                            "</span>"].join(""));
                    } else {
                        return $(["<span class='bold'>", item.text, "</span>"].join(""));
                    };
                }
                else if (item.id == -1) {
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        " <span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                } else {
                    return $([
                        "<span class='badge badge-success bold'>",
                        item.Clave, " ",
                        " </span>",
                        " <span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> "].join(""));
                };
            },
            selectionFormatter: (item): any => {
                if (!item.id) {
                    return item.text;
                } else if (item.id == -1) {
                    return $([
                        "<span class='bold' style='font-size: 90%'>",
                        item.Nombre,
                        "</span> ",
                        " <span class='badge badge-info'>",
                        "",
                        "</span> "].join(""));
                };
                return $([
                    "<span class='badge badge-success bold'>",
                    item.Clave, " ",
                    "</span> ",
                    " <span class='bold' style='font-size: 90%'>",
                    item.Nombre,
                    "</span> "].join(""));
            }
        };
        componentDidMount(): void {
            if (!isLoadingOrSuccessful(this.props.items)) {
                let url: string = global.encodeAllURL("kontrol", "categorias", { activos: 1, PuestoActivo: 1 });
                dispatchAsync("load::EK_CATEGORIAS", url);
                
            }
        }

        render(): any {
            return <EK.UX.DropDownLists.DropdownList$Form {...this.props} />;
        };
    });

    class View extends page.Base {
        render(): JSX.Element {
            return <page.View>
                <Column size={[12, 12, 12, 12]}>
                    <page.OptionSection
                        id={PAGE_ID}
                        subTitle={PAGE_ID.toUpperCase()}
                        icon="fa fa-edit" collapsed={false} hideCollapseButton={true}>
                        <Row>
                            <label.Clave size={[12, 12, 2, 2]} />
                            <label.Nombre size={[12, 12, 8, 8]} />
                            <label.Entidad id="Estatus" label="Estatus" size={[12, 12, 2, 2]} />
                            <label.Entidad id="Padre" size={[12, 12, 6, 6]} />
                            <label.Entidad id="Categoria" size={[12, 12, 6, 6]} />
                            
                            
                        </Row>
                    </page.OptionSection>
                </Column>
            </page.View>;
        };
    };

};