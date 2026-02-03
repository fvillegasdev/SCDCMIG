using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;

using EK.Modelo.Kontrol;
using EK.Modelo.Kontrol.Interfaces;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using SimpleInjector;

namespace EK.Utils
{
    public class CommandManager
    {
        private IContainerFactory factory;
        private Dictionary<string, Type> commandTypes;
        private Dictionary<string, Type> ctResult;
        private string topic;

        public CommandManager()
        {
            this.commandTypes = new Dictionary<string, Type>();

            this.AddAssembly("EK.Procesos.Kontrol");
            //this.AddAssembly("EK.Procesos.SBO");
            //commandManager.AddAssembly("EK.Procesos.SCO");
            //this.AddAssembly("EK.Procesos.SCP");
            this.AddAssembly("EK.Procesos.SCV");
            //this.AddAssembly("EK.Procesos.SCCO");
            this.Topic = "kontrolapi";
        }

        public IContainerFactory Factory {
            get {
                return this.factory;
            }
            set {
                this.factory = value;
            }
        }

        public void AddAssembly(string assemblyName)
        {
            var assembly = Assembly.Load(assemblyName);

            // Get all types to be used as Business Objects
            Func<Type, string> f = delegate (Type t)
            {
                string retValue = null;
                var customAttribute = t.GetCustomAttribute(typeof(KontrolNameAttribute)) as KontrolNameAttribute;

                if (customAttribute != null)
                {
                    retValue = customAttribute.Name.ToLower();
                }
                else
                {
                    var typeName = t.Name;
                    if (typeName.StartsWith("I"))
                    {
                        retValue = typeName.Substring(1);
                    }
                    else
                    {
                        retValue = typeName;
                    }
                }

                return retValue;
            };

            //if (assembly != null)
            //{
            //    var ts = new Dictionary<string, object>();

            //    foreach (var t in assembly.GetTypes()
            //        .Where(t => t.IsInterface && t.GetInterfaces().Count(i => i == typeof(EK.Procesos.Kontrol.Interfaces.IBaseProceso)) > 0))
            //    {
            //        var iname = f(t);

            //        if (ts.ContainsKey(iname))
            //        {
            //            Console.WriteLine("!!!! ERROR {0}", t.FullName);
            //        }
            //        else
            //        {
            //            ts.Add(iname, t);
            //            Console.WriteLine(t.FullName);
            //        }
            //    }
            //}

            ctResult = assembly == null ? new Dictionary<string, Type>() : assembly.GetTypes()
                    .Where(t => t.IsInterface && t.GetInterfaces().Count(i => i == typeof(EK.Procesos.Kontrol.Interfaces.IBaseProceso)) > 0)
                    .ToDictionary(t => f(t), t => t);


            foreach (var ct in ctResult)
                commandTypes.Add(ct.Key, ct.Value);
        }

        public string Topic
        {
            get
            {
                return this.topic;
            }

            set
            {
                this.topic = value;
            }
        }

        public Type getCommandType(string commandTypeName)
        {
            Type retValue = null;

            if (commandTypeName == "base") {
                retValue = typeof(Procesos.Kontrol.ProcesoBase);
            } else {
                if (this.commandTypes != null && commandTypes.ContainsKey(commandTypeName))
                {
                    retValue = commandTypes[commandTypeName];
                }
            }

            return retValue;
        }

        //private object convertValue(object v, ParameterInfo paramInfo) {
        //    object retValue;
        //    var pt = paramInfo.ParameterType;

        //    if (pt.Name == "List`1")
        //    {
        //        foreach (var o in v) {

        //        }
        //    }
        //    else if (pt.Name == "Nullable`1")
        //    {
        //        if (v == null)
        //        {
        //            retValue= null;
        //        }
        //        else
        //        {
        //            retValue = pt.GetConstructors()[0].Invoke(new object[] { v });
        //        }
        //    }
        //    else
        //    {
        //        if (v is string && pt.GetInterface("IBaseKontrol") != null)
        //        {
        //            retValue = convertJSON(v.ToString(), null, pt);
        //        }
        //        else
        //        {
        //            retValue = Convert.ChangeType(v, pt);
        //        }
        //    }

        //    return null;
        //}

        private async Task<object> invokeCommand(
            EK.Procesos.Kontrol.Interfaces.IBaseProceso obj,
            string commandName,
            Dictionary<string, object> parametros,
            string objectName)
        {
            try
            {
                object retValue = null;
                List<object> p = new List<object>();
                MethodInfo method = null;
                var mtds = obj.GetType().GetMethods();
                foreach (var m in obj.GetType().GetMethods())
                {
                    if (m.Name == commandName)
                    {
                        var pm = m.GetParameters();
                        
                        if (parametros == null || parametros.Count == 0 && pm.Count() == 0)
                        {
                            method = m;
                            break;
                        }
                        var c = pm.Count();
                        if (parametros != null && parametros.Count == pm.Count())
                        {
                            var f = true;
                            for (var i = 0; i < parametros.Count; i++)
                            {
                                if (!parametros.ContainsKey(pm[i].Name))
                                {
                                    f = false;
                                }
                            }

                            if (f)
                            {
                                method = m;
                                break;
                            }
                        }
                    }
                }

                if (parametros != null)
                {
                    foreach (ParameterInfo paramInfo in method.GetParameters())
                    {
                        var v = parametros[paramInfo.Name];
                        var pt = paramInfo.ParameterType;

                        if (pt.Name == "List`1")
                        {
                            p.Add(convertJSONArray(v.ToString(), pt));
                        }
                        else if (pt.Name == "Nullable`1")
                        {
                            if (v == null)
                            {
                                p.Add(null);
                            }
                            else
                            {
                                p.Add(pt.GetConstructors()[0].Invoke(new object[] { v }));
                            }
                        }
                        else
                        {
                            if (v is string && pt.GetInterface("IBaseKontrol") != null)
                            {
                                p.Add(convertJSON(v.ToString(), null, pt));
                            }
                            else
                            {
                                if (v != null && v.GetType().Name == "JObject" && pt.Name == "Dictionary`2")
                                {
                                    p.Add(((JObject)v).ToObject<Dictionary<string, object>>());
                                }
                                else
                                {
                                    p.Add(Convert.ChangeType(v, pt));
                                }
                            }
                        }
                    }
                }

                if (method.ReturnType.Name == "Task" || (method.ReturnType.BaseType != null && method.ReturnType.BaseType.Name == "Task"))
                {
                    retValue = await (dynamic)method.Invoke(obj, p.ToArray());
                }
                else
                {
                    retValue = method.Invoke(obj, p.ToArray());
                }
                return retValue;
            }
            catch (Exception ex) {
                dynamic entity = new EK.Drivers.Log.ElasticEntity();
                var newGUID = Guid.NewGuid().ToString();

                entity.ID = newGUID;
                entity.Message = ex.Message;
                entity.StackTrace = ex.StackTrace;
                /************************** ***********************/
                entity.RecordType = -1;
                entity.RecordTypeName = "Error";
                /************************** ***********************/
                entity.Creado = DateTime.UtcNow;
                entity.IdCreadoPor = obj.getUserId();
                //
                string entityName = objectName ?? "";
                try
                {
                    await this.factory.GetInstance<EK.Drivers.Log.ILogger>().AddAsync($"{entityName}$", entity);
                }
                catch{}
                //
                throw new ApplicationException($"ERROR: {newGUID}", ex);
            }
        }

        private object getJValue(Type type, dynamic v) {
            object retValue = null;
            object value = null;

            if (v != null) {
                value = ((JValue)v).Value;
            };

            if (type.IsEnum) {
                retValue = Enum.ToObject(type, Convert.ToInt32(value));
            } else if (type.Name == "Nullable`1") {
                Type tt = type.GenericTypeArguments[0];

                if (value == null) {
                    retValue = null;
                } else {
                    retValue = type.GetConstructors()[0].Invoke(new object[] { Convert.ChangeType(value, tt) });
                }
            } else {
                try
                {
                    retValue = Convert.ChangeType(value, type);
                }
                catch {
                    throw;
                }
            }

            return retValue;
        }

        private object convertJSONArray(string json, Type propType) {
            dynamic f = JsonConvert.DeserializeObject(json);

            object propValue = Activator.CreateInstance(propType);
            var addMethod = propValue.GetType().GetMethod("Add");
            var gt = propType.GenericTypeArguments[0];

            foreach (var jo in f)
            {
                if (jo is JValue)
                {
                    addMethod.Invoke(propValue, new object[] { this.getJValue(gt, jo) });
                }
                else if (jo is JObject)
                {
                    addMethod.Invoke(propValue, new object[] { convertJSON(null, jo, gt) });
                }
            }

            return propValue;
        }

        private object convertJSON(string json, dynamic jsonObj, Type type)
        {
            dynamic f = json != null ? JsonConvert.DeserializeObject(json) : jsonObj;
            var entity = (EK.Modelo.Kontrol.Interfaces.IBaseKontrol) this.factory.GetInstance(type);
            entity.TrackChanges = false;

            var props = entity.GetType().GetProperties();
            var estadoProp = props.FirstOrDefault(n => n.Name == "Estado");

            estadoProp.SetValue(entity, KontrolEstadosEnum.SinCambios);
            try
            {
                foreach (var property in f.Properties())
                {
                    string name = property.Name;
                    //if(name == "ListaEvidenciasCte")
                    //{
                    //    var xd = true;
                    //}
                    object propValue = null;
                    var prop = props.FirstOrDefault(n => n.Name == name); // entity.GetType().GetProperty(name);

                    if (prop != null)
                    {
                        var propType = prop.PropertyType;

                        if (property.Value is JValue)
                        {
                            if (name == "ID")
                            {
                                int idValue = property.Value == null ? 0 : Convert.ToInt32(property.Value);

                                if (idValue <= 0)
                                {
                                    estadoProp.SetValue(entity, KontrolEstadosEnum.Nuevo);
                                }

                                propValue = idValue;
                            }
                            else
                            {
                                propValue = this.getJValue(propType, property.Value);
                            }
                        }
                        else if (property.Value is JObject)
                        {
                            if (propType.GetInterface("IBaseKontrol") != null &&
                                property.Value != null &&
                                property.Value.ID == null)
                            {
                                propValue = null;
                            }
                            else
                            {
                                propValue = convertJSON(null, property.Value, propType);
                            }
                        }
                        else if (property.Value is JArray)
                        {
                            propValue = Activator.CreateInstance(propType);
                            var addMethod = propValue.GetType().GetMethod("Add");
                            var gt = propType.GenericTypeArguments[0];

                            foreach (var jo in property.Value)
                            {
                                if (jo is JValue)
                                {
                                    addMethod.Invoke(propValue, new object[] { this.getJValue(gt, jo) });
                                }
                                else if (jo is JObject)
                                {
                                    addMethod.Invoke(propValue, new object[] { convertJSON(null, jo, gt) });
                                }
                            }
                        }

                        prop.SetMethod.Invoke(entity, new object[] { propValue });
                    }
                    else if (name == "_nuevo")
                    {
                        estadoProp.SetValue(entity, KontrolEstadosEnum.Nuevo);
                    }
                    else if (name == "_sincambios")
                    {
                        estadoProp.SetValue(entity, KontrolEstadosEnum.SinCambios);
                    }
                    else if (name == "_modificado")
                    {
                        estadoProp.SetValue(entity, KontrolEstadosEnum.Modificado);
                    }
                    else if (name == "_eliminado")
                    {
                        estadoProp.SetValue(entity, KontrolEstadosEnum.Eliminado);
                    }
                }
            }

            catch(Exception ex)
            {
                throw new ApplicationException(ex.Message, ex);

            }
            entity.TrackChanges = true;
            return entity;
        }

        public async Task<object> Execute(string commandName, Dictionary<string, object> parametros)
        {
            return await this.Execute(commandName, parametros, null);
        }

        public async Task<object> Execute(string commandName, Dictionary<string, object> parametros, dynamic user)
        {
            var commandParts = commandName.Split("/".ToCharArray());
            var objectName = "";

            if (commandParts.Length >= 2) {
                objectName = commandParts[1].ToLower();
            }
            
            // Get the type of the business object
            var type = getCommandType(objectName);

            // Get the instance of the type
            var obj = GetInstance(type);

            if (obj != null && user != null) {
                obj.IdUser = user.ID;
            }

            // Invoke the method
            object retValue = await invokeCommand(obj, commandParts[2], parametros, objectName);

            if (obj.ReturnCode > 0) {
                EK.Modelo.Kontrol.CommandResult result = new CommandResult();
                result.Codigo = obj.ReturnCode;
                result.Mensaje = obj.ReturnMessage;
                result.Severity = obj.ReturnSeverity;
                if (retValue == null)
                {
                    result.UpdateState = false;
                    result.Resultado = new { };
                }
                else {
                    result.UpdateState = true;
                    result.Resultado = retValue;
                }

                return result;
            }

            //var retValue = GetInstance<ICommandResult>();
            //var resultado = await invokeCommand(obj, commandParts[2], parametros);

            //retValue.Codigo = 1;
            //retValue.Resultado = resultado;

            return retValue;
            }

        public async Task<object> Execute(ICommandQuery command)
        {
            return await this.Execute(command.ID, command.Parametros);
            // Command name
            //var commandName = command.ID.Split("/".ToCharArray());

            //// parameters & values 
            ////var pNames = command.Parametros == null ? new string[] { } : command.Parametros.Keys.ToArray();
            ////var pValues = command.Parametros == null ? new object[] { } : command.Parametros.Values.ToArray();

            //// Get the type of the business object
            //var type = getCommandType(commandName[1]);

            //// Get the instance of the type
            //var obj = GetInstance(type);

            //// Invoke the method
            //var retValue = GetInstance<ICommandResult>();
            //var resultado = await invokeCommand(obj, commandName[2], command.Parametros);

            //retValue.Codigo = 1;
            //retValue.Resultado = resultado;

            //return retValue;
        }

        public EK.Procesos.Kontrol.Interfaces.IBaseProceso GetInstance(Type serviceType)
        {
            return this.factory.GetInstance(serviceType) as EK.Procesos.Kontrol.Interfaces.IBaseProceso;
        }

        public T GetInstance<T>()
        {
            return (T)this.factory.GetInstance(typeof(T));
        }
    }
}
