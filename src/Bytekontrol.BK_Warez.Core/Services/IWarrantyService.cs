using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Core.Services
{
    public interface IWarrantyService
    {
        Task<bool> IsWarrantyExpiredAsync(string serialNumber, CancellationToken ct);
    }
}
