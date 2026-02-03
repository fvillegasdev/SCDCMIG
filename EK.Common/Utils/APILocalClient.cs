using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Common.Utils
{
    public class APILocalClient
    {
        public object Invoke(string command) {
            return this.Invoke(command, null);
        }
        public object Invoke(string command, Dictionary<string, object> parameters) {
            return null;
        }
    }
}
