using System;
using System.Collections.Generic;
using System.Text;

namespace Bytekontrol.BK_Warez.Core.Common.Paging
{
    public sealed record PageRequest(
        int Page = 1,
        int PageSize = 20,
        string? SearchTerm = null,
        string? SortColumn = null,
        bool SortDescending = false
    )
    {
        public int NormalizedPage => Math.Max(Page, 1);

        public int NormalizedPageSize =>
            Math.Clamp(PageSize, 1, 100);

        public int Skip =>
            (NormalizedPage - 1) * NormalizedPageSize;
    }
}
