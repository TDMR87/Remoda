namespace Api.Utils;

public static class StringExtensions
{
    /// <summary>
    /// Returns the specified amount of characters from the beginning of a string.
    /// </summary>
    /// <param name="text">
    /// The source text.
    /// </param>
    /// <param name="characters">
    /// The character count to return.
    /// </param>
    /// <returns></returns>
    public static string Peek(this string? text, int characters) => new(text?.Take(characters).ToArray());
}
