using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_campaniapublicidad_ListasMarketing")]
    public interface ICampaniaPublicidadListaMkt
      : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int Idcampaniapublicidad { get; set; }
        m.SCV.Interfaces.ICampaniaPublicidad CampaniaPublicidad { get; set; }

        [m.Kontrol.Column()]
        int IdListasMkt { get; set; }
        m.SCV.Interfaces.IListasMkt ListasMkt { get; set; }

        [m.Kontrol.Column()]
        int? IdFrecuenciaCampania { get; set; }
        m.Kontrol.Interfaces.IItemGeneral FrecuenciaCampania { get; set; }

        [m.Kontrol.Column()]
        int? IdPlantilla { get; set; }
        m.Kontrol.Interfaces.IPlantillasMails Plantilla { get; set; }

        [m.Kontrol.Column()]
        DateTime FechaProgramacion { get; set; }

        string Fecha { get; set; }

        int? Ejecutado { get; set; }

        [m.Kontrol.Column()]
        int? IdEstadoListaMkt { get; set; }

        m.Kontrol.Interfaces.IItemGeneral EstadoListaMkt { get; set; }



        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        int Subscribers { get; set; }

    }
}