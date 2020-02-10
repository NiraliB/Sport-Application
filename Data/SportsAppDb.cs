using Microsoft.EntityFrameworkCore;
using SportsApp.Model;

namespace SportsApp.Data
{
    public class SportsContext : DbContext
    {

        public SportsContext(DbContextOptions<SportsContext> options) : base(options)
        {
        }

        public DbSet<UserEntry> UserEntry { get; set; }
        public DbSet<TestType> TestType { get; set; }
        public DbSet<TestEntry> TestEntry { get; set; }
        public DbSet<MapCooperAthlete> MapCooperAthlete { get; set; }


    }
}
