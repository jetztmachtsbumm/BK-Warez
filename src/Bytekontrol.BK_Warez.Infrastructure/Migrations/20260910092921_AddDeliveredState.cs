using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bytekontrol.BK_Warez.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveredState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Delivered",
                table: "Devices",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Delivered",
                table: "Devices");
        }
    }
}
