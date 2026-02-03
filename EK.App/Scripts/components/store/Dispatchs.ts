/// <reference path="../../typings/react/react-global.d.ts" />

namespace EK.Store.Dispatchs {
    "use strict";

    export interface IMapDispatchToTemplateProps {
        changePage?: (pageId: string) => {};
    }

    //export const mapDispatchToTemplateProps: any = (dispatch: Redux.Dispatch<any>) => {
    //    return {
    //        changePage: (pageId: string): any => {
    //            dispatch(EK.Store.actions.app.changePage.action({ newPage: pageId }));
    //        }
    //    };
    //};
}