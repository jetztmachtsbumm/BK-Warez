using Bytekontrol.BK_Warez.Core.Common.DTOs;
using Bytekontrol.BK_Warez.Core.Common.Paging;
using Bytekontrol.BK_Warez.Core.Entities;
using Bytekontrol.BK_Warez.Core.Repositories;
using Bytekontrol.BK_Warez.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Bytekontrol.BK_Warez.Infrastructure.Repositories
{
    public sealed class DeviceRepository(AppDbContext db) : IDeviceRepository
    {
        public async Task<PagedResult<Device>> GetAllDevicesPagedAsync(PageRequest pageRequest, CancellationToken ct)
        {
            var page = pageRequest.NormalizedPage;
            var pageSize = pageRequest.NormalizedPageSize;

            IQueryable<Device> query = db.Devices.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(pageRequest.SearchTerm))
            {
                var term = pageRequest.SearchTerm.Trim();
                var idTerm = term;
                if (idTerm.StartsWith("BK", StringComparison.OrdinalIgnoreCase))
                {
                    var digits = idTerm[2..].TrimStart('0');
                    idTerm = digits.Length > 0 ? digits : idTerm;
                }
                else
                {
                    idTerm = "";
                }

                query = query.Where(x =>
                    EF.Functions.ILike(x.Id.ToString()!, $"%{idTerm}%") ||
                    EF.Functions.ILike(x.Category, $"%{term}%") ||
                    EF.Functions.ILike(x.Name, $"%{term}%") ||
                    EF.Functions.ILike(x.Details, $"%{term}%") ||
                    EF.Functions.ILike(x.SerialNumber, $"%{term}%") ||
                    EF.Functions.ILike(x.Remarks, $"%{term}%"));
            }

            query = ApplySorting(query, pageRequest.SortColumn, pageRequest.SortDescending);

            var totalCount = await query.CountAsync(ct);

            var items = await query
                .Skip(pageRequest.Skip)
                .Take(pageSize)
                .ToListAsync(ct);

            return new PagedResult<Device>(
                items,
                page,
                pageSize,
                totalCount);
        }

        public async Task<Device> GetDeviceByIdAsync(int id, CancellationToken ct)
        {
            return await db.Devices.AsNoTracking().FirstAsync(d => d.Id == id, ct);
        }

        public async Task<bool> AddDeviceAsync(DeviceDTO deviceDTO, CancellationToken ct)
        {
            var device = new Device(null, deviceDTO.CreatedAt, deviceDTO.Category, deviceDTO.Name, deviceDTO.Details, deviceDTO.SerialNumber, deviceDTO.Remarks, deviceDTO.Archived);
            await db.Devices.AddAsync(device, ct);
            await db.SaveChangesAsync(ct);
            return true;
        }

        public async Task<bool> UpdateDeviceAsync(int id, DeviceDTO deviceDTO, CancellationToken ct)
        {
            var device = new Device(id, deviceDTO.CreatedAt, deviceDTO.Category, deviceDTO.Name, deviceDTO.Details, deviceDTO.SerialNumber, deviceDTO.Remarks, deviceDTO.Archived);

            db.Devices.Update(device);
            await db.SaveChangesAsync(ct);

            return true;
        }

        public async Task<int> GetNextAvailableIdAsync(CancellationToken ct)
        {
            var currentHighestId = await db.Devices.AsNoTracking().MaxAsync(d => d.Id, ct);
            return currentHighestId!.Value + 1;
        }

        static IQueryable<Device> ApplySorting(IQueryable<Device> query, string? sortColumn, bool descending)
        {
            return sortColumn?.Trim().ToLowerInvariant() switch
            {
                "createdat" => descending ? query.OrderByDescending(x => x.CreatedAt) : query.OrderBy(x => x.CreatedAt),
                "category" => descending ? query.OrderByDescending(x => x.Category) : query.OrderBy(x => x.Category),
                "name" => descending ? query.OrderByDescending(x => x.Name) : query.OrderBy(x => x.Name),
                "details" => descending ? query.OrderByDescending(x => x.Details) : query.OrderBy(x => x.Details),
                "serialnumber" => descending ? query.OrderByDescending(x => x.SerialNumber) : query.OrderBy(x => x.SerialNumber),
                "remarks" => descending ? query.OrderByDescending(x => x.Remarks) : query.OrderBy(x => x.Remarks),
                _ => descending ? query.OrderByDescending(x => x.Id) : query.OrderBy(x => x.Id),
            };
        }
    }
}
