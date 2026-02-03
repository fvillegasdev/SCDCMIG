using EK.Modelo.Kontrol.Interfaces;
using System.Collections.Generic;

namespace EK.Modelo.Kontrol
{
    public class Parametro
        : BaseKontrol, IParametro
    {
        //private string seccion;
        private string valor;
        private string parametros;

        private List<IConfigurarParametros> configuracion;

        //public string Seccion
        //{
        //    get
        //    {
        //        return this.seccion;
        //    }
        //    set
        //    {
        //        this.seccion = value;
        //    }
        //}
        public string parametro
        {
            get
            {
                return this.parametros;
            }
            set
            {
                this.parametros = value;
            }
        }

        public string Valor
        {
            get
            {
                return this.valor;
            }

            set
            {
                this.valor = value;
            }
        }
        private IItemGeneral secciones;
        public IItemGeneral Seccion
        {
            get { return secciones; }
            set { secciones = value; }
        }
        private IItemGeneral ambito;
        public IItemGeneral Ambito
        {
            get { return ambito; }
            set { ambito = value; }
        }
        private IItemGeneral tipoDato;
        public IItemGeneral TipoDato
        {
            get { return tipoDato; }
            set { tipoDato = value; }
        }

     


        private int longitud;
        public int Longitud
        {
            get { return longitud; }
            set { longitud = value; }
        }
        private int decimales;
        public int Decimales
        {
            get { return decimales; }
            set { decimales = value; }
        }
        private string descripcion;
        public string Descripcion
        {
            get { return descripcion; }
            set { descripcion = value; }
        }
        private int? idSeccion;

        public int? IdSeccion
        {
            get { return idSeccion; }
            set { idSeccion = value; }
        }

        private int? idTipoDato;

        public int? IdTipoDato
        {
            get { return idTipoDato; }
            set { idTipoDato = value; }
        }

        private int? idAmbito;

        public int? IdAmbito
        {
            get { return idAmbito; }
            set { idAmbito = value; }
        }

        private int? idModulo;

        public int? IdModulo
        {
            get { return idModulo; }
            set { idModulo = value; }
        }

        private IModulo modulo;

        public IModulo Modulo
        {
            get { return modulo; }
            set { modulo = value; }
        }

        public List<IConfigurarParametros> Configuracion
        {
            get
            {
                return this.configuracion;
            }
            set
            {
                this.configuracion = value;
            }
        }

        public T GetValor<T>()
        {
            return (T)System.Convert.ChangeType(this.valor, typeof(T));
        }
    }
}