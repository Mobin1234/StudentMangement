using Microsoft.EntityFrameworkCore;
using StudentMangement.Models;

namespace StudentMangement.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        {
            
        }

        public DbSet<Student> Student { get; set; }
    }
}
