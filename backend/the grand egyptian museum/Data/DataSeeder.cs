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

                // Apply pending migrations
                context.Database.Migrate();

                // Seed Users
                if (!context.Users.Any())
                {
                    var adminUser = new User
                    {
                        Name = "Admin User",
                        Email = "admin@museum.com",
                        UserName = "admin",
                        Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
                        Role = "Admin"
                    };
                    context.Users.Add(adminUser);
                    context.SaveChanges();
                }

                // Seed Cards (Monuments)
                if (!context.Cards.Any())
                {
                    var monuments = new List<Cards>
                    {
                        new Cards
                        {
                            Title = "Sphinx",
                            Description = "The Great Sphinx of Giza is a limestone statue of a reclining sphinx, a mythical creature.",
                            Era = "Old Kingdom",
                            Location = "Giza",
                            Discoverd = DateTime.Now.AddYears(-4500), // Approximate
                            KeyFeatures = new List<string> { "Limestone", "Lion Body", "Human Head" },
                            Image = "DP-24216-003.jpg"
                        },
                        new Cards
                        {
                            Title = "Ramses II",
                            Description = "A statue of Ramses II, the third pharaoh of the Nineteenth Dynasty of Egypt.",
                            Era = "New Kingdom",
                            Location = "Abu Simbel", // Or Memphis, generalized
                            Discoverd = DateTime.Now.AddYears(-3200),
                            KeyFeatures = new List<string> { "Colossal", "Granite", "Pharaoh" },
                            Image = "146991_1.jpg"
                        }
                    };
                    context.Cards.AddRange(monuments);
                    context.SaveChanges();
                }
            }
        }
    }
}
