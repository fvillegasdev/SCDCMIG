//using EK.Modelo.SCV.Interfaces;
//using System;
//using m = EK.Modelo;

//namespace EK.Modelo.SCV
//{
//    public class CampaniaPublicidad
//        : m.Kontrol.BaseKontrol,
//        m.SCV.Interfaces.ICampaniaPublicidad
//    {
//        private int idMedioPublicidad;
//        private int idEstadoCampania;
//        private int idPropietarioC;
//        private DateTime fechaInicial;
//        private DateTime fechaFinal;
//        private m.Kontrol.Interfaces.IItemGeneral medioPublicidad;
//        private m.Kontrol.Interfaces.IItemGeneral estadoCampania;
//        //private m.SCV.Interfaces.IListasMkt listasMkt;
//        private m.Kontrol.Interfaces.IUsuario propietarioC;
//        private m.Kontrol.Interfaces.IMoneda moneda;
//        private int idmoneda;
//        private string costoActual;
//        private string costoPresupuestado;
//        private string ingresosEsperados;

//        public int IdMedioPublicidad
//        {
//            get { return this.idMedioPublicidad; }
//            set
//            {
//                this.idMedioPublicidad = value;
//                base.PropertyChanged("IdMedioPublicidad");
//            }
//        }
//        public int IdEstadoCampania
//        {
//            get { return this.idEstadoCampania; }
//            set
//            {
//                this.idEstadoCampania = value;
//                base.PropertyChanged("IdEstadoCampania");
//            }
//        }

//        public int IdPropietarioC
//        {
//            get { return this.idPropietarioC; }
//            set
//            {
//                this.idPropietarioC = value;
//                base.PropertyChanged("IdPropietarioC");
//            }
//        }

//        public DateTime FechaInicial
//        {
//            get { return this.fechaInicial; }
//            set
//            {
//                this.fechaInicial = value;
//                base.PropertyChanged("FechaInicial");
//            }
//        }

//        public DateTime FechaFinal
//        {
//            get { return this.fechaFinal; }
//            set
//            {
//                this.fechaFinal = value;
//                base.PropertyChanged("FechaFinal");
//            }
//        }

//        public m.Kontrol.Interfaces.IItemGeneral MedioPublicidad
//        {
//            get { return this.medioPublicidad; }
//            set
//            {
//                this.medioPublicidad = value;
//                base.PropertyChanged("MedioPublicidad");
//            }
//        }

//        //public m.SCV.Interfaces.IListasMkt ListasMkt
//        //{
//        //    get { return this.listasMkt; }
//        //    set
//        //    {
//        //        this.listasMkt = value;
//        //        base.PropertyChanged("ListasMkt");
//        //    }
//        //}

//        public m.Kontrol.Interfaces.IItemGeneral EstadoCampania
//        {
//            get { return this.estadoCampania; }
//            set
//            {
//                this.estadoCampania = value;
//                base.PropertyChanged("EstadoCampania");
//            }
//        }

//        public m.Kontrol.Interfaces.IUsuario PropietarioC
//        {
//            get { return this.propietarioC; }
//            set
//            {
//                this.propietarioC = value;
//                base.PropertyChanged("PropietarioC");
//            }
//        }

//        public m.Kontrol.Interfaces.IMoneda Moneda
//        {
//            get { return this.moneda; }
//            set
//            {
//                this.moneda = value;
//                base.PropertyChanged("Moneda");
//            }
//        }

//        //public m.SCV.Interfaces.IListasMkt ListasMarketing
//        //{
//        //    get { return this.listasMarketing; }
//        //    set
//        //    {
//        //        this.listasMarketing = value;
//        //        base.PropertyChanged("ListasMarketing");
//        //    }
//        //}

//        public int IdMoneda
//        {
//            get { return this.idmoneda; }
//            set
//            {
//                this.idmoneda = value;
//                base.PropertyChanged("IdMoneda");
//            }
//        }

//        public string CostoActual
//        {
//            get { return this.costoActual; }
//            set
//            {
//                this.costoActual = value;
//                base.PropertyChanged("CostoActual");
//            }
//        }

//        public string CostoPresupuestado
//        {
//            get { return this.costoPresupuestado; }
//            set
//            {
//                this.costoPresupuestado = value;
//                base.PropertyChanged("CostoPresupuestado");
//            }
//        }
//        public string IngresosEsperados
//        {
//            get { return this.ingresosEsperados; }
//            set
//            {
//                this.ingresosEsperados = value;
//                base.PropertyChanged("IngresosEsperados");
//            }
//        }



//    }
//}