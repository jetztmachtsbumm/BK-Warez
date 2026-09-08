using Bytekontrol.BK_Warez.Core.Repositories;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Queries
{
    public sealed record GetNextAvailableIdQuery : IRequest<int>;

    public sealed class GetNextAvailableIdQueryHandler(IDeviceRepository repository) : IRequestHandler<GetNextAvailableIdQuery, int>
    {
        public async ValueTask<int> Handle(GetNextAvailableIdQuery request, CancellationToken cancellationToken)
        {
            return await repository.GetNextAvailableIdAsync(cancellationToken);
        }
    }
}
