namespace EK.UX.SBO {
    "use strict";

    export enum TipoChequesEnum {
        Fisico = 1,
        Electronico = 2
    }
    export enum EstadoChequesEnum {
        Capturado = 1,
        Impreso = 2,
        Retenido = 3,
        Cancelado = 4,
        Modificado = 5
    }
    export enum TipoNaturalezaEmun {
        Ingreso = 1,
        Egreso = 2
    }
}
import tipoChequesEnum = EK.UX.SBO.TipoChequesEnum;
import estadoChequesEnum = EK.UX.SBO.EstadoChequesEnum;
import tipoNaturalezaEmun = EK.UX.SBO.TipoNaturalezaEmun;