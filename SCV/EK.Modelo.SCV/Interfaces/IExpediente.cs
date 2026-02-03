using System;
using System.Collections.Generic;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("scv_Expedientes")]
    public interface IExpediente
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdEntidad { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoEntidad { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoEntidad { get; set; }

        [m.Kontrol.Column()]
        int? IdTipoExpediente { get; set; }

        m.Kontrol.Interfaces.IItemGeneral TipoExpediente { get; set; }

        [m.Kontrol.Column()]
        int? IdCliente { get; set; }
        m.SCV.Interfaces.ICliente Cliente { get; set; }

        [m.Kontrol.Column()]
        int? IdDesarrollo { get; set; }


        [m.Kontrol.Column()]
        int? IdBoleta { get; set; }


        [m.Kontrol.Column()]
        int? IdMotivoCancelacion { get; set; }

        [m.Kontrol.Column()]
        DateTime? FechaCancelacion { get; set; }

        m.SCV.Interfaces.IDesarrollos Desarrollo { get; set; }


        [m.Kontrol.Column()]
        int? IdTipoComercializacion { get; set; }
        m.SCV.Interfaces.ITipoComercializacion TipoComercializacion { get; set; }

        [m.Kontrol.Column()]
        int IdEstatusExpediente { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusExpediente { get; set; }


        [m.Kontrol.Column()]
        int? IdNotario { get; set; }
        m.SCV.Interfaces.INotario Notario { get; set; }

        [m.Kontrol.Column()]
        string NumeroEscrituracion { get; set; }


        [m.Kontrol.Column()]
        string ObservacionesCancelacion { get; set; }


        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }


        int? IdAsesor { get; set; }

        m.SCV.Interfaces.ISeguimientoEstados Estados { get; set; }
        List<m.SCV.Interfaces.IExpedienteOwner> Owners { get; set; }
        List<m.SCV.Interfaces.IExpedienteRelacionado> Relacionados { get; set; }
        List<m.SCV.Interfaces.ISeguimiento> Seguimientos { get; set; }

        m.Kontrol.Interfaces.IPosicion Asesor { get; set; }

        m.SCV.Interfaces.ISeguimiento Seguimiento { get; set; }
        /**/

        m.SCV.Interfaces.IEtapa Etapa { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusEtapa { get; set; }
        string ClaveDashBoard { get; set; }
        m.SCV.Interfaces.IFaseExpediente Fase { get; set; }
        m.Kontrol.Interfaces.IItemGeneral EstatusSeguimiento { get; set; }
        decimal PorcentajeAvance { get; set; }
        List<m.Kontrol.Interfaces.IClasificador> Tags { get; set; }


        m.Kontrol.Interfaces.ICategoria Categoria { get; set; }
        m.Kontrol.Interfaces.IUsuario Usuario { get; set; }

        m.SCV.Interfaces.IMotivosCancelacion MotivoCancelacion { get; set; }

       // m.SCV.Interfaces.ITipoCliente TipoCliente { get; set; }


    }
}