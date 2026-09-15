using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bytekontrol.BK_Warez.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDeliveryDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "DeliveryDate",
                table: "Devices",
                type: "date",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryDate",
                table: "Devices");
        }
    }
}
