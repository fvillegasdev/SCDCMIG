using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.EKCONNECT
{
    public class UbicacionEKCData
    {
        //[JsonProperty("from")]
        public string from { get; set; }

        //[JsonProperty("id")]
        //public string id { get; set; }

        //[JsonProperty("type")]
        public string type { get; set; }

       // [JsonProperty("typeMessage")]
        public string typeMessage { get; set; }

        //[JsonProperty("Location.Latitude")]
        public double latitude { get; set; }

        //[JsonProperty("Location.Longitude")]
        public double longitude { get; set; }

        //[JsonProperty("Location.Name")]
        public string name { get; set; }

        //[JsonProperty("Location.Address")]
        public string address { get; set; }

        //[JsonProperty("id")]
        public string idWa { get; set; }
        //TextMessageContext context { get; set; }

    }
}
