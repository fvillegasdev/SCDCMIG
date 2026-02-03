using System.Collections.Generic;
using System;
using m = EK.Modelo;
using mo = EK.Modelo.Kontrol.Interfaces;
namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IUsuariosGrupoDetalle
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        new string Apellidos { get; set; }
        [m.Kontrol.Column()]
        new string Email { get; set; }
        [m.Kontrol.Column()]
        new string Telefono { get; set; }
        [m.Kontrol.Column()]
        new string Foto { get; set; }

        [m.Kontrol.Column()]
        int IdGrupo { get; set; }
        IGruposUsuario Grupo { get; set; }
    }
}