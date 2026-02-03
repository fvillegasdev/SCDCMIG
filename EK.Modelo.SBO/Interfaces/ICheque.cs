using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCO.Interfaces;
using EK.Modelo.SCP.Interfaces;
using System;


namespace EK.Modelo.SBO.Interfaces
{
    public interface ICheque 
        : IBaseKontrolCompania
    {
        Int32 NumeroCheque { get; set; }
        string Descripcion { get; set; }
        Decimal Monto { get; set; }
        string CantidadLetra { get; set; }
        DateTime FechaMovimiento { get; set; }
        DateTime FechaRetencion { get; set; }
        string Concepto1 { get; set; }
        string Concepto2 { get; set; }
        string Concepto3 { get; set; }
        ICuentaBancaria CuentaBancaria { get; set; }
        //ITipoMovimiento TipoMovimiento { get; set; }
        IBancos Banco { get; set; }
        int TipoCheque { get; set; }
        IPoliza Poliza { get; set; }
        ICentroCosto CC { get; set; }
        IItemGeneralValores TipoPoliza { get; set; }

        IProveedor Proveedor { get; set; }

        
        int EstadoCheque { get; set; }








    }
}