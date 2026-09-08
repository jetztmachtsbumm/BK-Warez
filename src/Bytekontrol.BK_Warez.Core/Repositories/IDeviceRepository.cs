using Bytekontrol.BK_Warez.Core.Common.DTOs;
using Bytekontrol.BK_Warez.Core.Common.Paging;
using Bytekontrol.BK_Warez.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Core.Repositories
{
    public interface IDeviceRepository
    {
        Task<PagedResult<Device>> GetAllDevicesPagedAsync(PageRequest pageRequest, CancellationToken ct);
        Task<Device> GetDeviceByIdAsync(int id, CancellationToken ct);
        Task<bool> AddDeviceAsync(DeviceDTO device, CancellationToken ct);
        Task<bool> UpdateDeviceAsync(int id, DeviceDTO device, CancellationToken ct);
        Task<int> GetNextAvailableIdAsync(CancellationToken ct);
    }
}
