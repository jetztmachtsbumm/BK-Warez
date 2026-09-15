using Bytekontrol.BK_Warez.Core.Services;
using Bytekontrol.BK_Warez.Infrastructure.Warranty;
using Microsoft.Extensions.Configuration;
using System.Net.Http.Json;

namespace Bytekontrol.BK_Warez.Infrastructure.Services
{
    public sealed class LenovoWarrantyService(HttpClient httpClient, IConfiguration configuration) : IWarrantyService
    {
        public async Task<bool> IsWarrantyExpiredAsync(string serialNumber, CancellationToken ct)
        {
            var clientId = configuration["ClientIds:Lenovo"];

            if (string.IsNullOrWhiteSpace(clientId)) throw new InvalidOperationException("Lenovo client id is not configured.");

            using var request = new HttpRequestMessage(HttpMethod.Get, $"v2.5/warranty?serial={Uri.EscapeDataString(serialNumber)}");

            request.Headers.Add("ClientID", clientId);

            using var response = await httpClient.SendAsync(request, ct);

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<LenovoWarrantyResponse>(ct);

            if (result?.Warranty is null || result.Warranty.Count == 0) throw new InvalidOperationException($"No warranty information found for serial number '{serialNumber}'.");

            var endDate = result.Warranty
            .Where(x => x.End is not null)
            .Select(x => x.End!.Value)
            .Max();

            return endDate.Date < DateTime.Now.Date;
        }
    }
}
