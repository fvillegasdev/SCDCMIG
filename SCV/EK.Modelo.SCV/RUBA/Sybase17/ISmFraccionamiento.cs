using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_fraccionamiento_cat")]
    public interface ISmFraccionamiento : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("id_identificador_cc")]
        string id_identificador { get; set; }
        [m.Kontrol.Column("Id")]
        int ID { get; set; }
        [m.Kontrol.Column("clave_cat")]
        int IdCat { get; set; }

        [m.Kontrol.Column("clave_fraccionamiento")]
        string ClaveFrac { get; set; }
        
        //[m.Kontrol.Column("nom_fracc")]
        string nom_fracc { get; set; }

        //[m.Kontrol.Column("dir_fracc")]
        string dir_fracc { get; set; }
        //[m.Kontrol.Column("cp")]
        string cp { get; set; }
        //[m.Kontrol.Column("num_etapa")]
        string num_etapa { get; set; }

        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }
        List<ISmFraccionamientoCat> Fraccionamientos { get; set; }
        }
}
