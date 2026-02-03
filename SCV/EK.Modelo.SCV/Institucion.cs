using System;
using miSCV = EK.Modelo.SCV.Interfaces;
using EK.Modelo.Kontrol.Interfaces;
using mKontrol = EK.Modelo.Kontrol;
using EK.Modelo.SCO.Interfaces;
using System.Collections.Generic;

namespace EK.Modelo.SCV
{
    public class Institucion
        : mKontrol.BaseKontrolMM, miSCV.IInstitucion
    {
        
        private decimal montoCredito;
        private string comentarios;
        private List<miSCV.IInstitucionEsquema> esquemas;

        public decimal MontoCredito
        {
            get
            {
                return this.montoCredito;
            }

            set
            {
                this.montoCredito = value;
            }
        }

        public string Comentarios
        {
            get
            {
                return this.comentarios;
            }

            set
            {
                this.comentarios = value;
            }
        }

        public List<miSCV.IInstitucionEsquema> Esquemas
        {
            get
            {
                return this.esquemas;
            }

            set
            {
                this.esquemas = value;
            }
        }

    }
}