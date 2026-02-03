namespace EK.Modules.Kontrol.Pages.Admin {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("admin", "kontrol");

    export const Vista: any = page.connect(class extends page.Base {
        constructor(props: page.IProps) {
            super(props);

            this.createModuloSection = this.createModuloSection.bind(this);
            this.createSections = this.createSections.bind(this);
            this.onViewModule = this.onViewModule.bind(this);
            this.onCancelViewModule = this.onCancelViewModule.bind(this);
        };
        //
        //static props: any = (state: any) => {
        //    let baseMap: any = page.props(state);
        //    baseMap.data = state.usuarios.admin;

        //    return baseMap;
        //};
        //
        onFilter(props: page.IProps, filters: any): void {
            config.dispatchCatalogoBase("usuario/menu/admin");
        };
        onViewModule(info: any): void {
            this.props.config.setState({ moduleView: false, selected: info });
        };
        onCancelViewModule(info: any): void {
            this.props.config.setState({ moduleView: true, selected: undefined });
        };
        componentWillMount(): void {
            this.props.config.setState({ moduleView: true, selected: undefined });
        };
        createModuloSection(item: any): any {
            let retValue: any[] = [];

            let formatter: (index: number, item: any) => any = (index: number, item: any): any => {
                let icono: string;
                if ($.trim(item.Icono).length > 0) {
                    icono = item.Icono;
                }
                else {
                    icono = "icon-settings";
                };
                return <Row className="list-item-option">
                    <Column size={[12, 12, 1, 2]} style={{ paddingTop: 10 }}>
                        <i className={icono} style={{ fontSize: 28 }}></i>
                    </Column>
                    <Column size={[12, 12, 9, 8]}>
                        <div style={{ fontWeight: 600 }}>{item.Nombre}</div>
                        <div style={{ fontSize: 11 }}>{item.Descripcion}</div>
                    </Column>
                </Row>;
            };

            let onItemClick: (item: any) => void = (item: any): void => {
                go(item.Ruta);
            };

            if (item && item.Opciones && item.Opciones.length > 0) {
                for (var i = 0; i < item.Opciones.length; i++) {
                    let itemSection: any = item.Opciones[i];
                    let data: any = createSuccessfulStoreObject(itemSection.Opciones);

                    retValue.push(<Column key={itemSection.Clave} size={[12, 12, 12, 12]}>
                        <page.OptionSection level={1} title={itemSection.Nombre} hideCollapseButton={false} inverse={false} collapsed={false}>
                            <p style={{ fontSize: 13, fontWeight: 300 }}>{itemSection.Descripcion}</p>
                            <List items={data} formatter={formatter} readonly={true} addRemoveButton={false} onItemClick={onItemClick} />
                        </page.OptionSection>
                    </Column>);
                };
            };

            return retValue;
        };
        createSections(): any {
            let retValue: any[] = [];

            if (isSuccessful(this.props.data)) {
                let menu: any = getData(this.props.data);
                if (menu.length > 0) { // nivel admin
                    let menuAdmin: any = menu[0];
                    if (menuAdmin.Opciones && menuAdmin.Opciones.length > 0) {
                        for (var i = 0; i < menuAdmin.Opciones.length; i++) {
                            let menuSection: any = menuAdmin.Opciones[i];

                            retValue.push(<Column key={menuSection.Clave} size={[12, 12, 12, 12]}>
                                <page.OptionSection level={1} title={menuSection.Nombre} hideCollapseButton={false} inverse={false} collapsed={false}>
                                    <SectionButtons>
                                        <buttons.Button icon="fa fa-arrow-right" color="white" iconOnly={true} className="btn-ico-ek" onClick={this.onViewModule} info={menuSection} />
                                    </SectionButtons>
                                    <span style={{ fontSize: 13, fontWeight: 300 }}>{menuSection.Descripcion}</span>
                                </page.OptionSection>
                            </Column>);
                        };
                    };
                };
            };

            return retValue;
        };
        render(): JSX.Element {
            let ml: any = config.getML();
            let state: any = getData(this.props.state);
            let content: any;
            let data: DataElement = this.props.data;
            let buttonsContent: any = null;

            if (state.moduleView === true || state.moduleView === undefined) {
                content = this.createSections();
            }
            else {
                buttonsContent = <PageButtons key="pageButtons">
                    <buttons.CancelSL onClick={this.onCancelViewModule} />
                </PageButtons>;

                content = this.createModuloSection(state.selected);
            };

            let n: number = 0;
            let m: number = 0;
            return <page.Main {...config} pageMode={PageMode.Vista} onFilter={this.onFilter}>
                {buttonsContent}
                <UpdateColumn info={data}>
                    <Row>
                        <Column size={[12, 6, 4, 4]}>
                            {content.map((value: any, index: number) => {
                                n++;

                                if (n === 1) {
                                    return value;
                                };

                                if (n === 3) {
                                    n = 0;
                                };

                                return null;
                            })}
                        </Column>
                        <Column size={[12, 6, 4, 4]}>
                            {content.map((value: any, index: number) => {
                                if (index === 0) n = 0;
                                n++;

                                if (n === 2) {
                                    return value;
                                };

                                if (n === 3) {
                                    n = 0;
                                };

                                return null;
                            })}
                        </Column>
                        <Column size={[12, 6, 4, 4]}>
                            {content.map((value: any, index: number) => {
                                if (index === 0) n = 0;
                                n++;

                                if (n === 3) {
                                    n = 0;
                                    return value;
                                };

                                return null;
                            })}
                        </Column>
                    </Row>
                </UpdateColumn>
            </page.Main>;
        };
    });
};