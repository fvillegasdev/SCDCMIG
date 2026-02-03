using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.EKCONNECT
{
    public class EKCRequestData
    {
        public string from { get; set; }
        public string claveCanal { get; set; } //WA, FB, IG 
        public string id { get; set; }
        public string timestamp { get; set; }
        public TextMessageText text { get; set; }//text.body para acceder al mensaje ej:”hola” 
        public string type { get; set; }
        public string typeMessage { get; set; }
        //TextMessageContext context { get; set; }
        public string pageId { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string profile_pic { get; set; }
        public string email { get; set; }
        public int? negativo { get; set; }
        public int? positivo { get; set; }
        public int? neutral { get; set; }
        public int? total_tokens { get; set; }
        public int? completion_tokens { get; set; }
        public int? prompt_tokens { get; set; }
        public string error { get; set; }
        public bool permisoSentimientos { get; set; }
        public bool atiendeChatbot { get; set; }
        public int? idChat { get; set; }
    }
}
