using Bytekontrol.BK_Warez.Core.Entities;
using Bytekontrol.BK_Warez.Core.Repositories;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Queries
{
    public sealed record GetDeviceByIdQuery(int Id) : IRequest<Device>;

    public sealed class GetDeviceByIdQueryHandler(IDeviceRepository repository) : IRequestHandler<GetDeviceByIdQuery, Device>
    {
        public async ValueTask<Device> Handle(GetDeviceByIdQuery request, CancellationToken cancellationToken)
        {
            return await repository.GetDeviceByIdAsync(request.Id, cancellationToken);
        }
    }
}
