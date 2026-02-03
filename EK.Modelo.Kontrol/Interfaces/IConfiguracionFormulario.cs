using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("ConfiguracionFormularios")]
    public interface IConfiguracionFormulario : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }



        [m.Kontrol.Column()]
        int IdTipoEntidad { get; set; }

        [m.Kontrol.Column()]
        int? xs { get; set; }

        [m.Kontrol.Column()]
        int? sm { get; set; }

        [m.Kontrol.Column()]
        int? md { get; set; }

        [m.Kontrol.Column()]
        int? lg { get; set; }


        [m.Kontrol.Column()]
        string Size { get; set; } 


        [m.Kontrol.Column()]
        int? Orden { get; set; }


        [m.Kontrol.Column()]
        bool? Visible { get; set; }


        [m.Kontrol.Column()]
        bool? Requerido { get; set; }




        m.Kontrol.Interfaces.IIConfiguracionFormularioEntidad TipoEntidad { get; set; }

        List<m.Kontrol.Interfaces.IConfiguracionFormulario> configuracion { get; set; }


    }
}