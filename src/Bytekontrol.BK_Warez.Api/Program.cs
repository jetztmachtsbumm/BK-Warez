using Bytekontrol.BK_Warez.App;
using Bytekontrol.BK_Warez.Infrastructure;
using Bytekontrol.BK_Warez.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseWindowsService(opt =>
{
    opt.ServiceName = "BK_Warez";
});

builder.Logging.AddEventLog(opt =>
{
    opt.SourceName = "BK_Warez";
});

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowClient",
        policy =>
        {
            policy.WithOrigins(
                    "https://localhost:4200",
                    "https://warez.bytekontrol.de")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddApplication().AddInfrastructure(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors("AllowClient");

app.MapControllers();

app.MapGet("api/device-types", () => builder.Configuration.GetSection("DeviceTypes").Get<string[]>() ?? []);

app.Run();
