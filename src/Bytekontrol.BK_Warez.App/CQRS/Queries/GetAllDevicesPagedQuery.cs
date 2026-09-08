using Bytekontrol.BK_Warez.Core.Common.Paging;
using Bytekontrol.BK_Warez.Core.Entities;
using Bytekontrol.BK_Warez.Core.Repositories;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Queries
{
    public sealed record GetAllDevicesPagedQuery(PageRequest PageRequest) : IRequest<PagedResult<Device>>;

    public sealed class GetAllDevicesPagedQueryHandler(IDeviceRepository repository) : IRequestHandler<GetAllDevicesPagedQuery, PagedResult<Device>>
    {
        public async ValueTask<PagedResult<Device>> Handle(GetAllDevicesPagedQuery request, CancellationToken cancellationToken)
        {
            return await repository.GetAllDevicesPagedAsync(request.PageRequest, cancellationToken);
        }
    }
}
