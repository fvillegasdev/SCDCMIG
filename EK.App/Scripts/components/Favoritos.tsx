
namespace EK.UX {
    "use strict";

    interface IDropdownFavoritos extends React.Props<any> {
        app?: any;
        page?: any;
        favoritos: any;
        agregarFavorito?: (favorito: any) => any;
        removerFavorito?: (favorito: any) => any;
    };

    class DropdownFavoritos extends React.Component<IDropdownFavoritos, {}> {
        constructor(props: IDropdownFavoritos) {
            super(props);

            this.onButtonClick = this.onButtonClick.bind(this);
            this.isInFavoritos = this.isInFavoritos.bind(this);
        };

        componentWillReceiveProps(nextProps: IDropdownFavoritos): void {
            if (wasUpdated(this.props.favoritos, nextProps.favoritos)) {
                success("La lista de favoritos fué actualizada");
            }
        };

        shouldComponentUpdate(nextProps: IDropdownFavoritos, nextState: IDropdownFavoritos) {
            return hasChanged(this.props.page, nextProps.page) ||
                hasChanged(this.props.favoritos, nextProps.favoritos);
        };

        onButtonClick(f?: any): any {
            let isFavorito: boolean = f ? true : this.isInFavoritos();
            let option: any = getOption(this.props.page.data.id);

            let favorito: any = f ? f : {
                Titulo: [option.Option, "(", document.title, ")"].join(""),
                Enlace: location.href,
                Icono: option.Icono
            };

            if (isFavorito) {
                this.props.removerFavorito(favorito);
            } else {
                if (!option || option.permisos < 1) {
                    warning("No puede agregar esta opción a favoritos");
                    return;
                };

                var bb: any = window["bootbox"];
                bb.prompt({
                    title: favorito.Enlace,
                    value: favorito.Titulo,
                    buttons: {
                        confirm: {
                            label: "Agregar a favoritos",
                            className: "btn green btn-outline"
                        },
                        cancel: {
                            label: "Cancelar",
                            className: "btn default btn-outline"
                        }
                    },
                    callback: (result: any) => {
                        if (result === null) {
                        } else {
                            let value: string = $.trim(result);
                            if (value === "") {
                                warning("No se agregó a favoritos, debe capturar un título");
                            } else {
                                favorito.Titulo = value;

                                this.props.agregarFavorito(favorito);
                            };
                        };
                    }
                });
            };

            global.closeSidebar("tb_sb_favoritos");
        };

        isInFavoritos(): boolean {
            var retValue = false;

            if (isSuccessful(this.props.favoritos)) {
                var data: any[] = this.props.favoritos.data;
                var thisLink: string = location.href;
                
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Enlace == thisLink) {
                        retValue = true;

                        break;
                    };
                };
            };

            return retValue;
        };

        render(): JSX.Element {
            var isFavorito: boolean = this.isInFavoritos();
            var starIcon: any = null;
            var data: any[] = this.props.favoritos.data;
            var favButton: any = null;
            var favAreLoading: boolean = isLoadingOrUpdating(this.props.favoritos);
            var addToFav: boolean = false;
            var remFromFav: boolean = false;

            if (favAreLoading) {
                starIcon = <i className="fas fa-sync fa-spin fa-fw font-white"></i>;
            } else {
                if (isFavorito) {
                    remFromFav = true;
                    starIcon = <EK.UX.Icon icon="fas fa-star selected" />;
                    favButton = <buttons.Button onClick={() => this.onButtonClick()} text="Remover de Favoritos" color="btn-default" className="btn-sm" style={{ width: "100%" }} />;
                } else {
                    addToFav = true;
                    starIcon = <EK.UX.Icon icon="far fa-star" />;
                    favButton = <buttons.Button onClick={() => this.onButtonClick()} text="Agregar a Favoritos" color="btn-default" className="btn-sm" style={{ width: "100%" }} />;
                };
            };

            return <li className="dropdown dropdown-extended dropdown-notification favorito" id="header_notification_bar">
                <a
                    href="javascript:;"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    data-hover="dropdown"
                    data-close-others="true"
                    onClick={() => { global.showSidebar("tb_sb_favoritos") }}
                    >
                    {starIcon}
                    </a>
                <Sidebar id="tb_sb_favoritos">
                    <div className="c-sidebar-fav-title">
                        <i className="fas fa-stars"></i>
                        <span>Favoritos</span>
                    </div>
                    {addToFav === true ?
                        <div className="c-sidebar-fav-add" onClick={() => this.onButtonClick()}>
                            <span>¿agregar a favoritos?</span>
                            <i className="fas fa-plus-circle"></i>
                        </div> : null}
                    {remFromFav === true ?
                        <div className="c-sidebar-fav-rem" onClick={() => this.onButtonClick()}>
                            <span>¿remover de favoritos?</span>
                            <i className="fas fa-minus-circle"></i>
                        </div> : null}
                        {data.map((value: any, index: number): any => {
                            let icono: any = value.Icono ? value.Icono : "fas fa-star";
                            let cFavItem: string = "c-sidebar-fav-item " + (index % 2 === 0 ? "pair" : "");
                            return <div key={"sb_" + index} className={cFavItem}>
                                <div className="c-sidebar-fav-text">
                                    <EK.UX.Icon icon={icono} /> {value.Titulo}
                                </div>
                                <div className="c-sidebar-fav-link">
                                    <a href={value.Enlace}>
                                    {value.Enlace}
                                    </a>
                                </div>
                                <div className="c-sidebar-fav-remItem" onClick={() => this.onButtonClick(value) }>
                                    <i className="fas fa-minus-circle"></i>
                                </div>
                            </div>;
                        })}
                    </Sidebar>
                </li>;
        };
    };

    const mapProps: any = (state: any): any => {
        return {
            favoritos: state.global.favoritos,
            page: state.global.page
        };
    };

    const mapDispatchs: any = (dispatch: Redux.Dispatch<any>) => {
        return {
            agregarFavorito: (favorito: any): any => {
                dispatch(actionAsync({
                    action: "usuarios-favoritos-agregar",
                    type: HttpMethod.PUT,
                    url: "usuarios/favoritos/agregar",
                    data: favorito,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));                
            },
            removerFavorito: (favorito: any): any => {
                dispatch(actionAsync({
                    action: "usuarios-favoritos-remover",
                    type: HttpMethod.PUT,
                    url: "usuarios/favoritos/remover",
                    data: favorito,
                    custom: {
                        processData: false,
                        contentType: false
                    },
                    status: AsyncActionTypeEnum.updating
                }));
            }
        };
    };

    export let DropdownFavoritosComponent: any = ReactRedux.connect(mapProps, mapDispatchs)(DropdownFavoritos);
};

import DropdownFavoritos = EK.UX.DropdownFavoritosComponent;