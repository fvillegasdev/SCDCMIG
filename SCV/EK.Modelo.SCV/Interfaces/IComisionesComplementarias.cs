using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using mo = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [mo.Kontrol.Table("scv_ComisionesComplementarias")]
    public interface IComisionesComplementarias :
        mo.Kontrol.Interfaces.IBaseKontrol
    {

        [mo.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [mo.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }



        [mo.Kontrol.Column()]
        int IdExpediente { get; set; }


        [mo.Kontrol.Column()]
        int IdVentaUbicacion { get; set; }


        [mo.Kontrol.Column()]
        int IdUsuario { get; set; }



        [mo.Kontrol.Column()]
        int Indicador { get; set; }



        [mo.Kontrol.Column()]
        int IdFase { get; set; }

        [mo.Kontrol.Column()]
        string ClaveTabulador { get; set; }


        [mo.Kontrol.Column()]
        decimal Monto { get; set; }



        [mo.Kontrol.Column()]
        decimal Porcentaje { get; set; }


        [mo.Kontrol.Column()]
        int IdComision { get; set; }

        [mo.Kontrol.Column()]
        int IdComisionComplemento { get; set; }


    }
}
