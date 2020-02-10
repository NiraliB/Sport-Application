using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsApp.Model
{
    public class MapCooperAthlete
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MapId { get; set; }
        public double? Distance { get; set; }
        public string Fitness { get; set; }
        public int TestId { get; set; }
        public TestEntry TestEntry { get; set; }
        public int UserId { get; set; }
        public UserEntry UserEntry { get; set; }


    }
}
