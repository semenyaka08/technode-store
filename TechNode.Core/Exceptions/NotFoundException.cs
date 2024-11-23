namespace TechNode.Core.Exceptions;

public class NotFoundException(string resourceType, int resourceIdentifier) : Exception($"Resource type: {resourceType}, with id: {resourceIdentifier} does not exist");