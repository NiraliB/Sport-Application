using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsApp.Model
{
    public class TestEntry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TestId { get; set; }
        public DateTime TestDate { get; set; }
        public int TestTypeId { get; set; }
        public TestType TestType { get; set; }
        public ICollection<MapCooperAthlete> MapCooperAthlete { get; set; }


    }
}
