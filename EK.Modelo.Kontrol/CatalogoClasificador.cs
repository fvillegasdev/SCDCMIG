//using System.Collections.Generic;
//using mKontrol = EK.Modelo.Kontrol.Interfaces;
//using Newtonsoft.Json;

//namespace EK.Modelo.Kontrol
//{
//    public class CatalogoClasificador 
//        : BaseKontrol, mKontrol.ICatalogoClasificador
//    {
//        public CatalogoClasificador() {
//            this.Clasificadores = new List<mKontrol.ICatalogoClasificador>();
//        }

//        public string Clave { get; set; }

//        public string Nombre { get; set; }

//        [JsonIgnore]
//        [JsonProperty(Required = Required.Default)]
//        public mKontrol.ICatalogoClasificador TipoClasificador { get; set; }
//        public int? IdTipoClasificador { get; set; }

//        public List<mKontrol.ICatalogoClasificador> Clasificadores { get; set; }
//    }

//    //public class Clasificador : ItemGeneral, mKontrol.IClasificador
//    //{
//    //    public int itemBD { get; set; }
//    //    public string itemAccion { get; set; }
//    //    public int itemTipo { get; set; }
//    //    public int IdTipoClasificador { get; set; }
//    //}
//}