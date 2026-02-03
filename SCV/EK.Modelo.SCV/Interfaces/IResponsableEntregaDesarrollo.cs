using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_desarrollos")]
    public interface IResponsableEntregaDesarrollo
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        int? IdGrupoEntrega { get; set; }
        List<m.SCV.Interfaces.IDesarrollos> Desarrollos { get; set; }
     
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }


    }
}