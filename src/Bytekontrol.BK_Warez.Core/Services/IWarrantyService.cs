using System;
using System.Collections.Generic;
using System.Text;
using Bytekontrol.BK_Warez.Core.Common.Warranty;

namespace Bytekontrol.BK_Warez.Core.Services
{
    public interface IWarrantyService
    {
        Task<DeviceWarranty> IsWarrantyExpiredAsync(string serialNumber, CancellationToken ct);
    }
}
