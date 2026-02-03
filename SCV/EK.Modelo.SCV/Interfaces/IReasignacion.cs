using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IReasignacion
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        List<m.SCV.Interfaces.IDesarrollos> Desarrollo { get; set; }

        List<m.SCV.Interfaces.ITipoComercializacion> TipoComercializacion { get; set; }

        List<m.SCV.Interfaces.IEsquema> Esquema { get; set; }

        List<m.SCV.Interfaces.IFaseExpediente> FaseExpediente { get; set; }

        List<m.SCV.Interfaces.ICliente> ProspectosReasignar {get;set;}

        List<m.SCV.Interfaces.IExpediente> ExpedientesReasignar { get; set; }

        //List<m.Kontrol.Interfaces.ICatalogoGeneral> TipoPersona { get; set; }

        //List<m.Kontrol.Interfaces.IUsuario> Titular { get; set; }

        //List<m.Kontrol.Interfaces.ICatalogoGeneral> EstatusCliente { get; set; }

        List<m.Kontrol.Interfaces.IBitacora> Bitacora { get; set; }
    }
}
