namespace the_grand_egyptian_museum.Models
{
    public class Cards
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Era { get; set; }
        public string Location { get; set; }
        public DateTime Discoverd { get; set; }
        public List<string> KeyFeatures { get; set; }
    }
}
