namespace TechNode.Core.Exceptions;

public class NotFoundException(string resourceType, string resourceIdentifier) : Exception($"Resource type: {resourceType}, with id: {resourceIdentifier} does not exist");