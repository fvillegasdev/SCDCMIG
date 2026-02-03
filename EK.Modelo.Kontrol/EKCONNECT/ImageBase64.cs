using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.EKCONNECT
{
    public class ImageBase64
    {
        [JsonProperty("base64")]
        public string Base64 { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("mime_type")]
        public string MimeType { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("from")]
        public string From { get; set; }

        [JsonProperty("typeMessage")]
        public string TypeMessage { get; set; }

        [JsonProperty("fileName")]
        public string FileName { get; set; }

        [JsonProperty("idWa")]
        public string IdWa { get; set; }
    }
}
