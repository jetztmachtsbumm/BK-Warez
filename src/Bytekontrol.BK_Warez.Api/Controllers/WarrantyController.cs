using Bytekontrol.BK_Warez.App.CQRS.Queries;
using Mediator;
using Microsoft.AspNetCore.Mvc;

namespace Bytekontrol.BK_Warez.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarrantyController(ISender sender) : ControllerBase
    {

        public async Task<IActionResult> GetWarrantyStatus([FromQuery] WarrantyExpiredQuery query)
        {
            return Ok(await sender.Send(query));
        }

    }
}
