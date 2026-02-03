using EK.Modelo.Kontrol;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Residentes")]
    public interface IResidentes
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("IdUser")]
        int IdAsignado { get; set; }
        m.Kontrol.Interfaces.IUsuario Asignado { get; set; }

        List<m.SCCO.Interfaces.IResidenteObra> ResidenteObras { get; set; }
    }
}
