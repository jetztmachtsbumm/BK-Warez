using Bytekontrol.BK_Warez.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bytekontrol.BK_Warez.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        internal DbSet<Device> Devices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>(builder =>
            {
                builder.HasKey(d => d.Id);
                builder.Property(d => d.Id).ValueGeneratedOnAdd();
            });
        }
    }
}
