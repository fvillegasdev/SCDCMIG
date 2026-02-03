using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ListasMktDet")]

    public interface IListasMktDet : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column()]
        string IdCriterio { get; set; }

        [m.Kontrol.Column()]
        string Valor { get; set; }

        ICriterios Criterio { get; set; }
        ICriterios CriterioValor { get; set; }
        ICriterios CriterioTipo { get; set; }

        [m.Kontrol.Column("IdListaMkt")]
        int IdListaMkt { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Value { get; set; }
        
        
    }

}


