using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("SeguimientoCampaniaPublicidad")]
    public interface ISeguimientoCampaniaPublicidad : m.Kontrol.Interfaces.IBaseKontrol
    {
        m.Kontrol.Interfaces.IItemGeneral EstadoCampania { get; set; }
        m.Kontrol.Interfaces.IItemGeneral MedioPublicidad { get; set; }
        m.Kontrol.Interfaces.IUsuario PropietarioC { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Subscribers { get; set; }
        m.Kontrol.Interfaces.IPersonalizarCampo_Valor Event { get; set; }
        m.Kontrol.Interfaces.IPersonalizarCampo_Valor Link { get; set; }
        m.SCV.Interfaces.ISeguimientoCampaniaPublicidadEvento Evento { get; set; }
    }
}
