using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;


namespace EK.Procesos.SCV.SPV.EKCONNECT
{
    public class EKCUsuariosRedesSociales : p.Kontrol.BPBase<m.SCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales, d.SCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales>, p.SCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales
    {
        public EKCUsuariosRedesSociales(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.EKCONNECT.IEKCUsuariosRedesSociales dao)
       : base(factory, dao, "EKCUsuariosRedesSociales")
        {
        }
    }
}
