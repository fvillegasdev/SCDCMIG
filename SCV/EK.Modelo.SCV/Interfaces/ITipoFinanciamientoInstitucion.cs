using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_TipoFinanciamiento_Instituciones")]

    public interface ITipoFinanciamientoInstitucion : IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdTipoFinanciamiento { get; set; }

        [m.Kontrol.Column()]
        int IdInstitucion { get; set; }
        IInstitucion Institucion { get; set; }

        //id para mantener relación financiamiento institucion para ddl
        int IdTFInstitucion { get; set; }

        List<IInstitucionDetalle> Conceptos { get; set; }
    }
}