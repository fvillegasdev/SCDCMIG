using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_ComisionesTabuladores")]
    public interface IComisionesTabuladores
           : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        [m.Kontrol.Column()]
        int IdCategoria { get; set; }

        [m.Kontrol.Column()]
        int IdUsuario { get; set; }

        [m.Kontrol.Column()]
        decimal? Porcentaje { get; set; }


        [m.Kontrol.Column()]
        decimal? PorcentajeDesarrollo { get; set; }

        [m.Kontrol.Column()]
        decimal? Monto { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorComisionable { get; set; }

        [m.Kontrol.Column()]
        decimal? ValorComisionableMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal? Comision { get; set; }

        [m.Kontrol.Column()]
        decimal? ComisionMoneda { get; set; }

        [m.Kontrol.Column()]
        int? IdMoneda { get; set; }

        [m.Kontrol.Column()]
        decimal? TipoCambio { get; set; }



        [m.Kontrol.Column()]
        int IdProcesoDetalle { get; set; }


        [m.Kontrol.Column()]
        DateTime FechaCalculo { get; set; }


        [m.Kontrol.Column()]
        int Minimo { get; set; }

        [m.Kontrol.Column()]
        int Maximo { get; set; }

        [m.Kontrol.Column()]
        int Cantidad { get; set; }

        [m.Kontrol.Column()]
        int IdTipoComision { get; set; }


        [m.Kontrol.Column()]
        decimal? ImporteAplicado { get; set; }

        [m.Kontrol.Column()]
        decimal? ImportePorAplicar { get; set; }


        [m.Kontrol.Column()]
        int? IdDesarrollo { get; set; }



        [m.Kontrol.Column()]
        int CantidadBase { get; set; }


        [m.Kontrol.Column()]
        decimal? ImportePenalizacion { get; set; }


        [m.Kontrol.Column()]
        decimal? ImportePenalizacionMoneda { get; set; }


        [m.Kontrol.Column()]
        decimal? PorcentajePenalizacion { get; set; }


        m.Kontrol.Interfaces.ICategoria Categoria { get; set; }
        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }
        m.Kontrol.Interfaces.IMoneda Moneda { get; set; }


        m.SCV.Interfaces.IComisionesProcesoPeriodos ProcesoPeriodo { get; set; }

    }

    public interface IComisionesCalculoIndicador 
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        int  IdUsuario { get; set; }

        int IdCategoria { get; set; }
        int IdDesarrollo { get; set; }

        int Cantidad { get; set; }

    }
    public interface IComisionesCalculoIndicadorComplementario
    : IComisionesCalculoIndicador
    {
        int IdExpediente { get; set; }
        int IdVentaUbicacion { get; set; }

    }

}
