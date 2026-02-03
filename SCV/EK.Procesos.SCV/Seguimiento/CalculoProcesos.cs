using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using p = EK.Procesos;
using m = EK.Modelo;

namespace EK.Procesos.SCV.Calculos
{
    public class CalculoProcesos
        : p.Kontrol.ProcesoBase, Interfaces.ICalculoProcesos
    {
        private readonly IDictionary<string, Func<m.SCV.Interfaces.ISeguimientoProceso, Task>> _commands =
            new Dictionary<string, Func<m.SCV.Interfaces.ISeguimientoProceso, Task>>();

        public CalculoProcesos(m.Kontrol.Interfaces.IContainerFactory factory)
        {
            this.factory = factory;
        }


        public void Inicializar()
        {
            var bpMetodos =Get<p.SCV.Interfaces.ICalculoProcesosMetodos>();
            bpMetodos.DaoBase = this.daoBase;
            this.Register("PROC-EMAIL", bpMetodos.DoSendEmail);
            this.Register("PROC-FINIQUITO", bpMetodos.DoFiniquito);
            this.Register("PROC-SMS", bpMetodos.DoSendSMS);
            this.Register("PROC-AVANCE-ETAPA", bpMetodos.DoAvanceEtapa);
            this.Register("PROC-CIERRE-VENTA", bpMetodos.DoCierreVenta);
            this.Register("PROC-SIN-DEFINIR", bpMetodos.DoDefault);
            this.Register("PROC-SIN-DEFINIR-II", bpMetodos.DoDefault);
            this.Register("PROC-SIN-DEFINIR-III", bpMetodos.DoDefault);
            this.Register("PROC-AVANCE-FASE", bpMetodos.DoAvanceFase);
            this.Register("PROC-COTIZACION", bpMetodos.DoAvanceEtapa);
            this.Register("ASIGNACION-EST", bpMetodos.DoAsignacionEstatus);
        }

        public Func<m.SCV.Interfaces.ISeguimientoProceso, Task> GetCommand(string clave)
        {
            return _commands.ContainsKey(clave) ? _commands[clave] : null;
        }

        public void Register(string clave, Func<m.SCV.Interfaces.ISeguimientoProceso, Task> action)
        {
            this._commands.Add(clave, action);
        }
    }
}