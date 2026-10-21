using System;
using System.Collections.Generic;
using System.Text;
using Bytekontrol.BK_Warez.Core.Common.Warranty;

namespace Bytekontrol.BK_Warez.Core.Services
{
    public interface IWarrantyService
    {
        string Manufacturer { get; }

        Task<DeviceWarranty> IsWarrantyExpiredAsync(string serialNumber, CancellationToken ct);
    }
}
