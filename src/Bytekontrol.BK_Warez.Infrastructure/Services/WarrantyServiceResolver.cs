using Bytekontrol.BK_Warez.Core.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Infrastructure.Services
{
    public class WarrantyServiceResolver(IEnumerable<IWarrantyService> services) : IWarrantyServiceResolver
    {
        readonly Dictionary<string, IWarrantyService> _services =
            services.ToDictionary(
                service => service.Manufacturer,
                StringComparer.OrdinalIgnoreCase);

        public IWarrantyService? Resolve(string manufacturer)
        {
            return _services.GetValueOrDefault(manufacturer);
        }
    }
}
