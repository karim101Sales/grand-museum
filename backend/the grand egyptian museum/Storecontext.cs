using Microsoft.EntityFrameworkCore;
using the_grand_egyptian_museum.Models;

namespace the_grand_egyptian_museum
{
    public class Storecontext : DbContext
    {
     public Storecontext(DbContextOptions<Storecontext> options) :base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Cards> Cards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
