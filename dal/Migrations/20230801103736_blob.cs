using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace reggit.dal.Migrations
{
    /// <inheritdoc />
    public partial class blob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageURL",
                schema: "Reggit",
                table: "Visitors");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                schema: "Reggit",
                table: "Visitors",
                type: "bytea",
                nullable: false,
                defaultValue: new byte[0]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                schema: "Reggit",
                table: "Visitors");

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                schema: "Reggit",
                table: "Visitors",
                type: "text",
                nullable: true);
        }
    }
}
