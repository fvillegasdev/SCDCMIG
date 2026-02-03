namespace EK.Modules.SCV.Pages.postventa.DashboardMensajeria {
    "use strict";
    const PAGE_ID: string = "DashboardMensajeria";
    //const PAGE_CURRENTCHAT_MESSAGES: string = PAGE_ID + "$currentChatMessages";
    const PAGE_ALL_CHATS: string = PAGE_ID + "$allChats";
    const PAGE_ALL_MESSAGE: string = PAGE_ID + "$allMessages";
    const PAGE_CURRENT_CHAT: string = PAGE_ID + "$chatSelected";
    const PAGE_CHAT_MESSAGES: string = PAGE_ID + "$chatMessages";
    const config: page.IPageConfig = global.createPageConfig(PAGE_ID, "scv");
    let hasFile = false;
    let b64Data = null;
    //declare const N: any;
    declare const $: any;
    //declare let connection: any; // Declarar la conexión SignalR
    //declare let chatHubProxy: any;
    //declare const $: any;

    class ViewState {
        public hasFile: boolean;
        public ImageSRC: any;

        constructor(state?: any) {
            if (state) {
                this.hasFile = state.hasFile;
                this.ImageSRC = state.ImageSRC;
            };
        };
    };
    export const Vista: any = page.connect(class extends page.Base {
        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            return retValue;
        };
        onWillEntityLoad(id: any, props: page.IProps): void {
            props.config.setEntity({});
            global.dispatchSuccessful("global-page-entity", {} );
            global.dispatchSuccessful("global-page-data", []);
           // Forms.updateFormElement(PAGE_CLIENTE_INFO_AGENDA, 'ObservacionesModificacion', null);
            props.config.setState({ viewMode: false });
        };
        onFilter(props: any, filters: any, type?: string): void { };
        onEntityLoaded(props: page.IProps): void { };
        onEntitySaved(props: page.IProps): void {
        };
        render(): JSX.Element {
            return <page.Main {...config}
                pageMode={PageMode.Edicion}
                allowNew={false}
                allowSave={false}
                allowDelete={false}
                onFilter={this.onFilter.bind(this)}
                onWillEntityLoad={this.onWillEntityLoad.bind(this)}
                onEntitySaved={this.onEntitySaved.bind(this)}
                onEntityLoaded={this.onEntityLoaded.bind(this)}>
                <View/>
            </page.Main>
        };
    });

    interface IEditProps extends page.IProps {
       
        allmessages?: DataElement;
        allchats?: DataElement;
        chatSelected?: DataElement;
        chatMessages?: DataElement;
        fileSelected?: DataElement;
        fileSelectedB64?: string;
    };
   
    const View: any = global.connect(class extends React.Component<IEditProps, IEditProps> {

        static props: any = (state: any) => {
            var retValue: any = page.props(state);
            retValue.allchats = state.global["catalogo$" + PAGE_ALL_CHATS];
            retValue.allmessages = state.global["catalogo$" + PAGE_ALL_MESSAGE];
            retValue.chatSelected = state.global["entity$" + PAGE_CURRENT_CHAT];
            retValue.chatMessages = state.global["catalogo$" + PAGE_CHAT_MESSAGES];
            retValue.fileSelected = state.global["tmpEKCChatMessageFile"];
            retValue.fileSelectedB64 = state.global["EKCChatMessageFileB64"];
            return retValue;
        };


        shouldComponentUpdate(nextProps: IEditProps, { }): boolean {
            return hasChanged(this.props.allmessages, nextProps.allmessages) ||
             hasChanged(this.props.allchats, nextProps.allchats) ||
             hasChanged(this.props.chatSelected, nextProps.chatSelected) ||
             hasChanged(this.props.chatMessages, nextProps.chatMessages) ||
             hasChanged(this.props.fileSelected, nextProps.fileSelected) 
        };


        componentWillReceiveProps(nextProps: IEditProps): void {
            if (hasChanged(this.props.allchats, nextProps.allchats)) {
                if (isSuccessful(nextProps.allchats)) {
                    console.log(nextProps.allchats);
                }
            };

            if (hasChanged(this.props.fileSelected, nextProps.fileSelected)) {
               // console.log(nextProps.fileSelected)
                if (isSuccessful(nextProps.fileSelected)  && nextProps.fileSelected.data) {
                    //console.log(nextProps.fileSelected.data);
                    if (nextProps.fileSelected.data.length > 0) {
                        this.openFileWindow(nextProps.fileSelected.data[0]);
                    }
                }
            };
        };
        //componentDidUpdate(prevProps: IEditProps, { }) {
        //    if (isSuccessful(this.props.clienteEtapa)) {
        //        if (hasChanged(prevProps.clienteEtapa, this.props.clienteEtapa)) {
        //            let contador: any;
        //            contador = $(".counter");
        //            if (contador.length > 0) {
        //                contador.counterUp();
        //            }
        //        }
        //    }
        //};
        componentDidMount() {
            global.dispatchSuccessful("global-page-data", [], PAGE_ALL_MESSAGE);
            global.dispatchSuccessful("global-page-data", [], PAGE_CHAT_MESSAGES);
            global.dispatchSuccessful("global-page-entity", null, PAGE_CURRENT_CHAT);
            global.dispatchSuccessful("load::tmpEKCChatMessageFile", null);
            global.dispatchAsyncPost("global-page-data", "base/kontrol/ekcchats/GetBP/getAllChats/", { parametros: { action: 'SELECT' } }, PAGE_ALL_CHATS);
            //this.initChatHub()
            //let w: any = window;
            //let sj = w.getSJ();
            //console.log(sj)
            //sj.iwc.SignalR.onEvent("receiveMessage", (user, mensaje) => {
            //    console.log(user, mensaje)
              
            //})
            //declare const $: any; // Declarar jQuery
            var chatHubProxy = $.connection.chatHub; // Crear el proxy del Hub (asegúrate de que "chatHub" coincida con el nombre de tu Hub en el servidor)
            console.log(chatHubProxy)
            chatHubProxy.client.receiveMessage = (usuario, mensaje) => {
                console.log(`Mensaje recibido de ${usuario}: ${mensaje}`);
                //let mensajes = this.props.chatMessages.data;
                //console.log(mensaje);
                let lista = this.props.chatMessages && this.props.chatMessages.data && Array.isArray(this.props.chatMessages.data) ? this.props.chatMessages.data : [];
                lista.push(mensaje);
                global.dispatchSuccessful("global-page-data", lista, PAGE_CHAT_MESSAGES);

            }

            $.connection.hub.start().done(() => {
                console.log("Conexión SignalR iniciada!");
            }).fail((err) => {
                console.error("Error al iniciar la conexión SignalR: ", err);
            });
            //chatHubProxy.client.ReceiveMessage = (usuario, mensaje) => {
            //    console.log(`Mensaje recibido de ${usuario}: ${mensaje}`);
            //    // Actualizar el estado con el nuevo mensaje
            //    let lista = this.props.chatMessages && this.props.chatMessages.data && Array.isArray(this.props.chatMessages.data) ? this.props.chatMessages.data : [];
            //    let nuevoMensaje = {
            //        ID: lista.length + 1,
            //        Mensaje: mensaje,
            //        tipoSalida: 'received'
            //    };
            //    let nuevaLista = [...lista, nuevoMensaje];
            //    global.dispatchSuccessful("global-page-data", nuevaLista, PAGE_CHAT_MESSAGES);
            //};

            //$.connection.hub.start().done(() => {
            //    console.log("Conexión SignalR iniciada!");
            //}).fail((err) => {
            //    console.error("Error al iniciar la conexión SignalR: ", err);
            //});
        
        }
       
        onClickSave() {};
        
        getHeight() {
            let height = '';
            let h = window.innerHeight * 0.8;
            height = h + 'px';
            return height;
        }

        getLista() {
            let lista = this.props.chatMessages && this.props.chatMessages.data && Array.isArray(this.props.chatMessages.data) ? this.props.chatMessages.data : [];
            //console.log(lista)
            let listaMensajes = [
                { id: 1, txt: 'prueba uni', type:'sent'},
                { id: 2, txt: 'test dos', type:'received'},
                { id: 3, txt: 'prueba 3', type:'received'},
                { id: 4, txt: 'prueba cuatro', type:'sent'},
            ];
            return lista;
        }

        getListaChats() {
            let lista = this.props.allchats && this.props.allchats.data && Array.isArray( this.props.allchats.data) ? this.props.allchats.data : [];
            //console.log(lista)
            return lista;
        }

        sendMessage() {
            //var chatHubProxy = $.connection.chatHub; // Crear el proxy del Hub (asegúrate de que "chatHub" coincida con el nombre de tu Hub en el servidor)
            //console.log(chatHubProxy)
            //let w: any = window;
            //let sj = w.getSJ();
            //console.log(sj)
            //sj.iwc.SignalR.onEvent("receiveMessage", (user, mensaje) => {
            //    console.log(user, mensaje)
            //    //let reduxChat = getData(EK.Store.getState().global["catalogo$" + MENSAJES]);
            //    //let m = reduxChat.Mensajes;
            //    //if (m === undefined) {
            //    //    m = []
            //    //}
            //    //let existe = false;
            //    //if (!esMensajeRecibido) {
            //    //    m = m.map(e => {
            //    //        if (e.ID === message.ID) {
            //    //            existe = true;
            //    //            return message;
            //    //        }
            //    //        return e;

            //    //    });
            //    //    if (!existe) {
            //    //        m.push(message);
            //    //    }
            //    //} else {
            //    //    m.push(message);
            //    //}
            //    //reduxChat.Mensajes = m;
            //    //global.dispatchSuccessful("global-page-data", reduxChat, MENSAJES);
            //    //if (esMensajeRecibido) {
            //    //    // scope.marcarMensajeLeido(message);
            //    //}
            //    console.log()

            //})
            //console.log(N('/signalr', { useDefaultPath: false }))
            //console.log($.hubConnection('/signalr', { useDefaultPath: false }))
            //console.log($.hubConnection('/signalr', { useDefaultPath: false }))

            let currentchat = EK.Store.getState().global.entity$DashboardMensajeria$chatSelected.data;
            let lista = this.props.chatMessages && this.props.chatMessages.data && Array.isArray(this.props.chatMessages.data) ? this.props.chatMessages.data : [];
            let id = lista.length + 1;
            let mensaje: any = document.getElementById('messageText');
            let p = {
                action: 'ENVIAR',
                from: currentchat.Contacto,
                mensaje:  mensaje.value,
                idWa:id,
                claveCanal: 'WA',
                tipoSalida:'S'
            }
            //console.log(p)
            let params = { lista: [] }
            global.dispatchAsyncPost("global-page-data", "base/kontrol/ekcmensajes/GetBP/enviar/", { parametros: p  });
            mensaje.value = "";
        }

        sendFileMessage() {
            let currentchat = EK.Store.getState().global.entity$DashboardMensajeria$chatSelected.data;
            let lista = this.props.chatMessages && this.props.chatMessages.data && Array.isArray(this.props.chatMessages.data) ? this.props.chatMessages.data : [];
            let id = lista.length + 1;

            //let mensaje: any = document.getElementById('messageText');
            //let mensajeObj = { id, txt: mensaje.value, type: 'sent' }
            //console.log(b64Data)
            let itemFile = this.props.fileSelected && this.props.fileSelected.data ? this.props.fileSelected.data[0] : null; 
            //console.log(itemFile); 
            let p = {
                action: 'ENVIAR',
                from: currentchat.Contacto,
                mensaje: 'Archivo...',
                idWa: id,
                claveCanal: 'WA',
                tipoSalida: 'S',
                mimeType: itemFile.file.type,
                b64Data,
                fileName:itemFile.file.name
            }
            //console.log(p)
            let params = { lista: [] }
            params.lista.push(p);
            //global.dispatchSuccessful("global-page-data", lista, PAGE_ALL_MESSAGE);
            global.dispatchAsyncPost("global-page-data", "base/kontrol/ekcmensajes/GetBP/enviarArchivos/", { parametros: params }, PAGE_CHAT_MESSAGES);
            this.closeFileWindow();
            //console.log(mensaje.value)
            //mensaje.value = "";
            //console.log('mensaje enviado')
        }

        handleKeyPress(event: any) {
            if (event.key === "Enter") {
                this.sendMessage();
            }
        }

        initChatHub() {
            let w: any = window;
            let sj = w.getSJ();
            //console.log(sj)
            sj.iwc.SignalR.onEvent("receiveMessage", (user, mensaje) => {
                console.log(user, mensaje)
                console.log()
                //let reduxChat = getData(EK.Store.getState().global["catalogo$" + MENSAJES]);
                //let m = reduxChat.Mensajes;
                //if (m === undefined) {
                //    m = []
                //}
                //let existe = false;
                //if (!esMensajeRecibido) {
                //    m = m.map(e => {
                //        if (e.ID === message.ID) {
                //            existe = true;
                //            return message;
                //        }
                //        return e;

                //    });
                //    if (!existe) {
                //        m.push(message);
                //    }
                //} else {
                //    m.push(message);
                //}
                //reduxChat.Mensajes = m;
                //global.dispatchSuccessful("global-page-data", reduxChat, MENSAJES);
                //if (esMensajeRecibido) {
                //    // scope.marcarMensajeLeido(message);
                //}

            })
        }

        setCurrentChat(chat) {
            global.dispatchSuccessful("global-page-entity", chat, PAGE_CURRENT_CHAT);
            global.dispatchAsyncPost("global-page-data", "base/kontrol/ekcmensajes/GetBP/getByChatId/", { parametros: { action: 'SELECT_BY_CHATID', IdChat: chat.ID } }, PAGE_CHAT_MESSAGES);

            //console.log(chat)
        }

        closeFileWindow() {
            //console.log('cerrar ventana')
            //console.log(imgSrc);
            b64Data = null;

            let w = document.getElementById("windowFileSelect");
            w.style.bottom = '-100%'
            setTimeout(() => {
                w.style.display = 'none';
                dispatchSuccessful('load::tmpEKCChatMessageFile', null);
            }, 250)

        }

        openFileWindow(dataFile: any) {
            //console.log(dataFile)
            let hasImg: boolean = false;
            if (dataFile.item.FileType.includes('image')) {
                //imgSrc =
                hasImg = true; 
            } else {
                //imgSrc = null;
                hasImg = false;
            }

            this.fileToBase64WithoutPromise(dataFile.file, hasImg);

            let w = document.getElementById("windowFileSelect");
             w.style.display = 'block';
            setTimeout(() => {
                w.style.bottom = '0';
            }, 10)
        }

        fileToBase64WithoutPromise(file: File, isImage: boolean) {
            const reader = new FileReader();

            reader.onload =  () => {
                const result = reader.result as string; // Asegura que es una cadena
                const base64 = result.split(",")[1]; // Elimina el prefijo `data:mime/type;base64,`
                //callback(base64); // Llama al callback con el resultado
                b64Data = base64;
                var _img: any = document.getElementById('Image_file_ekc')
                if (isImage) {
                    _img.src = result
                } else {
                    let path = '../../../../../../Content/Img/file-icon.svg';
                    _img.src = path
                }
                
                //let state: ViewState = new ViewState(global.getData(this.props.state));
                //config.setState({hasFile:true})
                //console.log(base64)
                
            };

            reader.readAsDataURL(file); // Lee el archivo como Base64
        }

        getFileName() {
            let filename = null;
            if (this.props.fileSelected && this.props.fileSelected.data && this.props.fileSelected.data.length > 0) {
                filename = this.props.fileSelected.data[0].item.Nombre;
            }
            console.log(this.props.fileSelected);
            return filename
            //
        }

        render(): JSX.Element {
            //let state: ViewState = new ViewState(global.getData(this.props.state));
            //console.log(state)
            let itemsChats = this.getListaChats();
            let itemsMensajes = this.getLista();
            let nombreArchivo = this.getFileName()
            return <page.Edit>
                <Column size={[12, 12, 12, 12]} style={{ paddingTop: 8 }}>
                    <page.OptionSection
                        id={config.id}
                        level={1}
                        subTitle="Mensajeria EKConnect"
                        icon="fas fa-cog" collapsed={false} hideCollapseButton={false}>

                        <Row className=" bg-danger" style={{height:this.getHeight()}}>
                            <Column className="bg-dark" size={[12, 12, 3, 3]} style={{ paddingTop: 20, height: '100%', borderRight:'1px solid #34495e' }}>
                               
                                {itemsChats.map((item: any, i: number) => (
                                    <div className="w-100 selectableChat" key={`chat-${item.ID}`} onClick={() => this.setCurrentChat(item)}>
                                        <div key={`iconcontainer-${item.id}`} style={{ display: 'inline-block',paddingLeft:5, color: '#fff', fontSize: '40px', width:'15%'}}>
                                            {/*<img alt="" className="img-circle" src="../../../../../Content/Img/havital.png" />*/}
                                            <i key={`i-icon-${item.id}`}  style={{ color: '#fff' }} className="fa fa-user-circle"></i>
                                        </div>
                                        <div key={`contactocontainer-${item.id}`} style={{ borderBottom:'1px solid #636e72', paddingTop:10,paddingBottom:10, display: 'inline-block', color: '#fff', fontSize: '18px', width: '70%' }}>
                                            <span key={`contacto-span-${item.id}`}  style={{padding:'0px'}}>{ item.Contacto }</span><br />
                                            <small key={`lastmsg-${item.id}`}  style={{ color:'#7f8c8d'}}>{item.lastMessage}</small>
                                        </div>
                                        <div key={`fechacontainer-${item.id}`} style={{ borderBottom: '1px solid #636e72',paddingBottom:11, display: 'inline-block', color: '#fff', fontSize: '14px', width: '15%' }}>
                                            <span key={`msgdate-${item.id}`}  style={{ padding: '0px' }}>{new Date().toLocaleDateString("es-ES")}</span><br />
                                            <small key={`space-${item.id}`}  >&nbsp;</small>
                                        </div>
                                    </div>
                                ))};
                            </Column>
                            <Column className="bg-light" size={[12, 12, 9, 9]} style={{paddingTop:10, height:'100%', position:'relative'}}>
                                <div className="row h-90 bg-info chat-container">
                                
                                    {itemsMensajes.map((item: any, i: number) => (
                                        
                                        <span key={`eachmsg-${item.ID}`} className={`message  msg-${item.tipoSalida}`}>{item.Mensaje}</span>
                                    ))}
                                </div>
                                <div id="windowFileSelect" style={{ display:'none', transition:'bottom 0.2s', position: 'absolute', background: 'red', width: '100%', height: '100%', zIndex: 10, bottom: '-100%', left: 0 }}>
                                    <div className="row w-100 center-v" style={{ background: '#ced6e0', height: '86%' }}>
                                        <img id="Image_file_ekc" src={null} style={{ height:'90%', display:'block', margin:'auto'}} />
                                    </div>
                                    <div className="row w-100 center-v" style={{ background: '#ced6e0', height: '4%' }}>
                                        <h4>{nombreArchivo}</h4>
                                    </div>
                                    <div className="row w-100" style={{ background: '#34495e', height: '10%' }}>
                                        <Row>
                                            <Column className="center-v" size={[12, 12, 6, 6]} style={{ paddingTop: 8 }}>
                                                <button onClick={() => this.closeFileWindow()} className="btn btn-sm btn-remove-file button-circle" >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </Column>
                                            <Column className="center-v" size={[12, 12, 6, 6]} style={{ paddingTop: 8 }}>
                                                <button className="btn btn-sm btn-send-file button-circle" onClick={() => this.sendFileMessage()}>
                                                    <i className="fas fa-file-import"></i>
                                                </button>
                                            </Column>
                                        </Row>
                                    </div>
                                </div>
                                <div className="row w-100 h-10 bg-dark center-v">
                                    <Column size={[]} style={{ paddingTop: 8, paddingBottom: 8 }}>
                                        <KontrolFileManagerEKC
                                            title="Archivos ekc"
                                            modulo={config.modulo}
                                            viewMode={false}
                                            multiple={true}
                                            style={{ color: 'red' }}
                                            noAutoSave={true}
                                            entity={global.createSuccessfulStoreObject({ ID: 1 })}
                                            entityType={global.createSuccessfulStoreObject(["eckmensajes$files$", ""].join(""))} />

                                    </Column>
                                    <Column size={[12, 12, 10, 10]} style={{ paddingTop: 8, paddingBottom:8 }}>
                                        <input
                                            type="text"
                                            style={{ paddingTop: '10px', paddingBottom:'10px'}}
                                            className="form-input-control"
                                            id="messageText"
                                            onKeyDown={(event) => this.handleKeyPress(event)}
                                            ref="input" />
                                    </Column>
                                    <Column size={[12, 12, 1, 1]} style={{ paddingTop: 8 }}>
                                        <button className="btn btn-sm button-send" onClick={() => this.sendMessage()}>
                                            enviar <i className="fas fa-chevron-right"></i>
                                        </button>
                                    </Column>
                                </div>
                            </Column>
                        </Row>
                        
                    </page.OptionSection>
                </Column>
            </page.Edit>
        };
    });

 
}; 