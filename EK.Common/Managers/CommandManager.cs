//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Reflection;
//using System.Threading.Tasks;
//using System.Web;

//using EK.Modelo.Kontrol;
//using EK.Modelo.Kontrol.Interfaces;

//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;

//using SimpleInjector;

//namespace EK.Common.Managers
//{
//    public class CommandManager
//    {
//        private IContainerFactory factory;
//        private Dictionary<string, Type> commandTypes;
//        private Dictionary<string, Type> ctResult;
//        private string topic;

//        public CommandManager(IContainerFactory factory) {
//            this.factory = factory;
//            this.commandTypes = new Dictionary<string, Type>();
//        }

//        public void AddAssembly(string assemblyName) {
//            var assembly = Assembly.Load(assemblyName);

//            // Get all types to be used as Business Objects
//            Func<Type, string> f = delegate (Type t)
//            {
//                string retValue = null;
//                var customAttribute = t.GetCustomAttribute(typeof(KontrolNameAttribute)) as KontrolNameAttribute;

//                if (customAttribute != null)
//                {
//                    retValue = customAttribute.Name;
//                }
//                else {
//                    var typeName = t.Name;
//                    if (typeName.StartsWith("I"))
//                    {
//                        retValue = typeName.Substring(1);
//                    }
//                    else {
//                        retValue = typeName;
//                    }
//                }

//                return retValue;
//            };

//            ctResult = assembly == null? new Dictionary<string, Type>() : assembly.GetTypes()
//                    .Where(t => t.IsInterface && t.GetInterfaces().Count(i => i == typeof(IBaseProceso)) > 0)
//                    .ToDictionary(t => f(t), t => t);

            
//            foreach (var ct in ctResult)
//                commandTypes.Add(ct.Key, ct.Value);
//        }

//        public string Topic {
//            get {
//                return this.topic;
//            }

//            set {
//                this.topic = value;
//            }
//        }

//        public Type getCommandType(string commandTypeName)
//        {
//            if (this.commandTypes != null && commandTypes.ContainsKey(commandTypeName))
//            {
//                return commandTypes[commandTypeName];
//            }

//            return null;
//        }

//        private async Task<object> invokeCommand(
//            IBaseProceso obj,
//            string commandName,
//            Dictionary<string, object> parametros)
//        {
//            object retValue = null;
//            List<object> p = new List<object>();
//            MethodInfo method = null;
//            foreach (var m in obj.GetType().GetMethods()) {
//                if (m.Name == commandName) {
//                    var pm = m.GetParameters();

//                    if (parametros == null || parametros.Count == 0 && pm.Count() == 0) {
//                        method = m;
//                        break;
//                    }

//                    if (parametros != null && parametros.Count == pm.Count()) {
//                        var f = true;
//                        for (var i = 0; i < parametros.Count; i++) {
//                            if (!parametros.ContainsKey(pm[i].Name)) {
//                                f = false;
//                            }
//                        }

//                        if (f) {
//                            method = m;
//                            break;
//                        }
//                    }
//                }
//            }

//            //var method = obj.GetType().GetMethod(commandName);

//            if (parametros != null)
//            {
//                foreach (ParameterInfo paramInfo in method.GetParameters())
//                {
//                    var v = parametros[paramInfo.Name];
//                    var pt = paramInfo.ParameterType;

//                    if (pt.Name == "Nullable`1") {
//                        if (v == null) {
//                            p.Add(null);
//                        }
//                        else {
//                            p.Add(pt.GetConstructors()[0].Invoke(new object[] {v}));
//                        }
//                    } else {
//                        p.Add(Convert.ChangeType(v, pt));
//                    }                    
//                }
//            }

//            if (method.ReturnType.Name == "Task" || (method.ReturnType.BaseType != null && method.ReturnType.BaseType.Name == "Task")) {
//                //Task<object[]> task = (Task<object[]>) method.Invoke(obj, p.ToArray());
                
//                retValue = await (dynamic) method.Invoke(obj, p.ToArray());
//            }
//            else {
//                await Task.Run(() => {
//                    retValue = method.Invoke(obj, p.ToArray());
//                });
//            }
            
//            return retValue;
//        }

//        public async Task<ICommandResult> Execute(ICommandQuery command)
//        {
//            // Command name
//            var commandName = command.ID.Split("/".ToCharArray());

//            // parameters & values 
//            var pNames = command.Parametros == null ? new string[] { } : command.Parametros.Keys.ToArray();
//            var pValues = command.Parametros == null ? new object[] { } : command.Parametros.Values.ToArray();

//            // Get the type of the business object
//            var type = getCommandType(commandName[1]);

//            // Get the instance of the type
//            var obj = GetInstance(type);

//            // Invoke the method
//            var retValue = GetInstance<ICommandResult>();
//            var resultado = await invokeCommand(obj, commandName[2], command.Parametros);

//            retValue.Codigo = 1;
//            retValue.Resultado = resultado;

//            return retValue;
//        }

//        public IBaseProceso GetInstance(Type serviceType)
//        {            
//            return this.factory.GetInstance(serviceType) as IBaseProceso;
//        }

//        public T GetInstance<T>()
//        {
//            return (T)this.factory.GetInstance(typeof(T));
//        }        
//    }
//}
