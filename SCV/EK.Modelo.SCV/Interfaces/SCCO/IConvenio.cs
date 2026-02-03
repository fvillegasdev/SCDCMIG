using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Convenios")]
    public interface IConvenio : IBaseConvenio
    {
        [m.Kontrol.Column("Monto")]
        new decimal Monto { get; set; }

        [m.Kontrol.Column("AditivaAutorizada")]
        new decimal AditivaAutorizada { get; set; }

        [m.Kontrol.Column("Iva")]
        new decimal Iva { get; set; }

        [m.Kontrol.Column("Descripcion")]
        new string Descripcion { get; set; }

        [m.Kontrol.Column("IdMoneda")]
        new int? IdMoneda { get; set; }

        [m.Kontrol.Column("IdCompania")]
        new int? IdCompania { get; set; }

        [m.Kontrol.Column("IdObra")]
        new int? IdObra { get; set; }

        [m.Kontrol.Column("IdContratista")]
        new int? IdContratista { get; set; }

        [m.Kontrol.Column("IdTipoConvenio")]
        new int? IdTipoConvenio { get; set; }
        [m.Kontrol.Column("Direccion")]
        new string Direccion { get; set; }
        [m.Kontrol.Column("RepresentanteBitacora")]
        new string RepresentanteBitacora { get; set; }
        [m.Kontrol.Column("Atencion")]
        new string Atencion { get; set; }
        [m.Kontrol.Column("Telefono")]
        new string Telefono { get; set; }
        [m.Kontrol.Column("email")]
        new string email { get; set; }
    }

    public interface IBaseConvenio : m.Kontrol.Interfaces.IBaseKontrol
    {
        decimal Monto { get; set; }
        decimal AditivaAutorizada { get; set; }
        decimal Iva { get; set; }
        string Descripcion { get; set; }
        int? IdMoneda { get; set; }
        int? IdCompania { get; set; }
        int? IdObra { get; set; }
        int? IdContratista { get; set; }
        int? IdTipoConvenio { get; set; }
        string Direccion { get; set; }
        string RepresentanteBitacora { get; set; }
        string Atencion { get; set; }
        string Telefono { get; set; }
        string email { get; set; }


        m.SCCO.Interfaces.IObra Obra { get; set; }
        m.SCV.Interfaces.IContratista Contratista { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Compania { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoConvenio { get; set; }

     
    }
}