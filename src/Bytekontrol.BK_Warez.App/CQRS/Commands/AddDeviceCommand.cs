using Bytekontrol.BK_Warez.Core.Common.DTOs;
using Bytekontrol.BK_Warez.Core.Repositories;
using Mediator;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.App.CQRS.Commands
{
    public sealed record AddDeviceCommand(DeviceDTO Device) : IRequest<bool>;

    public sealed class AddDeviceCommandHandler(IDeviceRepository repository) : IRequestHandler<AddDeviceCommand, bool>
    {
        public async ValueTask<bool> Handle(AddDeviceCommand request, CancellationToken cancellationToken)
        {
            return await repository.AddDeviceAsync(request.Device, cancellationToken);
        }
    }
}
