using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;

using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    public class CommandResult
        : ICommandResult
    {
        private int codigo;
        private string mensaje;
        private bool updateState;
        private int severity;
        private object resultado;

        public int Codigo {
            get {
                return this.codigo;
            }
            set {
                this.codigo = value;
            }
        }

        public bool UpdateState {
            get {
                return this.updateState;
            }
            set {
                this.updateState = value;
            }
        }

        public int Severity
        {
            get
            {
                return this.severity;
            }
            set
            {
                this.severity = value;
            }
        }

        public object Resultado {
            get {
                return this.resultado;
            }
            set {
                this.resultado = value;
            }
        }        

        public string Mensaje {
            get {
                return this.mensaje;
            }
            set {
                this.mensaje = value;
            }
        }
    }
}