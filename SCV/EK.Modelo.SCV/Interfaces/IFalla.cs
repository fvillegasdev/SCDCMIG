#if BASE
using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Falla")]
    public interface IFalla
         : m.Kontrol.Interfaces.IBaseKontrol
    {


        [m.Kontrol.Column("ID",true)]
        int IdFalla { get; set; }
        
        [m.Kontrol.Column("IdImpacto")]
        int IdImpacto { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Impacto { get; set; }


        [m.Kontrol.Column("IdTipoFalla")]
        int IdTipoFalla { get; set; }
        m.SCV.Interfaces.ITipoComponente TipoComponente { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Descripcion")]
        string Descripcion { get; set; }

        //[m.Kontrol.Column()]
        //string Siglas { get; set; }

        [m.Kontrol.Column("DuracionGarantia", true)]
        int DuracionGarantia { get; set; }


        

        //[m.Kontrol.Column()]
        //int IdUsoFalla { get; set; }

        [m.Kontrol.Column("Clave")]
        new string Clave { get; set; }


        //[m.Kontrol.Column("clave_tipo_vivienda", true)]
        int IdTipoVivienda { get; set; }
        //m.SCV.Interfaces.ITipoVivienda TipoVivienda { get; set; }


        //List<m.SCV.Interfaces.IFallaTipoFalla> TiposFallas { get; set; }

        List<m.SCV.Interfaces.IFallaTipoInmueble> TiposInmuebles { get; set; }

    }
}
#endif