using System;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace EK.Procesos.SCV
{
    public class ExpedienteSeguimiento
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITiposExpediente, d.SCV.Interfaces.ITiposExpediente>, p.SCV.Interfaces.IExpedienteSeguimiento
    {
        public ExpedienteSeguimiento(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITiposExpediente dao)
            : base(factory, dao, "expedienteSeguimiento")
        {
        }




        public async Task<object> AccionesExpediente(string clave)
        {
            switch(clave)
            {
                case "creacion":
                    await this.creacionExpediente();
                    break;

                case "finalizarEtapa":
                    await this.finalizarEtapa();
                    break;

                case "capturaRequisito":
                    await this.capturaRequisito();
                    break;

                case "finalizarSeguimiento":
                    await this.finalizarSeguimiento();
                    break;

                case "suspenderExpe":
                    await this.suspenderExpediente();
                    break;

                case "cancelarExpe":
                    await this.cancelarExpediente();
                    break;
            }
            return null;
        }


        private async Task<List<m.SCV.Interfaces.IExpediente>> creacionExpediente()
        {

            return null;
        }

        public async Task<List<m.SCV.Interfaces.IExpediente>> capturaRequisito()
        {

            return null;
        }

        public async Task<List<m.SCV.Interfaces.IExpediente>> finalizarEtapa()
        {

            return null;
        }


        public async Task<List<m.SCV.Interfaces.IExpediente>> finalizarSeguimiento()
        {

            return null;
        }

        public async Task<List<m.SCV.Interfaces.IExpediente>> suspenderExpediente()
        {

            return null;
        }

        public async Task<List<m.SCV.Interfaces.IExpediente>> cancelarExpediente()
        {

            return null;
        }
    }
}