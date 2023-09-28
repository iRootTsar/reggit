using System;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System.Text;

namespace PTouchCSharp;
public class PTouch
{
    private readonly List<byte> data = new List<byte>();
    private readonly Dictionary<char, byte> charset;



    public PTouch(int template, PTouchOptions? options = null)
    {
        data.AddRange(Constants.PTOUCH_MODE);
        data.AddRange(Constants.INITIALIZE);
        data.AddRange(new byte[] { 0x1b, 0x69, 0x58, 0x6d, 0x32, 0x00, 0x00, 0x00 }); // Brother default charset

        if (options != null && options.Copies > 1)
        {
            data.AddRange(new byte[] { 0x5e, 0x43, 0x4e });
            data.AddRange(Encoding.ASCII.GetBytes(options.Copies.ToString("D3")));
        }
        
        data.AddRange(new byte[] { 0x5e, 0x54, 0x53, 0x30, (byte)(template / 10 + '0'), (byte)(template % 10 + '0') });
    }

    public void InsertData(string objectName, string value)
    {
        List<byte> buffers = new List<byte>();
        foreach (char character in value)
        {
            byte code = CharacterMappings.GetByteForCharacter(character);
            buffers.Add(code);
        }

        data.AddRange(new byte[] { 0x5e, 0x4f, 0x4e });
        data.AddRange(Encoding.ASCII.GetBytes(objectName));
        data.Add(0x00);

        int length = buffers.Count;
        data.AddRange(new byte[] { 0x5e, 0x44, 0x49, (byte)(length % 256), (byte)(length / 256) });
        data.AddRange(buffers);
    }

    public byte[] Generate()
    {
        data.AddRange(Constants.FF);
        return data.ToArray();
    }
}

public class PTouchOptions
{
    public int Copies { get; set; }

}