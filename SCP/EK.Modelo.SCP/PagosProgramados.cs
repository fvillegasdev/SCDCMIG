//using System;
//using System.Collections.Generic;
////using miSCO = EK.Modelo.SCO.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;

//namespace EK.Modelo.SCP
//{
//    public class PagosProgramados : mKontrol.BaseKontrol, Interfaces.IPagosProgramados
//    {

//        public PagosProgramados()
//        {
//            this.Items = new List<Interfaces.IPagosProgramados>();
//        }


//        private Interfaces.IProveedor proveedor;

//        public Interfaces.IProveedor Proveedor
//        {
//            get { return proveedor; }
//            set
//            {
//                proveedor = value;
//                base.PropertyChanged("Proveedor");
//            }
//        }

//        private string factura;

//        public string Factura
//        {
//            get { return factura; }
//            set
//            {
//                factura = value;
//                base.PropertyChanged("Factura");
//            }
//        }

//        private DateTime fechaVencimiento;

//        public DateTime FechaVencimiento
//        {
//            get { return fechaVencimiento; }
//            set
//            {
//                fechaVencimiento = value;
//                base.PropertyChanged("FechaVencimiento");
//            }
//        }

//        private miSCO.ICentroCosto centroCosto;

//        public miSCO.ICentroCosto CentroCosto
//        {
//            get { return centroCosto; }
//            set
//            {
//                centroCosto = value;
//                base.PropertyChanged("CentroCosto");
//            }
//        }

//        private string ordenCompra;

//        public string OrdenCompra
//        {
//            get { return ordenCompra; }
//            set
//            {
//                ordenCompra = value;
//                base.PropertyChanged("OrdenCompra");
//            }
//        }

//        private int tm;

//        public int TM
//        {
//            get { return tm; }
//            set
//            {
//                tm = value;
//                base.PropertyChanged("TM");
//            }
//        }

//        private string concepto;

//        public string Concepto
//        {
//            get { return concepto; }
//            set
//            {
//                concepto = value;
//                base.PropertyChanged("Concepto");
//            }
//        }

//        private decimal monto;

//        public decimal Monto
//        {
//            get { return monto; }
//            set
//            {
//                monto = value;
//                base.PropertyChanged("Monto");
//            }
//        }

//        private decimal saldo;

//        public decimal Saldo
//        {
//            get { return saldo; }
//            set
//            {
//                saldo = value;
//                base.PropertyChanged("Saldo");
//            }
//        }

//        private decimal saldoTotal;

//        public decimal SaldoTotal
//        {
//            get { return saldoTotal; }
//            set
//            {
//                saldoTotal = value;
//                base.PropertyChanged("SaldoTotal");
//            }
//        }

//        private int? tmBanco;

//        public int? TMBanco
//        {
//            get { return tmBanco; }
//            set
//            {
//                tmBanco = value;
//                base.PropertyChanged("TMBanco");
//            }
//        }

//        private int? tmProveedor;

//        public int? TMProveedor
//        {
//            get { return tmProveedor; }
//            set
//            {
//                tmProveedor = value;
//                base.PropertyChanged("TMProveedor");
//            }
//        }

//        private int folioAut;

//        public int FolioAut
//        {
//            get { return folioAut; }
//            set
//            {
//                folioAut = value;
//                base.PropertyChanged("FolioAut");
//            }
//        }

//        private mKontrol.Interfaces.IItemGeneralValores tipoMovimiento;

//        public mKontrol.Interfaces.IItemGeneralValores TipoMovimiento
//        {
//            get { return tipoMovimiento; }
//            set
//            {
//                tipoMovimiento = value;
//                base.PropertyChanged("TipoMovimiento");
//            }
//        }


//        private List<Interfaces.IPagosProgramados> items;

//        public List<Interfaces.IPagosProgramados> Items
//        {
//            get { return items; }
//            set
//            {
//                items = value;
//                base.PropertyChanged("Items");
//            }
//        }


//        private bool stChecked = false;

//        public bool StChecked
//        {
//            get { return stChecked = false; }
//            set
//            {
//                stChecked = value;
//                base.PropertyChanged("StChecked");
//            }
//        }


//    }
//}
