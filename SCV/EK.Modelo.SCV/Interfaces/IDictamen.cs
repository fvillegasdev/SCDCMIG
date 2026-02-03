using System;
using System.Collections.Generic;

using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("spv_Tickets")]
    public interface IDictamen
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        [m.Kontrol.Column()]
        int IdAsignadoa { get; set; }



        [m.Kontrol.Column()]
        string Comentarios { get; set; }

        


    }
}