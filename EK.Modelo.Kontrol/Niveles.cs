//using EK.Modelo.Kontrol.Interfaces;
//using System;

//namespace EK.Modelo.Kontrol
//{
//    public class Niveles : BaseKontrol, INiveles
//    {
//        public Niveles(IContainerFactory factory) : base()
//        {
//            //this.estatus = factory.GetInstance<IItemGeneral>();
//            //this.CreadoPor = factory.GetInstance<IBaseUsuario>();
//            //this.ModificadoPor = factory.GetInstance<IBaseUsuario>();
//        }

//        private string nivel;
//        public string Nivel
//        {
//            get
//            {
//                return this.nivel;
//            }

//            set
//            {
//                this.nivel = value;
//                base.PropertyChanged("Nivel");
//            }
//        }

//        private ICliente cliente;
//        public ICliente Cliente
//        {
//            get
//            {
//                return this.cliente;
//            }
//            set
//            {
//                this.cliente = value;
//            }
//        }

//        private int idCliente;
//        public int IdCliente
//        {
//            get
//            {
//                return this.idCliente;
//            }
//            set
//            {
//                this.idCliente = value;
//            }
//        }
//    }
//}
