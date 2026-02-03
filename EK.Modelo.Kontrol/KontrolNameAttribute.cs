using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace EK.Modelo.Kontrol
{
    public class KontrolNameAttribute : Attribute
    {
        private string name = string.Empty;

        public KontrolNameAttribute(string name)
            : base()
        {
            this.name = name;
        }

        public string Name
        {
            get
            {
                return name;
            }
            set
            {
                name = value;
            }
        }
    }
}
