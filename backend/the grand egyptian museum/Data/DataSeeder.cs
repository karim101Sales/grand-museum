using the_grand_egyptian_museum.Models;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace the_grand_egyptian_museum.Data
{
    public static class DataSeeder
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<Storecontext>();

                // 1. Ensure Database is Created (The fix we added earlier)
                context.Database.Migrate();

                // 2. Seed Admin User
                if (!context.Users.Any())
                {
                    var passwordHash = BCrypt.Net.BCrypt.HashPassword("admin123");
                    context.Users.Add(new Models.User
                    {
                        Name = "Admin",
                        Email = "admin@museum.com",
                        UserName = "admin",
                        Password = passwordHash,
                        Role = "Admin"
                    });
                    context.SaveChanges();
                }

                // 3. Seed Monuments
                if (!context.Cards.Any())
                {
                    context.Cards.AddRange(
                        new Models.Cards
                        {
                            Title = "Great Sphinx of Giza",
                            Description = "A limestone statue of a reclining sphinx, a mythical creature.",
                            Era = "Old Kingdom",
                            Location = "Giza Plateau",
                            // FIX: Use a valid AD date (e.g. First modern excavation)
                            Discoverd = new DateTime(1817, 1, 1).ToUniversalTime(),
                            KeyFeatures = new List<string> { "Limestone", "Lion Body", "Human Head" },
                            Image = "DP-24216-003.jpg"
                        },
                        new Models.Cards
                        {
                            Title = "Statue of Ramses II",
                            Description = "A 3,200-year-old statue of Ramses II.",
                            Era = "New Kingdom",
                            Location = "Memphis",
                            // FIX: Use a valid AD date
                            Discoverd = new DateTime(1820, 1, 1).ToUniversalTime(),
                            KeyFeatures = new List<string> { "Red Granite", "Colossal Scale" },
                            Image = "146991_1.jpg"
                        }
                    );
                    context.SaveChanges();
                }
            }
        }
    }
}
