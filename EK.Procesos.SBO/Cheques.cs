using dBancos = EK.Datos.SBO.Interfaces;
using dSCO = EK.Datos.SCO.Interfaces;
using bKontrol = EK.Modelo.Kontrol.Interfaces;

using EK.Procesos.SBO.Interfaces;
using EK.Procesos.Kontrol;
using Newtonsoft.Json;
using System;

namespace EK.Procesos.SBO
{
    public partial class Cheques
        : ProcesoBase, ICheques
    {
        private dBancos.ICheques dao;
        private dSCO.IPolizas dsco;

        public Cheques(bKontrol.IContainerFactory factory, dBancos.ICheques dao, dSCO.IPolizas dsco) {
            this.factory = factory;
            this.dao = dao;
            this.dsco = dsco;
            
            
        }

        public object[] GetReporteCheques() {
            return dao.GetReporteCheques(1);
        }

        public bool CreateBatch(string FormJson )
        {          
            dynamic obj = JsonConvert.DeserializeObject(FormJson);
            var DateNow = DateTime.Now;
            string FechaAplicacion = DateNow.Day.ToString() + 
                                    ((DateNow.Month<10) ? "0" + DateNow.Month.ToString() : DateNow.Month.ToString())
                                    + DateNow.Year.ToString();
            string strMonto = "";
            string lines = "";
            string NomCuenta = "";
            string PathSave = obj[0].path==""?"C:\\" : obj[0].path; 

            foreach (var item in obj[0].data.data)
            {
                strMonto = FormatMount(Convert.ToDecimal(item.Monto));
                lines += item.CuentaBancaria.CuentaBanco + FechaAplicacion + strMonto + item.NumeroCheque + 
                        item.Proveedor.CuentaBancaria + item.Proveedor.Nombre + item.Concepto1  + "\r\n";

                if (NomCuenta.Length == 0)
                {
                    NomCuenta = item.CuentaBancaria.Descripcion;
                }
                
            }
            string File_Name = NomCuenta.Trim() + "_" + FechaAplicacion;
            System.IO.StreamWriter file = new System.IO.StreamWriter(PathSave + "\\" + File_Name + ".txt", true);
            file.WriteLine(lines);
            file.Close();

            return true;
        }

        private string FormatMount(decimal Monto)
        {
            decimal roundValue = Math.Round(Monto,0);
            string returnValue = roundValue.ToString();
            int numDigitos = roundValue.ToString().Length;

            for (int i = 0; i < (14 - numDigitos); i++)
            {
                returnValue = "0" + returnValue;
            }

            return returnValue;
        }

        public string CantidadLetra(decimal monto, string tipoMoneda)
        {
             var cantidad  = dao.CantidadLetra(monto, tipoMoneda);
            var retValue = string.Empty;
            foreach (dynamic m in cantidad)
            {
                retValue = m.resultado;
            }
            return retValue;
        }
    }
}
