using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using miSCP = EK.Modelo.SCP.Interfaces;

namespace EK.Procesos.SCP
{
    public partial class Proveedores 
        : EK.Procesos.Kontrol.ProcesoBase
    {
        public async Task<List<miSCP.IProveedor>> Get()
        {
            return await this.dao.Get();
        }

        public async Task<List<miSCP.IProveedor>> Search(string parametro)
        {
            return await this.dao.Search(parametro);
        }
    }
}