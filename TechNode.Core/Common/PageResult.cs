namespace TechNode.Core.Common;

public class PageResult<T>(IEnumerable<T> items, int totalCount, int pageSize, int pageNumber)
{
    public IEnumerable<T> Items { get; set; } = items;
    
    public int TotalPages { get; set; } = (int)Math.Ceiling(totalCount / (double)pageSize);
    
    public int TotalItemsCount { get; set; } = totalCount;

    public int PageNumber { get; set; } = pageNumber;

    public int PageSize { get; set; } = pageSize;
}