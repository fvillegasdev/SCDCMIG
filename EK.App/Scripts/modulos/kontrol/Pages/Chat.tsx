namespace EK.Modules.Kontrol.Pages.Chat {
    "use strict";
    const config: page.IPageConfig = global.createPageConfig("chat", "kontrol");

    export class Vista extends page.Base {
        render(): JSX.Element {
            let ml: any = config.getML();            
            return <page.Main {...config} >
                <div id="chatContainer"></div>  
            </page.Main>
        };
    };
}
