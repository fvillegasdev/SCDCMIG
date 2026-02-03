//using System;
//using System.Collections.Generic;

//using EK.Modelo.Kontrol.Interfaces;

//namespace EK.Modelo.Kontrol
//{
//    public class Cliente
//        : BaseKontrol, IDominios
//    {
//        private string nombre;
//        private string clave;
//        private bool bloqueado;
//        private DateTime? vigenciaInicio;
//        private DateTime? data: "VigenciaFinal";
//        //private IParametros parametros;

//        public Cliente()
//            : base() {

//            //parametros = new Parametros();
//        }

//        //public Cliente(
//        //    int id,
//        //    string nombre,
//        //    string nombreCorto,
//        //    DateTime? vigenciaInicio,
//        //    DateTime? vigenciaFin,
//        //    DateTime? creado,
//        //    IBaseUsuario creadoPor,
//        //    DateTime? modificado,
//        //    IBaseUsuario modificadoPor,
//        //    string version
//        //    )
//        //    : base(id, creado, creadoPor, modificado, modificadoPor, version) {

//        //    this.nombre = nombre;
//        //    this.nombreCorto = nombreCorto;
//        //    this.vigenciaInicio = vigenciaInicio;
//        //    this.vigenciaFin = vigenciaFin;
//        //}

//        public string Nombre
//        {
//            get
//            {
//                return this.nombre;
//            }

//            set
//            {
//                this.nombre = value;
//                base.PropertyChanged("Nombre");
//            }
//        }

//        public string Clave
//        {
//            get
//            {
//                return this.clave;
//            }

//            set
//            {
//                this.clave = value;
//                base.PropertyChanged("Clave");
//            }
//        }

//        public bool Bloqueado
//        {
//            get
//            {
//                return this.bloqueado;
//            }

//            set
//            {
//                this.bloqueado = value;
//                base.PropertyChanged("Bloqueado");
//            }
//        }

//        public DateTime? VigenciaFin
//        {
//            get
//            {
//                return this.VigenciaFin;
//            }

//            set
//            {
//                this.VigenciaFin = value;
//                base.PropertyChanged("VigenciaFin");
//            }
//        }

//        public DateTime? VigenciaInicio
//        {
//            get
//            {
//                return this.vigenciaInicio;
//            }

//            set
//            {
//                this.vigenciaInicio = value;
//                base.PropertyChanged("VigenciaInicio");
//            }
//        }

//        //public IParametros Parametros {
//        //    get
//        //    {
//        //        return this.parametros;
//        //    }
//        //    set
//        //    {
//        //        this.parametros = value;
//        //    }
//        //}
//    }
//}
