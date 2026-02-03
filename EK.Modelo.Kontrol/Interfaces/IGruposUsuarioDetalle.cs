using System.Collections.Generic;
using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("GruposUsuario_Detalle")]

    public interface IGruposUsuarioDetalle
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }
        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        int IdUsuario { get; set; }

        [m.Kontrol.Column()]
        int IdGrupo { get; set; }
        IGruposUsuario Grupo { get; set; }

        IUsuario Usuario { get; set; }
       

    }
}