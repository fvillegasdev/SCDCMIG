// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
namespace EK.UX.DataTable {
    "use strict";

    export const formatDate: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        return <div style={{ textAlign: "center" }}>{EK.UX.Labels.formatDate(data)}</div>
    };

    export const formatBadgeDefault: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;

        if (data) {
            retValue = <span className="badge badge-default">{data}</span>
        };

        return retValue;
    };

    export const formatBadgePrimary: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;

        if (data) {
            retValue = <span className="badge badge-primary">{data}</span>
        };

        return retValue;
    };

    export const formatBadgeInfo: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;
        console.log(data)
        if (data) {
            retValue = <span className="badge badge-info">{data}</span>
        };

        return retValue;
    };

    export const formatBadgeDynamic: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;
        console.log(data)
        if (data) {
            retValue = data === 'TERMINADO' ? <span className="badge" style={{ backgroundColor: "rgb(65, 195, 0)" }}>{data}</span> : <span className="badge badge-info">{data}</span>
            //retValue = <span className="badge badge-info">{data}</span>
        };

        return retValue;
    };

    export const formatBadgeSuccess: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;

        if (data) {
            retValue = <span className="badge badge-success">{data}</span>
        };

        return retValue;
    };

    export const formatBadgeDanger: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;

        if (data) {
            retValue = <span className="badge badge-danger">{data}</span>
        };

        return retValue;
    };

    export const formatBadgeWarning: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;

        if (data) {
            retValue = <span className="badge badge-warning">{data}</span>
        };

        return retValue;
    };

    export const formatPrereporte: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;

        if (row.IdPrereporte > 0) {
            retValue = <div>
                <i className="fas fa-mobile-alt" style={{ fontSize: "14px" }}>&nbsp;</i>
                <span className="badge" style={{ backgroundColor: "#4cd964" }} >{row.IdPrereporte}</span>
            </div>
        };

        return retValue;
    };

    export const formatDictamen: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let items: any[] = data && data.length ? data : [];
        //
        let activos: number = items.filter((value) => { return value.EstatusDictamen.Clave === "I" }).length;
        let aprobados: number = items.filter((value) => { return value.EstatusDictamen.Clave === "A" }).length;
        let rechazados: number = items.filter((value) => { return value.EstatusDictamen.Clave === "N" }).length;
        //
        return <div>
            <span className="badge" style={{ backgroundColor: "#36c6d3" }}>{activos}</span>&nbsp;
            <span className="badge" style={{ backgroundColor: "#41c300" }}>{aprobados}</span>&nbsp;
            <span className="badge" style={{ backgroundColor: "#ed6b75" }}>{rechazados}</span>
        </div>
    };

    export const formatGarantia: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;

        if (data !== undefined && data !== null) {
            if (data > 0) {
                retValue = <span className="badge" style={{ backgroundColor: "rgb(65, 195, 0)" }}>{data}</span>
            } else {
                retValue = <span className="badge badge-danger">{data}</span>
            };
        };

        return retValue;
    };

    export const formatEstatus: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any;
        let bloqueado: any = row.Bloqueado
            ? <span className="badge badge-danger pull-center ek-sombra" style={{ fontSize: "8px !important" }}>Bloqueado</span>
            : null;
        //
        if (row.Estatus && row.Estatus.Clave) {
            if (row.Estatus.Clave === "A") {
                retValue = <span key="badgeEstatus" className="icon-ek-131" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
            else if (row.Estatus.Clave === "B") {
                retValue = <span key="badgeEstatus" className="icon-ek-132" style={{ fontSize: 18 }}>
                    <span className="path1"></span><span className="path2"></span>
                </span>;
            }
        };
        //
        return <div key={"estatus_" + row.ID}>
            <div style={{ float: "left" }}>{(retValue)}</div>
            <div style={{ float: "right" }}>{(bloqueado)}</div>
        </div>;
    };

    export const formatEstatusReporte: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        let retValue: any = "";
        if (data && data.Clave) {
            if (data.Clave === "T") {
                retValue = <span className="badge bg-green-jungle bg-font-green-jungle" style={{ padding: "4px 15px 4px", height: "100%" }}>{data.Nombre}</span>;
            } else if (data.Clave === "P") {
                retValue = <span className="badge bg-green-jungle bg-font-green-jungle" style={{ padding: "4px 15px 4px", height: "100%" }}>{data.Nombre}</span>;
            } else {
                retValue = <span className="badge badge-info" style={{ padding: "4px 15px 4px", height: "100%" }}>{data.Nombre}</span>;
            }
        };

        return <div style={{ textAlign: "center" }}>{retValue}</div>;
    };

    export const formatBoolean: (data: any, row: any, index: number) => any = (data: any, row: any, index: number): any => {
        var retValue: any;

        if (data === undefined || data === null) {
            return "";
        };

        if (data === true) {
            retValue = <span key="okLabel" className="icon-ek-131" style={{ fontSize: 18 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        } else {
            retValue = <span key="notOkLabel" className="icon-ek-132" style={{ fontSize: 18 }}>
                <span className="path1"></span><span className="path2"></span>
            </span>;
        };

        return retValue;
    };
};