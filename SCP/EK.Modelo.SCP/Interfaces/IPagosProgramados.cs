//using System;
//using System.Collections.Generic;
//using miKontrol = EK.Modelo.Kontrol.Interfaces;
////using miSCO = EK.Modelo.SCO.Interfaces;

//namespace EK.Modelo.SCP.Interfaces
//{
//    public interface IPagosProgramados : miKontrol.IBaseKontrol
//    {
//        IProveedor Proveedor { get; set; }

//        string Factura { get; set; }

//        DateTime FechaVencimiento { get; set; }

//        miSCO.ICentroCosto CentroCosto { get; set; }

//        string OrdenCompra { get; set; }

//        int TM { get; set; }

//        string Concepto { get; set; }

//        decimal Monto { get; set; }

//        decimal Saldo { get; set; }

//        int? TMBanco { get; set; }

//        int? TMProveedor { get; set; }

//        List<IPagosProgramados> Items { get; set; }
//        miKontrol.IItemGeneralValores TipoMovimiento { get; set; }

//        bool StChecked { get; set; }
//    }
//}