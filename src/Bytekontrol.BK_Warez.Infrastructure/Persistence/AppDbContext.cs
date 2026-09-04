using Microsoft.EntityFrameworkCore;

namespace Bytekontrol.BK_Warez.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
        }
    }
}
