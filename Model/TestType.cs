using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsApp.Model
{
    public class TestType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TestTypeId { get; set; }
        public string TypeName { get; set; }
        public ICollection<TestEntry> TestEntry { get; set; }

    }
}
