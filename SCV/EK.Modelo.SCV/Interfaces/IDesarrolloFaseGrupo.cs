using System;
using System.Collections.Generic;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Desarrollos_Fase_Grupo")]
    public interface IDesarrolloFaseGrupo
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column()]
        int IdDesarrollo { get; set; }


        [m.Kontrol.Column()]
        int IdFase { get; set; }

        [m.Kontrol.Column()]
        int IdGrupo { get; set; }


        m.Kontrol.Interfaces.IGruposUsuario Grupo { get; set; }
        m.SCV.Interfaces.IFaseExpediente Fase { get; set; }


    }
}