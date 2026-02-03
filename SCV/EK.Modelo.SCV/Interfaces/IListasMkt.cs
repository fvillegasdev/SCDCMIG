using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{

    [m.Kontrol.Table("scv_ListasMkt")]
    public interface IListasMkt : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        string IdOrigen { get; set; }

        [m.Kontrol.Column()]
        DateTime fGenerada { get; set; }

        [m.Kontrol.Column()]
        int Alcance { get; set; }

        string IdListaMktDet { get; set; }

        IOrigen Origen { get; set; }


        IListasMktDet Criterios { get; set; }
        //IListasMktDet ListasMktDet { get; set; }

        string Valor { get; set; }

        DateTime? FechaInicial { get; set; }

        DateTime? FechaFinal { get; set; }
        DateTime? VigenciaInicio { get; set; }
        DateTime? VigenciaFin { get; set; }


        m.Kontrol.Interfaces.IItemGeneral Genero { get; set; }
        m.Kontrol.Interfaces.IItemGeneral TipoPersona { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstadoCivil { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Giro { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Regimen { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Posicion { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Grupo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral AreaOrganizacion { get; set; }

        m.Kontrol.Interfaces.IItemGeneral Empresa { get; set; }
        m.Kontrol.Interfaces.IItemGeneral RangoIngresos { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Desarrollo { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Ciudad { get; set; }
        m.Kontrol.Interfaces.IItemGeneral Etapa { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusSeguimiento { get; set; }
        m.Kontrol.Interfaces.IItemGeneral VctoCobranza { get; set; }
        m.Kontrol.Interfaces.IItemGeneral AvanceConstruccion { get; set; }

       
    }
}