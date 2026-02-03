using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SBO.Interfaces
{
    public interface ICuentaBancaria: IBaseKontrol
    {
        IBancos Banco { get; set; }
        int IdBanco { get; set; }
        string Descripcion { get; set; }
        string Contrato { get; set; }
        string Referencia { get; set; }
        IItemGeneralValores Moneda { get; set; }
        int IdMoneda { get; set; }
        IItemGeneralValores TipoPoliza { get; set; }
        int IdTipoPoliza { get; set; }
        int IdCentroCosto { get; set; }
        string CentroCosto { get; set; }
        int IdCuentaContable { get; set; }
        string CuentaContable { get; set; }
        DateTime? FechaInicio { get; set; }
        int IdTipoCuenta { get; set; }
        IItemGeneralValores TipoCuenta { get; set; }
        string LugarEmision { get; set; }
        string ChequeFisico { get; set; }
        string SucursalOrigen { get; set; }
        string CuentaBanco { get; set; }
        string Clabe { get; set; }
        string Plaza { get; set; }
        int Clasificacion { get; set; }
        string NombreClasificacion { get; set; }
        string ChequeElectronico { get; set; }
        string BancaElectronica { get; set; }
        string Responsable { get; set; }
        string Telefono1 { get; set; }
        string ExtTel { get; set; }
        int CuentaTercero { get; set; }
        ICompania Compania { get; set; }
    }
}
