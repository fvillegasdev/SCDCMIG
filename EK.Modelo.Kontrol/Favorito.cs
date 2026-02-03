using System;
using System.Collections.Generic;

using EK.Modelo.Kontrol.Interfaces;
using Newtonsoft.Json;

namespace EK.Modelo.Kontrol
{
    public class Favorito
        : BaseKontrol, IFavorito
    {
        private string enlace;
        private string icono;
        private IFavorito padre;
        private FavoritoTypeEnum tipo;
        private string titulo;
        private int? idPadre;

        public string Enlace
        {
            get
            {
                return this.enlace;
            }

            set
            {
                this.enlace = value;
            }
        }

        public string Icono
        {
            get
            {
                return this.icono;
            }

            set
            {
                this.icono = value;
            }
        }

        [JsonIgnore]
        [JsonProperty(Required = Required.Default)]
        public IFavorito Padre
        {
            get
            {
                return this.padre;
            }

            set
            {
                this.padre = value;
            }
        }

        public FavoritoTypeEnum Tipo
        {
            get
            {
                return this.tipo;
            }

            set
            {
                this.tipo = value;
            }
        }

        public string Titulo
        {
            get
            {
                return this.titulo;
            }

            set
            {
                this.titulo = value;
            }
        }

        public int? IdPadre {
            get {
                return this.idPadre;
            }
            set {
                this.idPadre = value;
            }
        }
    }
}
