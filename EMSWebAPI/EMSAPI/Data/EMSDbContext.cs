using EMSAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EMSAPI.Data
{
    public class EMSDbContext : DbContext
    {
        public EMSDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
    }
}
