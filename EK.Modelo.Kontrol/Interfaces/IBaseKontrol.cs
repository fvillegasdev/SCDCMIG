using System;
using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface IBaseKontrol
    {
        [Column("ID")]
        int? ID { get; set; }
        [Column("Clave")]
        string Clave { get; set; }
        [Column("Nombre")]
        string Nombre { get; set; }
        [Column("Creado")]
        DateTime? Creado { get; set; }
        IBaseUsuario CreadoPor { get; set; }
        [Column("Modificado")]
        DateTime? Modificado { get; set; }
        IBaseUsuario ModificadoPor { get; set; }
        [Column("Version")]
        string Version { get; set; }
        KontrolEstadosEnum Estado { get; set; }
        IItemGeneral Estatus { get; set; }

        [Column("IdEstatus")]
        int? IdEstatus { get; set; }
        [Column("ModificadoPor")]
        int? IdModificadoPor { get; set; }
        [Column("CreadoPor")]
        int? IdCreadoPor { get; set; }

        List<string> GetChanges();
        bool Changed();
        bool Changed(string propertyName);
        bool Changed(string propertyName, bool changed);
        bool TrackChanges { get; set; }
        bool? Sistema { get; set; }
    }

    public interface IBaseKontrolCompania
        : IBaseKontrol
    {
        ICompania Compania { get; set; }
        [Column("IdCompania")]
        int? IdCompania { get; set; }
    }
}
