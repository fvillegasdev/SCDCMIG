using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class BaseUsuario
        : BaseKontrol, IBaseUsuario
    {
        protected string apellidos;

        public BaseUsuario() 
            : base() {

        }

        public string Apellidos
        {
            get
            {
                return this.apellidos;
            }

            set
            {
                this.apellidos = value;
            }
        }

    }
}
