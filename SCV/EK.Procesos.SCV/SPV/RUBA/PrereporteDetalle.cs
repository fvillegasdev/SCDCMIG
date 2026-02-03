using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using NT = EK.Drivers.Notifications;
using System.Dynamic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using System.Collections;
using System.Xml.Linq;
using System.Text.RegularExpressions;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class PrereporteDetalle : p.Kontrol.BPBase<m.SCV.Interfaces.IPrereporteDetalle, d.SCV.Interfaces.IPrereportesDetalles>,
        p.SCV.Interfaces.IPrereportesDET
    {
        public PrereporteDetalle(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IPrereportesDetalles dao)
           : base(factory, dao, "PrereporteDetalle")
        {
        }

        public async Task<List<IPrereporteDetalle>> GetByPartidaCte(int numcte, int reporte)
        {
            var partidas = await this.dao.GetByPartidaCte(numcte, reporte);
            return partidas;
        }
        public async Task<IPrereporteDetalle> GetByIdPartida(int idpartida)
        {
            var partida = await this.dao.GetByIdPartida(idpartida);
            return partida;
        }

        public async Task<IPrereporteDetalle> UpdateEstatusPreRepDet(int idpartida, string estatus,string fechaAgenda = null)   
        {
            var partida = await this.dao.UpdateEstatusPreRepDet(idpartida,estatus,fechaAgenda);
            return partida;
        }
    }
}
