using System;
using System.Net;
using System.Net.Sockets;

public class PrinterClient
{
    private Socket socket;

    public PrinterClient()
    {
        socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
    }

    public void SendToPrinter(byte[] data, string ipAddress, int port)
    {
        try
        {
            IPAddress printerIPAddress = IPAddress.Parse(ipAddress);
            IPEndPoint printerEndPoint = new IPEndPoint(printerIPAddress, port);

            socket.Connect(printerEndPoint);
            socket.Send(data);
            Console.WriteLine("Data sent");
            socket.Close();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}