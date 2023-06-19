using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace reggit.dal.Migrations
{
    /// <inheritdoc />
    public partial class AddImageURLOnVisitor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                schema: "Reggit",
                table: "Visitors",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageURL",
                schema: "Reggit",
                table: "Visitors");
        }
    }
}
