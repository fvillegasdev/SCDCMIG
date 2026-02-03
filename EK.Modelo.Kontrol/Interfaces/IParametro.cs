using System.Collections.Generic;

namespace EK.Modelo.Kontrol.Interfaces
{
#if MSSQL
     [Table("parametros")]
#endif
#if SYBASE17
    [Table("parametrosEK")]
#endif

    public interface IParametro 
        : IBaseKontrol
    {
        [Column()]
        string parametro { get; set; }

        [Column()]
        int Longitud { get; set; }

        [Column()]
        int Decimales { get; set; }

        [Column()]
        string Descripcion { get; set; }

        [Column()]
        int? IdSeccion { get; set; }

        [Column()]
        int? IdTipoDato { get; set; }

        [Column("IdAmbitoparametro")]
        int? IdAmbito { get; set; }

        [Column()]
        int? IdModulo { get; set; }

        IModulo Modulo { get; set; }

        string Valor { get; set; }
        IItemGeneral Seccion { get; set; }
        IItemGeneral Ambito { get; set; }
        IItemGeneral TipoDato { get; set; }
        List<IConfigurarParametros> Configuracion { get; set; }
        T GetValor<T>();

        [Column("Clave", true)]
        new string Clave { get; set; }

        [Column("Nombre", true)]
        new string Nombre { get; set; }

    }
}