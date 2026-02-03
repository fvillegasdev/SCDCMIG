using System;
using System.Collections.Generic;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.Kontrol.Interfaces
{
    [m.Kontrol.Table("GruposUsuario")]

    public interface IGruposUsuario
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string Descripcion { get; set; }
        [m.Kontrol.Column("CantidadUsuarios", true)]
        int CantidadUsuarios { get; set; }
        [m.Kontrol.Column("FotosUsuarios", true)]
        string FotosUsuarios { get; set; }
        List<IGruposUsuarioDetalle> IntegrantesGrupo { get; set; }
    }
}