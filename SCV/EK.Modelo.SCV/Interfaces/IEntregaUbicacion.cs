using System;
using System.Collections.Generic;

using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_programacion_entrega")]
    public interface IEntregaUbicacion
        : m.Kontrol.Interfaces.IBaseKontrol
    {

        int IdCliente { get; set; }

        //[m.Kontrol.Column("id_identificador_cc")]
        //string IdPlaza { get; set; }
        //m.SCV.Interfaces.IPlaza Plaza { get; set; }

        //[m.Kontrol.Column("num_entrega_viv")]
        //int? IdUsuario { get; set; }
        //m.Kontrol.Interfaces.IUsuario Usuario { get; set; }

        //[m.Kontrol.Column("id_cve_fracc")]
        //string IdFraccionamiento { get; set; }
        //List<m.SCV.Interfaces.IEntregaUbicacionResponsableFraccionamiento> Fraccionamiento { get; set; }

        //[m.Kontrol.Column("Nombre", true)]
        //new string Nombre { get; set; }
        //[m.Kontrol.Column("Clave", true)]
        //new string Clave { get; set; }

        //[m.Kontrol.Column("Cantidad", true)]
        //int Cantidad { get; set; }
    }
}