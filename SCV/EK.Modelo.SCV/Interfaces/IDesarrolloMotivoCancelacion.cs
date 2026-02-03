using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SBO.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_DesarrollosMotivosCancelacion")]

    public interface IDesarrolloMotivoCancelacion : IBaseKontrol
    {


        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }


        [m.Kontrol.Column()]
        int IdMotivoCancelacion{ get; set; }


        [m.Kontrol.Column()]
        decimal Penalizacion { get; set; }



        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        IMotivosCancelacion MotivoCancelacion { get; set; }

    }
}