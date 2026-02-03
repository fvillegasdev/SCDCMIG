using System;
using System.Collections.Generic;


using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_campaniapublicidad")]
    public interface ICampaniaPublicidad : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdMedioPublicidad { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaInicial { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaFinal { get; set; }

        [m.Kontrol.Column()]
        int IdEstadoCampania { get; set; }

        [m.Kontrol.Column()]
        int IdPropietarioC { get; set; }
        m.Kontrol.Interfaces.IUsuario PropietarioC { get; set; }

        m.Kontrol.Interfaces.IItemGeneral EstadoCampania { get; set; }

        m.Kontrol.Interfaces.IItemGeneral MedioPublicidad { get; set; }

        [m.Kontrol.Column()]
        int IdMoneda { get; set; }

        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }

        [m.Kontrol.Column("CostoActual")]
        string CostoActual { get; set; }

        [m.Kontrol.Column("CostoPresupuestado")]
        string CostoPresupuestado { get; set; }

        [m.Kontrol.Column("IngresosEsperados")]
        string IngresosEsperados { get; set; }

        List<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> ListaMarketing { get; set; }
        //Contenido Plantilla Publicidad por Usuario
        string Contenido { get; set; }


    }
}