using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCCO.Interfaces
{
    [m.Kontrol.Table("scco_Tipo_Insumos")]
    public interface ITipoInsumo
         : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int IdCategoria { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Categoria { get; set; }
        //m.Kontrol.Interfaces.IItemGeneral UsoInsumo { get; set; }
        
    }
}
