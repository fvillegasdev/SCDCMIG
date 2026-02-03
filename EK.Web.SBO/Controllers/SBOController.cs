using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Common.Utils;
using EK.Modelo.Kontrol;
using System.Web.Mvc;

namespace EK.Web.SBO.Controllers
{
    [Auth()]
    public class SBOController : EK.Common.BaseKontroller
    {
        public SBOController()
            : 
            base()
        {
        }

        // GET: SBO/Home
        public ActionResult Index()
        {
            return View();
        }

        protected override string Modulo
        {
            get
            {
                return "sbo";
            }
        }
    }
}
