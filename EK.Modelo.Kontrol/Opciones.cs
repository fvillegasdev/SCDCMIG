using System;
using System.Collections.Generic;

using EK.Modelo.Kontrol.Interfaces;

using Newtonsoft.Json;

namespace EK.Modelo.Kontrol
{
    public class OpcionModulo 
        : BaseKontrol, IOpcionModulo
    {
        private string opcion;
        private string descripcion;
        private int permisos;
        private int excepcion;
        private bool esSeccion;
        private string icono;
        private int? idModulo;
        private IModulo modulo;
        private string ruta;
        private int? idPadre;
        private IOpcionModulo padre;
        private INivelesOpciones nivelOpcion;
        private int defPermiso;
        private bool? exportar;
        private List<IOpcionModulo> opciones;

        public int DefPermiso {
            get { return this.defPermiso; }
            set { this.defPermiso = value; }
        }

        public string Ruta
        {
            get { return ruta; }
            set { ruta = value; }
        }

        public string Opcion
        {
            get { return opcion; }
            set { opcion = value; }
        }

        public List<IOpcionModulo> Opciones {
            get {
                if (this.opciones == null) {
                    this.opciones = new List<IOpcionModulo>();
                }

                return this.opciones;
            }
            set {
                this.opciones = value;
            }
        }

        public string Descripcion
        {
            get { return descripcion; }
            set { descripcion = value; }
        }

        public bool? Exportar
        {
            get { return exportar; }
            set { exportar = value; }
        }
        public int Permisos
        {
            get { return permisos; }
            set { permisos = value; }
        }

        public int Excepcion
        {
            get { return this.excepcion; }
            set { this.excepcion = value; }
        }

        public bool EsSeccion
        {
            get { return esSeccion; }
            set { esSeccion = value; }
        }

        public string Icono
        {
            get { return icono; }
            set { icono = value; }
        }

        public int? IdPadre
        {
            get { return idPadre; }
            set { idPadre = value; }
        }


        public int? IdModulo
        {
            get { return idModulo; }
            set { idModulo = value; }
        }

        [JsonIgnore]
        [JsonProperty(Required = Required.Default)]
        public IOpcionModulo Padre
        {
            get { return padre; }
            set { padre = value; }
        }

        [JsonIgnore]
        [JsonProperty(Required = Required.Default)]
        public IModulo Modulo
        {
            get { return modulo; }
            set { modulo = value; }
        }

        public INivelesOpciones NivelOpcion
        {
            get { return nivelOpcion; }
            set { nivelOpcion = value; }
        }

    }
}