using System;
using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IOpcionModulo 
        : IBaseKontrol
    {
        IOpcionModulo Padre { get; set; }

        List<IOpcionModulo> Opciones { get; set; }

        INivelesOpciones NivelOpcion { get; set; }


        string Descripcion { get; set; }

        int Permisos { get; set; }

        int Excepcion { get; set; }

        bool EsSeccion { get; set; }

        string Icono { get; set; }

        string Ruta { get; set; }

        int? IdModulo { get; set; }

        int? IdPadre { get; set; }

        IModulo Modulo { get; set; }
        int DefPermiso { get; set; }


        bool? Exportar { get; set; }

    }
}