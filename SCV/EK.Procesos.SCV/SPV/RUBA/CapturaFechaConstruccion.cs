using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class CapturaFechaConstruccion
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICapturaFechaConstruccion, d.SCV.Interfaces.ICapturaFechaConstruccion>, p.SCV.Interfaces.ICapturaFechaConstruccion

    {
        public CapturaFechaConstruccion(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ICapturaFechaConstruccion dao)
            : base(factory, dao, "CapturaFechaConstruccion")
        { }


        public override async Task<m.SCV.Interfaces.ICapturaFechaConstruccion> Save(m.SCV.Interfaces.ICapturaFechaConstruccion item)
        {
            var retValue = Get<m.SCV.Interfaces.ICapturaFechaConstruccion>();

            if (item.Programados.Count > 0)
            {

                foreach (var c in item.Programados)
                {

                    //var procesoConst = await this.dao.SaveDetProg(c);

                }

            }
            else
            {


                var procesoConst = await dao.SaveCompromisoCons(item);
            }


            Commit();

            return retValue;
        }



        public async Task<m.SCV.Interfaces.ICapturaFechaConstruccion> SaveProgramados(m.SCV.Interfaces.ICapturaFechaConstruccion model)
        {
            List<m.Kontrol.Interfaces.IProgramados> items = null;
            var porReparar = 0;
            var numcte = "";
            var ID = 0;
            try
            {
                var retValue = Get<m.SCV.Interfaces.ICapturaFechaConstruccion>();
                var Usuario = base.getUserId();

                BeginTransaction();
                foreach (var c in model.Programados)
                {
                    if (c.Bit_reparado == false)
                    {
                        porReparar++;
                    }
                    numcte = c.NumCte;
                    ID = Convert.ToInt32(c.NumCte);
                    var procesoConst = await this.dao.SaveProgramados(c, Usuario);
                }
                Commit();
                var parameters = new Dictionary<string, object>();
                parameters.Add("numcte", numcte);

                items = await this.GetProgramados(parameters);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);
            }
            model.Programados = items;
            model.CantidadPendientesPorReparar = porReparar;
            model.bit_revisado = "R";
            if (porReparar > 0)
            {
                model.bit_revisado = "D";
            }
            model.ID = ID;
            model.numcte = numcte;
            model.Estado = m.Kontrol.KontrolEstadosEnum.Exitoso;
            return model;
        }

        //public async Task<List<m.SCV.Interfaces.ICapturaFechaConstruccion>> GetFechaConstruccion(string Plaza, string Segmentos, string Fraccionamiento, DateTime FechaInicial, DateTime FechaFinal)
        public async Task<List<m.SCV.Interfaces.ICapturaFechaConstruccion>> GetFechaConstruccion(Dictionary<string, object> parametros)
        {
            // var ResultFechaConstruccion = await this.dao.GetFechaConstruccion(Plaza, Segmentos, Fraccionamiento, FechaInicial, FechaFinal);
            parametros.Add("Usuario", base.getUserId());

            var ResultFechaConstruccion = await this.dao.GetFechaConstruccion(parametros);

            return ResultFechaConstruccion;

        }

        public async Task<List<m.SCV.Interfaces.ICapturaFechaConstruccionExcel>> GetFechaConstruccionExcel(Dictionary<string, object> parametros)
        {
            // var ResultFechaConstruccion = await this.dao.GetFechaConstruccion(Plaza, Segmentos, Fraccionamiento, FechaInicial, FechaFinal);
            parametros.Add("Usuario", base.getUserId());

            var ResultFechaConstruccion = await this.dao.GetFechaConstruccionExcel(parametros);

            return ResultFechaConstruccion;

        }

        public async Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosReprogramacion(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario", base.getUserId());
            var MotivosReprogramacion = await this.dao.GetMotivosReprogramacion(parametros);

            return MotivosReprogramacion;
        }
        public async Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosRezago(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario", base.getUserId());
            var MotivosReprogramacion = await this.dao.GetMotivosRezago(parametros);

            return MotivosReprogramacion;

        }public async Task<List<m.SCV.Interfaces.IMotivosReprogramacion>> GetMotivosRecepcionDetalle(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario", base.getUserId());
            var MotivosReprogramacion = await this.dao.GetMotivosRecepcionDetalle(parametros);

            return MotivosReprogramacion;

        }
        public async Task<List<string>> GetMotivosCancelacionFolio(Dictionary<string, object> parametros)
        {
            //parametros.Add("Usuario", base.getUserId());
            //var MotivosReprogramacion = await this.dao.GetMotivosReprogramacion(parametros);
            List<string> MotivosReprogramacion = new List<string>();
            MotivosReprogramacion.Add("asd");
            return  MotivosReprogramacion;

        }
        public async Task<List<m.Kontrol.Interfaces.IProgramados>> GetProgramados(Dictionary<string, object> parametros)
        {
            // var ResultFechaConstruccion = await this.dao.GetFechaConstruccion(Plaza, Segmentos, Fraccionamiento, FechaInicial, FechaFinal);
            parametros.Add("Usuario", base.getUserId());

            var Programados = await this.dao.GetProgramados(parametros);

            return Programados;

        }

        public async Task<List<m.SCV.Interfaces.IConsultaViviendaEntregablePersonalEntregaViv>> GetPersonaEntregaVxFracc(Dictionary<string, object> parametros)
        {
            parametros.Add("Usuario", base.getUserId());

            var PersonaEntregaVxFracc = await this.dao.GetPersonaEntregaVxFracc(parametros);

            return PersonaEntregaVxFracc;
        }
    }
}